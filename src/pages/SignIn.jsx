import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/features/auth/authApis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Signin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationKey: ["sign-in"],
		mutationFn: (credentials) => signIn(credentials),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userData"] });
			navigate("/", { replace: true });
			toast.success("تم تسجيل الدخول بنجاح");
		},
		onError: (error) => {
			toast.error(`فشل تسجيل الدخول: ${error.message}`);
		},
	});

	function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email");
		const password = formData.get("password");

		if (!email || !password) {
			toast.error("من فضلك أدخل البريد الإلكتروني وكلمة المرور");
			return;
		}

		mutation.mutate({ email, password });
	}

	return (
		<div className="w-full h-[59vh] flex items-center justify-center bg-gray-50">
			<Card className="w-full max-w-sm shadow-lg">
				<CardHeader>
					<CardTitle className="text-center text-2xl">تسجيل الدخول</CardTitle>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent>
						<div className="flex flex-col gap-4">
							<div className="grid gap-2 text-right" dir="rtl">
								<Label htmlFor="email">البريد الالكتروني</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="m@example.com"
									required
								/>
							</div>
							<div className="grid gap-2 text-right" dir="rtl">
								<Label htmlFor="password">كلمة المرور</Label>
								<Input id="password" name="password" type="password" required />
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							className="mt-6 w-full"
							type="submit"
							disabled={mutation.isPending}
						>
							{mutation.isPending ? "جاري التحميل..." : "دخول"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
