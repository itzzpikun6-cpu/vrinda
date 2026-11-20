# Vrinda Proposal ❤️ — one-service Render deployment

This project can be deployed as **one Render web service**: Express serves both the built React site and the API. MongoDB Atlas remains the database.

## Requirements
- Node.js 18+ for local development
- GitHub repository
- MongoDB Atlas M0 Free cluster

## Local development

### Backend
```bash
cd backend
cp .env.example .env
# Put your MongoDB URI in backend/.env
npm install
npm run dev
```

### Frontend (second terminal)
```bash
cd frontend
npm install
npm run dev
```

Vite uses `http://localhost:5000` for the local API. In production, the frontend and API share one domain.

## Deploy the full project on Render (one service)

1. Push the updated project files to GitHub (including `render.yaml`).
2. In Render, select **New → Blueprint** and connect the repository, or select **New → Web Service** and connect it.
3. For a manual Web Service, use:
   - Root Directory: leave blank (`.`)
   - Runtime: Node
   - Region: Singapore (or nearest region available)
   - Plan: Free
   - Build Command:
     `npm install --prefix frontend && npm run build --prefix frontend && npm install --prefix backend`
   - Start Command:
     `npm start --prefix backend`
4. In Render → service → Environment, add:
   - `MONGODB_URI` = your full MongoDB Atlas connection string, including `/vrinda_proposal` before the query string.
5. Deploy. Render will build React, then start Express. The app and API will share the same `https://your-service.onrender.com` URL.

## MongoDB Atlas network access

For a quick hobby/demo deployment, you can allow access from all IP addresses in Atlas Network Access using `0.0.0.0/0`. This is less restrictive; use a strong database password and a database user limited to `readWrite` on `vrinda_proposal`. For tighter access, add the outbound CIDR ranges shown in your Render service under **Connect → Outbound** instead.

Choose an Atlas region near your Render region when creating the cluster, where available.

## API
- `GET /api/health`
- `POST /api/responses`

Example:
```json
{"response":"yes","message":"I love you too!"}
```

## Important free-tier note
Render free web services spin down after 15 minutes without traffic. The first visit after inactivity can take about a minute to wake up. MongoDB Atlas M0 is a free small-scale cluster and is suitable for this personal demo.

## Security
- Do not commit `.env` or paste your MongoDB URI into frontend code.
- Keep the MongoDB URI only in Render environment variables and local `backend/.env`.
- Do not share your database password.
