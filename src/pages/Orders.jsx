import OrderDetails from "@/features/orders/OrderDetails";
import { OrderItems } from "@/features/orders/OrderItem";
import { getOrders } from "@/features/orders/ordersApis";
import Pagination from "@/ui/Pagination";
import Spinner from "@/ui/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

function Orders() {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const currentPage = parseInt(params.get("page")) || 1;
	const {
		data: orders,
		isPending,
		isError,
	} = useQuery({
		queryKey: ["orders", currentPage],
		queryFn: () => getOrders({ page: currentPage }),
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
		<div className="lg:grid lg:grid-cols-5 gap-4  w-full text-[var(--color-one)]">
			<section className=" col-start-1 col-end-4 p-5 rounded-xl flex flex-col items-center">
				<h3 className="text-2xl font-bold mb-5">الطلبات </h3>
				<OrderItems orders={orders} />
				<Pagination itemsLength={orders.length} />
			</section>
			<section className=" col-start-4 col-end-6 p-5 rounded-xl bg-[var(--color-four)]">
				<h3 className="text-2xl font-bold mb-5">تفاصيل الطلب</h3>
				<OrderDetails orders={orders} />
			</section>
		</div>
	);
}

export default Orders;
