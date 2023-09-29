import React, { useState, useCallback } from 'react';
import './App.css';

import Form from './components/form';
import { SESSION_STORAGE_API_KEY, Steps } from './constants';
import useUiSteps from './hooks/use-ui-steps';
import Conversation from './conversation';
import Silhouette from './components/silhouette';
import styled, { createGlobalStyle } from 'styled-components';
import { Layers } from './helpers/constants';

const GlobalStyle = createGlobalStyle`
    body {
        overflow: hidden;
    }
`

const CenteredForm = styled(Form)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: ${Layers.Foreground};
`

const LeftForm = styled(CenteredForm)`
    left: 0%;
    transform: translate(50%, -50%);
`

const RightForm = styled(CenteredForm)`
    left: auto;
    right: 0;
`

const App = () => {
    const [apiKey, setApiKey] = useState<string | undefined>(() => {
        const key = sessionStorage.getItem(SESSION_STORAGE_API_KEY);

        if (key) return key;
        return undefined;
    });
    const [agentAPosition, setAgentAPosition] = useState('');
    const [agentBPosition, setAgentBPosition] = useState('');
    const step = useUiSteps(apiKey, agentAPosition, agentBPosition);

    const handlekeySubmission = useCallback((value: string) => {
        // TODO validate
        setApiKey(value);
        // set in session storage
        sessionStorage.setItem(SESSION_STORAGE_API_KEY, value);
    }, [])

    const handleAgentASubmit = useCallback((value: string) => {
        setAgentAPosition(value);
    }, [])

    const handleAgentBSubmit = useCallback((value: string) => {
        setAgentBPosition(value);
    }, []);

    return (
        <>
            <GlobalStyle />
            {step === Steps.Intake && (
                <CenteredForm description="Enter your OpenAI API key" onSave={handlekeySubmission} />
            )}
            {step === Steps.PositionOne && (
                <LeftForm description="Enter Agent A's position" onSave={handleAgentASubmit} />
            )}
            {step === Steps.PositionTwo && (
                <RightForm description="Enter Agent B's position" onSave={handleAgentBSubmit} />
            )}
            {step === Steps.Debate && (
                <Conversation apiKey={apiKey ?? ''} agentAPosition={agentAPosition} agentBPosition={agentBPosition} />
            )}
            <Silhouette $anchor="left" text={agentAPosition} />
			<Silhouette $anchor="right" text={agentBPosition} />
        </>
    );
}

export default App;
