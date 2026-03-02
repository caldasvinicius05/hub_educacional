from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from enum import Enum

# Utilização de Enum para garantir que aqueles serão os dados utilizados.
class ResourceType(str, Enum):
    video = "Video"
    pdf = "PDF"
    link = "Link"

class ResourceBase(BaseModel):
    title: str
    description: Optional[str] = None
    type: ResourceType
    url: Optional[str] = None
    tags: Optional[str] = None  # "tag1,tag2,tag3"

# Duas classes para possíveis alterações pontuais, sem a necessidade de alterar a ResourceBase.
class ResourceCreate(ResourceBase):
    pass

class ResourceUpdate(ResourceBase):
    pass


# O que a API irá retornar nas chamadas
class ResourceOut(ResourceBase):
    id: int

    class Config:
        from_attributes = True

# Solicitação para a IA devolver o título e o tipo.
class SmartAssistRequest(BaseModel):
    title: str
    type: ResourceType

# Solicitação para a IA devolver a descrição e as tags.
class SmartAssistResponse(BaseModel):
    description: str
    tags: List[str]