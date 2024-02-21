import './App.css';
import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { MyFaceApi } from './lib/myfaceapi';
import { Input } from './components/Input';
import { Button } from './components/Button';

const videoConstraints = {
    width: window.innerWidth - window.innerWidth * (window.innerWidth > 1200 ? 0.8 : 0.2),
    height: 600,
    facingMode: 'user',
};

function App() {
    const [canvasClassNames, setCanvasClassNames] = useState<string[]>([]);
    const [iptValue, setIptValue] = useState<string>('');
    const refWebcam = useRef<Webcam>(null);
    const refCanvas = useRef<HTMLCanvasElement>(null);
    const myfaceapi = useRef<MyFaceApi | null>(null);

    const handleSetCanvasClassName = (className: string): void =>
        setCanvasClassNames((state) => {
            const newState = [...state];

            if (newState.includes(className)) return newState.filter((item) => item !== className);

            return [...state, className];
        });

    const handleAchieveScore = (): void => console.log('### atingiu a pontuação!');

    const handleChangeInputs = (): void => {
        const value = (document.getElementById('ipt-score-to-action') as HTMLInputElement)?.value;

        if (value === '') {
            setIptValue('');
            myfaceapi.current?.switchScoreToActionConfig(null);
            return;
        }

        const minScore = Number(value);

        if (isNaN(minScore) || minScore < 0 || minScore > 100) return;

        setIptValue(minScore + '');
        myfaceapi.current?.switchScoreToActionConfig(minScore / 100);
    };

    useEffect(() => {
        myfaceapi.current = new MyFaceApi({
            elements: {
                video: refWebcam.current?.video ?? null,
                canvas: refCanvas.current,
            },
            display: { size: { ...videoConstraints } },
            actions: { onAchieveScore: handleAchieveScore },
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
                    style={{ ...videoConstraints }}
                />

                <canvas
                    ref={refCanvas}
                    id="overlay"
                    className={canvasClassNames.join(' ')}
                    style={{ ...videoConstraints }}
                />
            </div>

            <div className="options-wrapper">
                <Input
                    id="score-to-action"
                    value={iptValue}
                    label="(console) Pontuação para agir"
                    placeholder="Digite a pontuação mínima"
                    type="number"
                    onChange={handleChangeInputs}
                />

                <div />

                <Button onClick={() => handleSetCanvasClassName('show-background')}>
                    Mostrar background do canvas
                </Button>

                <Button onClick={() => myfaceapi.current?.switchShowConfigByKey('detectionBox')}>
                    Mostrar caixa de detecção
                </Button>

                <Button onClick={() => myfaceapi.current?.switchShowConfigByKey('faceLandmark')}>
                    Mostrar linhas do rosto
                </Button>

                <Button onClick={() => myfaceapi.current?.switchShowConfigByKey('expressions')}>
                    Mostrar expressões
                </Button>
            </div>
        </div>
    );
}

export default App;
