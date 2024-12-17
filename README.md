# Storage Manager

A warehouse inventory management and transaction tracking application written in Next.  
Deployed [here on Vercel](pv247-storage-manager-kss5.vercel.app).

## General tech stack

- Next.js + Typescript
- Tailwind
- Prisma
- Next Auth
- Tanstack query
- react-hook-form
- zod


## Installation

### Database

In order to run the application you need to set up postgres database running.
There is a `Dockerfile` ready for you in `db/` folder.
Run
```bash
docker compose up -d
```
to start running your local postgres database in the background.


### Environment

Copy `template.env` file to `.env` and fill in necessary environment variables.
`DATABASE_URL` can be for example `postgresql://root:123@localhost:5432/pv247-storage-manager?schema=public` for the local development.

In order create credentials for `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, you need first to set up Google OAuth ([check these steps](https://support.google.com/cloud/answer/6158849)).


### Application

You need to install node packages and migrate database.
```bash
npm install --legacy-peer-deps
npm exec prisma migrate dev
```

## Run

```bash
npm run dev
```
