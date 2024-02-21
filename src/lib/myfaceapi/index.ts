import * as faceapi from "face-api.js";

const MODEL_URL = import.meta.env.BASE_URL + 'vendor/models';

const showConfig: ShowProps = {
    detectionBox: true,
    faceLandmark: true,
    expressions: true,
}

let scoreToActionConfig: number | null = null;

/**
 * Classe para inicializar e controlar a biblioteca "faceapi".
 */
export class MyFaceApi {
    private readonly elements: ElementsProps;
    private readonly display: DisplayProps;
    private actions: ActionsProps;

    constructor({elements, display, actions}: InitProps) {
        if (!elements || !display) throw new Error('configuração inválida');

        this.elements = elements;
        this.display = display;
        this.actions = actions;
    }

    /**
     * Altera a visualização do reconhecimento pela chave da configuração, atribuindo o valor contrário ao atual.
     * @param key Chave da configuração.
     */
    public switchShowConfigByKey = (key: keyof ShowProps): void => {
        showConfig[key] = !showConfig[key];
    }

    /**
     * Altera a visualização do reconhecimento pela chave da configuração, atribuindo o valor contrário ao atual.
     * @param score Chave da configuração.
     */
    public switchScoreToActionConfig = (score: number | null): void => {
        scoreToActionConfig = score;
    }

    /**
     * Carrega os modelos do reconhecimento facial.
     */
    private loadModels = async (): Promise<void> => {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
    }

    /**
     * Inicializa o desenho no canvas com basa no reconhecimento facial.
     */
    private play = (): void => {
        const {video, canvas} = this.elements;

        if (!video || !canvas) return;

        faceapi.matchDimensions(canvas, this.display.size);

        setInterval(async () => {
            const detections = await faceapi
                .detectSingleFace(
                    video,
                    new faceapi.TinyFaceDetectorOptions(),
                )
                .withFaceLandmarks()
                .withFaceExpressions();

            if (!detections) return;

            if (
                this.actions?.onAchieveScore
                && detections
                && scoreToActionConfig
                && detections.detection.score > scoreToActionConfig
            )
                this.actions.onAchieveScore();

            const ctx = canvas.getContext('2d');
            const resizedDetections = faceapi.resizeResults(detections, this.display.size);

            if (!ctx || !resizedDetections) return {};

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            showConfig?.detectionBox && faceapi.draw.drawDetections(canvas, resizedDetections);
            showConfig?.faceLandmark && faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            showConfig?.expressions && faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }, 100);
    }

    /**
     * Inicializa o reconhecimento facial.
     */
    public init = async (): Promise<void> => {
        try {
            const {video, canvas} = this.elements;

            if (!video || !canvas) return;

            await this.loadModels();

            this.play();
        } catch (err: unknown) {
            console.log('### error', err);
        }
    }
}
