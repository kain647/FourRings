import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	//background-image: url("../../public/bgc.jpg");
	width: auto;
	height: 100%;
	flex-direction: column;
	@media screen and (max-width: 768px) {
		display: flex;
		align-items: center;
		justify-content: center;
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
	}

	h1 {
		color: black;
		margin: 0;
		font-size: 24px;
	}

	h2 {
		color: black;
		margin: 0;
		font-size: 18px;
	}
`;
export const Rank = styled.div`
	display: flex;
	flex-direction: column;
`;
export const HoursWorked = styled.div`
	display: flex;
	width: auto;
	justify-content: center;
	text-align: center;
	flex-direction: column;
	margin-bottom: 15px;

	input {
		outline: none;
		border: 1px solid black;
		border-radius: 5px;
		width: auto;
		height: 30px;
		padding: 10px 15px;
		box-sizing: border-box;
	}
`;
// export const Total = styled.button`
//     display: inline;
//     justify-content: center;
//     text-align: center;
//     margin-bottom: 15px;
//     font-size: 14px;
//     outline: none;
//     border: none;
//     border-radius: 5px;
//     width: 50%;
//     height: 40px;
//     color: #fff;
//     background-color: #6383A8;
//     -webkit-appearance: none;
//     -moz-appearance: none;
//     cursor: pointer;
// `;
export const TotalMoney = styled.div`
	display: flow;
	justify-content: center;
	text-align: center;
	width: auto;
	font-size: 24px;

	label {
		margin-left: 5px;
		font-size: 18px;
	}
`;
export const Info = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
`;
export const Category = styled.div`
	display: grid;
	width: 200px;
	justify-content: center;
	text-align: center;
	border: 1px solid gray;
	padding: 5px;
	margin-bottom: 10px;

	p {
		padding: 0;
		margin: 0;
	}
`;
export const ContainerRating = styled.div``;
export const Footer = styled.div`
	display: contents;
	justify-content: center;
	text-align: center;
	flex-direction: column;
	color: #6a7282;
	font-size: 0.875rem;

	a {
		display: flex;
	}
`;
