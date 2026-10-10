import { sqliteTable, text, integer, AnySQLiteColumn } from "drizzle-orm/sqlite-core";

export const fileFolders = sqliteTable("file_folders", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    parentId: text("parent_id").references((): AnySQLiteColumn => fileFolders.id, { onDelete: "restrict" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});
