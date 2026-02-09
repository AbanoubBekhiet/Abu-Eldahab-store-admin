import { Button } from "@/components/ui/button";
import { getCustomers } from "@/features/customers/customersApis";
import { CustomerTable } from "@/features/customers/CustomerTable";
import ProductsList from "@/features/products/ProductsList";
import Pagination from "@/ui/Pagination";
import Spinner from "@/ui/Spinner";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

function Customers() {
	const [params] = useSearchParams();

	const navigate = useNavigate();

	const page = params.get("page") || 1;
	const search = params.get("search");

	const {
		isPending: isCustomersPending,
		isError,
		data: customers,
	} = useQuery({
		queryKey: ["customers", page, search],
		queryFn: () => getCustomers({ page, search }),
		placeholderData: keepPreviousData,
	});

	if (isCustomersPending) {
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
		<main className="p-6 w-full">
			<CustomerTable customers={customers} />
			<Pagination itemsLength={customers?.length || 0} />
		</main>
	);
}
export default Customers;
