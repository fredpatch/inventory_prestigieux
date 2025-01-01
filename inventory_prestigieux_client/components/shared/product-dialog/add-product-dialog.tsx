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

import { ProductName } from "./_components/ProductNameComponent";
import { QteComponent } from "./_components/QteComponent";
import { PVUComponent } from "./_components/PVUComponent";
import { CriticalQteComponent } from "./_components/CriticalQteComponent";
import { PAComponent } from "./_components/PAComponent";
import { MargeComponent } from "./_components/MargeComponent";
import { QteSoldComponent } from "./_components/QteSoldComponent";
import { useAuthStore } from "@/context/auth-store";

const ProductSchema = z.object({
  productName: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name must be less than 100 characters"),

  quantity: z
    .number()
    .int("Quantity must be an integer")
    .nonnegative("Quantity must be non-negative"),

  qteSold: z
    .number()
    .int("Quantity must be an integer")
    .nonnegative("Quantity must be non-negative"),

  sellingPrice: z
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

  purchasePrice: z
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

  criticalQuantity: z
    .number()
    .int("Critical Quantity must be an integer")
    .nonnegative("Critical Quantity must be non-negative"),
});

export type ProductFormData = z.infer<typeof ProductSchema>;

const AddProductDialog = () => {
  const methods = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productName: "",
      quantity: 0,
      sellingPrice: 0.0,
      purchasePrice: 0.0,
      criticalQuantity: 0,
      qteSold: 0,
    },
  });

  const { reset } = methods;
  const { user } = useAuthStore();
  const access_token = user?.access_token;

  const [selectedCategory, setSelectedCategory] =
    useState<Product["category"]>("BOISSON_CHAUDE");

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
        quantity: selectedProduct.quantityInStock,
        sellingPrice: selectedProduct.sellingPrice,
        purchasePrice: selectedProduct.purchasePrice,
        criticalQuantity: selectedProduct.criticalStockLevel,
        qteSold: selectedProduct.quantitySold,
      });
      setSelectedCategory(selectedProduct.category);
      setSelectedIcon(selectedProduct.icon);
    } else {
      reset({
        productName: "",
        quantity: 0,
        sellingPrice: 0.0,
        purchasePrice: 0.0,
        criticalQuantity: 0,
        qteSold: 0,
      });

      //   setSelectedTab("Published");
      setSelectedCategory("BOISSON_CHAUDE");
    }
  }, [selectedProduct, openProductDialog]);

  const onSubmit = async (data: ProductFormData) => {
    // console.log("Form Data:", data); // Log 2

    // getting the margin
    const margin = data.sellingPrice - data.purchasePrice;

    if (!selectedProduct) {
      const newProduct: Product = {
        id: nanoid(),
        name: data.productName,
        sellingPrice: data.sellingPrice,
        purchasePrice: data.purchasePrice,
        criticalStockLevel: data.criticalQuantity,
        quantityInStock: data.quantity,
        category: selectedCategory,
        icon: selectedIcon,
        createdAt: new Date(),
        updatedAt: new Date(),
        quantitySold: data.qteSold,
        totalSoldPerUnit: 0,
        margin: margin,
        totalMarginPerUnit: 0,
      };

      const result = await addProduct(newProduct, access_token!);

      if (result) {
        toast({
          title: "Success",
          description: `The Product ${newProduct.name} has been added successfully`,
        });
        dialogCloseRef.current?.click();
      }
    } else {
      const productToUpdate: Product = {
        id: selectedProduct.id,
        createdAt: selectedProduct.createdAt,
        name: data.productName,
        sellingPrice: data.sellingPrice,
        quantityInStock: data.quantity,
        purchasePrice: data.purchasePrice,
        criticalStockLevel: data.criticalQuantity,
        quantitySold: data.qteSold,
        margin: margin,
        totalSoldPerUnit: selectedProduct.totalSoldPerUnit,
        totalMarginPerUnit: selectedProduct.totalMarginPerUnit,
        updatedAt: selectedProduct.updatedAt,

        category: selectedCategory,
        icon: selectedIcon,
      };

      const result = await updateProduct(productToUpdate, access_token!);

      if (result?.success) {
        toast({
          title: "Success",
          description: `The Product [${selectedProduct.name}] has been updated successfully`,
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
                <PAComponent />
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-3 gap-5 items-start mt-4">
                <MargeComponent />
                <CategoryComponent
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />

                <QteSoldComponent disabled={!selectedProduct} />
              </div>

              {/* Third Row */}
              <div className="mt-3 grid grid-cols-3 gap-7 lg:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
                <CriticalQteComponent />
                <QteComponent />
                <PVUComponent />
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

export default AddProductDialog;
