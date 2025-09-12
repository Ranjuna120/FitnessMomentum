# Prisma migrations

This project originally used SQLite for local development. It has been switched to PostgreSQL for production.

- `migration_lock.toml` now declares `provider = "postgresql"`.
- New initial PostgreSQL migration: `20250912114500_init_pg/`.
- Old SQLite migrations are kept for reference but are not applied in production.

On Vercel, `npx prisma migrate deploy` will apply only the PostgreSQL migrations.