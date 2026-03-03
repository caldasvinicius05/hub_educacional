from pydantic import BaseModel
from typing import Optional, List
from enum import Enum


class ResourceType(str, Enum):
    video = "Video"
    pdf = "PDF"
    link = "Link"


class ResourceBase(BaseModel):
    title: str
    description: Optional[str] = None
    type: ResourceType
    url: Optional[str] = None
    tags: Optional[str] = None


class ResourceCreate(ResourceBase):
    pass


class ResourceUpdate(ResourceBase):
    pass


class ResourceOut(ResourceBase):
    id: int

    class Config:
        from_attributes = True


class SmartAssistRequest(BaseModel):
    title: str
    type: ResourceType


class SmartAssistResponse(BaseModel):
    description: str
    tags: List[str]