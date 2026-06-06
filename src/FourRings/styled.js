import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 100%; /* Изменено с auto на 100% для корректного заполнения */
	height: 100vh; /* Использование vh предотвращает схлопывание на мобильных */
	flex-direction: column;
	padding: 0 15px; /* Боковые отступы, чтобы контент не лип к краям экрана */
	box-sizing: border-box;

	@media screen and (max-width: 768px) {
		justify-content: flex-start; /* Изменено на flex-start, чтобы контент не прыгал в центр */
		align-items: center;
		height: auto; /* На мобильных лучше позволить контенту растягивать контейнер вниз */
	}
`;

export const Header = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	padding: 50px 0 10px 0;

	p {
		color: gray;
		font-size: 14px; /* Чуть уменьшили для мобильных */
	}

	h1 {
		color: black;
		margin: 0 0 10px 0;
		font-size: 24px;

		@media screen and (max-width: 768px) {
			font-size: 20px; /* Уменьшаем размер заголовка на смартфонах */
		}
	}

	h2 {
		color: black;
		margin: 0;
		font-size: 18px;

		@media screen and (max-width: 768px) {
			font-size: 16px; /* Уменьшаем подзаголовок */
		}
	}
`;

export const Rank = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%; /* Чтобы на мобильных занимал всю ширину */
	align-items: center;
`;

export const HoursWorked = styled.div`
	display: flex;
	width: 100%; /* Перевели на проценты для гибкости */
	max-width: 300px; /* Ограничили максимальную ширину */
	justify-content: center;
	text-align: center;
	flex-direction: column;
	margin-bottom: 15px;

	input {
		outline: none;
		border: 1px solid black;
		border-radius: 5px;
		width: 100%; /* Инпут растягивается по ширине родителя */
		height: 40px; /* Увеличена высота, чтобы на мобильном было удобно тапать пальцем */
		padding: 10px 15px;
		box-sizing: border-box;
		font-size: 16px; /* Предотвращает автоматическое увеличение (zoom) в iOS Safari */
	}
`;

export const TotalMoney = styled.div`
	display: flex; /* Изменено с flow на flex для лучшего контроля центрирования */
	justify-content: center;
	align-items: center;
	text-align: center;
	width: auto;
	font-size: 24px;
	margin: 15px 0;

	label {
		margin-left: 5px;
		font-size: 18px;
	}

	@media screen and (max-width: 768px) {
		font-size: 20px;
		label {
			font-size: 16px;
		}
	}
`;

export const Info = styled.div`
	display: flex;
	justify-content: center;
	align-items: center; /* Центрируем вложенные элементы */
	flex-direction: column;
	width: 100%;
`;

export const Category = styled.div`
	display: grid;
	width: 100%; /* Сделали адаптивным */
	max-width: 280px; /* Ограничение, чтобы не было слишком широко */
	justify-content: center;
	text-align: center;
	border: 1px solid gray;
	padding: 10px; /* Увеличили отступы для читаемости */
	margin-bottom: 10px;
	box-sizing: border-box;

	p {
		padding: 0;
		margin: 0;
	}
`;

export const ContainerRating = styled.div`
	display: flex;
	width: 100%;
	gap: 10px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Footer = styled.div`
	display: flex; /* display: contents плохо работает с отступами, заменено на flex */
	justify-content: center;
	align-items: center;
	text-align: center;
	flex-direction: column;
	color: #6a7282;
	font-size: 0.875rem;
	margin-top: auto; /* Прижимает футер к низу, если контента мало */
	padding: 20px 0;
	width: 100%;

	a {
		display: flex;
		color: inherit;
		text-decoration: none;
	}
`;
