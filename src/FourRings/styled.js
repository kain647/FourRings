import styled, { keyframes, css } from "styled-components";

// Анимации
const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
    0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
    70% { box-shadow: 0 0 0 8px rgba(99, 102, 241, 0); }
    100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
`;

const moneyRainbow = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

export const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 100%;
	min-height: 100vh;
	min-height: 100dvh;
	flex-direction: column;
	padding: 0 20px;
	box-sizing: border-box;
	background: ${(props) => props.theme.background};
	font-family:
		"Inter",
		-apple-system,
		BlinkMacSystemFont,
		sans-serif;
	animation: ${fadeIn} 0.6s ease-out;
	transition: background 0.3s ease;

	@media screen and (max-width: 768px) {
		align-items: center;
		padding: 0 16px;
	}
`;

export const ThemeToggle = styled.button`
	position: absolute;
	top: 20px;
	right: 20px;
	background: ${(props) => props.theme.cardBg};
	border: 2px solid ${(props) => props.theme.border};
	color: ${(props) => props.theme.textMain};
	border-radius: 50%;
	width: 44px;
	height: 44px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
	transition: all 0.2s ease;

	&:active {
		transform: scale(0.95);
	}
`;

export const Header = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	padding: 60px 0 24px 0;
	border-bottom: 1px solid ${(props) => props.theme.border};
	margin-bottom: 30px;
	width: 100%;
	max-width: 600px;
	align-self: center;

	p {
		color: ${(props) => props.theme.textMuted};
		font-size: 14px;
		margin: 0 0 6px 0;
		font-weight: 500;
	}

	h1 {
		color: ${(props) => props.theme.textMain};
		margin: 0 0 8px 0;
		font-size: 32px;
		font-weight: 700;
	}

	h2 {
		color: ${(props) => props.theme.textMuted};
		margin: 0;
		font-size: 18px;
		font-weight: 400;
	}
`;

export const Rank = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	margin-bottom: 24px;

	.rank-title {
		color: ${(props) => props.theme.textMain};
		font-weight: 600;
		margin-bottom: 16px;
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

export const Category = styled.div`
	display: grid;
	width: 100%;
	max-width: 320px;
	justify-content: center;
	text-align: center;
	background: ${(props) => props.theme.cardBg};
	border: 2px solid ${(props) => (props.isCustom ? "#6366f1" : "transparent")};
	border-radius: 14px;
	padding: 18px 16px;
	box-sizing: border-box;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	position: relative;
	transition: all 0.2s ease-in-out;

	.delete-custom {
		position: absolute;
		top: 8px;
		right: 8px;
		background: transparent;
		border: none;
		color: #ef4444;
		cursor: pointer;
		font-size: 16px;
		padding: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.6;
		transition: opacity 0.2s;
		&:hover {
			opacity: 1;
		}
	}

	p {
		padding: 0;
		margin: 0;
		color: ${(props) => props.theme.textMain};
		font-weight: 500;
		font-size: 15px;
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
	margin: 12px 0 0 0;
	padding: 10px 20px;
	border-radius: 12px;

	/* Пункт 4: Пасхалка с переливанием и мешком денег */
	${(props) =>
		props.isRich
			? css`
					background: linear-gradient(
						90deg,
						#10b981,
						#3b82f6,
						#10b981
					);
					background-size: 200% auto;
					color: #ffffff;
					animation: ${moneyRainbow} 2s linear infinite;
					label {
						color: rgba(255, 255, 255, 0.8) !important;
					}
				`
			: css`
					background: ${(props) => props.theme.moneyBg};
					color: #10b981;
				`}

	label {
		margin-left: 6px;
		font-size: 16px;
		color: ${(props) => props.theme.textMuted};
		font-weight: 500;
	}
`;

export const HoursWorked = styled.div`
	display: flex;
	width: 100%;
	max-width: 320px;
	justify-content: center;
	align-self: center;
	flex-direction: column;
	margin: 10px 0 20px 0;

	p {
		margin: 14px 0 8px 4px;
		color: ${(props) => props.theme.textMain};
		font-size: 14px;
		font-weight: 600;
		text-align: left;
	}

	input {
		outline: none;
		border: 2px solid ${(props) => props.theme.border};
		border-radius: 12px;
		width: 100%;
		height: 52px;
		padding: 10px 16px;
		box-sizing: border-box;
		font-size: 16px;
		color: ${(props) => props.theme.textMain};
		background-color: ${(props) => props.theme.cardBg};
		transition: all 0.3s ease;
		appearance: none;
		-webkit-appearance: none;

		&:focus {
			border-color: #4f46e5;
			animation: ${pulse} 1s infinite;
		}
	}
`;

export const ActionButton = styled.button`
	background: #4f46e5;
	color: white;
	border: none;
	border-radius: 12px;
	height: 48px;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;
	margin-top: 15px;
	transition: background 0.2s;

	&:hover {
		background: #4338ca;
	}
	&:disabled {
		background: ${(props) => props.theme.border};
		color: ${(props) => props.theme.textMuted};
		cursor: not-allowed;
	}
`;

export const HistoryContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 320px;
	align-self: center;
	margin-top: 20px;
	background: ${(props) => props.theme.cardBg};
	border-radius: 14px;
	padding: 16px;
	box-sizing: border-box;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

	h3 {
		margin: 0 0 12px 0;
		font-size: 16px;
		color: ${(props) => props.theme.textMain};
		display: flex;
		justify-content: space-between;
		align-items: center;

		button {
			background: transparent;
			border: none;
			color: #ef4444;
			font-size: 12px;
			cursor: pointer;
		}
	}

	.history-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		max-height: 200px;
		overflow-y: auto;
	}

	.history-item {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
		padding: 6px 0;
		border-bottom: 1px solid ${(props) => props.theme.border};
		color: ${(props) => props.theme.textMain};

		span.date {
			color: ${(props) => props.theme.textMuted};
		}
		span.money {
			font-weight: 600;
			color: #10b981;
		}
	}
`;

export const Footer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	flex-direction: column;
	color: ${(props) => props.theme.textMuted};
	font-size: 0.875rem;
	margin-top: auto;
	padding: 40px 0 24px 0;
	width: 100%;

	a {
		color: #6366f1;
		text-decoration: none;
		font-weight: 600;
		padding: 10px;
	}
`;
