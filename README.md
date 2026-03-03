# Hub Inteligente de Recursos Educacionais

Aplicação Fullstack para gerenciamento de materiais didáticos com suporte a IA.

## Tecnologias

### Backend
- **Python 3.10+**
- **FastAPI** — framework web moderno e de alta performance
- **SQLAlchemy** — ORM para comunicação com o banco de dados
- **Pydantic** — validação de dados
- **SQLite** — banco de dados local
- **Google Gemini API** — geração de descrições e tags com IA
- **python-dotenv** — gerenciamento de variáveis de ambiente


### Frontend
- **React 18** — biblioteca de interface
- **Vite** — bundler e servidor de desenvolvimento
- **React Router DOM** — navegação SPA
- **Axios** — requisições HTTP

## Como rodar o backend

### Pré-requisitos
- Python 3.10+

### Instalação

### Backend
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

### Frontend

**1. Entre na pasta e instale as dependências:**
```bash
cd frontend
npm install
```

**2. Rode o servidor de desenvolvimento:**
```bash
npm run dev
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

## 📝 Observações

- O projeto utiliza **SQLite** por simplicidade. Para produção, recomenda-se PostgreSQL ou MySQL.
- A flag `USE_MOCK=true` permite rodar o projeto sem uma chave de API válida, simulando a resposta da IA.
- Para ativar a IA real, defina `USE_MOCK=false` e forneça uma chave válida do Google Gemini.