export default function Hero({ t, totalJobs, avgWage }) {
  return (
    <section className="hero">
      <h1 className="hero-title">{t.heroTitle}</h1>

      <p className="hero-sub">{t.heroSub}</p>

      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-val">
            <span className="live-dot"></span>
            {totalJobs}
          </div>

          <div className="hero-stat-lbl">{t.activeJobs}</div>
        </div>

        <div className="hero-stat">
          <div className="hero-stat-val">1,240+</div>

          <div className="hero-stat-lbl">{t.totalWorkers}</div>
        </div>

        <div className="hero-stat">
          <div className="hero-stat-val">₹{avgWage}</div>

          <div className="hero-stat-lbl">{t.avgWage}</div>
        </div>
      </div>
    </section>
  );
}