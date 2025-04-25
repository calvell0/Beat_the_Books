
# Beat the Books

A full-stack hobby project that surfaces sports-betting edges.  
**Tech stack**

- **Backend** Spring Boot 3 (Java 21), Maven  
- **Frontend** React 19 + TypeScript, Vite 6, Tailwind CSS, shadcn/ui, lucide-react  
- **Containerisation** Multi-stage Docker images, orchestrated with Docker Compose v2

---

## Project structure

```
Beat_the_Books/
├─ Dockerfile              ← Spring-Boot (Maven → JRE) image
├─ compose.yaml            ← two-service stack
├─ pom.xml                 ← backend build
├─ src/                    ← Java code
│   └─ main/java/com/...
├─ ui/
│   ├─ Dockerfile          ← Node → NGINX image
│   ├─ vite.config.ts      ← alias "@" → src/
│   ├─ tailwind.config.js  ← Tailwind + optional plugins
│   └─ src/                ← TSX, shadcn components, assets
└─ .dockerignore, ui/.dockerignore
```

---

## Prerequisites

| For Docker-only run | For local hot-reload |
|---------------------|----------------------|
| Docker ≥ 20.10      | Java 21 JDK          |
| Docker Compose v2   | Node 18 + npm        |

---

## Quick start (one command)

```bash
# from repo root
docker compose up --build
```

- **Frontend** http://localhost   (NGINX → React bundle)
- **Backend** internal only (`backend:8080`), proxied by NGINX at `/api/**`

Stop & clean:

```bash
docker compose down
```

---

## Hot-reload workflow (host tools)

```bash
# backend
./mvnw spring-boot:run

# frontend
cd ui
npm i           # first time
npm run dev     # Vite on http://localhost:5173 (proxy to :8080)
```

---

## License

MIT © 2025 Matthew Calvello
