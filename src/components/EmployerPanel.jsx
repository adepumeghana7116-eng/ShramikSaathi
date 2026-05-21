import { useState } from "react";
import CATEGORIES from "../data/categories";
import { loadLocal, saveLocal } from "../utils/helpers";

export default function EmployerPanel({
  t,
  lang,
  jobs,
  onPost,
  onDelete,
}) {
  const [form, setForm] = useState({
    location: "",
    categoryId: "mason",
    wage: "",
    distance: "",
    phone: "",
  });

  const [myIds, setMyIds] = useState(() =>
    loadLocal("ss_employer_ids", [])
  );

  const handlePost = () => {
    if (
      !form.location ||
      !form.wage ||
      !form.distance ||
      !form.phone
    ) {
      return;
    }

    const id = "emp_" + Date.now();

    const newJob = {
      id,
      location: form.location,
      distance: Number(form.distance),
      wage: Number(form.wage),
      employer: "You",
      phone: form.phone,
      categoryId: form.categoryId,
    };

    onPost(newJob);

    const updated = [
      ...myIds,
      {
        id,
        catId: form.categoryId,
      },
    ];

    setMyIds(updated);

    saveLocal("ss_employer_ids", updated);

    setForm((f) => ({
      ...f,
      location: "",
      wage: "",
      distance: "",
    }));
  };

  const handleDelete = (id, catId) => {
    onDelete(catId, id);

    const updated = myIds.filter(
      (x) => x.id !== id
    );

    setMyIds(updated);

    saveLocal("ss_employer_ids", updated);
  };

  const myListings = myIds.flatMap(
    ({ id, catId }) => {
      const job = (jobs[catId] || []).find(
        (j) => j.id === id
      );

      return job ? [{ ...job, catId }] : [];
    }
  );

  return (
    <div>
      <div className="employer-panel">
        <h2>🏗️ {t.postJob}</h2>

        <div className="form-row">
          <div className="form-group">
            <label>{t.category}</label>

            <select
              value={form.categoryId}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  categoryId: e.target.value,
                }))
              }
            >
              {CATEGORIES.map((c) => (
                <option
                  key={c.id}
                  value={c.id}
                >
                  {c[lang] || c.en}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>{t.location}</label>

            <input
              value={form.location}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  location: e.target.value,
                }))
              }
              placeholder="e.g. Alwal"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t.dailyWage}</label>

            <input
              type="number"
              value={form.wage}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  wage: e.target.value,
                }))
              }
              placeholder="600"
            />
          </div>

          <div className="form-group">
            <label>{t.distance}</label>

            <input
              type="number"
              value={form.distance}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  distance: e.target.value,
                }))
              }
              placeholder="5"
            />
          </div>

          <div className="form-group">
            <label>{t.contactNum}</label>

            <input
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  phone: e.target.value,
                }))
              }
              placeholder="9876543210"
              maxLength={10}
            />
          </div>
        </div>

        <button
          className="post-btn"
          onClick={handlePost}
        >
          ➕ {t.postNow}
        </button>
      </div>

      {myListings.length > 0 && (
        <div>
          <div className="section-label">
            {t.myListings}
          </div>

          <div className="employer-jobs-list">
            {myListings.map((job) => (
              <div
                key={job.id}
                className="employer-job-row"
              >
                <span>
                  📍 {job.location} — ₹
                  {job.wage}/day —{" "}
                  {job.distance}km
                </span>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(
                      job.id,
                      job.catId
                    )
                  }
                >
                  {t.remove}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}