import { useState, useEffect } from 'react';
import { Steps } from "../constants";

const useUiSteps = (apiKey: string | undefined, agentAPosition: string | undefined, agentBPosition: string | undefined): [Steps, (step: Steps) => void] => {
	const [step, setStep] = useState<Steps>(Steps.Intake);

    // update steps based on available information
    useEffect(() => {
		let currentStep = Steps.Intake;
		if (step === Steps.Conclusion) return;
		if (apiKey) {
			console.debug('API key is', apiKey);
			currentStep = Steps.PositionOne;
		}
		if (currentStep === Steps.PositionOne && agentAPosition) {
			currentStep = Steps.PositionTwo;
		}
		if (currentStep === Steps.PositionTwo && agentBPosition) {
			currentStep = Steps.Debate;
		}
		if (step !== currentStep) {
			setStep(currentStep);
		}
    }, [step, apiKey, agentAPosition, agentBPosition]);

	return [step, setStep];
}

export default useUiSteps;