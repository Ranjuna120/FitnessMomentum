-- Old SQLite migration disabled after provider switch to PostgreSQL.
-- Intentionally left blank so Prisma migrate deploy ignores this step in production.

-- CreateIndex
CREATE UNIQUE INDEX "PersonalRecord_user_id_exercise_id_unit_key" ON "PersonalRecord"("user_id", "exercise_id", "unit");
