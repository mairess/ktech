# 🚀 KTech API

Pequena API REST em Node.js + Express + TypeScript + MongoDB, com autenticação JWT e documentação Swagger.

## 📦 Tecnologias
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- Zod
- Swagger
- Docker + Docker Compose

## Pré-requisitos

Você precisa ter instalado:

- Docker

## ⚙️ Variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto (ou copie `.env.example`) com pelo menos as seguintes variáveis:

```env
APP_PORT=3001

MONGO_URI=mongodb://root:root123@mongo:27017/ktech-db?authSource=admin

JWT_SECRET=mkQxzvejnVuUbMtlkdPpByqqWuFvKhRw
JWT_EXPIRES_IN=86400

MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=root123
MONGO_INITDB_DATABASE=ktech-db
```

## 🐳 Executando com Docker Compose
No diretório do projeto:
```sh
docker compose up -d --build
```

Isso irá:

- Subir o MongoDB
- Buildar a API
- Iniciar o backend
- Expor a porta definida em `APP_PORT`

Parar serviços:

```sh
docker compose down
```

## 📚 Docs / Swagger
Após subir a aplicação, a documentação Swagger estará em:

```sh
http://localhost:3001/api-docs ## porta conforme APP_PORT
```

## 🔐 Autenticação

A API utiliza JWT.

1. Fluxo:

2. Registrar usuário

3. Fazer login

4. Receber token

Enviar no header:

```sh
Authorization: Bearer SEU_TOKEN
```

## 🧪 Scripts úteis

```sh
npm run dev        # desenvolvimento
npm run lint       # lint
```

## 📁 Estrutura do projeto

``` sh
.
├── docker-compose.yml
├── Dockerfile
├── eslint.config.mjs
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── app.ts
│   ├── controllers
│   │   ├── AuthController.ts
│   │   └── UserController.ts
│   ├── database
│   │   └── connection.ts
│   ├── docs
│   │   ├── auth.docs.ts
│   │   ├── index.ts
│   │   └── user.docs.ts
│   ├── dto
│   │   ├── index.ts
│   │   ├── MeDTO.ts
│   │   └── UserDTO.ts
│   ├── interface
│   │   ├── ICustomError.ts
│   │   └── ILogin.ts
│   ├── middlewares
│   │   ├── authMiddleware.ts
│   │   ├── errorHandlerMiddleware.ts
│   │   └── validations
│   │       ├── schemas
│   │       │   ├── auth.schemas.ts
│   │       │   ├── error.schemas.ts
│   │       │   ├── index.ts
│   │       │   └── user.schemas.ts
│   │       └── validations.ts
│   ├── models
│   │   └── UserModel.ts
│   ├── routes
│   │   ├── auth.routes.ts
│   │   ├── index.ts
│   │   └── user.routes.ts
│   ├── server.ts
│   ├── services
│   │   ├── AuthService.ts
│   │   └── UserService.ts
│   ├── types.ts
│   └── utils
│       ├── jwt.ts
│       └── statusMapper.ts
└── tsconfig.json
```
