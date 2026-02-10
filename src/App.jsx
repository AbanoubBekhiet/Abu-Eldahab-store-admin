import { useNavigate } from "react-router-dom";
import CardOfStatistics from "./features/statistics/CardOfStatistics";
import ChartOfOrders from "./features/statistics/ChartOfOrders";
import { useQuery } from "@tanstack/react-query";
import {
	numberOfOrdersInlastThreeMonths,
	numberOfPendingOrders,
	numberOfReachedOrders,
	numberOfRegistredCustomers,
} from "./features/statistics/statisticsApis";
import Spinner from "./ui/Spinner";

function App() {
	const navigate = useNavigate();
	const {
		data: ordersForChart,
		isPending: isChartPending,
		isError: isChartError,
	} = useQuery({
		queryKey: ["ordersPerMonthes"],
		queryFn: numberOfOrdersInlastThreeMonths,
	});

	const {
		data: numberOfRegisterdCustomers,
		isPending: isCustomersPending,
		isError: isCustomerError,
	} = useQuery({
		queryKey: ["numberOfRegisteredCustomers"],
		queryFn: numberOfRegistredCustomers,
	});

	const {
		data: numberOfReachedOrdersData,
		isPending: isNumberOfOrdersPending,
		isError: isNubmerOfOrdersError,
	} = useQuery({
		queryKey: ["numberOfReachedOrders"],
		queryFn: numberOfReachedOrders,
	});
	const {
		data: numberOfPendingOrdersData,
		isPending: isNumberOfPendingOrdersPending,
		isError: isNubmerOfPendingOrdersError,
	} = useQuery({
		queryKey: ["numberOfPendingOrders"],
		queryFn: numberOfPendingOrders,
	});

	if (
		isChartPending ||
		isNumberOfOrdersPending ||
		isCustomersPending ||
		isNumberOfPendingOrdersPending
	) {
		return (
			<div className="w-full h-[59vh] flex items-center justify-center">
				<Spinner />
			</div>
		);
	}

	if (
		isChartError ||
		isNubmerOfOrdersError ||
		isCustomerError ||
		isNubmerOfPendingOrdersError
	) {
		navigate("/error");
		return null;
	}

	return (
		<main className="flex flex-col  sm:grid sm:grid-cols-6 w-full min-h-[45vh] p-4 ">
			<section className="col-start-1 col-end-5 flex flex-col items-center ">
				<h2 className="text-[var(--color-one)]">
					معدل الطلبات خلال الشهور السابقة
				</h2>
				<ChartOfOrders orders={ordersForChart} />
			</section>
			<section className="col-start-5 col-end-7 flex flex-col p-4 m-4 justify-evenly">
				<CardOfStatistics
					cardTitle="عدد المستخدمين المسجلين"
					data={numberOfRegisterdCustomers}
				/>
				<CardOfStatistics
					cardTitle="عدد الطلبات الناجحة"
					data={numberOfReachedOrdersData}
				/>
				<CardOfStatistics
					cardTitle="عدد الطلبات الجاري تحضيرها"
					data={numberOfPendingOrdersData}
				/>
			</section>
		</main>
	);
}

export default App;
