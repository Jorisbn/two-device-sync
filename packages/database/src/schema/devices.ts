import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const devices = sqliteTable("devices", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    type: text("type", { enum: ["mobile", "desktop"] }),
    publicKey: text("public_key").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});
