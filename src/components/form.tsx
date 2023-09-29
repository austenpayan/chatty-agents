import React, { useState } from "react";

import Button, { DefaultButton } from "./button";
import Card from "./card";
import Input from "./input";
import styled from "styled-components";
import Label from "./label";

interface Props {
    onSave: (value: string) => void;
    description?: string;
    title: string;
    className?: string;
    inputLabel: string;
    inputName: string;
}

const Title = styled.h1`
    font-size: 16px;
    font-weight: normal;
    margin: 0;
`;

const Description = styled.p`
    font-size: 12px;
	opacity: 0.6;
    font-weight: normal;
    font-style: italic;
    margin: 0;
`;

const Form = ({
    title,
    description,
    onSave,
    className,
    inputName,
    inputLabel,
}: Props) => {
    const [value, setValue] = useState("");
    // TODO use form validation?

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

        onSave(value);
    };

    return (
        <Card className={className}>
            <form onSubmit={handleSubmit}>
                <Title>{title}</Title>
                {description ? <Description>{description}</Description> : null}
                <Label htmlFor={inputName}>{inputLabel}</Label>
                <Input onChange={handleChange} name={inputName} />
                <Button text="Save" type="submit" />
            </form>
        </Card>
    );
};

export default styled(Form)`
    width: 300px;

    ${DefaultButton} {
        margin-top: 10px;
    }

    ${Label} {
        margin-top: 15px;
        display: block;
    }

	${Description} {
		margin-top: 5px;
	}

    ${Input} {
        margin-top: 6px;
    }
`;
