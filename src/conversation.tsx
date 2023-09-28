import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface Props {
	apiKey: string;
	agentAPosition: string;
	agentBPosition: string;
}

const ColumnDiv = styled.div`
	display: flex;
`;

function makePrompt(position: string, previousResponses: string[] = [], opponentPosition: string, lastOpponentsResponse?: string) {
	let str = '';

	str += 'You are in a spirited but playful banter debate with another person. '
	str += `Your position is "${position}". Your opponent's position is "${opponentPosition}". `;

	if (!lastOpponentsResponse) {
		str += 'Give me a short one sentence argument for your position. ';
	}

	str += 'Do not start your sentence with words from your position. ';

	if (lastOpponentsResponse) {
		str += `Your opponent's last response was: "${lastOpponentsResponse}". `;
		str += `Give me a short one sentence retort. `;
	}

	if (previousResponses.length) {
		str += 'You have already responded with these arguments, do not use the same argument: ';
		previousResponses.forEach((previousResponse, idx) => {
			if (idx > 0 && idx < previousResponses.length - 1) {
				str += ' and '
			}
			str += `"${previousResponse}". `
		})
	}

	return str;
}

const Conversation = ({ apiKey, agentAPosition, agentBPosition }: Props) => {
	const [agentAResponses, setAgentAResponses] = useState([]);
	const [agentBResponses, setAgentBResponses] = useState([]);
	const locked = useRef(false);
	const [turn, setTurn] = useState<'a' | 'b'>('a')

	useEffect(() => {
		const makeRequest = async (prompt: string) => {
			const response = await fetch('https://api.openai.com/v1/chat/completions', {
				headers: {
					Authorization: `Bearer ${apiKey}`,
						'Content-Type': 'application/json',
					},
					method: "POST",
					body: JSON.stringify({
						"model": "gpt-3.5-turbo",
						"messages": [{"role": "user", "content": prompt}],
						"temperature": 1.5
					})
			})

			const data = await response.json();

			return Promise.resolve(data);

			console.debug('SXP response', data);
		}

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
			// fire API request
			const prompt = makePrompt(position, responses, opponentPosition, lastOpponentResponse);

			console.debug('SXP prompt', prompt);

			makeRequest(prompt).then((data) => {
				if (data.choices.length) {
					const message = data.choices[0].message.content;

					if (turn === 'a') {
						setAgentAResponses((prev) => [...prev, message]);
					} else {
						setAgentBResponses((prev) => [...prev, message]);
					}
				}


				setTimeout(() => {
					locked.current = false;
					setTurn(turn === 'a' ? 'b' : 'a');
				}, 7000);
			});
		}
	}, [apiKey, agentAPosition, agentAResponses, turn, agentBPosition, agentBResponses]);

	return (
		<ColumnDiv>
			<div>{agentAResponses.map((response) => <p>{response}</p>)}</div>
			<div>{agentBResponses.map((response) => <p>{response}</p>)}</div>
		</ColumnDiv>
	)
}

export default Conversation;