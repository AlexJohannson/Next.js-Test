import axios from 'axios';

// Створюємо екземпляр axios з налаштуваннями
const api = axios.create({
    baseURL: 'https://dummyjson.com',  // Основна URL
    withCredentials: true, // Це дозволить відправляти cookies з кожним запитом
});

// Можна також налаштувати заголовки за замовчуванням, якщо потрібно
api.defaults.headers['Content-Type'] = 'application/json';

export default api;
