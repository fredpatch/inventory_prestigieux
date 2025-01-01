import { useProductStore } from "@/context/product-store";
import { ProductFormData } from "./product-dialog";
import { useForm } from "react-hook-form";

interface Product {
  id: string;
  supplier: string;
  name: string;
  price: number;
  quantityInStock: number;
  createdAt: Date;
  sku: string;
  status: string;
  category: string;
  icon: string;
}

export const TestForm = () => {
  const { addProduct } = useProductStore();

  const methods = useForm<ProductFormData>();

  const onSubmit = (data: ProductFormData) => {
    console.log("Form Data Submitted:", data);
    addProduct({
      id: "test-id",
      ...data,
      createdAt: new Date(), // Add any missing fields
      status: "Published",
      category: "Others",
      icon: "icon",
      supplier: "Test Supplier",
      quantityInStock: 0,
      price: 0,
      sku: "test-sku",
      name: "Test Product",
    });
  };

  // const handleSubmit = () => {
  //   console.log("Submit triggered"); // Debug
  //   addProduct({
  //     id: "test",
  //     supplier: "test",
  //     name: "test",
  //     price: 0,
  //     quantityInStock: 0,
  //     createdAt: new Date(),
  //     sku: "test",
  //     status: "Published",
  //     category: "Others",
  //     icon: "icon",
  //   });
  // };

  console.log("Rendered");
  console.log("addProduct:", addProduct);

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <button type="submit">Submit</button>
    </form>
  );
};
