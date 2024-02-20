import './App.css'
import {useEffect, useRef, useState} from "react";
import Webcam from 'react-webcam';
import * as myfaceapi from './lib/myfaceapi'

const videoConstraints = {width: 600, height: 600, facingMode: "user"}

function App() {
    const [canvasClassNames, setCanvasClassNames] = useState<string[]>([]);
    const [drawOptions, setDrawOptions] = useState<ShowProps | undefined>({
        detectionBox: true,
        faceLandmark: true,
        expressions: true
    });
    const refWebcam = useRef<Webcam>(null);
    const refCanvas = useRef<HTMLCanvasElement>(null);
    const refTest = useRef<() => void>();

    const handleSetCanvasClassName = (className: string): void =>
        setCanvasClassNames((state) => {
            const newState = [...state];

            if (newState.includes(className))
                return newState.filter((item) => item !== className);


            return [...state, className];
        });

    useEffect(() => {
        myfaceapi.init({
            elements: {video: refWebcam.current?.video ?? null, canvas: refCanvas.current},
            display: {size: {...videoConstraints}},
            show: drawOptions,
        }).then((res) => (refTest.current = res?.func))
    }, [drawOptions]);

    return (
        <div className="container">
            <div className="display-wrapper">
                <Webcam
                    id="webcam"
                    ref={refWebcam}
                    autoPlay
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />

                <canvas
                    ref={refCanvas}
                    id="overlay"
                    className={canvasClassNames.join(' ')}
                    style={{...videoConstraints}}
                />
            </div>

            <div className="options-wrapper">
                <button onClick={() => handleSetCanvasClassName('show-background')}>
                    Mostrar background do canvas
                </button>

                <button
                    onClick={async () => {
                        console.log('### bah', refTest.current)

                        refTest.current && refWebcam.current?.video?.removeEventListener('play', refTest.current);
                        // refCanvas.current?.remove()

                        // await new Promise(resolve => setTimeout(resolve, 3000));

                        setDrawOptions((state) => {
                            return {...state, detectionBox: !state?.detectionBox};
                        });
                    }}
                >
                    Mostrar caixa de detecção
                </button>
            </div>
        </div>
    )
}

export default App;
