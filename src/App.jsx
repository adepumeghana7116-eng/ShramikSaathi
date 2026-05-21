import { useState, useEffect } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";

import T from "./data/translations";
import CATEGORIES from "./data/categories";
import INITIAL_JOBS from "./data/jobs";

import { loadLocal, saveLocal } from "./utils/helpers";

export default function App() {
  const [lang, setLang] = useState("te");

  const [employerMode, setEmployerMode] = useState(false);

  const [selectedCat, setSelectedCat] = useState(null);

  const [jobs, setJobs] = useState(() =>
    loadLocal("ss_jobs", INITIAL_JOBS)
  );

  const [user, setUser] = useState(() =>
    loadLocal("ss_user", null)
  );

  const [showSidebar, setShowSidebar] = useState(false);

  const t = T[lang];

  useEffect(() => {
    saveLocal("ss_jobs", jobs);
  }, [jobs]);

  const totalJobs = Object.values(jobs).reduce(
    (s, arr) => s + arr.length,
    0
  );

  const avgWage = (() => {
    const all = Object.values(jobs)
      .flat()
      .map((j) => j.wage);

    return all.length
      ? Math.round(
          all.reduce((a, b) => a + b, 0) / all.length
        )
      : 0;
  })();

  return (
    <div className="app-bg">
      <Header
        t={t}
        lang={lang}
        setLang={setLang}
        employerMode={employerMode}
        setEmployerMode={setEmployerMode}
        user={user}
        setShowSidebar={setShowSidebar}
        setSelectedCat={setSelectedCat}
      />

      <Hero
        t={t}
        totalJobs={totalJobs}
        avgWage={avgWage}
      />
    </div>
  );
}