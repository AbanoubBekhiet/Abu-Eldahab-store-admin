import { supabase } from "@/lib/supabase";

export async function signIn({ email, password }) {
	let { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});
	if (error) {
		throw new Error(error.message);
	}
	return data;
}
export async function signOut() {
	let { error } = await supabase.auth.signOut();

	if (error) {
		throw new Error(error.message);
	}
	return null;
}
export async function getUser() {
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error) {
		throw new Error(error.message);
	}
	return user;
}
