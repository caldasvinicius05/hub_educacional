from sqlalchemy.orm import Session
from . import models, schemas


def get_resources(db: Session, skip: int = 0, limit: int = 10):
    total = db.query(models.Resource).count()
    items = db.query(models.Resource).offset(skip).limit(limit).all()
    return {"total": total, "items": items}


def get_resource(db: Session, resource_id: int):
    return db.query(models.Resource).filter(models.Resource.id == resource_id).first()


def create_resource(db: Session, resource: schemas.ResourceCreate):
    db_resource = models.Resource(**resource.model_dump())
    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)
    return db_resource


def update_resource(db: Session, resource_id: int, resource: schemas.ResourceUpdate):
    db_resource = get_resource(db, resource_id)
    if not db_resource:
        return None
    for key, value in resource.model_dump().items():
        setattr(db_resource, key, value)
    db.commit()
    db.refresh(db_resource)
    return db_resource


def delete_resource(db: Session, resource_id: int):
    db_resource = get_resource(db, resource_id)
    if not db_resource:
        return False
    db.delete(db_resource)
    db.commit()
    return True
