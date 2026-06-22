import styled, { keyframes } from "styled-components";

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

// Пульсирующий эффект для активного инпута
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
	min-height: 100dvh;
	flex-direction: column;
	padding: 0 20px;
	box-sizing: border-box;
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
	background: #ffffff;
	border: none;
	border-radius: 14px;
	padding: 18px 16px;
	margin-bottom: 4px;
	box-sizing: border-box;
	box-shadow:
		0 4px 6px -1px rgba(0, 0, 0, 0.05),
		0 2px 4px -1px rgba(0, 0, 0, 0.03);
	transition: all 0.2s ease-in-out;
	-webkit-tap-highlight-color: transparent;

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

export const TotalMoney = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: auto;
	font-size: 26px;
	font-weight: 700;
	color: #10b981;
	margin: 12px 0 0 0;
	background: #f8fafc;
	padding: 10px 20px;
	border-radius: 12px;
	transition:
		transform 0.2s ease,
		background-color 0.2s ease;

	@media (hover: hover) {
		&:hover {
			transform: scale(1.02);
		}
	}

	&:active {
		transform: scale(0.98);
		background-color: #f1f5f9;
	}

	label {
		margin-left: 6px;
		font-size: 16px;
		color: #64748b;
		font-weight: 500;
	}

	@media screen and (max-width: 768px) {
		font-size: 22px;
		padding: 8px 16px;

		label {
			font-size: 14px;
		}
	}
`;

export const HoursWorked = styled.div`
	display: flex;
	width: 100%;
	max-width: 320px;
	justify-content: center;
	align-self: center;
	flex-direction: column;
	margin: 30px 0 20px 0;

	p {
		margin: 0 0 8px 4px;
		color: #475569;
		font-size: 14px;
		font-weight: 600;
		text-align: left;
	}

	input {
		outline: none;
		border: 2px solid #cbd5e1;
		border-radius: 12px;
		width: 100%;
		height: 52px;
		padding: 10px 16px;
		box-sizing: border-box;
		font-size: 16px;
		color: #1e293b;
		background-color: #ffffff;
		transition: all 0.3s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
		appearance: none;
		-webkit-appearance: none;

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

export const Footer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	flex-direction: column;
	color: #94a3b8;
	font-size: 0.875rem;
	margin-top: auto;
	padding: 40px 0 24px 0;
	width: 100%;

	a {
		display: flex;
		color: #6366f1;
		text-decoration: none;
		font-weight: 600;
		transition: color 0.2s ease;
		padding: 10px;

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
