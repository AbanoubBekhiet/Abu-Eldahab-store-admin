import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const PAGE_LIMIT = 15;

function Pagination({ itemsLength }) {
	const [params, setParams] = useSearchParams();
	const currentPage = parseInt(params.get("page")) || 1;

	function handleNextPage() {
		if (itemsLength < PAGE_LIMIT) return;
		setParams((prev) => {
			const newPage = Number(prev.get("page")) + 1;
			prev.set("page", newPage);
			return prev;
		});
	}

	function handlePrevPage() {
		if (currentPage <= 1) return;
		setParams((prev) => {
			const newPage = Number(prev.get("page")) - 1;
			prev.set("page", newPage);
			return prev;
		});
	}

	return (
		<div className="flex items-center justify-center gap-8 mt-8" dir="rtl">
			<button
				className="p-3 bg-[var(--color-one)] text-white rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
				disabled={currentPage <= 1}
				onClick={handlePrevPage}
			>
				<ChevronRight size={24} />
			</button>

			<span className="text-lg font-bold text-[var(--color-one)]">
				صفحة {currentPage}
			</span>

			<button
				className="p-3 bg-[var(--color-one)] text-white rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
				disabled={itemsLength < PAGE_LIMIT}
				onClick={handleNextPage}
			>
				<ChevronLeft size={24} />
			</button>
		</div>
	);
}

export default Pagination;
