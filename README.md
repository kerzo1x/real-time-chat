# 🚀 High-Performance Modular Chat Engine


Ультимативная чат-система, построенная на базе ElysiaJS, Bun и Prisma. Проект демонстрирует экстремальную производительность, типобезопасность и эффективное управление ресурсами. Архитектура без лишнего "шума", только скорость и дисциплина данных.

---

## Tech Stack

Инструменты, выбранные для обеспечения максимальной пропускной способности:

* **Runtime:** Bun (The fast all-in-one JavaScript runtime)
* **Backend Framework:** ElysiaJS (High-performance, End-to-end type safety)
* **Real-Time:** Elysia WebSocket (Native Bun performance)
* **State Management:** Redis (In-memory storage for sessions and real-time states)
* **Database & ORM:** PostgreSQL + Prisma (Type-safe Schema Management)
* **Frontend:** Vue 3 (Composition API) + Pinia + Tailwind CSS
* **DevOps:** Docker (Containerized high-load environment)

---

## 🏗 Architectural Highlights

### 1. Unified Type-System (E2E)
Благодаря Elysia и TypeScript, типы API доступны на фронтенде без генерации лишнего кода. Это исключает дефекты при передаче данных между бэкендом и Vue-клиентом.

### 2. Native WebSocket Performance
Вместо Socket.io используется нативная реализация WebSockets в Bun через Elysia. Это снижает накладные расходы на память и уменьшает задержку (latency) при передаче сообщений.

### 3. Redis-Powered Sync
Redis используется как брокер сообщений и кэш. Это гарантирует, что статусы пользователей и история последних сообщений отдаются мгновенно, не нагружая основную базу данных PostgreSQL.

//Used Path alias
---

## 🐳 Deployment (Infrastructure as Code)

Запуск всей системы в изолированных контейнерах:

```bash
docker-compose up --build