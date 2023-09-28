interface Props {
	text: string;
	onClick: () => void
}

const Button = ({ text, onClick }: Props) => {
	return (
		<button onClick={onClick}>{text}</button>
	)
};

export default Button;