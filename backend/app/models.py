from sqlalchemy import Column, Integer, String, Text, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./resources.db") # Configurando variável de ambiente e valor padrão.

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False}) # Configuração para permitir que o SQLite aceite threads diferentes.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Resource(Base): # Criação da tabela principal,com todas as características das colunas definidas.
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    type = Column(String(50), nullable=False)  # Video, PDF, Link
    url = Column(String(500), nullable=True)
    tags = Column(String(500), nullable=True)  # armazenado como "tag1,tag2,tag3"

# Controle de conexão, evitando connection leak para travamentos do banco.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()