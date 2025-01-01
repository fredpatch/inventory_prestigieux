"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

import { CategoryComponent } from "./_components/CategoryComponent";
import { Product } from "../table/columns";
import { useProductStore } from "@/context/product-store";
import { icons } from "./icons";

import { StatusComponent } from "./_components/StatusComponent";
import { ProductName } from "./_components/ProductNameComponent";
import { SkuComponent } from "./_components/SkuComponent";
import { SupplierComponent } from "./_components/SupplierComponent";
import { QteComponent } from "./_components/QteComponent";
import { PriceComponent } from "./_components/PVUComponent";

const ProductSchema = z.object({
  productName: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name must be less than 100 characters"),

  sku: z
    .string()
    .min(1, "SKU is required")
    .regex(/^[a-zA-Z0-9-_]+$/, "SKU must be alphanumeric"),

  supplier: z
    .string()
    .min(1, "Supplier is required")
    .max(100, "Supplier must be less than 100 characters"),

  quantity: z
    .number()
    .int("Quantity must be an integer")
    .nonnegative("Quantity must be non-negative"),

  price: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "", {
      message: "Price is required",
    })
    .transform((val) => {
      // If it's empty string, this will fail validation
      if (val === "") return undefined;

      // Convert to number and fix to 2 decimal places
      const num = Number(val);
      return Number(num.toFixed(2));
    })
    .pipe(
      z
        .number({
          required_error: "Price is required",
          invalid_type_error: "Price must be a number",
        })
        .nonnegative("Price must be non-negative")
    ),
});

export type ProductFormData = z.infer<typeof ProductSchema>;

const ProductDialog = () => {
  const methods = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productName: "",
      sku: "",
      supplier: "",
      quantity: 0,
      price: 0.0,
    },
  });

  const { reset } = methods;

  const [selectedTab, setSelectedTab] =
    useState<Product["status"]>("Published");

  const [selectedCategory, setSelectedCategory] =
    useState<Product["category"]>("Others");

  const [selectedIcon, setSelectedIcon] = useState<null | ReactNode>(
    icons.find((icon) => icon.isSelected === true)?.icon
  );

  const {
    addProduct,
    isLoading,
    openProductDialog,
    setOpenProductDialog,
    setSelectedProduct,
    selectedProduct,
    updateProduct,
  } = useProductStore();
  const { toast } = useToast();
  const dialogCloseRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      /* Update form with selected product details when dialog opens */
      reset({
        productName: selectedProduct.name,
        sku: selectedProduct.sku,
        supplier: selectedProduct.supplier,
        quantity: selectedProduct.quantityInStock,
        price: selectedProduct.price,
      });
      setSelectedTab(selectedProduct.status);
      setSelectedCategory(selectedProduct.category);
      setSelectedIcon(selectedProduct.icon);
    } else {
      reset({
        productName: "",
        sku: "",
        supplier: "",
        quantity: 0,
        price: 0.0,
      });

      setSelectedTab("Published");
      setSelectedCategory("Others");
    }
  }, [selectedProduct, openProductDialog]);

  const onSubmit = async (data: ProductFormData) => {
    // console.log("Form Data:", data); // Log 2

    if (!selectedProduct) {
      const newProduct: Product = {
        id: nanoid(),
        supplier: data.supplier,
        name: data.productName,
        price: data.price,
        quantityInStock: data.quantity,
        sku: data.sku,
        status: selectedTab,
        category: selectedCategory,
        icon: selectedIcon,
        createdAt: new Date(),
      };

      const result = await addProduct(newProduct);

      if (result) {
        toast({
          title: "Success",
          description: "Product added successfully",
        });
        dialogCloseRef.current?.click();
      }
    } else {
      const productToUpdate: Product = {
        id: selectedProduct.id,
        createdAt: selectedProduct.createdAt,
        supplier: data.supplier,
        name: data.productName,
        price: data.price,
        quantityInStock: data.quantity,
        sku: data.sku,
        status: selectedTab,
        category: selectedCategory,
        icon: selectedIcon,
      };

      const result = await updateProduct(productToUpdate);

      if (result?.success) {
        toast({
          title: "Success",
          description: "Product updated successfully!",
        });
        dialogCloseRef.current?.click();
      } else {
        toast({
          title: "Error",
          description: "Something went wrong while updating the product.",
        });
      }
    }
  };

  function handleReset() {
    reset();
    setSelectedProduct(null);
  }

  function onSelectedIcon(icon: ReactNode) {
    // console.log(`Selected Icon: ${icon}`);

    // ensuring that the state update happens outside of the render cycle
    setTimeout(() => {
      setSelectedIcon(icon);
    }, 0);
  }
  return (
    <Dialog open={openProductDialog} onOpenChange={setOpenProductDialog}>
      <DialogTrigger asChild>
        <Button className="h-10">Add Product</Button>
      </DialogTrigger>
      <DialogContent className="p-7 px-8 poppins max-w-5xl w-full">
        <DialogHeader>
          <DialogTitle className="text-[22px]">
            {selectedProduct ? "Update Product" : "Add Product"}
          </DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new product
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {/* Form */}
        <FormProvider {...methods}>
          {/* {console.log("Current Form Values:", methods.watch())} Log 13 */}
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mt-1">
              {/* First Row */}
              <div className="grid grid-cols-2 gap-7">
                <ProductName onSelectedIcon={onSelectedIcon} />
                <SkuComponent />
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-2 gap-5 items-start mt-4">
                <SupplierComponent />
                <CategoryComponent
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>

              {/* Third Row */}
              <div className="mt-3 grid grid-cols-3 gap-7 lg:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
                <StatusComponent
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
                <QteComponent />
                <PriceComponent />
              </div>
            </div>
            <DialogFooter className="mt-9 mb-4 flex items-center gap-4">
              <DialogClose
                asChild
                ref={dialogCloseRef}
                onClick={() => {
                  handleReset();
                }}
              >
                <Button variant={"secondary"} className="h-11 px-11">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="h-11 px-11">
                {isLoading
                  ? "loading..."
                  : `${selectedProduct ? "Update Product" : "Add Product"}`}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
