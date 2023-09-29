import React, { useState, useCallback } from "react";
import "./App.css";

import Form from "./components/form";
import { SESSION_STORAGE_API_KEY, Steps } from "./constants";
import useUiSteps from "./hooks/use-ui-steps";
import Conversation from "./conversation";
import Silhouette from "./components/silhouette";
import styled, { createGlobalStyle } from "styled-components";
import { Layers } from "./constants";
import Card from "./components/card";

const GlobalStyle = createGlobalStyle`
    body {
        overflow: hidden;
        background-color: #dfe4ea;
    }
`;

const CenteredForm = styled(Form)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: ${Layers.Foreground};
`;

const LeftForm = styled(CenteredForm)`
    left: 5%;
    transform: translate(50%, -50%);
`;

const RightForm = styled(CenteredForm)`
    left: auto;
    right: 5%;
`;

const FinalCard = styled(Card)`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: ${Layers.Priority};
    margin-top: 10px;
`;

const App = () => {
    // Grab the API key from session storage if it exists
    const [apiKey, setApiKey] = useState<string | undefined>(() => {
        const key = sessionStorage.getItem(SESSION_STORAGE_API_KEY);

        if (key) return key;
        return undefined;
    });
    const [agentAPosition, setAgentAPosition] = useState("");
    const [agentBPosition, setAgentBPosition] = useState("");
    const [turn, setTurn] = useState<"a" | "b">("a");
    const [step, setStep] = useUiSteps(apiKey, agentAPosition, agentBPosition);

    const handleKeySubmission = useCallback((value: string) => {
        setApiKey(value);
        // set in session storage
        sessionStorage.setItem(SESSION_STORAGE_API_KEY, value);
    }, []);

    const handleAgentASubmit = useCallback((value: string) => {
        setAgentAPosition(value);
    }, []);

    const handleAgentBSubmit = useCallback((value: string) => {
        setAgentBPosition(value);
    }, []);

    const handleFinish = useCallback(() => {
        setStep(Steps.Conclusion);
    }, [setStep]);

    return (
        <>
            <GlobalStyle />
            {step === Steps.Intake && (
                <CenteredForm
                    title="Welcome to Chatty Agents!"
                    description="You will pit two AI agents against each other in a spirited debate. Let's get started by entering your OpenAI API key"
                    onSave={handleKeySubmission}
                    inputName="api-key"
                    inputLabel="Key"
                />
            )}
            {step === Steps.PositionOne && (
                <LeftForm
                    title="Enter Agent A's position"
                    onSave={handleAgentASubmit}
                    inputName="agent-a-position"
                    inputLabel="Position"
                    description="This is the position 'Agent A' will argue for. Write a short & concise declarative sentence."
                />
            )}
            {step === Steps.PositionTwo && (
                <RightForm
                    title="Enter Agent B's position"
                    onSave={handleAgentBSubmit}
                    inputName="agent-b-position"
                    inputLabel="Position"
                    description={`This is the position 'Agent B' will argue for. This should be the opposite stance to "${agentAPosition}".`}
                />
            )}
            {step === Steps.Debate || step === Steps.Conclusion ? (
                <Conversation
                    turn={turn}
                    setTurn={setTurn}
                    apiKey={apiKey ?? ""}
                    agentAPosition={agentAPosition}
                    agentBPosition={agentBPosition}
                    onFinish={handleFinish}
                />
            ) : null}
            {step === Steps.Conclusion && (
                <FinalCard>
                    <p>We're out of time, that's a wrap!</p>
                </FinalCard>
            )}
            <Silhouette
                $anchor="left"
                text={agentAPosition}
                $faded={step === Steps.PositionTwo}
                $pulsing={step === Steps.Debate && turn === "a"}
            />
            <Silhouette
                $anchor="right"
                text={agentBPosition}
                $faded={step === Steps.PositionOne}
                $pulsing={step === Steps.Debate && turn === "b"}
            />
        </>
    );
};

export default App;
