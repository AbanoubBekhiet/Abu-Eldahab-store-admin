import { DotLoader } from "react-spinners";

function Spinner() {
	return (
		<div className="flex items-center justify-center h-full w-full">
			<DotLoader color="#6a9c89" size={50} />
		</div>
	);
}

export default Spinner;
