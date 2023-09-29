import { TESTING_MODE } from "./constants";
import { getRandomResponse } from "./test-data";

const makeRequest = async (apiKey: string, prompt: string, testingMode?: boolean) => {

	if (TESTING_MODE) return Promise.resolve(getRandomResponse());

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

	if (data.choices.length) {
		return Promise.resolve(data.choices[0].message.content);
	}

	return Promise.reject('There was a problem creating this response');
}

export default makeRequest;