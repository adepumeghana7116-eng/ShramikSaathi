export default function JobList({
  t,
  lang,
  selectedCat,
  jobs,
  openApply,
}) {
  if (!selectedCat) {
    return (
      <div className="empty-state">
        <div className="empty-icon">☝️</div>

        <p>{t.selectCat}</p>
      </div>
    );
  }

  const selectedJobs = jobs[selectedCat.id] || [];

  const selectedCatName =
    selectedCat[lang] || selectedCat.en;

  return (
    <div className="jobs-section">
      <div className="section-label">
        {t.jobsIn}
        {selectedCatName}
      </div>

      {selectedJobs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            {selectedCat.emoji}
          </div>

          <p>{t.noJobs}</p>
        </div>
      ) : (
        selectedJobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-icon">
              {selectedCat.emoji}
            </div>

            <div className="job-info">
              <div className="job-location">
                {job.location}
              </div>

              <div className="job-distance">
                📍 {job.distance} {t.kmAway}
              </div>

              <div className="job-employer">
                👷 {t.postedBy}: {job.employer}
              </div>
            </div>

            <div className="job-right">
              <div className="job-wage">
                ₹{job.wage}
              </div>

              <div className="job-wage-day">
                {t.perDay}
              </div>

              <button
                className="apply-btn"
                onClick={() =>
                  openApply(job, selectedCat)
                }
              >
                {t.applyNow}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}