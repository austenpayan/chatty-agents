import React from 'react';
import styled from "styled-components";

const Label = ({ children, ...props }: { children: React.ReactNode } & React.HTMLProps<HTMLLabelElement>) => {
	return (
		<label {...props}>{children}</label>
	)
}

export default styled(Label)`
	font-size: 13px;
`;