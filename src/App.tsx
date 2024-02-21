import './App.css'
import {useEffect, useRef, useState} from "react";
import Webcam from 'react-webcam';
import {MyFaceApi} from './lib/myfaceapi'

const videoConstraints = {
    width: window.innerWidth - (window.innerWidth * (window.innerWidth > 1200 ? 0.8 : 0.2)),
    height: 600,
    facingMode: 'user',
};

function App() {
    const [canvasClassNames, setCanvasClassNames] = useState<string[]>([]);
    const refWebcam = useRef<Webcam>(null);
    const refCanvas = useRef<HTMLCanvasElement>(null);
    const myfaceapi = useRef<MyFaceApi | null>(null);

    const handleSetCanvasClassName = (className: string): void =>
        setCanvasClassNames((state) => {
            const newState = [...state];

            if (newState.includes(className))
                return newState.filter((item) => item !== className);


            return [...state, className];
        });

    useEffect(() => {
        myfaceapi.current = new MyFaceApi({
            elements: {
                video: refWebcam.current?.video ?? null,
                canvas: refCanvas.current,
            },
            display: {size: {...videoConstraints}},
        });

        myfaceapi.current.init().then();
    }, []);

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
                    style={{...videoConstraints}}
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

                <button onClick={() => myfaceapi.current?.switchShowConfigByKey('detectionBox')}>
                    Mostrar caixa de detecção
                </button>

                <button onClick={() => myfaceapi.current?.switchShowConfigByKey('faceLandmark')}>
                    Mostrar linhas do rosto
                </button>

                <button onClick={() => myfaceapi.current?.switchShowConfigByKey('expressions')}>
                    Mostrar expressões
                </button>
            </div>
        </div>
    )
}

export default App;
