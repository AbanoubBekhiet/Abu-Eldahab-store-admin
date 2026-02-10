import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function CustomersSearch() {
	return (
		<div className="flex  p-4 mb-4 ">
			<form>
				<Field orientation="horizontal">
					<Input
						type="search"
						placeholder="ابحث عن عميل بالاسم ,العنوان,رقم الهاتف,اسم المحل"
						name="search"
					/>
					<Button>بحث</Button>
				</Field>
			</form>
		</div>
	);
}
