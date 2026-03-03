import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <Link to="/" style={styles.brand}>Hub Educacional</Link>
        <nav style={styles.nav}>
          <Link to="/" style={{
            ...styles.link,
            ...(location.pathname === "/" ? styles.linkActive : {})
          }}>
            Recursos
          </Link>
          <Link to="/novo" style={{
            ...styles.link,
            ...styles.linkBtn,
            ...(location.pathname === "/novo" ? styles.linkBtnActive : {})
          }}>
            + Novo Recurso
          </Link>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#1e40af",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  inner: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 2rem",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    color: "white",
    textDecoration: "none",
    fontSize: "1.25rem",
    fontWeight: "700",
    letterSpacing: "-0.3px",
  },
  nav: { display: "flex", alignItems: "center", gap: "1.5rem" },
  link: {
    color: "rgba(255,255,255,0.85)",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "500",
    paddingBottom: "2px",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s",
  },
  linkActive: {
    color: "white",
    borderBottom: "2px solid white",
  },
  linkBtn: {
    backgroundColor: "white",
    color: "#1e40af",
    padding: "0.45rem 1rem",
    borderRadius: "6px",
    fontWeight: "600",
    borderBottom: "none",
  },
  linkBtnActive: {
    backgroundColor: "#dbeafe",
  },
};