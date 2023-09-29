import styled from "styled-components";

interface Props {
	text: string;
	onClick?: () => void;
	className?: string;
	buttonType?: 'default' | 'success';
}

export const DefaultButton = styled.button`
	padding: 8px 15px;
	border-radius: 6px;
	border: none;
	font-weight: 500;
	background-color: #a4b0be;
	color: #2f3542;
`;

const SuccessButton = styled(DefaultButton)`
	background-color: #19ca7a;
	color: white;
`

const Button = ({ text, onClick, className, buttonType, ...props }: Props & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
	const Component = buttonType === 'success' ? SuccessButton : DefaultButton;

	return (
		<Component {...props} onClick={onClick} className={className}>{text}</Component>
	)
};

export default Button;