# Binary Studio Academy 2018: Бекенд для чата
Содержит 2 сущности: User (name, nickname), Message (senderId, receiverId, content). Каждая реализовывает CRUD (create, read, update, delete).

## Роуты для User
**Показать всех пользователей (/users)**
Запрос GET
```
router.get("/users", (req, res) => ...);
```

**Показать одного пользователя по ID (/users/:id)**
Запрос GET
```
router.get("/users/:id", (req, res) => ...);
```

**Создать нового пользователя (/users)**
Запрос POST
```
router.post("/users", (req, res) => ...);
```

**Обновить данные пользователя по заданному ID (/users/:id)**
Запрос PUT
```
router.put("/users/:id", (req, res) => ...);
```

**Удалить пользователя по ID (/users/:id)**
Запрос DELETE
```
router.delete("/users/:id", (req, res) => ...);
```

**Показать всех пользователей, с которыми общался пользователь с данным ID (/users/:id/interlocutors)**
Запрос GET
```
router.get("/users/:id/interlocutors", (req, res) => ...);
```

## Роуты для Message
**Показать все сообщения (/messages)**
Запрос GET
```
router.get("/messages", (req, res) => ...);
```

**Показать одног сообщение по ID (/messages/:id)**
Запрос GET
```
router.get("/messages/:id", (req, res) => ...);
```

**Создать новое сообщение (/messages)**
Запрос POST
```
router.post("/messages", (req, res) => ...);
```

**Обновить данные сообщения по заданному ID (/messages/:id)**
Запрос PUT
```
router.put("/messages/:id", (req, res) => ...);
```

**Удалить сообщение по ID (/messages/:id)**
Запрос DELETE
```
router.delete("/messages/:id", (req, res) => ...);
```
