import styled from "styled-components";

const BACKGROUND_COLOR = "#1e90ff";

export const Bubble = styled.div`
    background-color: ${BACKGROUND_COLOR};
    border: 1px solid ${BACKGROUND_COLOR};
    border-radius: 12px;
    padding: 10px 15px;
    position: relative;
    width: 100%;
    font-size: 14px;
    color: white;
`;

const FadedBubble = styled(Bubble)`
    opacity: 0.5;
`;

const LeftBubble = styled(Bubble)`
    &:after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 20px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid ${BACKGROUND_COLOR};
        transform: translateX(-50%);
    }
`;

const RightBubble = styled(Bubble)`
    &:after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: calc(100% - 20px);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid ${BACKGROUND_COLOR};
        transform: translateX(-50%);
    }
`;

const SpeechBubble = ({
    text,
    anchor = "left",
    isCurrent,
}: {
    text: string;
    anchor?: "left" | "right";
    isCurrent: boolean;
}) => {
    let BubbleComponent = FadedBubble;

    if (isCurrent) {
        if (anchor === "left") {
            BubbleComponent = LeftBubble;
        } else {
            BubbleComponent = RightBubble;
        }
    }

    return <BubbleComponent>{text}</BubbleComponent>;
};

export default SpeechBubble;
