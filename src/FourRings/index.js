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
} from "./styled";

const FourRings = () => {
	// Создаем состояние для хранения введенных часов
	const [hours, setHours] = useState("");

	// Ставки для разрядов
	const rates = {
		fourth: 23.5,
		fifth: 26.8,
		sixth: 30.2,
	};

	// Функция для расчета «груш» с учетом вычета 14%
	const calculatePears = (rate) => {
		const parsedHours = parseFloat(hours);
		// Если в поле ничего не введено или это не число, возвращаем 0
		if (isNaN(parsedHours) || parsedHours <= 0) return "0.00";

		const totalBeforeTax = parsedHours * rate;
		const tax = totalBeforeTax * 0.14;
		const finalTotal = totalBeforeTax - tax;

		// Округляем до 2 знаков после запятой для красоты
		return finalTotal.toFixed(2);
	};

	// Получаем рассчитанные значения для каждого разряда
	const calculatedItems = {
		fourth: calculatePears(rates.fourth),
		fifth: calculatePears(rates.fifth),
		sixth: calculatePears(rates.sixth),
	};

	return (
		<Container>
			<Header>
				<h1>Пилорама</h1>
				<h2>Четыре Кольца</h2>
				<p>Сервис для расчета заработанных шапок груш.</p>
			</Header>

			<Rank>
				<p>Результат по разрядам:</p>
				{/* Передаем рассчитанные значения в компонент Item */}
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
					onChange={(e) => setHours(e.target.value)} // Обновляем состояние при вводе
				/>
			</HoursWorked>

			<Footer>
				По всем вопросам и предложениям:
				<a href="https://t.me/aaliaksei">@aaliaksei</a>
			</Footer>
		</Container>
	);
};

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

export default FourRings;
