import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { devices } from "./devices";

export const syncState = sqliteTable("sync_state", {
    deviceId: text("device_id")
        .primaryKey()
        .references(() => devices.id),
    lastSyncAt: integer("last_sync_at", { mode: "timestamp_ms" }),
    cursor: integer("cursor").notNull().default(0),
});
