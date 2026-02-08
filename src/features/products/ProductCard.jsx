import default_image from "@/assets/default_image.webp";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ProductCardFooter from "./ProductCardFooter";
const image_path =
	"https://vyojzehexdatndltudup.supabase.co/storage/v1/object/public/products_images";

export default function ProductCard({ product }) {
	return (
		<Card className="relative  w-full max-w-sm pt-0 overflow-hidden bg-[var(--color-four)] border border-[var(--color-one)] flex flex-col z-0">
			<div className="relative w-full m-h-60 inset-0 z-30 aspect-video">
				<img
					src={
						product?.image_url
							? `${image_path}/${product.image_url.trim()}?t=${new Date(product.updated_at).getTime()}`
							: default_image
					}
					alt={product?.name ?? "Product image"}
					className="z-20 aspect-video w-full object-cover brightness-80  "
				/>
			</div>
			<CardHeader className="flex-1">
				<CardTitle className="text-[var(--color-one)] text-xl  min-h-16 sm:text-2xl">
					{product?.name}
				</CardTitle>
				<CardDescription className="text-[var(--color-one)]">
					<div>
						<span className="text-2xl font-extrabold">
							{product?.price_of_packet} ج.م
						</span>
						<span>
							/
							{!product?.number_of_pieces_in_packet ||
							product?.number_of_pieces_in_packet === 0
								? "1"
								: product?.number_of_pieces_in_packet}{" "}
							قطعة{" "}
						</span>
					</div>
				</CardDescription>
			</CardHeader>
			<ProductCardFooter product={product} />
		</Card>
	);
}
