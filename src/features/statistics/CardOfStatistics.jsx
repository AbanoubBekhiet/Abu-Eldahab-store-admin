function CardOfStatistics({ data, cardTitle }) {
	return (
		<section className="bg-[var(--color-three)] text-[var(--color-one)] m-4 p-4 rounded-xl flex flex-col items-center">
			<h4>{cardTitle}</h4>
			<p className="font-bold">{data}</p>
		</section>
	);
}

export default CardOfStatistics;
