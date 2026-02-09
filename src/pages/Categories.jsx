import { Button } from "@/components/ui/button";
import { fetchCategories } from "@/features/categories/categoriesApis";
import CategoriesForm from "@/features/categories/CategoriesForm";
import { CategoryCard } from "@/features/categories/CategoryCard";
import Spinner from "@/ui/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Categories() {
	const navigate = useNavigate();
	const [isFormOpen, setIsFormOpen] = useState(false);
	const {
		data: categories,
		isPending,
		isError,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories,
	});

	if (isPending) {
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
		<main className="flex flex-col items-center">
			<div className="flex items-start bg-[var(--color-three)] w-full p-4">
				<Button
					variant="outline"
					size="lg"
					className="text-md"
					onClick={() => setIsFormOpen(true)}
				>
					إضافة تصنيف
				</Button>
			</div>
			<h2 className="text-2xl my-4 text-[var(--color-one)] ">تصنيف المتاحة</h2>
			<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 p-4">
				{categories.map((category) => (
					<div className="grid-cols-1 ">
						<CategoryCard category={category} key={category.id} />
					</div>
				))}
			</div>
			{isFormOpen && <CategoriesForm setIsFormOpen={setIsFormOpen} />}
		</main>
	);
}

export default Categories;
