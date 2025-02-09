import { z } from 'zod';

export const selectTodoSchema = z.object({
    id: z.number().optional(),
    text: z.string().min(1, { message: 'Por favor introducir al menos 1 caracter' }),
    done: z.boolean().optional(),
});
export type Todo = z.infer<typeof selectTodoSchema>;

export const insertTodoSchema = selectTodoSchema.omit({
    id: true,
});

export type TodoInsert = z.infer<typeof insertTodoSchema>;
