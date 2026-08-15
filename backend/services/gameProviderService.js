async function syncGamesFromProvider() {
  console.log("Sincronizacao com provedor ainda nao configurada.");

  return {
    status: "not_configured",
    message: "Configure GAME_PROVIDER_API_URL e GAME_PROVIDER_API_KEY para integrar um provedor autorizado."
  };
}

module.exports = {
  syncGamesFromProvider
};
