import {
  Compass,
  Flame,
  Gamepad2,
  Home,
  Joystick,
  Puzzle,
  RefreshCw,
  Search,
  Sparkles,
  Tags,
  Target,
  Trophy,
  Users,
  Zap
} from "lucide-react";

const navItems = [
  { label: "Pagina Inicial", icon: Home },
  { label: "Recentes", icon: RefreshCw },
  { label: "Novo", icon: Sparkles },
  { label: "Trending", icon: Flame },
  { label: "Multiplayer", icon: Users },
  { label: "Tabelas de classificacao", icon: Trophy },
  { label: "Acao", icon: Zap },
  { label: "Aventura", icon: Compass },
  { label: "Quebra-cabeca", icon: Puzzle },
  { label: "Tiro", icon: Target },
  { label: "Arcade", icon: Joystick },
  { label: "Todos os jogos", icon: Gamepad2 },
  { label: "Tags", icon: Tags },
  { label: "Buscar", icon: Search }
];

function SideNav() {
  return (
    <aside className="side-nav" aria-label="Categorias do portal">
      {navItems.map(({ label, icon: Icon }, index) => (
        <a key={label} href={index < 6 ? "#featured" : "#games"} className={index === 0 ? "active" : ""}>
          <Icon size={23} />
          <span>{label}</span>
        </a>
      ))}
    </aside>
  );
}

export default SideNav;
