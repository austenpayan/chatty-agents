import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import makePrompt from "./helpers/make-prompt";
import makeRequest from "./helpers/make-request";
import AnchoredColumn from "./components/anchored-column";
import {
    RESPONSES_ALLOWED,
    RESPONSE_INTERVAL_MS,
    TESTING_MODE,
} from "./constants";
import Button from "./components/button";
import Card from "./components/card";

interface Props {
    apiKey: string;
    agentAPosition: string;
    agentBPosition: string;
    turn: "a" | "b";
    setTurn: (turn: "a" | "b") => void;
    onFinish: () => void;
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    width: 80%;
    margin: auto;
    overflow: hidden;
    height: 100vh;
`;

const TestingButton = styled(Button)`
    position: absolute;
    top: 0;
    left: 0;
`;

const CenteredCard = styled(Card)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const Conversation = ({
    apiKey,
    agentAPosition,
    agentBPosition,
    turn,
    setTurn,
    onFinish,
}: Props) => {
    const [agentAResponses, setAgentAResponses] = useState<string[]>([]);
    const [agentBResponses, setAgentBResponses] = useState<string[]>([]);
    const locked = useRef(false);
    const [responseCount, setResponseCount] = useState<number>(0);
    const [didError, setDidError] = useState(false);

    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (
            locked.current === false &&
            !paused &&
            !didError &&
            responseCount < RESPONSES_ALLOWED
        ) {
            locked.current = true;

            let position = null;
            let opponentPosition = null;
            let responses = null;
            let lastOpponentResponse = undefined;

            if (turn === "a") {
                position = agentAPosition;
                opponentPosition = agentBPosition;
                responses = agentAResponses;
                lastOpponentResponse =
                    agentBResponses.length > 0
                        ? agentBResponses[agentBResponses.length - 1]
                        : undefined;
            } else {
                position = agentBPosition;
                opponentPosition = agentAPosition;
                responses = agentBResponses;
                lastOpponentResponse =
                    agentAResponses.length > 1
                        ? agentAResponses[agentAResponses.length - 1]
                        : undefined;
            }

            const prompt = makePrompt(
                position,
                responses,
                opponentPosition,
                lastOpponentResponse
            );

            makeRequest(apiKey, prompt)
                .then((response) => {
                    if (response) {
                        if (turn === "a") {
                            setAgentAResponses((prev) => [...prev, response]);
                        } else {
                            setAgentBResponses((prev) => [...prev, response]);
                        }
                    }

                    // set the response count so we don't get too carried away
                    setResponseCount(responseCount + 1);

                    // Set a timeout to throttle the amount of requests going out
                    setTimeout(() => {
                        locked.current = false;
                        setTurn(turn === "a" ? "b" : "a");
                    }, RESPONSE_INTERVAL_MS);
                })
                .catch(() => {
                    setDidError(true);
                    locked.current = true;
                });
        }

        if (responseCount >= RESPONSES_ALLOWED) {
            onFinish();
            locked.current = true;
        }
    }, [
        apiKey,
        agentAPosition,
        agentAResponses,
        didError,
        turn,
        agentBPosition,
        agentBResponses,
        paused,
        setTurn,
        responseCount,
        onFinish,
    ]);

    const togglePaused = useCallback(() => {
        if (paused) {
            setPaused(false);
        } else {
            setPaused(true);
        }
    }, [paused]);

    return (
        <Container>
            {didError ? (
                <CenteredCard>
                    Something went wrong. It's possible the API key was
                    submitted incorrectly. Open a new tab to start over.
                </CenteredCard>
            ) : null}
            <AnchoredColumn
                responses={agentAResponses}
                speechBubbleAnchor="left"
            />
            <AnchoredColumn
                responses={agentBResponses}
                speechBubbleAnchor="right"
            />
            {TESTING_MODE ? (
                <TestingButton
                    onClick={togglePaused}
                    text={paused ? "Unpause" : "Pause"}
                />
            ) : null}
        </Container>
    );
};

export default Conversation;
