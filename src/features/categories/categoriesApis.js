import { supabase } from "@/lib/supabase";

export async function fetchCategories() {
	let { data: categories, error } = await supabase
		.from("categories")
		.select("*");
	if (error) {
		throw new Error(error.message);
	}
	return categories;
}

export async function insertCategory(category) {
	const { data: categoryInserted, error } = await supabase
		.from("categories")
		.insert([{ name: category.name }])
		.select();

	if (error) {
		throw new Error(error.message);
	}
	return categoryInserted;
}
