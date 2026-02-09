import { supabase } from "@/lib/supabase";

export async function getCustomers() {
	let { data: profiles, error } = await supabase.from("profiles").select("*");
	if (error) throw new Error(error.message);
	return profiles;
}
