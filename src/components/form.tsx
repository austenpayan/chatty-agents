import React, { useState } from 'react';

import Button from "./button";
import Card from "./card";
import Input from "./input";
import styled from 'styled-components';

interface Props {
	onSave: (value: string) => void
	description: string;
	className?: string;
}

const Form = ({ description, onSave, className }: Props) => {
	const [value, setValue] = useState('');
	// TODO use form validation?

	const handleChange = (e: React.KeyboardEvent) => {
		setValue(e.target.value);
	}

	const handleSubmit = () => {
		onSave(value);
	}

	return (
		<Card className={className}>
			{description}
      		<Input onChange={handleChange} />
      		<Button text="Save" onClick={handleSubmit} />
    	</Card>
	)
}

export default Form;