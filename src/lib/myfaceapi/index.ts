import * as faceapi from "face-api.js";

const MODEL_URL = '/models';

const loadModels = async (): Promise<void> => {
    await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ])
}


export const init = async ({
                               elements,
                               display,
                               show = {
                                   detectionBox: true,
                                   faceLandmark: true,
                                   expressions: true,
                               },
                           }: InitProps): Promise<{ func?: () => void } | undefined> => {
    try {
        await loadModels();

        const {video, canvas} = elements;

        if (!video || !canvas) return {}

        const handlePlay = (): void => {
            faceapi.matchDimensions(canvas, display.size);

            setInterval(async () => {
                const detections = await faceapi
                    .detectSingleFace(
                        video,
                        new faceapi.TinyFaceDetectorOptions(),
                    )
                    .withFaceLandmarks()
                    .withFaceExpressions();

                if (!detections) return;

                const ctx = canvas.getContext('2d');
                const resizedDetections = faceapi.resizeResults(detections, display.size);

                if (!ctx || !resizedDetections) return {}

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                show?.detectionBox && faceapi.draw.drawDetections(canvas, resizedDetections);
                show?.faceLandmark && faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
                show?.expressions && faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            }, 100);
        }

        // Atualizar o canvas em tempo real
        video.addEventListener('play', handlePlay);

        return {func: handlePlay};
    } catch (err: unknown) {
        alert('Não foi possível carregar os modelos, verifique no console!')
        console.log('### error', err)
    }
};
