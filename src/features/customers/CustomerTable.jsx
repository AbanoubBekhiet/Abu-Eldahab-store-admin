import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function CustomerTable({ customers }) {
	function styledDate(created_at) {
		if (!created_at) return "تاريخ غير معروف";

		const date = new Date(created_at);
		return new Intl.DateTimeFormat("ar-EG", {
			dateStyle: "medium",
			timeStyle: "short",
		}).format(date);
	}
	return (
		<Table dir="rtl">
			<TableHeader>
				<TableRow className="hover:bg-[var(--color-three)]">
					<TableHead className="text-center font-bold">انضم منذ</TableHead>
					<TableHead className="text-center font-bold">العميل</TableHead>
					<TableHead className="text-center font-bold">رقم الهاتف</TableHead>
					<TableHead className="text-center font-bold">العنوان</TableHead>
					<TableHead className="text-center font-bold">اسم المحل</TableHead>
					<TableHead className="text-center font-bold">ملاحظات</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{customers.profiles.map((customer, index) => (
					<TableRow
						key={customer.id}
						className={
							index % 2 === 0
								? "bg-[var(--color-three)]"
								: "bg-[var(--color-four)]"
						}
					>
						<TableCell className="font-medium text-center">
							{styledDate(customer?.created_at)}
						</TableCell>
						<TableCell className="text-center">
							{customer?.full_name ?? "_"}
						</TableCell>
						<TableCell className="text-center">
							{customer?.phone ?? "_"}
						</TableCell>
						<TableCell className="text-center">
							{customer?.address ?? "_"}
						</TableCell>
						<TableCell className="text-center">
							{customer?.shop_name ?? "_"}
						</TableCell>
						<TableCell className="text-center">
							{customer?.notes ?? "_"}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
