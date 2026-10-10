import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { fileFolders } from "./fileFolders";

export const files = sqliteTable("files", {
    id: text("id").primaryKey(),
    filename: text("filename").notNull(),
    mimeType: text("mime_type"),
    size: integer("size").notNull(),
    sha256: text("sha256").notNull(),
    folderId: text("folder_id").references(() => fileFolders.id, { onDelete: "restrict" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
    deletedAt: integer("deleted_at", { mode: "timestamp_ms" }),
});
