# Game Portal

Portal web de jogos HTML5/WebGL feito com React + Vite.

Esta versao esta configurada como **frontend-only** para facilitar deploy na Vercel. O catalogo de jogos fica em um arquivo local do frontend.

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

## Onde ficam os jogos

Edite:

```text
frontend/src/data/games.js
```

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

## GameDistribution

Para jogos da GameDistribution, use o formato recomendado por eles:

```text
https://html5.gamedistribution.com/GAME_ID/?gd_sdk_referrer_url=URL_DA_PAGINA_DO_JOGO
```

No frontend, quando o jogo tem `provider: "gamedistribution"`, o parametro `gd_sdk_referrer_url` e ajustado automaticamente para a URL atual da pagina do jogo.

## Fluxo do site

```text
abrir site
carregar catalogo local
clicar em um jogo
abrir pagina do jogo
jogo rodar dentro do iframe
```
