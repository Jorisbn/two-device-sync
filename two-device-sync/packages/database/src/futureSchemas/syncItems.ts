import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { syncSessions } from "./syncSessions";
import { devices } from "./devices";

export const syncItems = sqliteTable("sync_items", {
    id: text("id").primaryKey(),
    syncSessionId: text("sync_session_id")
        .notNull()
        .references(() => syncSessions.id),
    itemType: text("item_type", { enum: ["message", "file"] }).notNull(),
    itemId: text("item_id").notNull(),

    sourceDeviceId: text("source_device_id")
        .notNull()
        .references(() => devices.id),
    destinationDeviceId: text("destination_device_id")
        .notNull()
        .references(() => devices.id),

    status: text("status", { enum: ["pending", "transferring", "completed", "failed"] }).notNull(),

    bytesTransferred: integer("bytes_transferred").notNull(),
    totalBytes: integer("total_bytes").notNull(),
    startedAt: integer("started_at", { mode: "timestamp_ms" }),
    completedAt: integer("completed_at", { mode: "timestamp_ms" }),
    error: text("error"),
});
