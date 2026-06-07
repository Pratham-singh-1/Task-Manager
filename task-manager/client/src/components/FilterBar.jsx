function FilterBar({ filter, onFilterChange }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="filter-bar">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          className={filter === f ? "active" : ""}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
