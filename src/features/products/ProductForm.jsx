import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { CircleX, ImagePlus } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertProduct } from "./productsApis";

const formSchema = z.object({
	name: z.string(),
	number_of_pieces_in_packet: z.coerce
		.number()
		.int("ادخل رقم صحيح")
		.positive("ادخل عدد صحيح موجب"),
	price_of_piece: z.coerce.number().positive("ادخل سعر صحيح موجب"),
	price_of_packet: z.coerce.number().positive("ادخل سعر صحيح موجب"),
	category: z.string().min(2, "اختر فئة المنتج"),
	image: z.any().optional(),
});

export default function ProductForm({ setIsFormOpen, categories }) {
	const [preview, setPreview] = React.useState(null);
	const fileInputRef = React.useRef(null);
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data) => insertProduct(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			toast.success("تم إضافة المنتج بنجاح");
			setIsFormOpen(false);
		},
		onError: (error) => {
			toast.error(`حدث خطأ: ${error.message}`);
		},
	});

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			number_of_pieces_in_packet: 0,
			price_of_piece: 0,
			price_of_packet: 0,
			category: "",
			image: null,
		},
	});

	const handleImageChange = (e, onChange) => {
		const file = e.target.files[0];
		if (file) {
			onChange(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	async function onSubmit(data) {
		try {
			mutation.mutate(data);
		} catch (error) {
			toast.error("حدث خطأ أثناء الحفظ");
		}
	}

	return (
		<div className="w-full h-screen bg-black/50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 overflow-y-auto">
			<Card
				className="w-full sm:max-w-md text-[var(--color-one)] relative my-auto shadow-2xl"
				dir="rtl"
				id="productForm"
			>
				<div className="absolute left-4 top-4 z-10">
					<CircleX
						className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
						onClick={() => setIsFormOpen(false)}
					/>
				</div>

				<CardHeader className="pt-8 text-center">
					<CardTitle className="text-2xl font-bold">إضافة منتج جديد</CardTitle>
				</CardHeader>

				<CardContent className="max-h-[70vh] overflow-y-auto px-6">
					<form
						id="product_form"
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FieldGroup>
							<Controller
								name="image"
								control={form.control}
								render={({ field }) => (
									<Field className="flex flex-col items-center gap-2">
										<FieldLabel>صورة المنتج</FieldLabel>
										<div
											onClick={() => fileInputRef.current.click()}
											className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden relative group"
										>
											{preview ? (
												<img
													src={preview}
													alt="Preview"
													className="w-full h-full object-contain"
												/>
											) : (
												<div className="flex flex-col items-center text-gray-400">
													<ImagePlus size={40} strokeWidth={1.5} />
													<span className="text-sm mt-2">
														اضغط لاختيار صورة
													</span>
												</div>
											)}
											{preview && (
												<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
													<span className="text-white text-xs">
														تغيير الصورة
													</span>
												</div>
											)}
										</div>
										<input
											type="file"
											ref={fileInputRef}
											className="hidden"
											accept="image/*"
											onChange={(e) => handleImageChange(e, field.onChange)}
										/>
									</Field>
								)}
							/>

							<Controller
								name="name"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="name">اسم المنتج</FieldLabel>
										<Input
											{...field}
											id="name"
											placeholder="ادخل اسم المنتج"
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.error && (
											<FieldError className="text-red-500 text-xs mt-1">
												{fieldState.error.message}
											</FieldError>
										)}
									</Field>
								)}
							/>

							<Controller
								name="number_of_pieces_in_packet"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="number_of_pieces_in_packet">
											عدد القطع في الكرتونة
										</FieldLabel>
										<Input
											type="number"
											{...field}
											placeholder="مثال: 12"
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.error && (
											<FieldError className="text-red-500 text-xs mt-1">
												{fieldState.error.message}
											</FieldError>
										)}
									</Field>
								)}
							/>

							<Controller
								name="price_of_packet"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="price_of_packet">
											سعر الكرتونة
										</FieldLabel>
										<Input
											type="number"
											step="0.01"
											{...field}
											placeholder="ادخل السعر"
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.error && (
											<FieldError className="text-red-500 text-xs mt-1">
												{fieldState.error.message}
											</FieldError>
										)}
									</Field>
								)}
							/>

							<Controller
								name="price_of_piece"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="price_of_piece">سعر القطعة</FieldLabel>
										<Input
											type="number"
											step="0.01"
											{...field}
											placeholder="ادخل السعر"
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.error && (
											<FieldError className="text-red-500 text-xs mt-1">
												{fieldState.error.message}
											</FieldError>
										)}
									</Field>
								)}
							/>

							<Controller
								name="category"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>الفئة</FieldLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="اختر الفئة" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>الأقسام المتوفرة</SelectLabel>
													{categories?.map((cat) => (
														<SelectItem key={cat.id} value={cat.id}>
															{cat.name}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
										{fieldState.error && (
											<FieldError className="text-red-500 text-xs mt-1">
												{fieldState.error.message}
											</FieldError>
										)}
									</Field>
								)}
							/>
						</FieldGroup>
					</form>
				</CardContent>

				<CardFooter className="p-6 pt-2 flex gap-2">
					<Button
						type="button"
						variant="outline"
						className="flex-1"
						onClick={() => {
							form.reset();
							setPreview(null);
						}}
					>
						مسح
					</Button>

					<Button type="submit" form="product_form" className="flex-1">
						حفظ المنتج
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
