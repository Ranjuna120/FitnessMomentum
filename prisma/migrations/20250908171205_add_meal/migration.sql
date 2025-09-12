-- SQLite add meal table for local dev

-- CreateTable
CREATE TABLE "Meal" (
	"id" TEXT NOT NULL PRIMARY KEY,
	"user_id" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"calories" INTEGER NOT NULL,
	"protein" REAL NOT NULL,
	"carbs" REAL NOT NULL,
	"fats" REAL NOT NULL,
	"consumed_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at" DATETIME NOT NULL,
	CONSTRAINT "Meal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Meal_user_id_consumed_at_idx" ON "Meal"("user_id", "consumed_at");
