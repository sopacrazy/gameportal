# Game Portal

Portal web de jogos HTML5/WebGL feito com React + Vite.

Esta versao esta configurada como **frontend-only** para facilitar deploy na Vercel. O catalogo carrega o feed JSON da GamePix no navegador.

## Como instalar

```bash
cd frontend
npm install
```

## Como rodar localmente

```bash
cd frontend
npm run dev
```

O site ficara em:

```text
http://localhost:5173
```

## Como fazer build

```bash
cd frontend
npm run build
```

## APK Android com Capacitor

O projeto Android fica em:

```text
frontend/android
```

Comandos principais:

```bash
cd frontend
npm run cap:sync
```

Para abrir no Android Studio:

```bash
cd frontend
npm run android
```

Para gerar APK debug pelo terminal:

```bash
cd frontend
npm run android:debug
```

O APK debug, quando o ambiente Android estiver configurado, sera gerado em:

```text
frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

Requisitos da maquina para compilar:

```text
JDK valido no JAVA_HOME
Android Studio ou Android SDK instalado
SDK Android 36 instalado
```

Neste computador, o projeto Capacitor ja foi criado e sincronizado, mas a compilacao parou porque `JAVA_HOME` aponta para uma pasta que nao existe:

```text
C:\Program Files\Android\Android Studio\jbr
```

## Deploy na Vercel

O deploy usa o arquivo `vercel.json` da raiz:

```json
{
  "installCommand": "npm install --prefix frontend",
  "buildCommand": "npm run build --prefix frontend",
  "outputDirectory": "frontend/dist"
}
```

Nao existe backend no deploy atual.

## Feed da GamePix

O feed usado fica em:

```text
https://feeds.gamepix.com/v2/json?sid=6A8M0&pagination=24&page=
```

O frontend carrega as primeiras paginas do feed em:

```text
frontend/src/services/api.js
```

Nao remova o parametro `sid`, porque ele identifica sua conta/estatisticas na GamePix.

## Fallback local

Edite:

```text
frontend/src/data/games.js
```

No momento o fallback local esta vazio para manter somente jogos da GamePix no portal.

Cada jogo usa esta estrutura:

```js
{
  id,
  provider,
  providerGameId,
  title,
  slug,
  description,
  category,
  categories,
  tags,
  thumbnail,
  gameUrl,
  width,
  height
}
```

## Fluxo do site

```text
abrir site
carregar catalogo da GamePix
clicar em um jogo
abrir pagina do jogo
jogo rodar dentro do iframe
```
