import { useI18n } from "../i18n.jsx";

function SearchBar({ value, onChange }) {
  const { t } = useI18n();

  return (
    <label className="search-bar">
      <span>{t("search.title")}</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t("search.hint")}
      />
    </label>
  );
}

export default SearchBar;
