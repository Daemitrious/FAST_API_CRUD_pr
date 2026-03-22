# FastAPI CRUD + Frontend button demo

Готовый локальный проект из двух частей:

- `backend` — FastAPI + SQLite CRUD сервис
- `frontend` — главная страница с кнопкой, которая вызывает `POST /items`

## Что реализовано

### Backend
CRUD ручки для сущности `items`:
- `POST /items` — создать запись
- `GET /items` — получить список
- `PUT /items/{item_id}` — обновить запись
- `DELETE /items/{item_id}` — удалить запись

### Frontend
На главной странице есть кнопка:
- **Создать запись через FastAPI**

При нажатии вызывается `POST /items`, затем список обновляется.

## Что понадобится

### Что понадобится
- Docker Desktop
- Docker Compose

### Запуск одной командой

```bash
docker compose up --build
```

После запуска будут доступны:
- Frontend: http://127.0.0.1:5173
- Backend: http://127.0.0.1:8000
- Swagger: http://127.0.0.1:8000/docs

### Как остановить

```bash
docker compose down



