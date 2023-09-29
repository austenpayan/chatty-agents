export const SESSION_STORAGE_API_KEY = 'openAIkey';
export enum Steps {
    Intake = 0,
	Instructions = 1,
    PositionOne = 2,
    PositionTwo = 3,
    Debate = 4,
	Conclusion = 5,
}
export enum Layers {
	Background = 0,
	Main = 1,
	Foreground = 2,
	Priority = 3,
}
export const RESPONSE_INTERVAL_MS = 8000;
export const TESTING_MODE = false;
export const RESPONSES_ALLOWED = 10;