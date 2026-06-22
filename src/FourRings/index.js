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

// Конфигурация палитры цветов для тем
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

const Item = ({ items, onDecreaseCustom, isRich }) => {
	return (
		<ContainerRating>
			{items.map((item, index) => (
				<Category key={index} isCustom={item.isCustom}>
					<p>
						{item.title} ({item.rate})
					</p>
					{/* Пункт 4: Если часов >= 160, карточка получает статус isRich и рендерится мешок */}
					<TotalMoney isRich={isRich}>
						{item.value} <label>Груш {isRich && "💰"}</label>
					</TotalMoney>

					{/* Пункт 3: Кнопка удаления кастомной ставки прямо на карточке */}
					{item.isCustom && (
						<button
							className="delete-custom"
							onClick={onDecreaseCustom}
							title="Удалить ставку"
						>
							✕
						</button>
					)}
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

	// Пункты 1: Стейт для темной темы с сохранением в память
	const [isDarkMode, setIsDarkMode] = useState(() => {
		return localStorage.getItem("theme_mode") === "dark";
	});

	// Пункт 5: Стейт для хранения истории расчетов
	const [history, setHistory] = useState(() => {
		const saved = localStorage.getItem("pears_history");
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem("custom_normohour_rate", customRate);
	}, [customRate]);

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

	// Пункт 2: Скелетоны / Динамическое отображение прочерков вместо нулей
	const formatValue = (value) => {
		return hours === "" || parseFloat(hours) === 0 ? "—" : value;
	};

	const defaultCalculatedItems = baseRates.map((item) => ({
		title: item.title,
		rate: item.rate.toFixed(2),
		value: formatValue(calculatePears(item.rate)),
	}));

	const customItem =
		customRate && parseFloat(customRate) > 0
			? {
					title: "Свой",
					rate: parseFloat(customRate).toFixed(2),
					value: formatValue(calculatePears(customRate)),
					isCustom: true,
				}
			: null;

	const allRenderItems = customItem
		? [...defaultCalculatedItems, customItem]
		: defaultCalculatedItems;

	// Пункт 4: Проверка на пасхалку (> 160 часов — серьезная переработка)
	const isRich = parseFloat(hours) >= 100;

	const handleHoursChange = (e) => {
		const val = e.target.value;
		if (parseFloat(val) < 0) return;
		setHours(val);
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

	// Пункт 5: Добавление записи в историю
	const saveToHistory = () => {
		if (!hours || parseFloat(hours) <= 0) return;

		// Берем для лога максимальный 6-й разряд или Свой разряд (если он есть)
		const activeRate = customItem ? customRate : 30.2;
		const totalMoneyResult = calculatePears(activeRate);

		const newRecord = {
			id: Date.now(),
			date: new Date().toLocaleDateString("ru-RU", {
				day: "2-digit",
				month: "2-digit",
			}),
			hours: hours,
			money: totalMoneyResult,
		};

		setHistory([newRecord, ...history].slice(0, 20)); // Храним последние 20 записей
	};

	return (
		<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
			<Container>
				{/* Пункт 1: Кнопка переключения темы */}
				<ThemeToggle onClick={() => setIsDarkMode(!isDarkMode)}>
					{isDarkMode ? "☀️" : "🌙"}
				</ThemeToggle>

				<Header>
					<h1>Пилорама</h1>
					<h2>Четыре Кольца</h2>
					<p>Сервис для расчета заработанных шапок груш.</p>
				</Header>

				<Rank>
					<p className="rank-title">Результат по разрядам:</p>
					<Item
						items={allRenderItems}
						onDecreaseCustom={() => setCustomRate("")}
						isRich={isRich}
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

					{/* Пункт 5: Кнопка сохранения текущего результата */}
					<ActionButton
						onClick={saveToHistory}
						disabled={!hours || parseFloat(hours) <= 0}
					>
						Сохранить расчет в историю
					</ActionButton>
				</HoursWorked>

				{/* Пункт 5: Блок вывода сохраненной истории */}
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
									<span>{item.hours} ч.</span>
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
