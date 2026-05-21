import CATEGORIES from "../data/categories";

export default function Categories({
  t,
  lang,
  jobs,
  selectedCat,
  setSelectedCat,
}) {
  return (
    <>
      <div className="section-label">{t.categories}</div>

      <div className="categories-grid">
        {CATEGORIES.map((cat) => {
          const count = (jobs[cat.id] || []).length;

          return (
            <div
              key={cat.id}
              className={`category-card ${
                selectedCat?.id === cat.id ? "selected" : ""
              }`}
              onClick={() =>
                setSelectedCat(
                  selectedCat?.id === cat.id ? null : cat
                )
              }
            >
              <span className="category-emoji">
                {cat.emoji}
              </span>

              <div className="category-name">
                {cat[lang] || cat.en}
              </div>

              <div className="category-name-local">
                {cat.en}
              </div>

              <span className="category-count">
                {count} {t.liveJobs}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}