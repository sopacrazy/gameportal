function SearchBar({ value, onChange }) {
  return (
    <label className="search-bar">
      <span>Buscar jogos</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Digite nome ou categoria"
      />
    </label>
  );
}

export default SearchBar;
