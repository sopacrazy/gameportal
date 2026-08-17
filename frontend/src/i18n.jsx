import { createContext, useContext, useEffect, useMemo, useState } from "react";

const DEFAULT_LOCALE = "en";
const STORAGE_KEY = "pitugames.locale";

const messages = {
  "pt-BR": {
    "app.title": "Pitugames - Jogos gratis",
    "app.loadingGames": "Carregando jogos...",
    "app.noGames": "Nenhum jogo encontrado.",
    "app.scrollTop": "Voltar ao topo",
    "app.notInformed": "Nao informado",
    "nav.home": "Pagina Inicial",
    "nav.recent": "Recentes",
    "nav.new": "Novo",
    "nav.trending": "Trending",
    "nav.multiplayer": "Multiplayer",
    "nav.featured": "Tabelas de classificacao",
    "nav.action": "Acao",
    "nav.arcade": "Arcade",
    "nav.adventure": "Aventura",
    "nav.cards": "Cartas",
    "nav.clicker": "De Clicar",
    "nav.driving": "Direcao",
    "nav.sports": "Esportes",
    "nav.strategy": "Estrategia",
    "nav.io": ".io",
    "nav.word": "Palavra",
    "nav.quiz": "Perguntas e Respostas",
    "nav.puzzle": "Quebra-cabeca",
    "nav.simulation": "Simulacao",
    "nav.board": "Tabuleiro",
    "nav.shooter": "Tiro",
    "nav.all": "Todos os jogos",
    "nav.tags": "Tags",
    "nav.search": "Buscar",
    "nav.closeMenu": "Fechar menu",
    "nav.categories": "Categorias do portal",
    "header.openMenu": "Abrir menu",
    "header.searchPlaceholder": "Pesquisar jogos e categorias",
    "header.community": "Comunidade",
    "header.favorites": "Favoritos",
    "header.notifications": "Notificacoes",
    "header.login": "Entrar",
    "header.language": "Idioma",
    "mobile.home": "Inicio",
    "mobile.search": "Procurar",
    "mobile.myGames": "Meus jogos",
    "home.resultsFor": "Resultados para \"{query}\"",
    "home.resultsFound": "{count} jogos encontrados",
    "home.continuePlaying": "Continuar jogando",
    "home.bestForYou": "As melhores opcoes para voce",
    "home.featured": "Jogos em destaque",
    "home.ranking": "Suba no Ranking",
    "home.rankingSubtitle": "Compete com outros jogadores e chega ao topo.",
    "home.brain": "Treine seu cerebro",
    "home.brainSubtitle": "Quebra-cabecas, enigmas e desafios rapidos para jogar agora.",
    "home.adrenaline": "Adrenalina",
    "home.adrenalineSubtitle": "Jogos com aventura, velocidade e reflexos.",
    "home.allGames": "Todos os jogos",
    "home.loadedCount": "{count} jogos carregados no Pitugames.",
    "home.loadingMore": "Carregando mais jogos...",
    "home.keepScrolling": "Continue rolando para ver mais",
    "home.allLoaded": "Todos os jogos desta categoria foram carregados",
    "search.title": "Procurar jogos",
    "search.hint": "Digite o nome ou categoria do jogo",
    "search.placeholder": "Pesquisar jogos e categorias",
    "search.resultsFound": "{count} resultados encontrados",
    "card.hot": "Hot",
    "card.top": "Top",
    "rail.next": "Avancar {title}",
    "game.loadingPrep": "Preparando partida",
    "game.loadingTitle": "Carregando jogo...",
    "game.loadingText": "Estamos buscando o player, imagem e jogos relacionados para abrir tudo com calma.",
    "game.notFound": "Jogo nao encontrado.",
    "game.back": "Voltar",
    "game.play": "Jogar",
    "game.free": "Gratis",
    "game.exit": "Sair",
    "game.exitGame": "Sair do jogo",
    "game.invite": "Convidar amigos",
    "game.share": "Compartilhar",
    "game.fullscreen": "Tela cheia",
    "game.noUrlTitle": "URL do jogo ainda nao configurada.",
    "game.noUrlText": "Verifique o campo gameUrl no feed ou no fallback local do frontend.",
    "game.games": "Jogos",
    "game.developer": "Desenvolvedor:",
    "game.rating": "Classificacao:",
    "game.catalogQuality": "(qualidade do catalogo)",
    "game.released": "Lancado:",
    "game.updated": "Ultima atualizacao:",
    "game.engine": "Motor de jogo:",
    "game.platform": "Plataforma:",
    "game.platformValue": "Navegador (computador, celular, tablet)",
    "game.orientation": "Orientacao:",
    "game.panorama": "Panorama",
    "game.openOriginal": "Abrir original",
    "game.howToPlay": "Como jogar",
    "game.howToPlayText": "Clique no player acima e aguarde o carregamento. Cada jogo pode ter comandos proprios, mas a maioria funciona com mouse, toque na tela ou teclado.",
    "game.mainModes": "Modos de jogo principais",
    "game.mainModesText": "Explore a categoria {category} e descubra fases, desafios e objetivos diferentes conforme o jogo escolhido.",
    "game.moreLikeThis": "Mais jogos como este",
    "game.moreLikeThisText": "Se voce gostou de {title}, veja tambem outros jogos da mesma categoria na lista ao lado e nos relacionados abaixo.",
    "game.controls": "Controles",
    "game.controlMouse": "Mouse ou toque = selecionar e interagir",
    "game.controlMove": "Setas ou WASD = mover quando o jogo permitir",
    "game.controlAction": "Espaco = acao principal em alguns jogos",
    "game.controlFullscreen": "Tela cheia = jogar com mais conforto",
    "game.related": "Jogos relacionados",
    "game.ad": "Anuncio",
    "game.adTitle": "Publicidade",
    "game.adText": "Espaco reservado para campanha.",
    "game.next": "Jogar a seguir"
  },
  en: {
    "app.title": "Pitugames - Free games",
    "app.loadingGames": "Loading games...",
    "app.noGames": "No games found.",
    "app.scrollTop": "Back to top",
    "app.notInformed": "Not available",
    "nav.home": "Home",
    "nav.recent": "Recent",
    "nav.new": "New",
    "nav.trending": "Trending",
    "nav.multiplayer": "Multiplayer",
    "nav.featured": "Leaderboards",
    "nav.action": "Action",
    "nav.arcade": "Arcade",
    "nav.adventure": "Adventure",
    "nav.cards": "Cards",
    "nav.clicker": "Clicker",
    "nav.driving": "Driving",
    "nav.sports": "Sports",
    "nav.strategy": "Strategy",
    "nav.io": ".io",
    "nav.word": "Word",
    "nav.quiz": "Quiz",
    "nav.puzzle": "Puzzle",
    "nav.simulation": "Simulation",
    "nav.board": "Board",
    "nav.shooter": "Shooter",
    "nav.all": "All games",
    "nav.tags": "Tags",
    "nav.search": "Search",
    "nav.closeMenu": "Close menu",
    "nav.categories": "Game categories",
    "header.openMenu": "Open menu",
    "header.searchPlaceholder": "Search games and categories",
    "header.community": "Community",
    "header.favorites": "Favorites",
    "header.notifications": "Notifications",
    "header.login": "Log in",
    "header.language": "Language",
    "mobile.home": "Home",
    "mobile.search": "Search",
    "mobile.myGames": "My games",
    "home.resultsFor": "Results for \"{query}\"",
    "home.resultsFound": "{count} games found",
    "home.continuePlaying": "Continue playing",
    "home.bestForYou": "Best picks for you",
    "home.featured": "Featured games",
    "home.ranking": "Climb the ranking",
    "home.rankingSubtitle": "Compete with other players and reach the top.",
    "home.brain": "Train your brain",
    "home.brainSubtitle": "Puzzles, riddles and quick challenges to play now.",
    "home.adrenaline": "Adrenaline",
    "home.adrenalineSubtitle": "Adventure, speed and reflex games.",
    "home.allGames": "All games",
    "home.loadedCount": "{count} games loaded on Pitugames.",
    "home.loadingMore": "Loading more games...",
    "home.keepScrolling": "Keep scrolling to see more",
    "home.allLoaded": "All games in this category have been loaded",
    "search.title": "Search games",
    "search.hint": "Enter a game name or category",
    "search.placeholder": "Search games and categories",
    "search.resultsFound": "{count} results found",
    "card.hot": "Hot",
    "card.top": "Top",
    "rail.next": "Next {title}",
    "game.loadingPrep": "Preparing match",
    "game.loadingTitle": "Loading game...",
    "game.loadingText": "We are loading the player, artwork and related games.",
    "game.notFound": "Game not found.",
    "game.back": "Back",
    "game.play": "Play",
    "game.free": "Free",
    "game.exit": "Exit",
    "game.exitGame": "Exit game",
    "game.invite": "Invite friends",
    "game.share": "Share",
    "game.fullscreen": "Fullscreen",
    "game.noUrlTitle": "Game URL is not configured yet.",
    "game.noUrlText": "Check the gameUrl field in the feed or local frontend fallback.",
    "game.games": "Games",
    "game.developer": "Developer:",
    "game.rating": "Rating:",
    "game.catalogQuality": "(catalog quality)",
    "game.released": "Released:",
    "game.updated": "Last update:",
    "game.engine": "Game engine:",
    "game.platform": "Platform:",
    "game.platformValue": "Browser (desktop, phone, tablet)",
    "game.orientation": "Orientation:",
    "game.panorama": "Landscape",
    "game.openOriginal": "Open original",
    "game.howToPlay": "How to play",
    "game.howToPlayText": "Click the player above and wait for it to load. Each game may have its own controls, but most work with mouse, touch or keyboard.",
    "game.mainModes": "Main game modes",
    "game.mainModesText": "Explore the {category} category and discover different stages, challenges and goals depending on the selected game.",
    "game.moreLikeThis": "More games like this",
    "game.moreLikeThisText": "If you liked {title}, check out other games in the same category in the side list and related section below.",
    "game.controls": "Controls",
    "game.controlMouse": "Mouse or touch = select and interact",
    "game.controlMove": "Arrow keys or WASD = move when supported",
    "game.controlAction": "Space = main action in some games",
    "game.controlFullscreen": "Fullscreen = play more comfortably",
    "game.related": "Related games",
    "game.ad": "Ad",
    "game.adTitle": "Advertising",
    "game.adText": "Reserved campaign space.",
    "game.next": "Play next"
  },
  es: {
    "app.title": "Pitugames - Juegos gratis",
    "app.loadingGames": "Cargando juegos...",
    "app.noGames": "No se encontraron juegos.",
    "app.scrollTop": "Volver arriba",
    "app.notInformed": "No informado",
    "nav.home": "Inicio",
    "nav.recent": "Recientes",
    "nav.new": "Nuevo",
    "nav.trending": "Tendencias",
    "nav.multiplayer": "Multijugador",
    "nav.featured": "Clasificaciones",
    "nav.action": "Accion",
    "nav.arcade": "Arcade",
    "nav.adventure": "Aventura",
    "nav.cards": "Cartas",
    "nav.clicker": "Clicker",
    "nav.driving": "Conduccion",
    "nav.sports": "Deportes",
    "nav.strategy": "Estrategia",
    "nav.io": ".io",
    "nav.word": "Palabras",
    "nav.quiz": "Preguntas",
    "nav.puzzle": "Rompecabezas",
    "nav.simulation": "Simulacion",
    "nav.board": "Mesa",
    "nav.shooter": "Disparos",
    "nav.all": "Todos los juegos",
    "nav.tags": "Tags",
    "nav.search": "Buscar",
    "nav.closeMenu": "Cerrar menu",
    "nav.categories": "Categorias de juegos",
    "header.openMenu": "Abrir menu",
    "header.searchPlaceholder": "Buscar juegos y categorias",
    "header.community": "Comunidad",
    "header.favorites": "Favoritos",
    "header.notifications": "Notificaciones",
    "header.login": "Entrar",
    "header.language": "Idioma",
    "mobile.home": "Inicio",
    "mobile.search": "Buscar",
    "mobile.myGames": "Mis juegos",
    "home.resultsFor": "Resultados para \"{query}\"",
    "home.resultsFound": "{count} juegos encontrados",
    "home.continuePlaying": "Continuar jugando",
    "home.bestForYou": "Mejores opciones para ti",
    "home.featured": "Juegos destacados",
    "home.ranking": "Sube en el ranking",
    "home.rankingSubtitle": "Compite con otros jugadores y llega a la cima.",
    "home.brain": "Entrena tu cerebro",
    "home.brainSubtitle": "Rompecabezas, enigmas y desafios rapidos para jugar ahora.",
    "home.adrenaline": "Adrenalina",
    "home.adrenalineSubtitle": "Juegos de aventura, velocidad y reflejos.",
    "home.allGames": "Todos los juegos",
    "home.loadedCount": "{count} juegos cargados en Pitugames.",
    "home.loadingMore": "Cargando mas juegos...",
    "home.keepScrolling": "Sigue bajando para ver mas",
    "home.allLoaded": "Todos los juegos de esta categoria fueron cargados",
    "search.title": "Buscar juegos",
    "search.hint": "Escribe el nombre o categoria del juego",
    "search.placeholder": "Buscar juegos y categorias",
    "search.resultsFound": "{count} resultados encontrados",
    "card.hot": "Hot",
    "card.top": "Top",
    "rail.next": "Avanzar {title}",
    "game.loadingPrep": "Preparando partida",
    "game.loadingTitle": "Cargando juego...",
    "game.loadingText": "Estamos cargando el reproductor, la imagen y los juegos relacionados.",
    "game.notFound": "Juego no encontrado.",
    "game.back": "Volver",
    "game.play": "Jugar",
    "game.free": "Gratis",
    "game.exit": "Salir",
    "game.exitGame": "Salir del juego",
    "game.invite": "Invitar amigos",
    "game.share": "Compartir",
    "game.fullscreen": "Pantalla completa",
    "game.noUrlTitle": "La URL del juego aun no esta configurada.",
    "game.noUrlText": "Revisa el campo gameUrl en el feed o en el fallback local del frontend.",
    "game.games": "Juegos",
    "game.developer": "Desarrollador:",
    "game.rating": "Calificacion:",
    "game.catalogQuality": "(calidad del catalogo)",
    "game.released": "Lanzado:",
    "game.updated": "Ultima actualizacion:",
    "game.engine": "Motor del juego:",
    "game.platform": "Plataforma:",
    "game.platformValue": "Navegador (computadora, celular, tablet)",
    "game.orientation": "Orientacion:",
    "game.panorama": "Horizontal",
    "game.openOriginal": "Abrir original",
    "game.howToPlay": "Como jugar",
    "game.howToPlayText": "Haz clic en el reproductor de arriba y espera la carga. Cada juego puede tener controles propios, pero la mayoria funciona con mouse, toque o teclado.",
    "game.mainModes": "Modos principales",
    "game.mainModesText": "Explora la categoria {category} y descubre fases, desafios y objetivos diferentes segun el juego elegido.",
    "game.moreLikeThis": "Mas juegos como este",
    "game.moreLikeThisText": "Si te gusto {title}, mira tambien otros juegos de la misma categoria en la lista lateral y abajo.",
    "game.controls": "Controles",
    "game.controlMouse": "Mouse o toque = seleccionar e interactuar",
    "game.controlMove": "Flechas o WASD = moverse cuando el juego lo permita",
    "game.controlAction": "Espacio = accion principal en algunos juegos",
    "game.controlFullscreen": "Pantalla completa = jugar con mas comodidad",
    "game.related": "Juegos relacionados",
    "game.ad": "Anuncio",
    "game.adTitle": "Publicidad",
    "game.adText": "Espacio reservado para campana.",
    "game.next": "Jugar despues"
  }
};

const categoryMessages = {
  "pt-BR": {
    Action: "Acao",
    Adventure: "Aventura",
    Arcade: "Arcade",
    Board: "Tabuleiro",
    Cards: "Cartas",
    Casual: "Casual",
    Driving: "Direcao",
    Puzzle: "Quebra-cabeca",
    Racing: "Corrida",
    Shooting: "Tiro",
    Simulation: "Simulacao",
    Sports: "Esportes",
    Strategy: "Estrategia",
    Survival: "Sobrevivencia"
  },
  en: {},
  es: {
    Action: "Accion",
    Adventure: "Aventura",
    Arcade: "Arcade",
    Board: "Mesa",
    Cards: "Cartas",
    Casual: "Casual",
    Driving: "Conduccion",
    Puzzle: "Rompecabezas",
    Racing: "Carreras",
    Shooting: "Disparos",
    Simulation: "Simulacion",
    Sports: "Deportes",
    Strategy: "Estrategia",
    Survival: "Supervivencia"
  }
};

const languageNames = {
  "pt-BR": "PT",
  en: "EN",
  es: "ES"
};

function resolveLocale(language) {
  const normalized = String(language || "").toLowerCase();

  if (normalized.startsWith("pt")) {
    return "pt-BR";
  }

  if (normalized.startsWith("es")) {
    return "es";
  }

  return DEFAULT_LOCALE;
}

function formatMessage(template, values = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
}

function getStoredLocale() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function setStoredLocale(locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Storage can be unavailable in restricted/private browsing modes.
  }
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    const savedLocale = getStoredLocale();
    return savedLocale && messages[savedLocale]
      ? savedLocale
      : resolveLocale(navigator.language || navigator.languages?.[0]);
  });

  useEffect(() => {
    document.documentElement.lang = locale;
    setStoredLocale(locale);
  }, [locale]);

  const value = useMemo(() => {
    function t(key, values) {
      const template = messages[locale]?.[key] || messages[DEFAULT_LOCALE][key] || key;
      return formatMessage(template, values);
    }

    function tCategory(category) {
      return categoryMessages[locale]?.[category] || category;
    }

    function formatScore(score) {
      const normalizedScore = typeof score === "number"
        ? Math.max(0, Math.min(score, 1)) * 10
        : 8;

      return new Intl.NumberFormat(locale, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1
      }).format(normalizedScore);
    }

    return {
      locale,
      locales: Object.keys(messages),
      languageNames,
      formatScore,
      setLocale: setLocaleState,
      t,
      tCategory
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}
