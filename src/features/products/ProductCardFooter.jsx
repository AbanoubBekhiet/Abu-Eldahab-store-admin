import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { useEffect, useRef, useState } from "react";
import { fetchCategories } from "../categories/categoriesApis";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";

function ProductCardFooter({ product }) {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const formRef = useRef();
	const navigate = useNavigate();
	const {
		data: categories,
		isPending: isCategoriesPending,
		isError,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories,
	});

	useEffect(() => {
		const productForm = document.querySelector("#productForm");
		const handleOutsideClick = (e) => {
			if (
				formRef.current &&
				!productForm.contains(e.target) &&
				formRef.current.contains(e.target)
			) {
				setIsFormOpen(false);
			}
		};

		if (isFormOpen) {
			document.addEventListener("mousedown", handleOutsideClick);
		}

		return () => document.removeEventListener("mousedown", handleOutsideClick);
	}, [isFormOpen]);
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

	if (isCategoriesPending) {
		return (
			<div className="w-full h-[59vh] flex items-center justify-center">
				<Spinner />
			</div>
		);
	}

	if (isError) {
		navigate("/error");
		return null;
	}

	return (
		<CardFooter className="flex flex-wrap items-center justify-start  gap-1">
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
			<Button
				variant="outline"
				size="lg"
				className="bg-[var(--color-one)] text-[var(--color-four)] text-1.5xl font-bold flex gap-2"
				onClick={(e) => {
					setIsFormOpen(true);
					e.stopPropagation();
				}}
			>
				تعديل
				<Pencil />
			</Button>
			{isFormOpen && (
				<div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
					<div ref={formRef} className="bg-white p-6 rounded-lg shadow-xl z-50">
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
