import { useEffect, useState } from 'react'

const API_URL = 'http://127.0.0.1:8000'

export default function App() {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  async function loadItems() {
    const response = await fetch(`${API_URL}/items`)
    const data = await response.json()
    setItems(data)
  }

  async function createDemoItem() {
    setLoading(true)
    setStatus('Создаем запись через POST /items...')

    try {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Demo item ${new Date().toLocaleString('ru-RU')}`,
          description: 'Эта запись была создана кнопкой с главной страницы',
          is_done: false,
        }),
      })

      if (!response.ok) {
        throw new Error('Не удалось создать запись')
      }

      const created = await response.json()
      setStatus(`Готово: создан item с id=${created.id}`)
      await loadItems()
    } catch (error) {
      setStatus(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems().catch(() => {
      setStatus('Не удалось загрузить список. Убедитесь, что backend запущен на 8000 порту.')
    })
  }, [])

  return (
    <div className="page">
      <div className="container">
        <span className="badge">AI IDE BAS demo integration</span>
        <h1>Главная страница с кнопкой вызова FastAPI POST метода</h1>
        <p className="lead">
          Эта кнопка вызывает <code>POST /items</code> у локального FastAPI сервиса и сохраняет запись в SQLite.
        </p>

        <button onClick={createDemoItem} disabled={loading} className="primary-btn">
          {loading ? 'Отправка...' : 'Создать запись через FastAPI'}
        </button>

        {status && <div className="status">{status}</div>}

        <div className="card">
          <h2>Созданные записи</h2>
          {items.length === 0 ? (
            <p>Пока записей нет. Нажмите кнопку выше.</p>
          ) : (
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  <div>ID: {item.id}</div>
                  <div>{item.description || 'Без описания'}</div>
                  <div>Статус: {item.is_done ? 'Done' : 'Open'}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
