import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getResources, deleteResource } from "../services/api";
import Pagination from "../components/Pagination";

export default function ResourceList() {
  const [resources, setResources] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 5;
  const navigate = useNavigate();

  useEffect(() => { fetchResources(); }, [skip]);

  async function fetchResources() {
    try {
      setLoading(true);
      setError(null);
      const res = await getResources(skip, limit);
      setResources(res.data.items);
      setTotal(res.data.total);
    } catch {
      setError("Erro ao carregar recursos. Verifique se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Tem certeza que deseja excluir este recurso?")) return;
    try {
      await deleteResource(id);
      fetchResources();
    } catch {
      alert("Erro ao excluir recurso.");
    }
  }

  return (
    <main style={styles.main}>
      <div style={styles.container}>

        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Recursos Educacionais</h1>
            <p style={styles.subtitle}>{total} recurso(s) cadastrado(s)</p>
          </div>
          <button style={styles.btnNew} onClick={() => navigate("/novo")}>
            + Novo Recurso
          </button>
        </div>

        {loading && (
          <div style={styles.stateBox}>
            <span style={styles.spinner}>⏳</span>
            <p>Carregando recursos...</p>
          </div>
        )}

        {error && (
          <div style={{ ...styles.stateBox, ...styles.errorBox }}>
            <p>⚠️ {error}</p>
          </div>
        )}

        {!loading && !error && resources.length === 0 && (
          <div style={styles.stateBox}>
            <p style={{ fontSize: "2rem" }}>📭</p>
            <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
              Nenhum recurso cadastrado ainda.
            </p>
            <button style={styles.btnNew} onClick={() => navigate("/novo")}
              onMouseOver={e => e.target.style.backgroundColor = "#1d4ed8"}
              onMouseOut={e => e.target.style.backgroundColor = "#2563eb"}
            >
              Cadastrar primeiro recurso
            </button>
          </div>
        )}

        {!loading && !error && resources.length > 0 && (
          <div style={styles.card}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["Título", "Tipo", "Tags", "Ações"].map((h) => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resources.map((r, i) => (
                  <tr key={r.id} style={i % 2 === 0 ? {} : styles.trAlt}>
                    <td style={styles.td}>
                      <span style={styles.resourceTitle}>
                        {r.url
                          ? <a href={r.url} target="_blank" rel="noreferrer" style={styles.link}>{r.title}</a>
                          : r.title}
                      </span>
                      {r.description && (
                        <p style={styles.description}>
                          {r.description.length > 80
                            ? r.description.slice(0, 80) + "..."
                            : r.description}
                        </p>
                      )}
                    </td>
                    <td style={styles.td}>
                      <span style={{ ...styles.badge, backgroundColor: badgeColor(r.type) }}>
                        {r.type}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.tags}>
                        {r.tags
                          ? r.tags.split(",").map((tag) => (
                              <span key={tag} style={styles.tag}>{tag.trim()}</span>
                            ))
                          : <span style={{ color: "#94a3b8" }}>—</span>}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actions}>
                        <button style={styles.btnEdit}
                          onClick={() => navigate(`/editar/${r.id}`)}>
                          Editar
                        </button>
                        <button style={styles.btnDelete}
                          onClick={() => handleDelete(r.id)}>
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Pagination total={total} limit={limit} skip={skip} onPageChange={setSkip} />
      </div>
    </main>
  );
}

function badgeColor(type) {
  return { Video: "#3b82f6", PDF: "#ef4444", Link: "#10b981" }[type] || "#6b7280";
}

const styles = {
  main: { flex: 1, padding: "2rem 1rem" },
  container: { maxWidth: "1100px", margin: "0 auto" },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: "1.5rem",
  },
  title: { fontSize: "1.75rem", fontWeight: "700", color: "#0f172a" },
  subtitle: { color: "#64748b", fontSize: "0.9rem", marginTop: "0.2rem" },
  btnNew: {
    padding: "0.6rem 1.2rem", backgroundColor: "#2563eb", color: "white",
    border: "none", borderRadius: "8px", cursor: "pointer",
    fontWeight: "600", fontSize: "0.95rem",
  },
  stateBox: {
    textAlign: "center", padding: "3rem", backgroundColor: "white",
    borderRadius: "12px", display: "flex", flexDirection: "column",
    alignItems: "center", gap: "0.75rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  errorBox: { backgroundColor: "#fef2f2", color: "#b91c1c" },
  spinner: { fontSize: "2rem" },
  card: {
    backgroundColor: "white", borderRadius: "12px", overflow: "hidden",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    backgroundColor: "#f8fafc", padding: "0.9rem 1rem",
    textAlign: "left", fontSize: "0.8rem", fontWeight: "600",
    color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em",
    borderBottom: "1px solid #e2e8f0",
  },
  td: { padding: "0.9rem 1rem", borderBottom: "1px solid #f1f5f9", verticalAlign: "middle" },
  trAlt: { backgroundColor: "#fafafa" },
  resourceTitle: { fontWeight: "500", color: "#0f172a" },
  link: { color: "#2563eb", textDecoration: "none", fontWeight: "500" },
  description: { fontSize: "0.8rem", color: "#94a3b8", marginTop: "0.2rem" },
  badge: {
    color: "white", padding: "0.25rem 0.65rem", borderRadius: "9999px",
    fontSize: "0.78rem", fontWeight: "500",
  },
  tags: { display: "flex", flexWrap: "wrap", gap: "0.3rem" },
  tag: {
    backgroundColor: "#f1f5f9", color: "#475569", padding: "0.2rem 0.5rem",
    borderRadius: "4px", fontSize: "0.78rem",
  },
  actions: { display: "flex", gap: "0.5rem" },
  btnEdit: {
    padding: "0.35rem 0.8rem", cursor: "pointer", borderRadius: "6px",
    border: "1px solid #3b82f6", color: "#3b82f6", background: "white",
    fontSize: "0.85rem", fontWeight: "500",
  },
  btnDelete: {
    padding: "0.35rem 0.8rem", cursor: "pointer", borderRadius: "6px",
    border: "1px solid #ef4444", color: "#ef4444", background: "white",
    fontSize: "0.85rem", fontWeight: "500",
  },
};