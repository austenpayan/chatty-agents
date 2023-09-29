import React, { useCallback, useState } from "react";

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

const ErrorMessage = styled.span`
    font-size: 12px;
    font-weight: normal;
    margin: 0;
    color: #ff4757;
    margin-left: 5px;
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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (errorMessage) {
                setErrorMessage(null);
            }
            setValue(e.target.value);
        },
        [errorMessage]
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!value) {
            setErrorMessage("Please enter a value");
            return;
        }

        onSave(value);
    };

    return (
        <Card className={className}>
            <form onSubmit={handleSubmit}>
                <Title>{title}</Title>
                {description && <Description>{description}</Description>}
                <Label htmlFor={inputName}>
                    {inputLabel}
                    {errorMessage && (
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                    )}
                </Label>
                <Input onChange={handleChange} name={inputName} autoFocus />
                <Button text="Save" type="submit" buttonType="success" />
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
