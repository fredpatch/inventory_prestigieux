import { saveAs } from "file-saver";
import Papa from "papaparse";

export function exportToCSV(data: any[], filename: string = "table-data.csv") {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
}