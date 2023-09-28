import React, { useState } from 'react';

import Button from "./button";
import Card from "./card";
import Input from "./input";

interface Props {
	onSave: (value: string) => void
	description: string
}

const Form = ({ description, onSave }: Props) => {
	const [value, setValue] = useState('');
	// TODO use form validation?

	const handleChange = (e: React.KeyboardEvent) => {
		setValue(e.target.value);
	}

	const handleSubmit = () => {
		onSave(value);
	}

	return (
		<Card>
			{description}
      		<Input onChange={handleChange} />
      		<Button text="Save" onClick={handleSubmit} />
    	</Card>
	)
}

export default Form;