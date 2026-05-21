export default function ProfileSidebar({
  t,
  user,
  onClose,
  onLogout,
}) {
  return (
    <>
      <div
        className="sidebar-overlay"
        onClick={onClose}
      />

      <div className="sidebar-drawer">
        <div className="sidebar-header">
          <div className="sidebar-avatar">
            {user?.photo ? (
              <img
                src={user.photo}
                alt="profile"
              />
            ) : (
              "👤"
            )}
          </div>

          <div className="sidebar-name">
            {user?.name || "Guest"}
          </div>

          <div className="sidebar-phone">
            {user?.phone || "—"}
          </div>

          {user && (
            <div className="sidebar-badge">
              ✅ {t.verified}
            </div>
          )}
        </div>

        <div className="sidebar-body">
          {user ? (
            <>
              <div className="sidebar-row">
                <span>📱</span>

                <strong>{t.phone}</strong>

                <span className="val">
                  {user.phone}
                </span>
              </div>

              <div className="sidebar-row">
                <span>🎂</span>

                <strong>DOB</strong>

                <span className="val">
                  {user.dob || "—"}
                </span>
              </div>

              <div className="sidebar-row">
                <span>🪪</span>

                <strong>Aadhaar</strong>

                <span className="val">
                  {user.aadhaarMasked || "—"}
                </span>
              </div>

              <div className="sidebar-row">
                <span>✅</span>

                <strong>Status</strong>

                <span
                  className="val"
                  style={{
                    color: "var(--green)",
                  }}
                >
                  Verified
                </span>
              </div>

              <button
                className="logout-btn"
                onClick={onLogout}
              >
                🚪 {t.logout}
              </button>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                👤
              </div>

              <p>
                Not logged in. Apply for a
                job to register.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}