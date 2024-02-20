interface ShowProps {
    detectionBox: boolean;
    faceLandmark: boolean;
    expressions: boolean;
}

interface ElementsProps {
    video: HTMLVideoElement | null;
    canvas: HTMLCanvasElement | null;
}

interface DisplayProps {
    size: {
        width: number;
        height: number;
    }
}

interface InitProps {
    elements: ElementsProps;
    display: DisplayProps;
}
