import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import {
	Container,
	ThemeToggle,
	Header,
	Rank,
	HoursWorked,
	ContainerRating,
	Category,
	TotalMoney,
	ActionButton,
	HistoryContainer,
	Footer,
} from "./styled";

const lightTheme = {
	background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)",
	cardBg: "#ffffff",
	moneyBg: "#f8fafc",
	border: "#cbd5e1",
	textMain: "#1e293b",
	textMuted: "#64748b",
};

const darkTheme = {
	background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
	cardBg: "#1e293b",
	moneyBg: "#0f172a",
	border: "#475569",
	textMain: "#f8fafc",
	textMuted: "#94a3b8",
};

const Item = ({
	items,
	onDecreaseCustom,
	isRich,
	selectedRate,
	onSelectRate,
}) => {
	return (
		<ContainerRating>
			{items.map((item, index) => {
				// Проверяем, выбрана ли текущая плашка
				const isSelected = selectedRate?.title === item.title;

				return (
					<Category
						key={index}
						isCustom={item.isCustom}
						isSelected={isSelected} // Передаем в стили
						onClick={() => onSelectRate(item)} // Клик по плашке
					>
						<p>
							{item.title} ({item.rate})
						</p>
						<TotalMoney
							isRich={isRich && isSelected}
							isSelected={isSelected}
						>
							{item.value}{" "}
							<label>Груш {isRich && isSelected && "💰"}</label>
						</TotalMoney>

						{item.isCustom && (
							<button
								className="delete-custom"
								onClick={(e) => {
									e.stopPropagation(); // Чтобы не срабатывал выбор карточки при удалении
									onDecreaseCustom();
								}}
								title="Удалить ставку"
							>
								✕
							</button>
						)}
					</Category>
				);
			})}
		</ContainerRating>
	);
};

const FourRings = () => {
	const [hours, setHours] = useState("");
	const [customRate, setCustomRate] = useState(() => {
		return localStorage.getItem("custom_normohour_rate") || "";
	});

	const [isDarkMode, setIsDarkMode] = useState(() => {
		return localStorage.getItem("theme_mode") === "dark";
	});

	const [history, setHistory] = useState(() => {
		const saved = localStorage.getItem("pears_history");
		return saved ? JSON.parse(saved) : [];
	});

	// НОВОЕ: Храним выбранный разряд
	const [selectedRate, setSelectedRate] = useState(null);

	useEffect(() => {
		localStorage.setItem("custom_normohour_rate", customRate);
		// Если кастомную ставку удалили, сбрасываем выбор, если был выбран "Свой"
		if (!customRate && selectedRate?.title === "Свой") {
			setSelectedRate(null);
		}
	}, [customRate, selectedRate]);

	useEffect(() => {
		localStorage.setItem("theme_mode", isDarkMode ? "dark" : "light");
	}, [isDarkMode]);

	useEffect(() => {
		localStorage.setItem("pears_history", JSON.stringify(history));
	}, [history]);

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

	const formatValue = (value) => {
		return hours === "" || parseFloat(hours) === 0 ? "—" : value;
	};

	const defaultCalculatedItems = baseRates.map((item) => ({
		title: item.title,
		rate: item.rate.toFixed(2),
		value: formatValue(calculatePears(item.rate)),
		rawRate: item.rate, // Сохраняем чистую ставку для расчетов
	}));

	const customItem =
		customRate && parseFloat(customRate) > 0
			? {
					title: "Свой",
					rate: parseFloat(customRate).toFixed(2),
					value: formatValue(calculatePears(customRate)),
					isCustom: true,
					rawRate: parseFloat(customRate),
				}
			: null;

	const allRenderItems = customItem
		? [...defaultCalculatedItems, customItem]
		: defaultCalculatedItems;

	// Пасхалка на 100 часов
	const isRich = parseFloat(hours) >= 100;

	const handleHoursChange = (e) => {
		const val = e.target.value;
		if (parseFloat(val) < 0) return;
		setHours(val);
		// При изменении часов не сбрасываем выбранный разряд, суммы пересчитаются автоматически
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

	// Добавление в историю на основе ВЫБРАННОГО разряда
	const saveToHistory = () => {
		if (!hours || parseFloat(hours) <= 0 || !selectedRate) return;

		// Считаем сумму по ставке из выбранного элемента
		const totalMoneyResult = calculatePears(selectedRate.rawRate);

		const newRecord = {
			id: Date.now(),
			date: new Date().toLocaleDateString("ru-RU", {
				day: "2-digit",
				month: "2-digit",
			}),
			hours: hours,
			money: totalMoneyResult,
			label: selectedRate.title, // Сохраняем инфо о разряде в историю
		};

		setHistory([newRecord, ...history].slice(0, 20));
	};

	return (
		<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
			<Container>
				<ThemeToggle onClick={() => setIsDarkMode(!isDarkMode)}>
					{isDarkMode ? "☀️" : "🌙"}
				</ThemeToggle>

				<Header>
					<h1>Пилорама</h1>
					<h2>Четыре Кольца</h2>
					<p>Сервис для расчета заработанных шапок груш.</p>
				</Header>

				<Rank>
					<p className="rank-title">Выбери разряд тапом на плашку:</p>
					<Item
						items={allRenderItems}
						onDecreaseCustom={() => setCustomRate("")}
						isRich={isRich}
						selectedRate={selectedRate}
						onSelectRate={setSelectedRate} // Передаем функцию выбора
					/>
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

					{/* Кнопка активна только если введены часы И выбран разряд */}
					<ActionButton
						onClick={saveToHistory}
						disabled={
							!hours || parseFloat(hours) <= 0 || !selectedRate
						}
					>
						{!selectedRate
							? "Сначала выбери разряд выше"
							: `Сохранить расчет (${selectedRate.title})`}
					</ActionButton>
				</HoursWorked>

				{history.length > 0 && (
					<HistoryContainer>
						<h3>
							История расчетов
							<button onClick={() => setHistory([])}>
								очистить
							</button>
						</h3>
						<div className="history-list">
							{history.map((item) => (
								<div className="history-item" key={item.id}>
									<span className="date">{item.date}</span>
									<span>
										{item.hours} ч.{" "}
										<small style={{ opacity: 0.6 }}>
											({item.label})
										</small>
									</span>
									<span className="money">
										{item.money} Гр.
									</span>
								</div>
							))}
						</div>
					</HistoryContainer>
				)}

				<Footer>
					По всем вопросам и предложениям:
					<a href="https://t.me/aaliaksei">@aaliaksei</a>
				</Footer>
			</Container>
		</ThemeProvider>
	);
};

export default FourRings;
