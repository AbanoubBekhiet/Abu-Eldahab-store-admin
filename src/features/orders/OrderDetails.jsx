import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useSearchParams } from "react-router-dom";
import { UpdateOrderStatus } from "./UpdateOrderStatus";

export default function OrderDetails({ orders }) {
	const [params] = useSearchParams();
	const order_id = params.get("order_id");
	const selectedOrder = orders?.find((order) => order.id == order_id);

	if (!order_id || !selectedOrder) {
		return (
			<div className="flex items-center justify-center h-[10vh] bg-[var(--color-three)] rounded-xl text-xl">
				<p>اضغط علي اي طلب لعرض تفاصيله هنا</p>
			</div>
		);
	}

	const calculateRowTotal = (item) => {
		const packets =
			parseFloat(item.number_of_packets || 0) *
			parseFloat(item.packet_price || 0);
		const pieces =
			parseFloat(item.number_of_pieces || 0) *
			parseFloat(item.piece_price || 0);
		return packets + pieces;
	};

	return (
		<div>
			<Table dir="rtl">
				<TableHeader>
					<TableRow>
						<TableHead className="text-center">المنتج</TableHead>
						<TableHead className="text-center">عدد الوحدات</TableHead>
						<TableHead className="text-center">سعر الوحدة</TableHead>
						<TableHead className="text-center">عدد القطع</TableHead>
						<TableHead className="text-center">سعر القطعة</TableHead>
						<TableHead className="text-center">إجمالي سعر المنتج</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{selectedOrder.customer_product.map((item) => (
						<TableRow key={item.product_id}>
							<TableCell className="font-medium text-center">
								{item?.products?.name} (
								{item?.products?.number_of_pieces_in_packet} ق)
							</TableCell>
							<TableCell className="text-center">
								{item?.number_of_packets} وحدة
							</TableCell>
							<TableCell className="text-center">
								{item?.packet_price} ج.م
							</TableCell>
							<TableCell className="text-center">
								{item?.number_of_pieces} ق
							</TableCell>
							<TableCell className="text-center">
								{item?.piece_price || 0} ج.م
							</TableCell>
							<TableCell className="text-center font-bold">
								{calculateRowTotal(item)} ج.م
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow className="bg-muted/50">
						<TableCell colSpan={5} className="font-bold">
							الإجمالي النهائي للطلب
						</TableCell>
						<TableCell className="text-center font-bold text-lg">
							{selectedOrder?.total_price} ج.م
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
			<UpdateOrderStatus order_id={order_id} />
		</div>
	);
}
