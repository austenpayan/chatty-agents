import React from 'react';

const Input = ({ onChange }: { onChange: (value: string) => {} }) => {
	return <input onChange={onChange}/>
};

export default Input;