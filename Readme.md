Wall

## Screenshots
![start window](screenshots/start.png)
![regular user window](screenshots/regular.png)
![admin window](screenshots/admin.png)

## Доступ к приложению  
🔹 **Frontend:** [my-app-frontend](https://github.com/source-bob/testProjekti/tree/last/FE/testiSivu)  
🔹 **Backend:** [my-app-backend](https://github.com/source-bob/testProjekti/tree/last/BE)

## Запуск проекта локально  
### **1. Склонировать репозиторий:**  

git clone https://github.com/source-bob/testProjekti.git

cd testProjekti

### **2. Установить зависимости:**
Backend:
cd BE
npm install

Frontend:
cd ../FE/testiSivu
npm install

### **3. Запустить сервер и клиент:**
Backend:
npm run dev

Frontend:
npm run dev


## API-документация
**Файл с тестовыми запросами API:**  
[test-requests.http](BE/test/test-requests.http) 

**Base URL API (локально):**  
`http://localhost:3000/api`

### Auth
- POST    /api/auth/register  - регистрация пользователя
- POST    /api/auth/login     - вход в систему
- GET     /api/auth/me        - проверка токена

### Post
- GET     /api/posts          - получить все посты
- POST    /api/posts          - создать пост

- GET     /api/posts/:id      - найти посты пользователя
- PUT     /api/posts/:id      - редактировать пост
- DELETE  /api/posts/:id      - удалить пост

### User
- GET     /api/users          - получить всех пользователей
- POST    /api/users          - создать пользователя

- GET     /api/users/:id      - получить пользователя
- PUT     /api/users/:id      - обновить пользователя
- DELETE  /api/users/:id      - удалить пользователя

## Структура базы данных
**SQL-скрипт для создания базы:**  
[db-script.sql](BE/db/db-script.sql)

- users (user_id PK, username, password, email, user_level,  registered_at)  
- posts (entry_id PK, user_id FK, note, created_at) 

## Реализованные функции  
✅ Регистрация и авторизация пользователей  
✅ Добавление, редактирование и удаление постов
✅ все запросы API с JWT-авторизацией (кроме регистрации и логина)

## Известные проблемы  
❌ Информация на странице иногда не обновляется (но в БД обновляется)
❌ Логотип поддерживает только один размер. Нужно добавить поддержку адаптивных изображений.
❌ Некоторые сообщения об ошибках не отображаются у администратора. Возможно, ошибка в обработке исключений.

## Используемые технологии  
- [React](https://react.dev) + [Vite](https://vite.dev)
- [Express.js](https://expressjs.com) + [MySQL](https://www.mysql.com)  
- [JWT](https://jwt.io) для аутентификации 

 

