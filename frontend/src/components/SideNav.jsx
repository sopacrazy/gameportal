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
import { useI18n } from "../i18n.jsx";

export const navItems = [
  { labelKey: "nav.home", icon: Home, action: "home", key: "home" },
  { labelKey: "nav.recent", icon: RefreshCw, action: "recent", key: "recent" },
  { labelKey: "nav.new", icon: Sparkles, action: "new", key: "new" },
  { labelKey: "nav.trending", icon: Flame, action: "trending", key: "trending" },
  { labelKey: "nav.multiplayer", icon: Users, key: "multiplayer", categories: ["Multiplayer", "Two Player"] },
  { labelKey: "nav.featured", icon: Trophy, action: "featured", key: "featured" },
  { labelKey: "nav.action", icon: Zap, key: "action", categories: ["Action", "Fighting", "Battle", "Shooter", "Shooting", "Adventure", "Racing", "Racing & Driving", "Arcade", "Platform", "Agility"] },
  { labelKey: "nav.arcade", icon: Joystick, key: "arcade", categories: ["Arcade"] },
  { labelKey: "nav.adventure", icon: Compass, key: "adventure", categories: ["Adventure"] },
  { labelKey: "nav.cards", icon: Tags, key: "cards", categories: ["Cards", "Card", "Solitaire"] },
  { labelKey: "nav.clicker", icon: Target, key: "clicker", categories: ["Clicker", "Idle", "Tap"] },
  { labelKey: "nav.driving", icon: Compass, key: "driving", categories: ["Racing", "Racing & Driving", "Driving"] },
  { labelKey: "nav.sports", icon: Trophy, key: "sports", categories: ["Sports", "Football", "Basketball", "Soccer"] },
  { labelKey: "nav.strategy", icon: Puzzle, key: "strategy", categories: ["Strategy", "Tower Defense"] },
  { labelKey: "nav.io", icon: Users, key: "io", categories: [".IO", "IO", ".io"] },
  { labelKey: "nav.word", icon: Search, key: "word", categories: ["Word", "Words"] },
  { labelKey: "nav.quiz", icon: Search, key: "quiz", categories: ["Quiz", "Trivia"] },
  { labelKey: "nav.puzzle", icon: Puzzle, key: "puzzle", categories: ["Puzzle", "Match-3", "Mahjong & Connect", "Bubble Shooter", "Merge"] },
  { labelKey: "nav.simulation", icon: Joystick, key: "simulation", categories: ["Simulation", "Simulator"] },
  { labelKey: "nav.board", icon: Gamepad2, key: "board", categories: ["Board", "Board Game"] },
  { labelKey: "nav.shooter", icon: Target, key: "shooter", categories: ["Shooter", "Shooting"] },
  { labelKey: "nav.all", icon: Gamepad2, action: "all", key: "all" },
  { labelKey: "nav.tags", icon: Tags, action: "tags", key: "tags" },
  { labelKey: "nav.search", icon: Search, action: "search", key: "search" }
];

function SideNav({ activeFilter = "home", isOpen = false, onFilterSelect, onClose }) {
  const navigate = useNavigate();
  const { t } = useI18n();

  function getItemHref(item) {
    const target = item.key || item.action || "home";

    if (target === "home") {
      return "/";
    }

    if (target === "search") {
      return "/search";
    }

    return `/category/${target}`;
  }

  function handleClick(event, item) {
    if (!onFilterSelect) {
      event.preventDefault();
      navigate(getItemHref(item));
      onClose?.();
      return;
    }

    event.preventDefault();
    onFilterSelect(item);
    onClose?.();
  }

  return (
    <>
    {isOpen && <button type="button" className="mobile-menu-backdrop" onClick={onClose} aria-label={t("nav.closeMenu")} />}
    <aside className={`side-nav ${isOpen ? "mobile-open" : ""}`} aria-label={t("nav.categories")}>
      {navItems.map((item) => {
        const { icon: Icon } = item;
        const label = t(item.labelKey);
        const filterKey = item.key || item.action;
        const isActive = activeFilter === filterKey;

        return (
        <a
          key={label}
          href={getItemHref(item)}
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
