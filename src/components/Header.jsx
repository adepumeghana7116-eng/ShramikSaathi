export default function Header({
  t,
  lang,
  setLang,
  employerMode,
  setEmployerMode,
  user,
  setShowSidebar,
  setSelectedCat,
}) {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo">🤝</div>

        <div>
          <div className="header-title">{t.appName}</div>
          <div className="header-subtitle">{t.appTagline}</div>
        </div>
      </div>

      <div className="header-right">
        <div className="lang-switcher">
          {["te", "en", "hi"].map((l) => (
            <button
              key={l}
              className={`lang-btn ${lang === l ? "active" : ""}`}
              onClick={() => setLang(l)}
            >
              {l === "te" ? "తె" : l === "en" ? "EN" : "हि"}
            </button>
          ))}
        </div>

        <button
          className={`employer-toggle ${employerMode ? "active" : ""}`}
          onClick={() => {
            setEmployerMode((e) => !e);
            setSelectedCat(null);
          }}
        >
          {employerMode ? t.workerMode : t.employerMode}
        </button>

        <button
          className="avatar-btn"
          onClick={() => setShowSidebar(true)}
        >
          {user?.photo ? (
            <img src={user.photo} alt="avatar" />
          ) : (
            "👤"
          )}
        </button>
      </div>
    </header>
  );
}