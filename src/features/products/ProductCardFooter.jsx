import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, updateProductAvailability } from "./productsApis";
import { toast } from "react-toastify";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
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
import {  useRef, useState } from "react";
import { fetchCategories } from "../categories/categoriesApis";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
// Ensure Spinner is imported or defined
const Spinner = () => (
	<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
);

function ProductCardFooter({ product }) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const formRef = useRef();
	const [isFormOpen, setIsFormOpen] = useState(false);

	const availabilityMutation = useMutation({
		mutationFn: (newStatus) => updateProductAvailability(product.id, newStatus),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			toast.success("تم تحديث حالة المنتج بنجاح");
		},
		onError: () => {
			toast.error("حدثت مشكلة اثناء التحديث");
		},
	});

	const deleteMutation = useMutation({
		mutationFn: () => deleteProduct(product.id, product.image_url),
		onSuccess: () => {
			toast.success("تم حذف المنتج بنجاح");
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (error) => {
			toast.error(`حدث خطأ: ${error.message}`);
		},
	});

	const {
		data: categories,
		isPending: isCategoriesPending,
		isError,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories,
	});

	const handleAvailabilityToggle = (checked) => {
		availabilityMutation.mutate(checked);
	};



	if (isCategoriesPending) {
		return (
			<div className="w-full flex items-center justify-center p-4">
				<Spinner />
			</div>
		);
	}

	if (isError) {
		navigate("/error");
		return null;
	}

	return (
		<CardFooter className="flex flex-wrap items-center justify-start gap-1">
			<Field
				orientation="horizontal"
				className="bg-[var(--color-three)] p-3 rounded-xl flex items-center gap-3 w-full"
			>
				<Checkbox
					id={`available-${product.id}`}
					checked={product.available}
					onCheckedChange={handleAvailabilityToggle}
					disabled={availabilityMutation.isPending}
				/>
				<FieldLabel
					htmlFor={`available-${product.id}`}
					className="text-lg cursor-pointer"
				>
					هل المنتج متوفر
				</FieldLabel>
			</Field>

			<div className="flex items-center justify-between w-full mt-2">
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							variant="outline"
							size="lg"
							className="bg-red-500 text-white text-lg font-bold flex gap-2"
							disabled={deleteMutation.isPending}
						>
							<Trash size={18} />
							{deleteMutation.isPending ? "جاري الحذف..." : "حذف"}
						</Button>
					</AlertDialogTrigger>

					<AlertDialogContent dir="rtl" className="text-right">
						<AlertDialogHeader>
							<AlertDialogTitle>هل أنت متأكد من حذف المنتج؟</AlertDialogTitle>
							<AlertDialogDescription>
								سيتم حذف المنتج "{product.name}" نهائياً.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter className="flex-row-reverse gap-2">
							<AlertDialogCancel className="mt-0">إلغاء</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => deleteMutation.mutate()}
								className="bg-red-600 hover:bg-red-700 text-white"
							>
								تأكيد الحذف
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>

				<Button
					variant="outline"
					size="lg"
					className="bg-[var(--color-one)] text-white text-lg font-bold flex gap-2"
					onClick={() => setIsFormOpen(true)}
				>
					تعديل
					<Pencil size={18} />
				</Button>
			</div>

			{isFormOpen && (
				<div
					onClick={() => setIsFormOpen(false)}
					className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
				>
					<div
						ref={formRef}
						onClick={(e) => e.stopPropagation()}
						className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden"
					>
						<ProductForm
							setIsFormOpen={setIsFormOpen}
							categories={categories}
							cardTitle="تعديل المنتج"
							buttonTitle="تحديث المنتج"
							productInfo={product}
						/>
					</div>
				</div>
			)}
		</CardFooter>
	);
}

export default ProductCardFooter;
