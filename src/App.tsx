import React, { useState, useCallback } from 'react';
import './App.css';

import Form from './components/form';
import { SESSION_STORAGE_API_KEY, Steps } from './constants';
import useUiSteps from './hooks/use-ui-steps';
import Conversation from './conversation';

const App = () => {
    const [apiKey, setApiKey] = useState<string | undefined>(() => {
        const key = sessionStorage.getItem(SESSION_STORAGE_API_KEY);

        if (key) return key;
        return undefined;
    });
    const [agentAPosition, setAgentAPosition] = useState('New York is the best city');
    const [agentBPosition, setAgentBPosition] = useState('LA is the best city');
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
        <div>
            <div>
                {`Api key is: ${apiKey}`}
                {`Agent A position is: ${agentAPosition}`}
                {`Agent B position is: ${agentBPosition}`}
            </div>
            {step === Steps.Intake && (
                <Form description="Enter your OpenAI API key" onSave={handlekeySubmission} />
            )}
            {step === Steps.PositionOne && (
                <Form description="Enter Agent A's position" onSave={handleAgentASubmit} />
            )}
            {step === Steps.PositionTwo && (
                <Form description="Enter Agent B's position" onSave={handleAgentBSubmit} />
            )}
            {step === Steps.Debate && (
                <Conversation apiKey={apiKey} agentAPosition={agentAPosition} agentBPosition={agentBPosition} />
            )}
        </div>
    );
}

export default App;
