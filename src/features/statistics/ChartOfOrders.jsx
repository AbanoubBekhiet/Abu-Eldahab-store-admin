import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from "recharts";


const SimpleAreaChart = ({orders}) => {
	return (
		<AreaChart
			style={{
				width: "100%",
				maxWidth: "700px",
				maxHeight: "70vh",
				aspectRatio: 1.618,
			}}
			responsive
			data={orders}
			margin={{
				top: 20,
				right: 20,
				left: 0,
				bottom: 0,
			}}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="month" />
			<YAxis width="auto" />
			<Tooltip />
			<Area type="monotone" dataKey="orders" stroke="#16423c" fill="#6a9c89" />
		</AreaChart>
	);
};

export default SimpleAreaChart;
