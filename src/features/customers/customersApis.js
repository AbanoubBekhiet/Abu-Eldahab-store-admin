import { supabase } from "@/lib/supabase";

export async function getCustomers({ page, search }) {
	const limit = 15;
	page = page || 1;
	const from = (page - 1) * limit;
	const to = from + limit - 1;

	let query = supabase.from("profiles").select("*", { count: "exact" });

	if (search && search !== "لا يوجد") {
		query = query.or(
			`full_name.ilike.%${search}%,address.ilike.%${search}%,phone.ilike.%${search}%,shop_name.ilike.%${search}%`,
		);
	}

	const {
		data: profiles,
		error,
	} = await query.order("incre_id", { ascending: true }).range(from, to);

	if (error) throw new Error(error.message);
	return { profiles };
}
