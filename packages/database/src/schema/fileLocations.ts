import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { files } from "./files";
import { devices } from "./devices";

export const fileLocations = sqliteTable(
    "file_locations",
    {
        id: text("id").primaryKey(),
        fileId: text("file_id")
            .notNull()
            .references(() => files.id, { onDelete: "restrict" }),
        deviceId: text("device_id")
            .notNull()
            .references(() => devices.id, { onDelete: "restrict" }),
        storageKey: text("storage_key").notNull(),
        createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
    },
    (table) => [uniqueIndex("file_location_file_device_idx").on(table.fileId, table.deviceId)],
);
