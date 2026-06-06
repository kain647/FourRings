import styled, { keyframes } from "styled-components";

// Добавь во внутренний список keyframes в файле styled.js
const celebrateAnimation = keyframes`
  0% { transform: scale(0.9); opacity: 0; }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
`;

// Экспортируй новый компонент для полноэкранного текста
export const FullscreenOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	/* Яркий, праздничный градиент */
	background: linear-gradient(135deg, #4f46e5 0%, #10b981 100%);
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ffffff;
	font-size: 64px;
	font-weight: 900;
	letter-spacing: 2px;
	text-transform: uppercase;
	z-index: 9999; /* Поверх всех элементов */
	cursor: pointer;
	user-select: none;
	animation: ${celebrateAnimation} 0.4s ease-out forwards;

	/* Текстовая тень для создания эффекта объема и блеска */
	text-shadow:
		0px 4px 20px rgba(255, 255, 255, 0.4),
		0px 10px 40px rgba(0, 0, 0, 0.2);

	@media screen and (max-width: 768px) {
		font-size: 38px;
		text-align: center;
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

// Пульсирующий эффект для интерактивных элементов (например, при фокусе)
const pulse = keyframes`
    0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
    100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
`;

export const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 100%;
	min-height: 100vh; /* Изменено на min-height для предотвращения обрезки контента */
	flex-direction: column;
	padding: 0 20px;
	box-sizing: border-box;
	/* Мягкий, современный градиент для фона */
	background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
	font-family:
		"Inter",
		-apple-system,
		BlinkMacSystemFont,
		sans-serif;
	animation: ${fadeIn} 0.6s ease-out;

	@media screen and (max-width: 768px) {
		align-items: center;
		height: auto;
		padding: 0 15px;
	}
`;

export const Header = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	padding: 40px 0 24px 0;
	/* Классическая тонкая разделительная линия снизу */
	border-bottom: 1px solid #e2e8f0;
	margin-bottom: 30px;
	width: 100%;
	max-width: 600px; /* Ограничиваем ширину, чтобы на десктопе смотрелось аккуратно */
	align-self: center;

	p {
		color: #64748b; /* Спокойный стальной серый */
		font-size: 14px;
		margin-bottom: 6px;
		font-weight: 500;
		letter-spacing: 0.5px;
	}

	h1 {
		color: #0f172a; /* Строгий темно-угольный цвет */
		margin: 0 0 6px 0;
		font-size: 32px;
		font-weight: 700;
		letter-spacing: -0.5px;

		@media screen and (max-width: 768px) {
			font-size: 26px;
		}
	}

	h2 {
		color: #475569; /* Классический приглушенный текст */
		margin: 0;
		font-size: 18px;
		font-weight: 400;
		line-height: 1.5;

		@media screen and (max-width: 768px) {
			font-size: 15px;
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
		border: 2px solid #cbd5e1; /* Сделали рамку чуть толще и мягче */
		border-radius: 12px; /* Более округлые стильные углы */
		width: 100%;
		height: 48px; /* Немного увеличили для удобства */
		padding: 10px 16px;
		box-sizing: border-box;
		font-size: 16px;
		color: #1e293b;
		background-color: #ffffff;
		/* Плавный переход для анимации фокуса */
		transition: all 0.3s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);

		&:focus {
			border-color: #4f46e5; /* Фиолетовый акцент при клике */
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
	color: #10b981; /* Приятный зеленый "денежный" цвет */
	margin: 20px 0;
	background: #ffffff;
	padding: 12px 24px;
	border-radius: 16px;
	box-shadow:
		0 4px 6px -1px rgba(0, 0, 0, 0.05),
		0 2px 4px -1px rgba(0, 0, 0, 0.03);
	/* Анимация легкого покачивания при наведении */
	transition: transform 0.2s ease;

	&:hover {
		transform: scale(1.03);
	}

	label {
		margin-left: 8px;
		font-size: 18px;
		color: #475569;
		font-weight: 500;
	}

	@media screen and (max-width: 768px) {
		font-size: 22px;
		label {
			font-size: 16px;
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
	/* Заменили скучную серую рамку на полноценную карточку */
	background: #ffffff;
	border: none;
	border-radius: 14px;
	padding: 16px;
	margin-bottom: 12px;
	box-sizing: border-box;
	box-shadow:
		0 4px 6px -1px rgba(0, 0, 0, 0.05),
		0 2px 4px -1px rgba(0, 0, 0, 0.03);
	transition: all 0.2s ease-in-out;

	/* Эффект приподнимания карточки при наведении */
	&:hover {
		transform: translateY(-3px);
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}

	p {
		padding: 0;
		margin: 0;
		color: #334155;
		font-weight: 500;
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
	padding: 30px 0;
	width: 100%;

	a {
		display: flex;
		color: #6366f1; /* Ссылки теперь красивого фиолетового цвета */
		text-decoration: none;
		font-weight: 600;
		transition: color 0.2s ease;

		&:hover {
			color: #4f46e5; /* Потемнение при наведении */
			text-decoration: underline;
		}
	} /* Исправлена закрывающая скобка */
`;
