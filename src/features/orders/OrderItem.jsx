import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useSearchParams } from "react-router-dom";

export function OrderItems({ orders }) {
	const [params, setParams] = useSearchParams();
	function handleSelectOrder(order_id) {
		params.set("order_id", order_id);
		setParams(params);
	}

	function styledDate(created_at) {
		if (!created_at) return "تاريخ غير معروف";

		const date = new Date(created_at);
		return new Intl.DateTimeFormat("ar-EG", {
			dateStyle: "medium",
			timeStyle: "short",
		}).format(date);
	}
	const badgeColorMap = {
		"تم إلغاء الطلب": "bg-red-500 hover:bg-red-600 text-white",
		"جاري التحضير": "bg-blue-500 hover:bg-blue-600 text-white",
		"جاري التوصيل": "bg-yellow-500 hover:bg-yellow-600 text-black",
		"تم التوصيل": "bg-green-500 hover:bg-green-600 text-white",
	};
	return (
		<Table dir="rtl">
			<TableHeader>
				<TableRow className="hover:bg-[var(--color-three)]">
					<TableHead className="text-center font-bold">الوقت</TableHead>
					<TableHead className="text-center font-bold">العميل</TableHead>
					<TableHead className="text-center font-bold">رقم الهاتف</TableHead>
					<TableHead className="text-center font-bold">العنوان</TableHead>
					<TableHead className="text-center font-bold">اسم المحل</TableHead>
					<TableHead className="text-center font-bold">ملاحظات</TableHead>
					<TableHead className="text-center font-bold">
						إجمالي الفاتورة
					</TableHead>
					<TableHead className="text-center font-bold">حالة الطلب</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders.map((order,index) => (
					<TableRow
						key={order.id}
						onClick={() => handleSelectOrder(order.id)}
						className={index % 2 === 0 ? "bg-[var(--color-three)]" : "bg-[var(--color-four)]"}
					>
						<TableCell className="font-medium text-center">
							{styledDate(order?.created_at)}
						</TableCell>
						<TableCell className="text-center">
							{order?.customer?.full_name}
						</TableCell>

						<TableCell className="text-center">
							{order?.customer?.phone}
						</TableCell>
						<TableCell className="text-center">
							{order?.customer?.address}
						</TableCell>
						<TableCell className="text-center">
							{order?.customer?.shop_name}
						</TableCell>
						<TableCell className="text-center">
							{order?.customer?.notes}
						</TableCell>
						<TableCell className="text-center">
							{order?.total_price} ج.م
						</TableCell>
						<TableCell className="text-center">
							<Badge
								variant="outline"
								className={`${badgeColorMap[order?.status] || "bg-gray-500 text-white"}`}
							>
								{order?.status}
							</Badge>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
