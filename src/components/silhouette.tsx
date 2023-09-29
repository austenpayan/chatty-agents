import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Layers } from '../constants';

const pulse = keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
`;

const pulseAnimation = css`
	animation: ${pulse} 2s linear infinite;
`

const Silhouette = ({ className, text }: { className?: string, text?: string }) => {
	return (
		<div className={className}>
			<svg width="305" height="500" xmlns="http://www.w3.org/2000/svg">
				{/* Round head */}
				<circle cx="150" cy="100" r="70" fill="black" />
				{/* Oval body */}
				<ellipse cx="150" cy="370" rx="120" ry="200" fill="black" />
			</svg>
			{text ? (<p>"{text}"</p>) : null}
		</div>
	);
};

export default styled(Silhouette)<{ $anchor?: 'left' | 'right', $faded?: boolean, $pulsing?: boolean; }>`
	color: white;
	position: absolute;
	bottom: -100px;
	pointer-events: none;
	left: ${props => props.$anchor === 'left' ? '0' : 'auto'};
	right: ${props => props.$anchor === 'right' ? '0' : 'auto'};
	z-index: ${Layers.Background};
	opacity: ${props => props.$faded ? '0.25' : '1'};
	filter: blur(${props => props.$faded ? '4px' : '0'});
	${props => props.$pulsing ? pulseAnimation : undefined}

	p {
		position: absolute;
		left: 50%;
		top: 60%;
		transform: translate(-50%, -50%);
		font-size: 13px;
		white-space: no-wrap;
	}
`;