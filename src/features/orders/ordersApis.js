import { supabase } from "@/lib/supabase";

export async function getOrders({ page }) {
	const limit = 15;
	page = page || 1;
	const from = (page - 1) * limit;
	const to = from + limit - 1;

	let { data: orders, error } = await supabase
		.from("orders")
		.select(
			`
            id,
            status,
            total_price,
            created_at,
            customer:customer_id(
                full_name,
                address,
                phone,
                shop_name,
                notes), 
            customer_product (
              product_id,
              number_of_packets,
              number_of_pieces,
              piece_price,
              packet_price,
                products(
                    name,
                    image_url,
                    number_of_pieces_in_packet
                )
            )
        `,
		)
		.order("incre_id", { ascending: true })
		.range(from, to);

	if (error) throw new Error(error.message);
	return orders;
}

export async function updateOrderStatus(order_id, status) {
	let { data: updatedOrder, error } = await supabase
		.from("orders")
		.update({ status })
		.eq("id", order_id);

	if (error) throw new Error(error.message);
	return updatedOrder;
}
