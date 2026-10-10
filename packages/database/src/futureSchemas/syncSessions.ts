import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const syncSessions = sqliteTable("sync_sessions", {
    id: text("id").primaryKey(),
    status: text("status", { enum: ["pending", "transferring", "completed", "failed"] }).notNull(),
    totalBytes: integer("total_bytes").notNull(),
    startedAt: integer("started_at", { mode: "timestamp_ms" }),
    completedAt: integer("completed_at", { mode: "timestamp_ms" }),
    error: text("error"),
});
