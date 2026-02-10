import { supabase } from "@/lib/supabase";

export async function numberOfRegistredCustomers() {
	const { count, error } = await supabase
		.from("profiles")
		.select("*", { count: "exact", head: true })
		.eq("role", "customer");
	if (error) throw new Error(error.message);
	return count;
}
export async function numberOfReachedOrders() {
	const { count, error } = await supabase
		.from("orders")
		.select("*", { count: "exact", head: true })
		.eq("status", "تم التوصيل");
	if (error) throw new Error(error.message);
	return count;
}
export async function numberOfPendingOrders() {
	const { count, error } = await supabase
		.from("orders")
		.select("*", { count: "exact", head: true })
		.eq("status", "جاري التحضير");
	if (error) throw new Error(error.message);
	return count;
}

export async function numberOfOrdersInlastThreeMonths() {
	const today = new Date();
	const threeMonthsAgo = new Date();
	threeMonthsAgo.setMonth(today.getMonth() - 2);
	threeMonthsAgo.setDate(1);
	threeMonthsAgo.setHours(0, 0, 0, 0);

	const { data, error } = await supabase
		.from("orders")
		.select("created_at")
		.gte("created_at", threeMonthsAgo.toISOString());

	if (error) throw new Error(error.message);

	const lastThreeMonths = [];
	for (let i = 2; i >= 0; i--) {
		const d = new Date();
		d.setMonth(today.getMonth() - i);
		const monthName = d.toLocaleString("ar-EG", { month: "long" });

		lastThreeMonths.push({
			month: monthName,
			orders: 0,
			key: `${d.getMonth()}-${d.getFullYear()}`,
		});
	}

	data.forEach((order) => {
		const orderDate = new Date(order.created_at);
		const orderKey = `${orderDate.getMonth()}-${orderDate.getFullYear()}`;

		const monthObj = lastThreeMonths.find((m) => m.key === orderKey);
		if (monthObj) {
			monthObj.orders++;
		}
	});

	// 3. Clean up by removing the helper key before returning
	return lastThreeMonths.map(({ month, orders }) => ({ month, orders }));
}
