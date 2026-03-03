import axios from "axios";

// Conexão com o backend FastAPI (porta 8000)
const api = axios.create({
  baseURL: "http://localhost:8000",
});

// Para a paginação de 10 por página.
export const getResources = (skip = 0, limit = 10) =>
  api.get(`/resources?skip=${skip}&limit=${limit}`);

export const getResource = (id) =>
  api.get(`/resources/${id}`);

export const createResource = (data) =>
  api.post("/resources", data);

export const updateResource = (id, data) =>
  api.put(`/resources/${id}`, data);

export const deleteResource = (id) =>
  api.delete(`/resources/${id}`);

export const smartAssist = (title, type) =>
  api.post("/smart-assist", { title, type });