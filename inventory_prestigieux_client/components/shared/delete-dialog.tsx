import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useProductStore } from "@/context/product-store";
import { useToast } from "@/hooks/use-toast";

export const DeleteDialog = () => {
  const { toast } = useToast();
  const {
    isLoading,
    openDialog,
    setOpenDialog,
    setSelectedProduct,
    selectedProduct,
    deleteProduct,
  } = useProductStore();

  const deleteProductFn = async () => {
    if (selectedProduct) {
      const result = await deleteProduct(selectedProduct.id);
      if (result.success) {
        toast({
          title: "Product Deleted",
          description: `The Product [${selectedProduct.name}] has been deleted successfully`,
        });

        setOpenDialog(false);
        setSelectedProduct(null);
      } else {
        toast({
          title: "Error",
          description: "Failed to delete the product.",
        });
      }
    }
  };
  return (
    <AlertDialog
      open={openDialog}
      onOpenChange={(open) => {
        setOpenDialog(open);
      }}
    >
      <AlertDialogContent className="p-8">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2">
            This action cannot be undone. This will permanently delete the item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-8">
          <AlertDialogCancel
            onClick={() => {
              setSelectedProduct(null);
              setOpenDialog(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={deleteProductFn}>
            {isLoading ? "deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
