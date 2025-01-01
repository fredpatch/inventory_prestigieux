"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ProductTable } from "./product-table";
import { columns } from "./table/columns";
import { useProductStore } from "@/context/product-store";
import AddProductDialog from "./product-dialog/add-product-dialog";
import { StatsChart } from "./StatsChart";
import useUserStore from "@/context/user-store";
import { toast } from "@/hooks/use-toast";
import { MdCheckCircle, MdDangerous, MdWarning } from "react-icons/md";

const AppTable = () => {
  const {
    allProducts,
    loadProducts,
    totalProductsSold,
    totalMarginExpected,
    totalMargins,
    totalSellingPrice,
    totalSales,
  } = useProductStore();

  const { roles } = useUserStore();
  // console.log("ROLES ==>", roles);

  const fetchProducts = async () => {
    try {
      const response = await loadProducts();
      // console.log("RESPONSE ==>", response);
      if (response.success == false) {
        toast({
          title: "Error",
          description: `Failed to load products`,
        });
      } else {
        toast({
          title: "Success",
          description: `Products loaded successfully!`,
        });
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Check if the current user is an admin

  const chartData = {
    totalProductsSold: totalProductsSold(),
    totalMargins: totalMargins(),
    totalMarginExpected: totalMarginExpected().toFixed(2),
    totalSellingPrice: totalSellingPrice().toFixed(2),
    totalSales: totalSales().toFixed(2),
  };

  // Category number
  const categoryNumber = allProducts.flatMap((product) => product.category);

  return (
    <Card className="mt-5 flex flex-col shadow-none poppins border-none">
      <CardHeader className="flex justify-between p-2">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <CardTitle className="font-bold text-[32px]">
              {"Inventaire de produits"}
            </CardTitle>
            <p className="text-sm text-slate-600 dark:text-slate-200">
              {allProducts.length} produits
            </p>
          </div>
          <AddProductDialog />
          {/* <StatsChart data={chartData} /> */}
        </div>
      </CardHeader>

      <CardContent>
        <ProductTable data={allProducts} columns={columns(roles)} />
        <div className="flex gap-7">
          <span className="flex items-center gap-2">
            <MdCheckCircle size={15} className="text-green-600" />
            <p className="text-sm text-slate-400 dark:text-slate-200">
              Seuil critique respecte
            </p>
          </span>
          <span className="flex items-center gap-2">
            <MdWarning size={15} className="text-yellow-600" />
            <p className="text-sm text-slate-400 dark:text-slate-200">
              Seuil critique proche
            </p>
          </span>
          <span className="flex items-center gap-2">
            <MdDangerous size={15} className="text-red-600" />
            <p className="text-sm text-slate-400 dark:text-slate-200">
              Seuil critique depasser
            </p>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppTable;

// <p className="text-sm text-slate-600 dark:text-slate-200">
//   <span className="text-sm text-slate-600 dark:text-slate-200">
//     {`Total Margin Expected: $${totalMarginExpected().toFixed(2)}`}
//   </span>
// </p>
// <p className="text-sm text-slate-600 dark:text-slate-200">
//   <span className="text-sm text-slate-600 dark:text-slate-200">
//     {`Selling Price: $${totalSellingPrice().toFixed(2)}`}
//   </span>
// </p>
// <p className="text-sm text-slate-600 dark:text-slate-200">
//   <span className="text-sm text-slate-600 dark:text-slate-200">
//     {`Total Sales Price: $${totalSales().toFixed(2)}`}
//   </span>
// </p>
// <p className="text-sm text-slate-600 dark:text-slate-200">
//   <span className="text-sm text-slate-600 dark:text-slate-200">
//     {`${totalProductsSold()}`} products sold so far
//   </span>
// </p>

// <p className="text-sm text-slate-600 dark:text-slate-200">
//   <span className="text-sm text-slate-600 dark:text-slate-200">
//     {`Total Margin Sales: $${totalMargins().toFixed(2)}`}
//   </span>
// </p>
