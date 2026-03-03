export default function Pagination({ total, limit, skip, onPageChange }) {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  if (totalPages <= 1) return null;

  return (
    <div style={styles.container}>
      <button
        style={{ ...styles.btn, ...(currentPage === 1 ? styles.btnDisabled : {}) }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(skip - limit)}
      >
        ← Anterior
      </button>

      <span style={styles.info}>
        Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
        <span style={styles.total}> — {total} recurso(s)</span>
      </span>

      <button
        style={{ ...styles.btn, ...(currentPage === totalPages ? styles.btnDisabled : {}) }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(skip + limit)}
      >
        Próxima →
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex", justifyContent: "center", alignItems: "center",
    gap: "1rem", marginTop: "2rem", padding: "1rem 0",
  },
  btn: {
    padding: "0.5rem 1.2rem", cursor: "pointer", borderRadius: "6px",
    border: "1px solid #cbd5e1", background: "white", color: "#1e40af",
    fontWeight: "500", fontSize: "0.9rem", transition: "all 0.2s",
  },
  btnDisabled: {
    opacity: 0.4, cursor: "not-allowed",
  },
  info: { fontSize: "0.9rem", color: "#475569" },
  total: { color: "#94a3b8" },
};