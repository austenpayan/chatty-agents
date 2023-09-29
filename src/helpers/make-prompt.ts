export default function makePrompt(position: string, previousResponses: string[] = [], opponentPosition: string, lastOpponentsResponse?: string) {
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