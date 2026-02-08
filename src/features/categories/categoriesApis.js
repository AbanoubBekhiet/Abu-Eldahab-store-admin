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
		.insert([{ some_column: "someValue", other_column: "otherValue" }])
		.select();

	if (error) {
		throw new Error(error.message);
	}
	return categoryInserted;
}
export async function updateCategory(category) {
	const { data: updatedCategory, error } = await supabase
		.from("categories")
		.update({ other_column: "otherValue" })
		.eq("some_column", "someValue")
		.select();
	if (error) {
		throw new Error(error.message);
	}
	return updatedCategory;
}
export async function deleteCategory(category_id) {
	const { error } = await supabase
		.from("categories")
		.delete()
		.eq("category_id", category_id);
	if (error) {
		throw new Error(error.message);
	}
	return null;
}
