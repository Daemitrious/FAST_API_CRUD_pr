from sqlalchemy.orm import Session

from . import models, schemas


def create_item(db: Session, item: schemas.ItemCreate) -> models.Item:
    db_item = models.Item(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def get_items(db: Session) -> list[models.Item]:
    return db.query(models.Item).order_by(models.Item.id.desc()).all()


def get_item(db: Session, item_id: int) -> models.Item | None:
    return db.query(models.Item).filter(models.Item.id == item_id).first()


def update_item(db: Session, item_id: int, payload: schemas.ItemUpdate) -> models.Item | None:
    db_item = get_item(db, item_id)
    if not db_item:
        return None

    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(db_item, key, value)

    db.commit()
    db.refresh(db_item)
    return db_item


def delete_item(db: Session, item_id: int) -> models.Item | None:
    db_item = get_item(db, item_id)
    if not db_item:
        return None

    db.delete(db_item)
    db.commit()
    return db_item
