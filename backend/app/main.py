from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import crud, schemas, models
from .models import get_db, engine
from .ai_service import generate_smart_assist
from typing import List
from pydantic import BaseModel

# Cria as tabelas no banco, caso elas não existam.
# Como é um projeto pequeno, não utilizei migrations.
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Hub Educacional API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # porta padrão do Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "Hub Educacional API"}


class PaginatedResources(BaseModel):
    total: int
    items: List[schemas.ResourceOut]


@app.get("/resources", response_model=PaginatedResources)
def list_resources(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_resources(db, skip=skip, limit=limit)


@app.get("/resources/{resource_id}", response_model=schemas.ResourceOut)
def get_resource(resource_id: int, db: Session = Depends(get_db)):
    resource = crud.get_resource(db, resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Recurso não encontrado")
    return resource


@app.post("/resources", response_model=schemas.ResourceOut, status_code=201)
def create_resource(resource: schemas.ResourceCreate, db: Session = Depends(get_db)):
    return crud.create_resource(db, resource)


@app.put("/resources/{resource_id}", response_model=schemas.ResourceOut)
def update_resource(
    resource_id: int, resource: schemas.ResourceUpdate, db: Session = Depends(get_db)
):
    updated = crud.update_resource(db, resource_id, resource)
    if not updated:
        raise HTTPException(status_code=404, detail="Recurso não encontrado")
    return updated


@app.delete("/resources/{resource_id}", status_code=204)
def delete_resource(resource_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_resource(db, resource_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Recurso não encontrado")


@app.post("/smart-assist", response_model=schemas.SmartAssistResponse)
def smart_assist(request: schemas.SmartAssistRequest):
    try:
        result = generate_smart_assist(request.title, request.type)
        return result
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Erro na IA: {str(e)}")
