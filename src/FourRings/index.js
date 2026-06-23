import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import {
	Container,
	ThemeToggle,
	Header,
	LogoWrapper,
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
					<LogoWrapper>
						<svg
							viewBox="0 0 200 110" // Увеличили высоту со 90 до 110, чтобы лужа снизу не обрезалась
							xmlns="http://www.w3.org/2000/svg"
						>
							{/* ЛУЖИЦА КРОВИ (Снизу по центру под распилом) */}
							<g fill="#dc2626">
								{/* Основная растекающаяся лужа */}
								<path d="M 75 92 Q 65 92 68 95 Q 73 100 100 100 Q 125 100 130 95 Q 133 91 120 91 Q 105 89 98 90 Q 85 92 75 92 Z" />
								{/* Маленькие капли рядом */}
								<circle cx="62" cy="96" r="2" />
								<circle cx="136" cy="94" r="1.5" />
								<circle cx="98" cy="85" r="2" />{" "}
								{/* Капля, которая только упала */}
							</g>

							{/* Кольца Audi (левая пара) */}
							<circle
								cx="50"
								cy="45"
								r="22"
								stroke="currentColor"
								strokeWidth="5"
								fill="none"
							/>
							<circle
								cx="82"
								cy="45"
								r="22"
								stroke="currentColor"
								strokeWidth="5"
								fill="none"
							/>

							{/* Кольца Audi (правая пара) */}
							<circle
								cx="114"
								cy="45"
								r="22"
								stroke="currentColor"
								strokeWidth="5"
								fill="none"
							/>
							<circle
								cx="146"
								cy="45"
								r="22"
								stroke="currentColor"
								strokeWidth="5"
								fill="none"
							/>

							{/* РУЧНАЯ НОЖОВКА ПО ДЕРЕВУ */}
							<g transform="rotate(18 95 45)">
								{/* Полотно ножовки (сужается от ручки к кончику) */}
								<path
									d="M 15 45 L 160 38 L 160 52 L 15 48 Z"
									fill="#94a3b8"
									stroke="#64748b"
									strokeWidth="1"
								/>
								{/* Мелкие злые зубья ножовки по всей нижней кромке */}
								<path
									d="M 20 48 L 23 51 L 26 48 L 29 51 L 32 48 L 35 51 L 38 48 L 41 51 L 44 48 L 47 51 L 50 48 L 53 51 L 56 48 L 59 51 L 62 48 L 65 51 L 68 48 L 71 51 L 74 48 L 77 51 L 80 48 L 83 51 L 86 48 L 89 51 L 92 48 L 95 51 L 98 48 L 101 51 L 104 48 L 107 51 L 110 48 L 113 51 L 116 48 L 119 51 L 122 48 L 125 51 L 128 48 L 131 51 L 134 48 L 137 51 L 140 48 L 143 51 L 146 48 L 149 51 L 152 48 L 155 51 L 158 48"
									fill="none"
									stroke="#475569"
									strokeWidth="1.2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								{/* Классическая закрытая деревянная рукоятка ножовки */}
								<path
									d="M 155 33 C 165 30 180 32 185 40 C 190 48 188 56 182 62 C 175 68 160 65 155 60 Z"
									fill="#b45309"
									stroke="#78350f"
									strokeWidth="1.5"
								/>
								{/* Вырез в рукоятке под пальцы */}
								<path
									d="M 163 40 C 168 38 175 40 177 45 C 179 50 176 55 172 57 C 167 59 162 55 161 50 Z"
									fill={isDarkMode ? "#1e293b" : "#ffffff"} // Цвет выреза подстраивается под фон (авто-прозрачность)
									stroke="#78350f"
									strokeWidth="1"
									className="handle-hole"
								/>
								{/* Винты крепления рукоятки */}
								<circle cx="158" cy="42" r="2" fill="#475569" />
								<circle cx="156" cy="53" r="2" fill="#475569" />
							</g>

							{/* Линия раскола/распила по центру */}
							<line
								x1="98"
								y1="15"
								x2="98"
								y2="75"
								strokeWidth="4"
								strokeLinecap="round"
							/>
						</svg>
					</LogoWrapper>
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
						placeholder="Ставка ( руб )"
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
