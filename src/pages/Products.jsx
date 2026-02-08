import { Button } from "@/components/ui/button";
import { fetchCategories } from "@/features/categories/categoriesApis";
import ProductForm from "@/features/products/ProductForm";
import { fetchProducts } from "@/features/products/productsApis";
import { ProductsFilter } from "@/features/products/ProductsFilter";
import ProductsList from "@/features/products/ProductsList";
import Pagination from "@/ui/Pagination";
import Spinner from "@/ui/Spinner";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Products() {
	const [params] = useSearchParams();
	const [isFormOpen, setIsFormOpen] = useState(false);
	const formRef = useRef();

	// useEffect(() => {
	// 	const handleOutsideClick = (e) => {
	// 		console.log(e.currentTarget);
	// 		if (
	// 			formRef.current &&
	// 			!formRef.current.contains(e.target)
	// 		) {
	// 			setIsFormOpen(false);
	// 		}
	// 	};

	// 	if (isFormOpen) {
	// 		document.addEventListener("mousedown", handleOutsideClick);
	// 	}

	// 	return () => document.removeEventListener("mousedown", handleOutsideClick);
	// }, [isFormOpen]);

	const navigate = useNavigate();

	const page = params.get("page") || 1;
	const filter = params.get("filter");
	const search = params.get("search");

	const {
		isPending: isProductsPending,
		isError,
		data: products,
	} = useQuery({
		queryKey: ["products", page, filter, search],
		queryFn: () => fetchProducts({ page, filter, search }),
		placeholderData: keepPreviousData,
	});

	const { data: categories, isPending: isCategoriesPending } = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories,
	});

	if (isProductsPending || isCategoriesPending) {
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
		<main className="p-6 w-full">
			<div className="w-full bg-[var(--color-three)] p-3 rounded-md ">
				<Button
					className="mb-4 m-auto"
					onClick={(e) => {
						setIsFormOpen(true);
						e.stopPropagation();
					}}
				>
					إضافة منتج
				</Button>
			</div>
			<ProductsFilter categories={categories} />
			<ProductsList products={products} />
			<Pagination itemsLength={products?.length || 0} />
			{isFormOpen && (
				<div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
					<div ref={formRef} className="bg-white p-6 rounded-lg shadow-xl z-50">
						<ProductForm
							setIsFormOpen={setIsFormOpen}
							categories={categories}
							cardTitle="إضافة منتج جديد"
							buttonTitle="إضافة المنتج"
						/>
					</div>
				</div>
			)}
		</main>
	);
}
export default Products;
