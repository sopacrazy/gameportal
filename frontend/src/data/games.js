function gameMonetizeGame({
  id,
  title,
  slug,
  description,
  category,
  categories = [category],
  tags = categories,
  width = 800,
  height = 600,
  orientation = "landscape",
  qualityScore = 0.8,
  datePublished
}) {
  return {
    id: `gamemonetize-${slug}`,
    provider: "gamemonetize",
    providerName: "GameMonetize",
    providerGameId: id,
    title,
    slug,
    description,
    category,
    categories,
    tags,
    thumbnail: `https://img.gamemonetize.com/${id}/512x384.jpg`,
    icon: `https://img.gamemonetize.com/${id}/512x384.jpg`,
    gameUrl: `https://html5.gamemonetize.co/${id}/`,
    width,
    height,
    orientation,
    qualityScore,
    datePublished
  };
}

export const fallbackGames = [
  gameMonetizeGame({
    id: "tmhj9i3trg8ot0u7h9qahh6flzn9zkjp",
    title: "Obby Cart Rush",
    slug: "obby-cart-rush",
    description:
      "Corra em um carrinho por pistas 3D cheias de curvas, descidas e loops. Acelere, freie na hora certa e tente chegar ao final de cada fase.",
    category: "Racing",
    categories: ["3D", "Adventure", "Arcade", "Racing"],
    tags: ["3D", "Adventure", "Arcade", "Car", "Driving", "Racing", "Unity3D"],
    width: 1280,
    height: 720,
    qualityScore: 0.82,
    datePublished: "2026-08-07"
  }),
  gameMonetizeGame({
    id: "zo8ocq9uu0gjavl3iazgiessapj6ov6n",
    title: "Police Car Parking 2026",
    slug: "police-car-parking-2026",
    description:
      "Dirija uma viatura por ruas, becos e estacionamentos apertados. Desvie dos obstaculos e estacione com precisao em cada desafio.",
    category: "Racing",
    categories: ["Racing"],
    tags: ["Driving", "Police", "Skill", "Unity3D", "WebGL"],
    qualityScore: 0.78,
    datePublished: "2026-08-03"
  }),
  gameMonetizeGame({
    id: "q6u8ghlmkx9rhy48udltwan4cqmmoxxm",
    title: "Offroad Jeep Simulation",
    slug: "offroad-jeep-simulation",
    description:
      "Pilote jipes 4x4 por montanhas, trilhas e estradas de terra. Complete missoes off-road com controle e precisao.",
    category: "Adventure",
    categories: ["Action", "Adventure", "Racing"],
    tags: ["Action", "Adventure", "Driving", "Jeep", "Offroad"],
    qualityScore: 0.81,
    datePublished: "2026-08-07"
  }),
  gameMonetizeGame({
    id: "4wqbtp9q2umsv9k703yokgau6c8abtra",
    title: "Farming Simulation Game",
    slug: "farming-simulation-game",
    description:
      "Viva a rotina de uma fazenda moderna dirigindo tratores, cultivando campos e completando missoes no campo.",
    category: "Adventure",
    categories: ["Action", "Adventure", "Simulation"],
    tags: ["Action", "Adventure", "Family", "Farm", "Tractor"],
    qualityScore: 0.79,
    datePublished: "2026-08-05"
  }),
  gameMonetizeGame({
    id: "vuey9pdhe0lm6j3h8trb47bxjwr57wv4",
    title: "Ramp Car Game",
    slug: "ramp-car-game",
    description:
      "Acelere em rampas gigantes, salte obstaculos e tente completar pistas cheias de acrobacias em alta velocidade.",
    category: "Racing",
    categories: ["Action", "Adventure", "Racing"],
    tags: ["Action", "Car", "Race", "Racing", "Stunts"],
    qualityScore: 0.8,
    datePublished: "2026-08-06"
  }),
  gameMonetizeGame({
    id: "dcdoe6b5ajfv2f1r1cefnv6paq6ole25",
    title: "Obby 30: Color Rush",
    slug: "obby-30-color-rush",
    description:
      "Supere plataformas coloridas, armadilhas e desafios de reflexo em uma corrida obby rapida e divertida.",
    category: "Arcade",
    categories: ["3D", "Adventure", "Arcade"],
    tags: ["3D", "Arcade", "Color", "Jump", "Obby", "Parkour"],
    qualityScore: 0.8,
    datePublished: "2026-08-04"
  }),
  gameMonetizeGame({
    id: "f18vmxidmr661qlw0sez84ioo303oktj",
    title: "Good Guys & Bad Boys Zombie Survival GUI",
    slug: "good-guys-bad-boys-zombie-survival-gui",
    description:
      "Entre em uma arena de sobrevivencia contra zumbis, colete armas e tente resistir o maximo possivel.",
    category: "Shooting",
    categories: ["Action", "Shooting", "Survival"],
    tags: ["Action", "Shooter", "Survival", "Zombie"],
    qualityScore: 0.77,
    datePublished: "2026-08-04"
  }),
  gameMonetizeGame({
    id: "t2a672cdfu2471c0ek19v6fr26za27z7",
    title: "Commando Gun Shooting",
    slug: "commando-gun-shooting",
    description:
      "Assuma o papel de um soldado em missoes de tiro 3D. Mire, avance com cuidado e elimine os inimigos.",
    category: "Shooting",
    categories: ["Action", "Shooting"],
    tags: ["Action", "Commando", "Gun", "Shooter", "War"],
    qualityScore: 0.78,
    datePublished: "2026-08-04"
  }),
  gameMonetizeGame({
    id: "ya4wsn7zuy2cct6n3l8pn122yq8mihy8",
    title: "Rally Race Pro 3.0 Car Racing",
    slug: "rally-race-pro-3-0-car-racing",
    description:
      "Dispute corridas de rally em pistas cheias de velocidade. Controle derrapagens e busque o melhor tempo.",
    category: "Racing",
    categories: ["3D", "Racing", "Sports"],
    tags: ["Car", "Driving", "Race", "Rally", "Racing"],
    qualityScore: 0.82,
    datePublished: "2026-08-04"
  }),
  gameMonetizeGame({
    id: "k516anavcz2cqqtuee6aa5gjst8m0vxn",
    title: "Vehicle Masters",
    slug: "vehicle-masters",
    description:
      "Controle veiculos grandes com precisao, estacione, manobre e complete tarefas em cenarios 3D.",
    category: "Racing",
    categories: ["Driving", "Racing", "Simulation"],
    tags: ["Driving", "Parking", "Simulation", "Truck", "Vehicle"],
    width: 900,
    height: 600,
    qualityScore: 0.8,
    datePublished: "2026-08-04"
  }),
  gameMonetizeGame({
    id: "zzkoub6xkzrqd9v58hl50i25hk86dcjm",
    title: "Truck Slam",
    slug: "truck-slam",
    description:
      "Dirija caminhoes potentes em desafios de colisao e velocidade, vencendo pistas duras e obstaculos pesados.",
    category: "Racing",
    categories: ["Action", "Driving", "Racing"],
    tags: ["Action", "Driving", "Racing", "Truck"],
    qualityScore: 0.79,
    datePublished: "2026-08-04"
  }),
  gameMonetizeGame({
    id: "op8z87x6dltznob1zzs7yu2n3xqxktlg",
    title: "Go Kart Racing Game",
    slug: "go-kart-racing-game",
    description:
      "Entre em corridas de kart leves e rapidas. Faca curvas precisas, ultrapasse rivais e chegue em primeiro.",
    category: "Racing",
    categories: ["Arcade", "Racing", "Sports"],
    tags: ["Arcade", "Car", "Kart", "Race", "Racing"],
    qualityScore: 0.81,
    datePublished: "2026-08-04"
  }),
  gameMonetizeGame({
    id: "ai9lo8rruqqnfxpsvk6fveoe6yzs9bfo",
    title: "Max Speed",
    slug: "max-speed",
    description:
      "Acelere ao maximo em pistas 3D, desviando de obstaculos e mantendo o controle em alta velocidade.",
    category: "Racing",
    categories: ["Driving", "Racing"],
    tags: ["Car", "Driving", "Race", "Racing", "Speed"],
    qualityScore: 0.8,
    datePublished: "2026-08-04"
  }),
  gameMonetizeGame({
    id: "td7r994z5ls02swod3lm0gk9h2jl2jmi",
    title: "Dead Paradise",
    slug: "dead-paradise",
    description:
      "Cruze estradas perigosas em um mundo destruido, usando armas e veiculos para sobreviver ate o fim.",
    category: "Action",
    categories: ["Action", "Racing", "Shooting"],
    tags: ["Action", "Car", "Shooting", "Survival"],
    qualityScore: 0.83,
    datePublished: "2026-08-04"
  }),
  gameMonetizeGame({
    id: "u1nspb6d6k05iahz4oc3qtbl0my3cwfi",
    title: "Zombie Catchers",
    slug: "zombie-catchers",
    description:
      "Capture zumbis em fases de acao, use equipamentos especiais e avance por cenarios cheios de perigos.",
    category: "Action",
    categories: ["Action", "Adventure"],
    tags: ["Action", "Adventure", "Platform", "Zombie"],
    width: 800,
    height: 480,
    qualityScore: 0.82,
    datePublished: "2026-08-04"
  }),
  gameMonetizeGame({
    id: "6jl490z6y1sr7d71i9iw0ogqqblwchu8",
    title: "Buggy Racing",
    slug: "buggy-racing",
    description:
      "Pilote buggies em pistas irregulares, salte rampas e dispute corridas arcade cheias de movimento.",
    category: "Racing",
    categories: ["Arcade", "Driving", "Racing"],
    tags: ["Buggy", "Car", "Driving", "Racing"],
    qualityScore: 0.79,
    datePublished: "2026-08-04"
  }),
  gameMonetizeGame({
    id: "fxn4paqjk3u1yap268sqfi571d40pmre",
    title: "Slime Jelly Bouncer",
    slug: "slime-jelly-bouncer",
    description:
      "Controle um slime saltitante, calcule os pulos e avance por desafios leves de plataforma e reflexo.",
    category: "Arcade",
    categories: ["Arcade", "Puzzle"],
    tags: ["Arcade", "Jump", "Platform", "Puzzle", "Slime"],
    qualityScore: 0.76,
    datePublished: "2026-08-04"
  }),
  gameMonetizeGame({
    id: "u0gsr6ochgr8nli5u5v7js0b1rj3sopf",
    title: "Soccer Drop Game",
    slug: "soccer-drop-game",
    description:
      "Resolva jogadas com tema de futebol, solte a bola no momento certo e tente marcar em cada fase.",
    category: "Sports",
    categories: ["Puzzle", "Soccer", "Sports"],
    tags: ["Ball", "Puzzle", "Soccer", "Sports"],
    qualityScore: 0.77,
    datePublished: "2026-08-04"
  }),
  gameMonetizeGame({
    id: "b1xq3umsvsobp3v95syywh7s62vw944m",
    title: "Stickman Blast Puzzle",
    slug: "stickman-blast-puzzle",
    description:
      "Use explosoes e logica para resolver fases com stickman. Mire bem e encontre a melhor sequencia.",
    category: "Puzzle",
    categories: ["Action", "Puzzle"],
    tags: ["Action", "Blast", "Puzzle", "Stickman"],
    qualityScore: 0.78,
    datePublished: "2026-08-04"
  }),
  gameMonetizeGame({
    id: "ju0qzw6fpcb0mctu71i85cge96sq47sb",
    title: "Stickman Kart Hero",
    slug: "stickman-kart-hero",
    description:
      "Corra com personagens stickman em karts velozes, desviando de rivais e buscando a vitoria nas pistas.",
    category: "Racing",
    categories: ["Arcade", "Racing"],
    tags: ["Arcade", "Kart", "Racing", "Stickman"],
    width: 800,
    height: 480,
    qualityScore: 0.79,
    datePublished: "2026-08-04"
  }),
  gameMonetizeGame({
    id: "f35frmezumwujtdqf1vx6m22j3ifc3lv",
    title: "Hit Tank Battle",
    slug: "hit-tank-battle",
    description:
      "Entre em batalhas de tanques, mire nos inimigos e use estrategia para dominar cada confronto.",
    category: "Action",
    categories: ["Action", "Shooting"],
    tags: ["Action", "Battle", "Shooting", "Tank"],
    width: 1920,
    height: 1080,
    qualityScore: 0.81,
    datePublished: "2026-08-04"
  }),
  gameMonetizeGame({
    id: "tark0i208v8u3vh634f5k7p2xffftwgv",
    title: "Zombie Siege",
    slug: "zombie-siege",
    description:
      "Defenda sua posicao contra ondas de zumbis. Melhore sua estrategia e sobreviva pelo maior tempo possivel.",
    category: "Action",
    categories: ["Action", "Shooting", "Survival"],
    tags: ["Action", "Shooting", "Survival", "Zombie"],
    width: 720,
    height: 1280,
    orientation: "portrait",
    qualityScore: 0.79,
    datePublished: "2026-08-04"
  })
];
