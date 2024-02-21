# ReactJS Face Recognition #

Este repositório demonstra como usar a biblioteca `face-api.js` para implementar reconhecimento facial em uma 
aplicação ReactJS. A aplicação captura a imagem da webcam do usuário e detecta/identifica um rosto,
podendo disparar alguma ação quando a detecção for maior que x%.

> Como esta aplicação foi utilizada para uma POC pessoal, algumas configurações podem estar personalizadas para o meu
> caso de uso.
> 
> Por exemplo: a biblioteca suporta detecção de múltiplos rostos, mas no meu caso é necessário a detecção de
> apenas um rosto.

## Bibliotecas utilizadas ##

- Webcam: [react-webcam](https://github.com/mozmorris/react-webcam)
- Reconhecimento facial: [face-api.js](https://github.com/justadudewhohacks/face-api.js)

## Início rápido ##

### Configurar ###

- Instalar as dependências.
    ```bash
    npm i
    ```
### Executar ###

- Para inicializar o projeto em modo de desenvolvimento, utilize o seguinte comando:
    ```bash
    npm run dev
    ```
  
> O projeto irá inicializar por padrão na porta 3000.
> [Clique aqui](http://localhost:3000/reactjs-face-recognition/) para abrir o projeto no seu navegador padrão.
