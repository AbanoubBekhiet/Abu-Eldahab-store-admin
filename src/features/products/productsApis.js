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
	let finalImageUrl = null;
	const tempId = crypto.randomUUID();
	if (product.image) {
		const fileExtension = product.image.name.split(".").pop();
		finalImageUrl = `${tempId}-${Date.now()}.${fileExtension}`;

		const { error: uploadError } = await supabase.storage
			.from("products_images")
			.upload(finalImageUrl, product.image);

		if (uploadError) {
			throw new Error(`فشل رفع الصورة: ${uploadError.message}`);
		}
	}

	const { data: insertedData, error: insertError } = await supabase
		.from("products")
		.insert([
			{
				id: tempId,
				name: product.name,
				number_of_pieces_in_packet: product.number_of_pieces_in_packet,
				price_of_piece: product.price_of_piece,
				price_of_packet: product.price_of_packet,
				category_id: product.category,
				image_url: finalImageUrl,
				accepts_pieces: product.accepts_pieces,
			},
		])
		.select()
		.single();

	if (insertError) {
		if (finalImageUrl) {
			await supabase.storage.from("products_images").remove([finalImageUrl]);
		}
		throw new Error(insertError.message);
	}

	return insertedData;
}
export async function updateProduct(product) {
	let finalImageName = product.image;

	if (product.image && typeof product.image !== "string") {
		const fileExtension = product.image.name.split(".").pop();
		const newFileName = `${product.id}-${Date.now()}.${fileExtension}`;

		const { data: oldProduct } = await supabase
			.from("products")
			.select("image_url")
			.eq("id", product.id)
			.single();

		if (oldProduct?.image_url) {
			await supabase.storage
				.from("products_images")
				.remove([oldProduct.image_url]);
		}

		const { error: uploadError } = await supabase.storage
			.from("products_images")
			.upload(newFileName, product.image);

		if (uploadError) throw new Error(`خطأ في الرفع: ${uploadError.message}`);

		finalImageName = newFileName;
	}

	const { data, error } = await supabase
		.from("products")
		.update({
			name: product.name,
			number_of_pieces_in_packet: product.number_of_pieces_in_packet,
			price_of_piece: product.price_of_piece,
			price_of_packet: product.price_of_packet,
			category_id: product.category,
			image_url: finalImageName,
			accepts_pieces: product.accepts_pieces,
		})
		.eq("id", product.id)
		.select()
		.single();

	if (error) throw new Error(error.message);
	return data;
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

export async function updateProductAvailability(product_id, status) {
	const { data, error } = await supabase
		.from("products")
		.update({ available: status })
		.eq("id", product_id)
		.select();

	if (error) throw new Error(error.message);
	return data;
}
