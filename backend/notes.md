backend/
│
├── src/
│   ├── config/
│   │   └── database.js        # PostgreSQL connection
│   │
│   ├── models/
│   │   ├── index.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js     # login, register
│   │   └── user.routes.js     # user CRUD 
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── user.controller.js 
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── validate.middleware.js
│   │   └── error.middleware.js #left
│   │
│   ├── validators/
│   │   ├── auth.schema.js     # Zod schemas
│   │   └── user.schema.js #left
│   │
│   ├── untils/
│   │   └── jwt.js
│   │
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md


v 1.2
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── models/
│   │   ├── index.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── validators/
│   ├── app.js
│   └── server.js
│
├── migrations/
├── seeders/
├── .sequelizerc
├── .env
├── package.json
