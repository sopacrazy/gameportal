import { useI18n } from "../i18n.jsx";

function AdSlot({ className = "", variant = "sidebar" }) {
  const { t } = useI18n();

  return (
    <aside className={`ad-slot ad-slot-${variant} ${className}`.trim()} aria-label={t("game.adTitle")}>
      <span>{t("game.ad")}</span>
      <div>
        <strong>{t("game.adTitle")}</strong>
        <p>{t("game.adText")}</p>
      </div>
    </aside>
  );
}

export default AdSlot;
