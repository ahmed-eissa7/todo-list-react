
export default function FilterBtn({ name, onFilter, active, count }) {
  return (
    <button onClick={onFilter} className={active}>
      {name} 
      <span className="badge"> ({count}) </span>
    </button>
  );
}