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

Установить локально:
- Python 3.11+
- Node.js 18+
- npm

## Как запустить

### 1. Backend

```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend будет доступен по адресу:
- http://127.0.0.1:8000
- Swagger UI: http://127.0.0.1:8000/docs

### 2. Frontend

В новом терминале:

```bash
cd frontend
npm install
npm run dev
```

Frontend будет доступен по адресу:
- http://127.0.0.1:5173

## Как проверить работоспособность

### Вариант 1 — через UI
1. Откройте `http://127.0.0.1:5173`
2. Нажмите кнопку **Создать запись через FastAPI**
3. На странице появится статус успешного создания
4. Ниже в списке появится новая запись

### Вариант 2 — через Swagger
1. Откройте `http://127.0.0.1:8000/docs`
2. Проверьте:
   - `POST /items`
   - `GET /items`
   - `PUT /items/{item_id}`
   - `DELETE /items/{item_id}`

### Вариант 3 — через curl

Создание:
```bash
curl -X POST "http://127.0.0.1:8000/items" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test item","description":"Created from curl","is_done":false}'
```

Получение списка:
```bash
curl "http://127.0.0.1:8000/items"
```

Обновление:
```bash
curl -X PUT "http://127.0.0.1:8000/items/1" \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated item","is_done":true}'
```

Удаление:
```bash
curl -X DELETE "http://127.0.0.1:8000/items/1"
```
