import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";

export function ProductsFilter({ categories }) {
	const [params, setParams] = useSearchParams();
	function handleFilter(filter) {
		params.set("filter", filter);
		params.set("search", "لا يوجد");
		params.set("page", "1");
		setParams(params);
	}

	return (
		<div className="flex md:items-center mb-5 md:justify-around flex-col md:flex-row mt-4 md:mt-0">
			<div>
				<form>
					<Field orientation="horizontal">
						<Input type="search" placeholder="بحث ......" name="search" />
						<Button>بحث</Button>
					</Field>
				</form>
			</div>
			<Tabs defaultValue="overview" className="p-5">
				<TabsList className="flex flex-wrap">
					{categories.map((category) => (
						<TabsTrigger
							value={category.name}
							key={category.id}
							onClick={() => handleFilter(category.name)}
						>
							{category.name}
						</TabsTrigger>
					))}
					<TabsTrigger
						value="كل المنتجات"
						onClick={() => handleFilter("كل المنتجات")}
					>
						كل المنتجات
					</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	);
}
