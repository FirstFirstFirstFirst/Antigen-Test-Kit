import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
  Download,
  ChevronDown,
  FileSpreadsheet,
  FileMinus,
} from "lucide-react";
import { Button } from "./ui/button";

interface ExportDropdownProps {
  isExporting: boolean;
  handleExport: (format: string) => void;
}

export const ExportDropdown = ({
  isExporting,
  handleExport,
}: ExportDropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        size="sm"
        className="h-9"
        disabled={isExporting}
      >
        <Download className="h-4 w-4 mr-2" />
        {isExporting ? "Exporting..." : "Export"}
        <ChevronDown className="h-4 w-4 ml-1" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => handleExport("XLSX")}>
        <FileSpreadsheet className="h-4 w-4 mr-2" />
        Export as Excel
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => handleExport("PDF")}>
        <FileMinus className="h-4 w-4 mr-2" />
        Export as PDF
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
