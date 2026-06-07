import React, { useState } from "react";
import {
	Container,
	Header,
	Rank,
	HoursWorked,
	ContainerRating,
	Category,
	TotalMoney,
	Footer,
	FullscreenOverlay,
} from "./styled";

const Item = (props) => {
	const { fourth, fifth, sixth } = props;
	return (
		<ContainerRating>
			<Category>
				<p>4-ый (23.50)</p>
				<TotalMoney>
					{fourth} <label>Груш</label>
				</TotalMoney>
			</Category>
			<Category>
				<p>5-ый (26.80)</p>
				<TotalMoney>
					{fifth} <label>Груш</label>
				</TotalMoney>
			</Category>
			<Category>
				<p>6-ый (30.20)</p>
				<TotalMoney>
					{sixth} <label>Груш</label>
				</TotalMoney>
			</Category>
		</ContainerRating>
	);
};

const FourRings = () => {
	const [hours, setHours] = useState("");
	const [showQuery, setShowQuery] = useState(false);

	const rates = {
		fourth: 23.5,
		fifth: 26.8,
		sixth: 30.2,
	};

	const calculatePears = (rate) => {
		const parsedHours = parseFloat(hours);
		if (isNaN(parsedHours) || parsedHours <= 0) return "0.00";

		const totalBeforeTax = parsedHours * rate;
		const tax = totalBeforeTax * 0.14;
		const finalTotal = totalBeforeTax - tax;

		return finalTotal.toFixed(2);
	};

	const calculatedItems = {
		fourth: calculatePears(rates.fourth),
		fifth: calculatePears(rates.fifth),
		sixth: calculatePears(rates.sixth),
	};

	// ИЗМЕНЕНИЕ ЗДЕСЬ: переводим строку hours в число и проверяем, что оно >= 100
	const parsedHoursValue = parseFloat(hours);
	const isBrilliant =
		!isNaN(parsedHoursValue) && parsedHoursValue >= 100 && !showQuery;

	const handleHoursChange = (e) => {
		setHours(e.target.value);
		setShowQuery(false);
	};

	return (
		<Container>
			{isBrilliant && (
				<FullscreenOverlay onClick={() => setShowQuery(true)}>
					Бляястяще!
				</FullscreenOverlay>
			)}

			<Header>
				<h1>Пилорама</h1>
				<h2>Четыре Кольца</h2>
				<p>Сервис для расчета заработанных шапок груш.</p>
			</Header>

			{showQuery && (
				<div
					style={{
						textAlign: "center",
						margin: "20px 0",
						padding: "15px",
						background: "#e0f2fe",
						borderRadius: "12px",
						color: "#0369a1",
						fontWeight: "bold",
						width: "100%",
						maxWidth: "320px",
						alignSelf: "center",
					}}
				>
					Годиться !
				</div>
			)}

			<Rank>
				<p>Результат по разрядам:</p>
				<Item
					fourth={calculatedItems.fourth}
					fifth={calculatedItems.fifth}
					sixth={calculatedItems.sixth}
				/>
			</Rank>

			<HoursWorked>
				<p>Укажи кол-во нормочасов :</p>
				<input
					placeholder="Часули"
					type="number"
					value={hours}
					onChange={handleHoursChange}
				/>
			</HoursWorked>

			<Footer>
				По всем вопросам и предложениям:
				<a href="https://t.me/aaliaksei">@aaliaksei</a>
			</Footer>
		</Container>
	);
};

export default FourRings;
