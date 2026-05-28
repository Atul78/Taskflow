import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>✦</span>
          <span className={styles.brandName}>TaskFlow</span>
        </div>

        <div className={styles.right}>
          <div
            className={styles.userChip}
            onClick={() => setMenuOpen((p) => !p)}
          >
            <div className={styles.avatar}>{initials}</div>
            <span className={styles.userName}>{user?.name}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {menuOpen && (
            <div className={styles.dropdown}>
              <p className={styles.dropdownEmail}>{user?.email}</p>
              <hr className={styles.divider} />
              <button className={styles.logoutBtn} onClick={logout}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
