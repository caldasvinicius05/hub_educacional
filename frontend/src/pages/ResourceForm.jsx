import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createResource, updateResource, getResource, smartAssist } from "../services/api";

const EMPTY_FORM = { title: "", description: "", type: "Video", url: "", tags: "" };

export default function ResourceForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      getResource(id)
        .then((res) => setForm(res.data))
        .catch(() => alert("Erro ao carregar recurso."));
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSmartAssist() {
    if (!form.title) return alert("Preencha o título antes de usar o Smart Assist.");
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await smartAssist(form.title, form.type);
      setForm((prev) => ({
        ...prev,
        description: res.data.description,
        tags: res.data.tags.join(","),
      }));
    } catch (err) {
      setAiError(err.response?.data?.detail || "Erro ao consultar a IA. Tente novamente.");
    } finally {
      setAiLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      isEditing ? await updateResource(id, form) : await createResource(form);
      navigate("/");
    } catch {
      alert("Erro ao salvar recurso.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main style={styles.main}>
      <div style={styles.container}>

        <div style={styles.header}>
          <button style={styles.btnBack} onClick={() => navigate("/")}>
            ← Voltar
          </button>
          <h1 style={styles.title}>
            {isEditing ? "✏️ Editar Recurso" : "➕ Novo Recurso"}
          </h1>
        </div>

        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.form}>

            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Título *</label>
                <input name="title" value={form.title} onChange={handleChange}
                  required style={styles.input}
                  placeholder="Ex: Introdução ao Cálculo" />
              </div>

              <div style={{ ...styles.field, maxWidth: "180px" }}>
                <label style={styles.label}>Tipo *</label>
                <select name="type" value={form.type} onChange={handleChange} style={styles.input}>
                  <option value="Video">🎥 Vídeo</option>
                  <option value="PDF">📄 PDF</option>
                  <option value="Link">🔗 Link</option>
                </select>
              </div>
            </div>

            <div style={styles.aiBox}>
              <div style={styles.aiInfo}>
                <span style={styles.aiIcon}>✨</span>
                <div>
                  <p style={styles.aiTitle}>Smart Assist — IA</p>
                  <p style={styles.aiDesc}>Gera descrição e tags automaticamente a partir do título</p>
                </div>
              </div>
              <button type="button" onClick={handleSmartAssist}
                disabled={aiLoading} style={{
                  ...styles.btnAI,
                  ...(aiLoading ? styles.btnAILoading : {})
                }}>
                {aiLoading ? "⏳ Gerando..." : "Gerar com IA"}
              </button>
            </div>
            {aiError && <p style={styles.aiError}>⚠️ {aiError}</p>}

            <div style={styles.field}>
              <label style={styles.label}>Descrição</label>
              <textarea name="description" value={form.description || ""}
                onChange={handleChange} rows={4} style={styles.textarea}
                placeholder="Descreva o conteúdo do recurso..." />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>URL</label>
              <input name="url" value={form.url || ""} onChange={handleChange}
                style={styles.input} placeholder="https://..." />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Tags</label>
              <input name="tags" value={form.tags || ""} onChange={handleChange}
                style={styles.input} placeholder="matemática,cálculo,derivadas" />
              <p style={styles.hint}>Separe as tags por vírgula</p>
            </div>

            <div style={styles.actions}>
              <button type="button" onClick={() => navigate("/")} style={styles.btnCancel}>
                Cancelar
              </button>
              <button type="submit" disabled={saving} style={styles.btnSave}>
                {saving ? "Salvando..." : isEditing ? "💾 Salvar Alterações" : "✅ Cadastrar Recurso"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}

const styles = {
  main: { flex: 1, padding: "2rem 1rem" },
  container: { maxWidth: "700px", margin: "0 auto" },
  header: { display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" },
  btnBack: {
    background: "none", border: "none", cursor: "pointer",
    color: "#64748b", fontSize: "0.9rem", padding: "0.3rem 0",
  },
  title: { fontSize: "1.5rem", fontWeight: "700", color: "#0f172a" },
  card: {
    backgroundColor: "white", borderRadius: "12px", padding: "2rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  form: { display: "flex", flexDirection: "column", gap: "1.25rem" },
  row: { display: "flex", gap: "1rem", alignItems: "flex-start" },
  field: { display: "flex", flexDirection: "column", gap: "0.35rem", flex: 1 },
  label: { fontWeight: "600", fontSize: "0.85rem", color: "#374151" },
  input: {
    padding: "0.65rem 0.9rem", borderRadius: "8px",
    border: "1px solid #e2e8f0", fontSize: "0.95rem",
    width: "100%", outline: "none", transition: "border 0.2s",
  },
  textarea: {
    padding: "0.65rem 0.9rem", borderRadius: "8px",
    border: "1px solid #e2e8f0", fontSize: "0.95rem",
    width: "100%", resize: "vertical", outline: "none", fontFamily: "inherit",
  },
  hint: { fontSize: "0.78rem", color: "#94a3b8" },
  aiBox: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "1rem 1.25rem", backgroundColor: "#f5f3ff",
    borderRadius: "8px", border: "1px solid #ddd6fe",
  },
  aiInfo: { display: "flex", alignItems: "center", gap: "0.75rem" },
  aiIcon: { fontSize: "1.5rem" },
  aiTitle: { fontWeight: "600", fontSize: "0.95rem", color: "#5b21b6" },
  aiDesc: { fontSize: "0.8rem", color: "#7c3aed" },
  btnAI: {
    padding: "0.55rem 1.2rem", backgroundColor: "#7c3aed", color: "white",
    border: "none", borderRadius: "8px", cursor: "pointer",
    fontWeight: "600", fontSize: "0.9rem", whiteSpace: "nowrap",
  },
  btnAILoading: { backgroundColor: "#a78bfa", cursor: "not-allowed" },
  aiError: { color: "#b91c1c", fontSize: "0.85rem", backgroundColor: "#fef2f2", padding: "0.6rem 1rem", borderRadius: "6px" },
  actions: { display: "flex", gap: "1rem", paddingTop: "0.5rem" },
  btnCancel: {
    flex: 1, padding: "0.7rem", cursor: "pointer", borderRadius: "8px",
    border: "1px solid #e2e8f0", background: "white", fontWeight: "500",
  },
  btnSave: {
    flex: 2, padding: "0.7rem", cursor: "pointer", borderRadius: "8px",
    border: "none", backgroundColor: "#2563eb", color: "white", fontWeight: "600",
  },
};