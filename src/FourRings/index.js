import React, { useState, useEffect } from "react";
import {
	Container,
	Header,
	Rank,
	HoursWorked,
	ContainerRating,
	Category,
	TotalMoney,
	Footer,
} from "./styled";

const Item = ({ items }) => {
	return (
		<ContainerRating>
			{items.map((item, index) => (
				<Category key={index}>
					<p>
						{item.title} ({item.rate})
					</p>
					<TotalMoney>
						{item.value} <label>Груш</label>
					</TotalMoney>
				</Category>
			))}
		</ContainerRating>
	);
};

const FourRings = () => {
	const [hours, setHours] = useState("");
	const [customRate, setCustomRate] = useState(() => {
		return localStorage.getItem("custom_normohour_rate") || "";
	});
	const [showQuery, setShowQuery] = useState(false);

	useEffect(() => {
		localStorage.setItem("custom_normohour_rate", customRate);
	}, [customRate]);

	const baseRates = [
		{ key: "fourth", title: "4-ый", rate: 23.5 },
		{ key: "fifth", title: "5-ый", rate: 26.8 },
		{ key: "sixth", title: "6-ый", rate: 30.2 },
	];

	const calculatePears = (rateValue) => {
		const parsedHours = parseFloat(hours);
		const rate = parseFloat(rateValue);

		if (
			isNaN(parsedHours) ||
			parsedHours <= 0 ||
			isNaN(rate) ||
			rate <= 0
		) {
			return "0.00";
		}

		const totalBeforeTax = parsedHours * rate;
		const tax = totalBeforeTax * 0.14;
		const finalTotal = totalBeforeTax - tax;

		return finalTotal.toFixed(2);
	};

	const defaultCalculatedItems = baseRates.map((item) => ({
		title: item.title,
		rate: item.rate.toFixed(2),
		value: calculatePears(item.rate),
	}));

	// Создаем объект для кастомной ставки, если она введена
	const customItem =
		customRate && parseFloat(customRate) > 0
			? {
					title: "Свой",
					rate: parseFloat(customRate).toFixed(2),
					value: calculatePears(customRate),
				}
			: null;

	// Объединяем дефолтные разряды и кастомный в один массив для рендера
	const allRenderItems = customItem
		? [...defaultCalculatedItems, customItem]
		: defaultCalculatedItems;

	const handleHoursChange = (e) => {
		const val = e.target.value;
		if (parseFloat(val) < 0) return;

		setHours(val);
		setShowQuery(false);
	};

	const handleCustomRateChange = (e) => {
		const val = e.target.value;
		if (parseFloat(val) < 0) return;

		setCustomRate(val);
	};

	const blockInvalidChar = (e) => {
		if (["e", "E", "-", "+"].includes(e.key)) {
			e.preventDefault();
		}
	};

	return (
		<Container>
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
					Годится!
				</div>
			)}

			<Rank>
				<p>Результат по разрядам:</p>
				{/* Передаем единый массив, карточки встанут идеально ровно */}
				<Item items={allRenderItems} />
			</Rank>

			<HoursWorked>
				<p>Укажи кол-во нормочасов :</p>
				<input
					placeholder="Часули"
					type="number"
					min="0"
					value={hours}
					onChange={handleHoursChange}
					onKeyDown={blockInvalidChar}
					style={{ marginBottom: "15px" }}
				/>

				<p>Своя ставка нормочаса (опционально):</p>
				<input
					placeholder="Ставка ($ / руб)"
					type="number"
					min="0"
					value={customRate}
					onChange={handleCustomRateChange}
					onKeyDown={blockInvalidChar}
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
