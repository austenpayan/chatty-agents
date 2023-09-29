import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import makePrompt from "./helpers/make-prompt";
import makeRequest from "./helpers/make-request";
import AnchoredColumn from "./components/anchored-column";

interface Props {
	apiKey: string;
	agentAPosition: string;
	agentBPosition: string;
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

const RESPONSE_INTERVAL_MS = 1000;

const Conversation = ({ apiKey, agentAPosition, agentBPosition }: Props) => {
	const [agentAResponses, setAgentAResponses] = useState<string[]>([]);
	const [agentBResponses, setAgentBResponses] = useState<string[]>([]);
	const locked = useRef(false);
	const [turn, setTurn] = useState<'a' | 'b'>('a')

	useEffect(() => {
		if (locked.current === false) {
			locked.current = true;

			let position = null;
			let opponentPosition = null;
			let responses = null;
			let lastOpponentResponse = undefined;

			if (turn === 'a') {
				position = agentAPosition;
				opponentPosition = agentBPosition;
				responses = agentAResponses;
				lastOpponentResponse = agentBResponses.length > 0 ? agentBResponses[agentBResponses.length - 1] : undefined;
			} else {
				position = agentBPosition;
				opponentPosition = agentAPosition;
				responses = agentBResponses;
				lastOpponentResponse = agentAResponses.length > 1 ? agentAResponses[agentAResponses.length - 1] : undefined;
			}

			const prompt = makePrompt(position, responses, opponentPosition, lastOpponentResponse);

			makeRequest(apiKey, prompt, true).then((response) => {
				if (response) {
					if (turn === 'a') {
						setAgentAResponses((prev) => [...prev, response]);
					} else {
						setAgentBResponses((prev) => [...prev, response]);
					}
				}

				setTimeout(() => {
					locked.current = false;
					setTurn(turn === 'a' ? 'b' : 'a');
				}, RESPONSE_INTERVAL_MS);
			});
		}
	}, [apiKey, agentAPosition, agentAResponses, turn, agentBPosition, agentBResponses]);

	return (
		<Container>
			<AnchoredColumn responses={agentAResponses} speechBubbleAnchor="left" />
			<AnchoredColumn responses={agentBResponses} speechBubbleAnchor="right" />
		</Container>
	)
}

export default Conversation;