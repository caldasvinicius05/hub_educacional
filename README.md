# Hub Inteligente de Recursos Educacionais

Aplicação Fullstack para gerenciamento de materiais didáticos com suporte a IA.

## Tecnologias
- **Backend:** Python, FastAPI, SQLAlchemy, SQLite
- **Frontend:** React + Vite (em desenvolvimento)
- **IA:** Google Gemini API

## Como rodar o backend

### Pré-requisitos
- Python 3.10+

### Instalação
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### Variáveis de ambiente

Crie um arquivo `.env` dentro de `/backend`:
```env
GEMINI_API_KEY=sua_chave_aqui
DATABASE_URL=sqlite:///./resources.db
USE_MOCK=true
```

### Rodando o servidor
```bash
uvicorn app.main:app --reload
```

Acesse a documentação em: http://localhost:8000/docs

## Endpoints disponíveis

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /health | Health check |
| GET | /resources | Lista recursos (paginado) |
| GET | /resources/{id} | Busca recurso por ID |
| POST | /resources | Cria recurso |
| PUT | /resources/{id} | Edita recurso |
| DELETE | /resources/{id} | Remove recurso |
| POST | /smart-assist | Gera descrição e tags com IA |