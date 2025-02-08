import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";
export const todos = pgTable("todo", {
    id: serial("id").primaryKey(),
    text: text("text").notNull(),
    done: boolean("done").default(false).notNull(),
});