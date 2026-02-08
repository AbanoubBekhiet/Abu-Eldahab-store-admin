import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "./ordersApis";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export function UpdateOrderStatus({ order_id, currentStatus }) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: ({ id, status }) => updateOrderStatus(id, status),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
			toast.success("تم تحديث حالة الطلب بنجاح");
		},
		onError: (error) => {
			toast.error(`خطأ: ${error.message}`);
		},
	});

	return (
		<div className="p-4 flex items-center justify-between border-t gap-4">
			<h3 className="text-sm font-medium">تحديث حالة الطلب:</h3>

			<Select
				defaultValue={currentStatus}
				onValueChange={(value) =>
					mutation.mutate({ id: order_id, status: value })
				}
				disabled={mutation.isPending}
			>
				<SelectTrigger className="w-full max-w-48">
					{mutation.isPending ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<SelectValue placeholder="اختر الحالة" />
					)}
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>الحالات المتاحة</SelectLabel>
						<SelectItem value="جاري التحضير">جاري التحضير</SelectItem>
						<SelectItem value="جاري التوصيل">جاري التوصيل</SelectItem>
						<SelectItem value="تم التوصيل">تم التوصيل</SelectItem>
						<SelectItem value="تم إلغاء الطلب">تم إلغاء الطلب</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
