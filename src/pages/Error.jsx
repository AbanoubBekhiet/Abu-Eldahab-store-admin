import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
export default function Error() {
	return (
		<div className="flex flex-col items-center justify-center h-[59vh]">
			<ShieldAlert className="text-red-500 w-16 h-16 mb-4" />
			<h2 className="text-2xl font-bold  mb-2 text-[var(--color-one)]">
				{" "}
				Something went wrong!
			</h2>
			<Link
				to="/"
				className="bg-[var(--color-one)] hover:bg-[var(--color-two)] text-white font-bold py-2 px-4 rounded"
			>
				<button>الصفحة الرئيسية</button>
			</Link>
		</div>
	);
}
