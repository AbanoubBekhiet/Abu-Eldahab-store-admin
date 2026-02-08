import { supabase } from "@/lib/supabase";

export async function fetchProducts({ page, filter, search }) {
	const limit = 15;
	page = page || 1;
	const from = (page - 1) * limit;
	const to = from + limit - 1;
	let query = supabase.from("products").select("*,categories(name)");

	if (filter && filter !== "كل المنتجات") {
		query = query.eq("categories.name", filter);
	}

	if (search && search !== "لا يوجد") {
		query = query.ilike("name", `%${search}%`);
	}
	const { data: products, error } = await query
		.order("incre_id", { ascending: true })
		.range(from, to);

	if (error) throw new Error(error.message);
	return products;
}
export async function insertProduct(product) {
	const { data: insertedData, error: insertError } = await supabase
		.from("products")
		.insert([
			{
				name: product.name,
				number_of_pieces_in_packet: product.number_of_pieces_in_packet,
				price_of_piece: product.price_of_piece,
				price_of_packet: product.price_of_packet,
				category_id: product.category,
			},
		])
		.select()
		.single();

	if (insertError) throw new Error(insertError.message);

	const productRecord = insertedData;
	let finalImageUrl = null;

	if (product.image) {
		const fileExtension = product.image.name.split(".").pop();
		const fileName = `${productRecord.id}.${fileExtension}`;

		const { error: uploadError } = await supabase.storage
			.from("products_images")
			.upload(fileName, product.image);

		if (uploadError) {
			throw new Error(`فشل رفع الصورة: ${uploadError.message}`);
		}

		finalImageUrl = fileName;

		const { error: updateError } = await supabase
			.from("products")
			.update({ image_url: finalImageUrl })
			.eq("id", productRecord.id);

		if (updateError) throw new Error(updateError.message);
	}

	return productRecord;
}
export async function updateProduct(product) {
	const { data: updatedProduct, error } = await supabase
		.from("products")
		.update({ other_column: "otherValue" })
		.eq("some_column", "someValue")
		.select();

	if (error) {
		throw new Error(error.message);
	}
	return updatedProduct;
}
export async function deleteProduct(product_id, image_url) {
	const { error } = await supabase
		.from("products")
		.delete()
		.eq("id", product_id);

	if (image_url)
		await supabase.storage.from("products_images").remove([`${image_url}`]);

	if (error) {
		throw new Error(error.message);
	}
	return null;
}
