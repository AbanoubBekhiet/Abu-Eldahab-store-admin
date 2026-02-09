import ProductCard from "./ProductCard";
import EmptyComponent from "../../ui/EmptyComponent";

function ProductsList({ products }) {
	if (!products || products.length === 0) {
		return (
			<div className="flex items-center justify-center ">
				<EmptyComponent />
			</div>
		);
	}
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-5 gap-4">
			{products.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</div>
	);
}

export default ProductsList;
