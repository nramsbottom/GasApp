BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "price" (
	"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	"date" TEXT NOT NULL,
	"value" INTEGER NOT NULL
);
COMMIT;