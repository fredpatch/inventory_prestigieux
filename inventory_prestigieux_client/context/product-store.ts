import { create } from "zustand";
import { Product } from "@/components/shared/table/columns";
import axios from "axios";
import {
  convertIconToString,
  convertStringToIcon,
} from "@/components/shared/product-dialog/icon-selector";
import { icons } from "@/components/shared/product-dialog/icons";

const NEXT_PUBLIC_API_DOMAIN = process.env.NEXT_PUBLIC_API as string;

// Structure of the overall state of the app
interface ProductState {
  allProducts: Product[];
  setAllProducts: (allProducts: Product[]) => void;
  //
  isLoading: boolean;
  //
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  //
  openProductDialog: boolean;
  setOpenProductDialog: (openProductDialog: boolean) => void;
  //
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  //
  loadProducts: () => Promise<{ success: boolean }>;
  addProduct: (
    product: Product,
    access_token: string
  ) => Promise<{ success: boolean }>;
  deleteProduct: (
    productId: string,
    access_token: string
  ) => Promise<{ success: boolean }>;
  updateProduct: (
    updatedProduct: Product,
    access_token: string
  ) => Promise<{ success: boolean }>;
  //
  totalProductsSold: () => number;
  totalMarginExpected: () => number;
  totalMargins: () => number;
  totalSellingPrice: () => number;
  totalSales: () => number;
}

export const useProductStore = create<ProductState>((set, get) => ({
  allProducts: [],
  isLoading: false,
  selectedProduct: null,
  openDialog: false,
  totalProductsSold: () => {
    return get().allProducts.reduce(
      (total, product) => total + product.quantitySold,
      0
    );
  },
  totalMarginExpected: () => {
    return get().allProducts.reduce(
      (total, product) =>
        total + (product.sellingPrice - product.purchasePrice),
      0
    );
  },
  totalMargins: () => {
    return get().allProducts.reduce(
      (total, product) => total + product.totalMarginPerUnit,
      0
    );
  },
  totalSellingPrice: () => {
    return get().allProducts.reduce(
      (total, product) => total + product.sellingPrice,
      0
    );
  },
  totalSales: () => {
    return get().allProducts.reduce(
      (total, product) => total + product.totalSoldPerUnit,
      0
    );
  },
  setOpenDialog: (openDialog) => {
    set({ openDialog: openDialog });
  },
  openProductDialog: false,
  setOpenProductDialog: (openProductDialog) => {
    set({ openProductDialog: openProductDialog });
  },
  setSelectedProduct: (product: Product | null) => {
    set({ selectedProduct: product });
  },
  setAllProducts: (allProducts) => {
    set({ allProducts: allProducts });
  },
  loadProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        `${NEXT_PUBLIC_API_DOMAIN}/api/v1/products/get-products`
      );

      // console.log("RESPONSE ==>", response.data);
      if (response.data) {
        const products = response.data.map((product: any) => ({
          ...product,
          icon: convertStringToIcon(product.icon, icons),
        }));
        set({ allProducts: products, isLoading: false });
        return products;
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addProduct: async (product: Product, access_token: string) => {
    set({ isLoading: true });

    try {
      const productToSave = {
        ...product,
        icon: convertIconToString(product.icon),
        quantityInStock: product.quantityInStock - product.quantitySold,
      };
      const response = await axios.post(
        `${NEXT_PUBLIC_API_DOMAIN}/api/v1/products/add-product`,
        productToSave,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      // console.log("RESPONSE ==>", response.data);
      if (response.data) {
        const newProduct = {
          ...response.data,
          icon: convertStringToIcon(response.data.icon, icons),
        };
        set((state) => ({
          allProducts: [...state.allProducts, newProduct],
          isLoading: false,
        }));
        return { success: true };
      }

      return { success: false };
    } catch (error) {
      console.error("Failed to add product:", error);
      return { success: false };
    } finally {
      set({ isLoading: false });
    }
  },

  updateProduct: async (updatedProduct: Product, access_token: string) => {
    set({ isLoading: true });
    try {
      const totalSoldPerUnit =
        updatedProduct.sellingPrice * updatedProduct.quantitySold;
      const totalMarginPerUnit =
        (updatedProduct.sellingPrice - updatedProduct.purchasePrice) *
        updatedProduct.quantitySold;

      const productToUpdate = {
        ...updatedProduct,
        icon: convertIconToString(updatedProduct.icon),
        quantityInStock:
          updatedProduct.quantityInStock - updatedProduct.quantitySold,
        totalSoldPerUnit,
        totalMarginPerUnit,
      };

      // api call
      const response = await axios.patch(
        `${NEXT_PUBLIC_API_DOMAIN}/api/v1/products/update-product/${updatedProduct.id}`,
        productToUpdate,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.data) {
        const updatedProductFromResponse = {
          ...response.data,
          icon: convertStringToIcon(response.data.icon, icons),
        };
        set((state) => ({
          allProducts: state.allProducts.map((product) =>
            product.id === updatedProductFromResponse.id
              ? updatedProductFromResponse
              : product
          ),
          isLoading: false,
        }));
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error("Failed to update product:", error);
      return { success: false };
    } finally {
      set({ isLoading: false });
      set({ openProductDialog: false });
    }
  },

  deleteProduct: async (productId: string, access_token: string) => {
    set({ isLoading: true });
    try {
      // Simulate the deletion process with a delay
      await new Promise((resolve) => setTimeout(resolve, 1789));

      set((state) => ({
        allProducts: state.allProducts.filter(
          (product) => product.id !== productId
        ),
      }));
      return { success: true };
    } catch (error) {
      console.error("Failed to delete product:", error);
      return { success: false };
    } finally {
      set({ isLoading: false });
      set({ openDialog: false });
      set({ selectedProduct: null });
    }
  },
}));
