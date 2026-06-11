import styled, { keyframes } from "styled-components";

// Добавь во внутренний список keyframes в файле styled.js
const celebrateAnimation = keyframes`
    0% { transform: scale(0.9); opacity: 0; }
    50% { transform: scale(1.03); }
    100% { transform: scale(1); opacity: 1; }
`;

// Экспортируй новый компонент для полноэкранного текста
export const FullscreenOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	/* Использование dynamic vh для корректного отображения в мобильных браузерах (Safari/Chrome) */
	//height: 100vh;
	height: 100dvh;
	/* Обновленный сочный праздничный градиент */
	background: linear-gradient(135deg, #6366f1 0%, #10b981 100%);
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ffffff;
	font-size: 64px;
	font-weight: 900;
	letter-spacing: 2px;
	text-transform: uppercase;
	z-index: 9999;
	cursor: pointer;
	user-select: none;
	animation: ${celebrateAnimation} 0.4s ease-out forwards;
	padding: 20px;
	box-sizing: border-box;

	text-shadow:
		0px 4px 20px rgba(255, 255, 255, 0.4),
		0px 10px 40px rgba(0, 0, 0, 0.2);

	@media screen and (max-width: 768px) {
		font-size: 32px; /* Уменьшено для предотвращения некрасивых переносов на узких экранах */
		letter-spacing: 1px;
		text-align: center;
		line-height: 1.3;
	}
`;

// Анимация плавного появления контента сверху вниз
const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Пульсирующий эффект для интерактивных элементов
const pulse = keyframes`
    0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
    70% { box-shadow: 0 0 0 8px rgba(99, 102, 241, 0); }
    100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
`;

export const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 100%;
	min-height: 100vh;
	min-height: 100dvh; /* Используем динамическую высоту */
	flex-direction: column;
	padding: 0 20px;
	box-sizing: border-box;
	/* Улучшенный благородный градиент фона: более чистый и мягкий переход */
	background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
	font-family:
		"Inter",
		-apple-system,
		BlinkMacSystemFont,
		sans-serif;
	animation: ${fadeIn} 0.6s ease-out;

	@media screen and (max-width: 768px) {
		align-items: center;
		padding: 0 16px;
	}
`;

export const Header = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	padding: 40px 0 24px 0;
	border-bottom: 1px solid #e2e8f0;
	margin-bottom: 30px;
	width: 100%;
	max-width: 600px;
	align-self: center;

	@media screen and (max-width: 768px) {
		padding: 24px 0 16px 0;
		margin-bottom: 20px;
	}

	p {
		color: #64748b;
		font-size: 14px;
		margin: 0 0 6px 0;
		font-weight: 500;
		letter-spacing: 0.5px;

		@media screen and (max-width: 768px) {
			font-size: 12px;
		}
	}

	h1 {
		color: #0f172a;
		margin: 0 0 8px 0;
		font-size: 32px;
		font-weight: 700;
		letter-spacing: -0.5px;
		line-height: 1.2;

		@media screen and (max-width: 768px) {
			font-size: 24px;
		}
	}

	h2 {
		color: #475569;
		margin: 0;
		font-size: 18px;
		font-weight: 400;
		line-height: 1.5;

		@media screen and (max-width: 768px) {
			font-size: 14px;
			line-height: 1.4;
		}
	}
`;

export const Rank = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
`;

export const HoursWorked = styled.div`
	display: flex;
	width: 100%;
	max-width: 320px;
	justify-content: center;
	text-align: center;
	flex-direction: column;
	margin-bottom: 20px;

	input {
		outline: none;
		border: 2px solid #cbd5e1;
		border-radius: 12px;
		width: 100%;
		height: 52px; /* Увеличено до 52px — идеальный размер для тача пальцем */
		padding: 10px 16px;
		box-sizing: border-box;
		font-size: 16px; /* 16px предотвращает автоматический зум страницы на iOS */
		color: #1e293b;
		background-color: #ffffff;
		transition: all 0.3s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
		webkitappearance: none; /* Убираем дефолтные стили сафари */

		&:focus {
			border-color: #4f46e5;
			animation: ${pulse} 1s infinite;
			box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1);
		}

		&::placeholder {
			color: #94a3b8;
		}
	}
`;

export const TotalMoney = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: auto;
	font-size: 26px;
	font-weight: 700;
	color: #10b981;
	margin: 20px 0;
	background: #ffffff;
	padding: 14px 28px;
	border-radius: 16px;
	box-shadow:
		0 4px 6px -1px rgba(0, 0, 0, 0.05),
		0 2px 4px -1px rgba(0, 0, 0, 0.03);
	transition:
		transform 0.2s ease,
		background-color 0.2s ease;

	/* Эффекты разделены на hover (десктоп) и active (мобильные) */
	@media (hover: hover) {
		&:hover {
			transform: scale(1.03);
		}
	}
	&:active {
		transform: scale(0.98);
		background-color: #f8fafc;
	}

	label {
		margin-left: 8px;
		font-size: 18px;
		color: #475569;
		font-weight: 500;
	}

	@media screen and (max-width: 768px) {
		font-size: 22px;
		padding: 12px 24px;
		margin: 16px 0;

		label {
			font-size: 15px;
		}
	}
`;

export const Info = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
`;

export const Category = styled.div`
	display: grid;
	width: 100%;
	max-width: 320px;
	justify-content: center;
	text-align: center;
	background: #ffffff;
	border: none;
	border-radius: 14px;
	padding: 18px 16px; /* Увеличены вертикальные отступы для читаемости */
	margin-bottom: 12px;
	box-sizing: border-box;
	box-shadow:
		0 4px 6px -1px rgba(0, 0, 0, 0.05),
		0 2px 4px -1px rgba(0, 0, 0, 0.03);
	transition: all 0.2s ease-in-out;
	webkittaphighlightcolor: transparent; /* Убирает синий квадрат при тапе на iOS */

	@media (hover: hover) {
		&:hover {
			transform: translateY(-3px);
			box-shadow:
				0 10px 15px -3px rgba(0, 0, 0, 0.1),
				0 4px 6px -2px rgba(0, 0, 0, 0.05);
		}
	}

	&:active {
		transform: translateY(1px);
		background-color: #fcfcfc;
	}

	p {
		padding: 0;
		margin: 0;
		color: #334155;
		font-weight: 500;
		font-size: 15px;

		@media screen and (max-width: 768px) {
			font-size: 14px;
		}
	}
`;

export const ContainerRating = styled.div`
	display: flex;
	width: 100%;
	gap: 12px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Footer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	flex-direction: column;
	color: #94a3b8;
	font-size: 0.875rem;
	margin-top: auto;
	padding: 36px 0 24px 0;
	width: 100%;

	a {
		display: flex;
		color: #6366f1;
		text-decoration: none;
		font-weight: 600;
		transition: color 0.2s ease;
		padding: 10px; /* Увеличена зона клика для попадания пальцем */

		@media (hover: hover) {
			&:hover {
				color: #4f46e5;
				text-decoration: underline;
			}
		}

		&:active {
			color: #4f46e5;
		}
	}
`;
