# 🚀 NovaToolkit Backend

> The backend of "NovaToolkit" diploma work by Maxim Bondarenko

---

## 📦 Requirements

- [Node.js](https://nodejs.org/) **v18+** (for local run)
- [npm](https://www.npmjs.com/) **v7+**
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (for containerized run)

---

## ⚡️ Quick Start

### 1. Local Development

#### 1.1. Install dependencies

```bash
npm ci
```

#### 1.2. Start the development server

```bash
npm run start:dev
```

The app will be available at [http://localhost:4200](http://localhost:4200).
The swagger docs will be available at [http://localhost:4200/api/#/](http://localhost:4200/api/#/).

---

### 2. Docker Compose

#### 2.1. Make sure Docker and Docker Compose are installed

- [Install Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

#### 2.2. Start the project in a container

```bash
npm run start:docker
```
or
```bash
docker compose up
```

The app will be available at [http://localhost:4200](http://localhost:4200).
The swagger docs will be available at [http://localhost:4200/api/#/](http://localhost:4200/api/#/).

---

## 📝 Environment Variables

You can set environment variables in `.env` or use the provided `.env.example` as a template.

---

## 📚 Useful Scripts

- `npm run start:dev` — Start NestJS dev server
- `npm run build` — Build the NestJS project
- `npm run lint` — Run ESLint
- `npm run lint:fix` — Fix lint errors automatically

---

## 🛠️ Project Structure

```
dump/            # PostgreSQL database dump
prisma/          # Prisma Schema for database
src/
  auth/          # Auth module (controller, service, dto, guards, decorators)
  build/         # Build module (controller, service, dto)
  category/      # Category module (controller, service, dto)
  codebase/      # Codebase module (controller, service, dto, helpers)
  project/       # Project module (controller, service, dto, helpers)
  screen/        # Screen module (controller, service, dto)
  template/      # Template module (controller, service, dto, helpers)
```

---

## 🤝 Contributing

Feel free to open issues or pull requests!

---