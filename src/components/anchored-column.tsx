import React, { useEffect, useRef } from 'react';
import styled from "styled-components";
import SpeechBubble from "./speech-bubble";
import { Layers } from '../helpers/constants';


const Column = styled.div`
	flex: 0 1 30%;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: scroll;
	z-index: ${Layers.Main};
	padding: 0 50px;
	max-height: 50vh;


	&::-webkit-scrollbar {
    	display: none;
	}

	scrollbar-width: none;
  	-ms-overflow-style: none;
`

const AnchoredColumn = ({ speechBubbleAnchor, responses }: { speechBubbleAnchor: 'left' | 'right', responses: string[] }) => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;
		const scrollHeight = containerRef.current.scrollHeight;

		containerRef.current.scrollTop = scrollHeight;

	}, [responses.length]);

	return (
		<Column ref={containerRef}>
			{responses.map((response, idx) => (<SpeechBubble text={response} anchor={speechBubbleAnchor} isCurrent={idx === responses.length - 1} />))}
		</Column>
	);
};

export default AnchoredColumn;