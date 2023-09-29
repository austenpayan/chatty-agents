import React from 'react';
import styled from 'styled-components';

const Input = ({ onChange, className, ...props }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, className?: string } & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
	return <input {...props} className={className} onChange={onChange}/>
};

export default styled(Input)`
	width: 100%;
	display: block;
	height: 34px;
	border: 1px solid #dddddd;
	border-radius: 6px;
	padding: 6px 10px;
	box-sizing: border-box;
`;