import { Link, useNavigate } from "react-router-dom";
import logo from "./../assets/logo.jpg";
import {
	Boxes,
	FileUser,
	LogIn,
	LogOut,
	PackageSearch,
	Truck,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, signOut } from "@/features/auth/authApis";
import { toast } from "react-toastify";
function Header() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: user } = useQuery({
		queryKey: ["userData"],
		queryFn: getUser,
	});

	const { mutate: logoutMutation } = useMutation({
		mutationFn: signOut,
		onSuccess: () => {
			queryClient.setQueryData(["userData"], null);
			queryClient.invalidateQueries();

			toast.success("تم تسجيل الخروج بنجاح");
			navigate("/");
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
	function signOutUser() {
		logoutMutation();
	}
	return (
		<header className="bg-[var(--color-two)] p-8  flex items-center justify-between ">
			<div className="flex items-center  gap-3">
				<Link to="/">
					<img
						src={logo}
						alt="ابو الدهب للتجارة"
						width="40"
						height="40"
						className="rounded-full"
					/>
				</Link>
			</div>
			<ul className="flex gap-4  ">
				<li>
					<Link to="/products?page=1" title="المنتجات">
						<PackageSearch className="text-[var(--color-one)] hover:text-[var(--color-four)] transition duration-700 ease-in-out" />
					</Link>
				</li>
				<li>
					<Link to="/categories" title="الفئات">
						<Boxes className="text-[var(--color-one)] hover:text-[var(--color-four)] transition duration-700 ease-in-out" />
					</Link>
				</li>
				<li>
					<Link to="/orders?page=1" title="الطلبات">
						<Truck className="text-[var(--color-one)] hover:text-[var(--color-four)] transition duration-700 ease-in-out" />
					</Link>
				</li>
				<li>
					<Link to="/customers?page=1" title="العملاء">
						<FileUser className="text-[var(--color-one)] hover:text-[var(--color-four)] transition duration-700 ease-in-out" />
					</Link>
				</li>
				<li>
					{user?.is_anonymous === false ? (
						<button
							onClick={signOutUser}
							type="submit"
							className="cursur-pointer text-red-400 hover:text-red-600 transition duration-700 ease-in-out"
							title="تسجيل خروج"
						>
							<LogOut />
						</button>
					) : (
						<Link
							title="تسجيل دخول"
							to="/sign-in"
							className="text-[var(--color-one)] hover:text-[var(--color-four)] transition duration-700 ease-in-out flex items-center justify-center"
						>
							<LogIn />
						</Link>
					)}
				</li>
			</ul>
		</header>
	);
}

export default Header;
