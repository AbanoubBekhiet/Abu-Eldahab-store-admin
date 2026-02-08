import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "./productsApis";
import { toast } from "react-toastify";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function ProductCardFooter({ product }) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => deleteProduct(product.id, product.image_url),
		onSuccess: () => {
			toast.success("تم حذف المنتج بنجاح");
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (error) => {
			toast.error(`حدث خطأ: ${error.message}`);
		},
	});

	return (
		<CardFooter>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						variant="outline"
						size="lg"
						className="bg-[var(--color-one)] text-[var(--color-four)] text-1.5xl font-bold flex gap-2"
						disabled={mutation.isPending}
					>
						<Trash size={18} />
						{mutation.isPending ? "جاري الحذف..." : "حذف"}
					</Button>
				</AlertDialogTrigger>

				<AlertDialogContent dir="rtl" className="text-right">
					<AlertDialogHeader>
						<AlertDialogTitle>هل أنت متأكد من حذف المنتج؟</AlertDialogTitle>
						<AlertDialogDescription>
							سيتم حذف المنتج "{product.name}" نهائياً. هذا الإجراء لا يمكن
							التراجع عنه.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="flex-row-reverse gap-2">
						<AlertDialogCancel className="mt-0">إلغاء</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => mutation.mutate()}
							className="bg-red-600 hover:bg-red-700 text-white"
						>
							تأكيد الحذف
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</CardFooter>
	);
}

export default ProductCardFooter;
