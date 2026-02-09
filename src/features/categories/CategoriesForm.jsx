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
import { CircleX } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPortal } from "react-dom";
import { insertCategory } from "./categoriesApis";

const formSchema = z.object({
	name: z.string(),
});

export default function CategoriesForm({ setIsFormOpen }) {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: (data) => insertCategory(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			toast.success("تم إضافة التصنيف بنجاح");
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
		},
	});

	async function onSubmit(data) {
		try {
			mutation.mutate(data);
		} catch (error) {
			toast.error(`حدث خطأ أثناء الحفظ,${error.message}`);
		}
	}

	return createPortal(
		<div className="w-full h-screen bg-black/50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 overflow-y-auto">
			<Card
				className="w-full sm:max-w-md text-[var(--color-one)] relative my-auto shadow-2xl"
				dir="rtl"
			>
				<div className="absolute left-4 top-4 z-10">
					<CircleX
						className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
						onClick={() => setIsFormOpen(false)}
					/>
				</div>

				<CardHeader className="pt-8 text-center">
					<CardTitle className="text-2xl font-bold">إضافة تصنيف</CardTitle>
				</CardHeader>

				<CardContent className="max-h-[70vh] overflow-y-auto px-6">
					<form
						id="category_form"
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FieldGroup>
							<Controller
								name="name"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="name">اسم التصنيف</FieldLabel>
										<Input
											{...field}
											id="name"
											placeholder="ادخل اسم التصنيف"
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
						}}
					>
						مسح
					</Button>

					<Button type="submit" form="category_form" className="flex-1">
						إضافة
					</Button>
				</CardFooter>
			</Card>
		</div>,
		document.body,
	);
}
