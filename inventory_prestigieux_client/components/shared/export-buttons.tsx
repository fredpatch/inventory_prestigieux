import { Button } from "../ui/button";
import { IconDownload } from "@tabler/icons-react";

type ExportButtonsProps = {
  onExportCSV: () => void;
  onExportPDF?: () => void;
};

export const ExportButtons: React.FC<ExportButtonsProps> = ({
  onExportCSV,
}) => {
  return (
    <div className="space-x-4 poppins">
      <Button
        variant="ghost"
        className="bg-secondary h-11"
        onClick={onExportCSV}
      >
        <IconDownload className="" />
        CSV
      </Button>
    </div>
  );
};
