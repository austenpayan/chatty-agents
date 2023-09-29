import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Input = ({
    onChange,
    className,
    autoFocus,
    ...props
}: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
	autoFocus?: boolean;
} & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (autoFocus) {
			if (inputRef.current) {
				inputRef.current.focus();
			  }
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

    return <input {...props} ref={inputRef} className={className} onChange={onChange} autoComplete="off" />;
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
