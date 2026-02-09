export function CategoryCard({ category }) {
	return (
		<div className="bg-[var(--color-three)] text-[var(--color-one)] p-8 rounded-2xl text-2xl min-w-48 min-h-48 flex items-center justify-center ">
			{category?.name}
		</div>
	);
}
