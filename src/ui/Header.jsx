import { Link } from "react-router-dom";
import logo from "./../assets/logo.jpg";
import { Boxes, FileUser, PackageSearch, Truck } from "lucide-react";
function Header() {
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
			</ul>
			{/* <div className="flex gap-4 ">
				<Link to="/profile/info" title="الملف الشخصي">
					<CircleUserRound className="text-[var(--color-one)] hover:text-[var(--color-four)] transition duration-700 ease-in-out" />
				</Link>
				<Link to="/cart" title="سلة المشتريات">
					<ShoppingCart className="text-[var(--color-one)] hover:text-[var(--color-four)] transition duration-700 ease-in-out" />
				</Link>

				<Link
					title="تسجيل دخول"
					to="/auth/signin"
					className="text-[var(--color-one)] hover:text-[var(--color-four)] transition duration-700 ease-in-out flex items-center justify-center"
				>
					<LogIn />
				</Link>
			</div> */}
		</header>
	);
}

export default Header;
