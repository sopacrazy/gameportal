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
import { useNavigate } from "react-router-dom";

export const navItems = [
  { label: "Pagina Inicial", icon: Home, action: "home", key: "home" },
  { label: "Recentes", icon: RefreshCw, action: "recent", key: "recent" },
  { label: "Novo", icon: Sparkles, action: "new", key: "new" },
  { label: "Trending", icon: Flame, action: "trending", key: "trending" },
  { label: "Multiplayer", icon: Users, key: "multiplayer", categories: ["Multiplayer", "Two Player"] },
  { label: "Tabelas de classificacao", icon: Trophy, action: "featured", key: "featured" },
  { label: "Acao", icon: Zap, key: "action", categories: ["Action", "Fighting", "Battle", "Shooter", "Shooting", "Adventure", "Racing", "Racing & Driving", "Arcade", "Platform", "Agility"] },
  { label: "Arcade", icon: Joystick, key: "arcade", categories: ["Arcade"] },
  { label: "Aventura", icon: Compass, key: "adventure", categories: ["Adventure"] },
  { label: "Cartas", icon: Tags, key: "cards", categories: ["Cards", "Card", "Solitaire"] },
  { label: "De Clicar", icon: Target, key: "clicker", categories: ["Clicker", "Idle", "Tap"] },
  { label: "Direcao", icon: Compass, key: "driving", categories: ["Racing", "Racing & Driving", "Driving"] },
  { label: "Esportes", icon: Trophy, key: "sports", categories: ["Sports", "Football", "Basketball", "Soccer"] },
  { label: "Estrategia", icon: Puzzle, key: "strategy", categories: ["Strategy", "Tower Defense"] },
  { label: ".io", icon: Users, key: "io", categories: [".IO", "IO", ".io"] },
  { label: "Palavra", icon: Search, key: "word", categories: ["Word", "Words"] },
  { label: "Perguntas e Respostas", icon: Search, key: "quiz", categories: ["Quiz", "Trivia"] },
  { label: "Quebra-cabeca", icon: Puzzle, key: "puzzle", categories: ["Puzzle", "Match-3", "Mahjong & Connect", "Bubble Shooter", "Merge"] },
  { label: "Simulacao", icon: Joystick, key: "simulation", categories: ["Simulation", "Simulator"] },
  { label: "Tabuleiro", icon: Gamepad2, key: "board", categories: ["Board", "Board Game"] },
  { label: "Tiro", icon: Target, key: "shooter", categories: ["Shooter", "Shooting"] },
  { label: "Todos os jogos", icon: Gamepad2, action: "all", key: "all" },
  { label: "Tags", icon: Tags, action: "tags", key: "tags" },
  { label: "Buscar", icon: Search, action: "search", key: "search" }
];

function SideNav({ activeFilter = "home", isOpen = false, onFilterSelect, onClose }) {
  const navigate = useNavigate();

  function handleClick(event, item) {
    if (!onFilterSelect) {
      event.preventDefault();
      const target = item.key || item.action || "home";
      navigate(target === "home" ? "/" : `/#${target}`);
      onClose?.();
      return;
    }

    event.preventDefault();
    onFilterSelect(item);
    onClose?.();
  }

  return (
    <>
    {isOpen && <button type="button" className="mobile-menu-backdrop" onClick={onClose} aria-label="Fechar menu" />}
    <aside className={`side-nav ${isOpen ? "mobile-open" : ""}`} aria-label="Categorias do portal">
      {navItems.map((item, index) => {
        const { label, icon: Icon } = item;
        const filterKey = item.key || item.action;
        const isActive = activeFilter === filterKey;

        return (
        <a
          key={label}
          href={filterKey === "home" ? "/" : `/#${filterKey}`}
          className={isActive ? "active" : ""}
          onClick={(event) => handleClick(event, item)}
        >
          <Icon size={23} />
          <span>{label}</span>
        </a>
        );
      })}
    </aside>
    </>
  );
}

export default SideNav;
