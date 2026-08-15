# Game Portal

Projeto web simples para validar um portal de jogos online com frontend React + Vite e backend Node.js + Express.

O fluxo desta primeira versao e:

```text
abrir site
carregar lista de jogos
clicar em um jogo
abrir pagina do jogo
jogo rodar dentro do iframe
```

## Como instalar

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

## Como rodar

Em um terminal, rode a API:

```bash
cd backend
npm run dev
```

A API ficara em:

```text
http://localhost:3001
```

Em outro terminal, rode o frontend:

```bash
cd frontend
npm run dev
```

O site ficara em:

```text
http://localhost:5173
```

## Onde colocar as URLs dos jogos

Edite o arquivo:

```text
backend/data/games.js
```

Troque o valor abaixo pela URL oficial fornecida pela GameDistribution ou por outro distribuidor autorizado:

```js
gameUrl: "URL_DO_JOGO_AQUI"
```

Nao foram adicionadas URLs reais de jogos neste projeto. Use somente URLs de jogos que voce recebeu de um provedor autorizado.

Para jogos da GameDistribution, use o formato recomendado por eles:

```text
https://html5.gamedistribution.com/GAME_ID/?gd_sdk_referrer_url=URL_DA_PAGINA_DO_JOGO
```

No frontend, quando o jogo tiver `provider: "gamedistribution"`, o parametro `gd_sdk_referrer_url` e ajustado automaticamente para a URL atual da pagina do jogo. Em desenvolvimento, por exemplo, o Park Fever usa:

```text
http://localhost:5173/game/park-fever
```

## Onde conectar futuramente a GameDistribution

A estrutura ja esta preparada em:

```text
backend/services/gameProviderService.js
```

Por enquanto, existe apenas a funcao simulada:

```js
async function syncGamesFromProvider() {
  console.log("Sincronizacao com provedor ainda nao configurada.");
}
```

Quando voce tiver a documentacao, endpoint e credenciais oficiais, a integracao pode ser feita nesse service.

Variaveis preparadas em:

```text
backend/.env.example
```

```text
GAME_PROVIDER_API_URL=
GAME_PROVIDER_API_KEY=
```

A rota futura de sincronizacao tambem ja existe:

```text
POST /api/admin/sync-games
```

## Como funciona o iframe

Na pagina individual do jogo, o frontend carrega o jogo com:

```jsx
<iframe
  src={game.gameUrl}
  title={game.title}
  allow="fullscreen; autoplay"
  allowFullScreen
/>
```

Se `gameUrl` ainda estiver como `URL_DO_JOGO_AQUI`, o site mostra um aviso no lugar do iframe para deixar claro que a URL ainda precisa ser configurada.

## Como adicionar novos jogos manualmente

Adicione um novo objeto no array em:

```text
backend/data/games.js
```

Use esta estrutura:

```js
{
  id: 4,
  provider: "gamedistribution",
  providerGameId: "ID_DO_PROVEDOR",
  title: "Nome do Jogo",
  slug: "nome-do-jogo",
  description: "Descricao curta do jogo",
  category: "Action",
  thumbnail: "URL_DA_THUMBNAIL_AQUI",
  gameUrl: "URL_DO_JOGO_AQUI",
  width: 1280,
  height: 720
}
```

O frontend consome a API em:

```text
http://localhost:3001/api
```

Rotas disponiveis:

```text
GET /api/games
GET /api/games/:slug
GET /api/categories
GET /api/search?q=
POST /api/admin/sync-games
```
