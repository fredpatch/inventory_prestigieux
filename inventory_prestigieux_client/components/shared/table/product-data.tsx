"use client";

import { nanoid } from "nanoid";

import {
  MdInventory,
  MdBuild,
  MdPhoneIphone,
  MdLaptop,
  MdKitchen,
  MdHome,
  MdChair,
  MdLightbulbCircle,
  MdOutlineDoorSliding,
} from "react-icons/md";
import { FaBed, FaHeadphones, FaTv } from "react-icons/fa";
import { IoTabletPortrait } from "react-icons/io5";
import { GiSofa } from "react-icons/gi";
import { Product } from "./columns";

export const products: Product[] = [
  {
    id: nanoid(),
    name: "Orangina 50cl", // designation
    quantitySold: 0,
    //
    purchasePrice: 480,
    //
    sellingPrice: 600,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Others",
    quantityInStock: 50,
    criticalStockLevel: 20,
    //
    icon: <MdBuild />,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Djino 50cl",
    quantitySold: 9,
    //
    purchasePrice: 375,
    //
    sellingPrice: 500,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Others",
    quantityInStock: 30,
    criticalStockLevel: 20,
    //
    icon: <MdInventory />,
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Akewa 50cl",
    quantitySold: 0,
    //
    purchasePrice: 320,
    //
    sellingPrice: 400,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Electronics",
    quantityInStock: 100,
    criticalStockLevel: 20,
    //
    icon: <MdPhoneIphone />,
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Andza 1.5L",
    quantitySold: 2,
    //
    purchasePrice: 450,
    //
    sellingPrice: 600,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Electronics",
    quantityInStock: 25,
    criticalStockLevel: 20,
    //
    icon: <MdLaptop />,
    createdAt: new Date("2023-04-20"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Microwave Oven",
    quantitySold: 10,
    //
    purchasePrice: 5.99,
    //
    sellingPrice: 9.99,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Furniture",
    quantityInStock: 15,
    criticalStockLevel: 20,
    //
    icon: <MdKitchen />,
    createdAt: new Date("2023-05-18"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Washing Machine",
    quantitySold: 10,
    //
    purchasePrice: 5.99,
    //
    sellingPrice: 9.99,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Home Decor",
    quantityInStock: 10,
    criticalStockLevel: 20,
    //
    icon: <MdHome />,
    createdAt: new Date("2023-06-22"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Refrigerator",
    quantitySold: 10,
    //
    purchasePrice: 5.99,
    //
    sellingPrice: 9.99,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Home Appliances",
    quantityInStock: 8,
    criticalStockLevel: 20,
    //
    icon: <MdKitchen />,
    createdAt: new Date("2023-07-10"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Tablet",
    quantitySold: 10,
    //
    purchasePrice: 5.99,
    //
    sellingPrice: 9.99,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Electronics",
    quantityInStock: 60,
    criticalStockLevel: 20,
    //
    icon: <MdLaptop />,
    createdAt: new Date("2023-08-15"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Headphones",
    quantitySold: 10,
    //
    purchasePrice: 5.99,
    //
    sellingPrice: 9.99,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Electronics",
    quantityInStock: 40,
    criticalStockLevel: 20,
    //
    icon: <FaHeadphones />,
    createdAt: new Date("2023-09-01"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Office Chair",
    quantitySold: 10,
    //
    purchasePrice: 5.99,
    //
    sellingPrice: 9.99,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Furniture",
    quantityInStock: 20,
    criticalStockLevel: 20,
    //
    icon: <MdChair />,
    createdAt: new Date("2023-10-12"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Desk Lamp",
    quantitySold: 10,
    //
    purchasePrice: 5.99,
    //
    sellingPrice: 9.99,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Electronics",
    quantityInStock: 30,
    criticalStockLevel: 20,
    //
    icon: <MdLightbulbCircle />,
    createdAt: new Date("2023-11-05"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Gaming Mouse",
    quantitySold: 10,
    //
    purchasePrice: 5.99,
    //
    sellingPrice: 9.99,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Electronics",
    quantityInStock: 55,
    criticalStockLevel: 20,
    //
    icon: <MdHome />,
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Electric Kettle",
    quantitySold: 10,
    //
    purchasePrice: 5.99,
    //
    sellingPrice: 9.99,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Home Appliances",
    quantityInStock: 25,
    criticalStockLevel: 20,
    //
    icon: <MdKitchen />,
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Outdoor Grill",
    quantitySold: 10,
    //
    purchasePrice: 5.99,
    //
    sellingPrice: 9.99,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Furniture",
    quantityInStock: 15,
    criticalStockLevel: 20,
    //
    icon: <MdOutlineDoorSliding />,
    createdAt: new Date("2024-02-14"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Cordless Drill",
    quantitySold: 10,
    //
    purchasePrice: 5.99,
    //
    sellingPrice: 9.99,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Others",
    quantityInStock: 35,
    criticalStockLevel: 20,
    //
    icon: <MdBuild />,
    createdAt: new Date("2024-03-22"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Smart TV",
    quantitySold: 10,
    //
    purchasePrice: 5.99,
    //
    sellingPrice: 9.99,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Electronics",
    quantityInStock: 22,
    criticalStockLevel: 20,
    //
    icon: <FaTv />,
    createdAt: new Date("2024-04-30"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Dining Table",
    quantitySold: 10,
    //
    purchasePrice: 5.99,
    //
    sellingPrice: 9.99,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Furniture",
    quantityInStock: 8,
    criticalStockLevel: 20,
    //
    icon: <IoTabletPortrait />,
    createdAt: new Date("2024-05-18"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Wireless Earbuds",
    quantitySold: 10,
    //
    purchasePrice: 5.99,
    //
    sellingPrice: 9.99,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Electronics",
    quantityInStock: 45,
    criticalStockLevel: 20,
    //
    icon: <FaHeadphones />,
    createdAt: new Date("2024-06-25"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Wall Decor",
    quantitySold: 10,
    //
    purchasePrice: 5.99,
    //
    sellingPrice: 9.99,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Home Decor",
    quantityInStock: 18,
    criticalStockLevel: 20,
    //
    icon: <GiSofa />,
    createdAt: new Date("2024-07-03"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: nanoid(),
    name: "Outdoor Furniture Set",
    quantitySold: 10,
    //
    purchasePrice: 5.99,
    //
    sellingPrice: 9.99,
    //
    totalSoldPerUnit: 10,
    //
    margin: 4,
    totalMarginPerUnit: 4,

    // additional info
    category: "Furniture",
    quantityInStock: 12,
    criticalStockLevel: 20,
    //
    icon: <FaBed />,
    createdAt: new Date("2024-08-11"),
    updatedAt: new Date("2023-01-15"),
  },
];
