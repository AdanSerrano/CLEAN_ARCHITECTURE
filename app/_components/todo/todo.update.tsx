'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/_components/ui/dialog"

import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { PencilLine } from "lucide-react"
import { Todo } from "@/src/entities/models/todo.model"
import { toast } from "sonner"
import { updateTodo } from "@/infrastructure/actions/todos/update-todo.actions"
import { useState } from "react";

interface ModalTodoUpdateProps {
    todo: Todo;
}

export const ModalTodoUpdate = ({ todo }: ModalTodoUpdateProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState(todo.text);
    const [isloading, setLoading] = useState(false);

    const handleUpdate = async () => {
        if (!text.trim()) return;
        setLoading(true);
        try {
            await updateTodo({
                id: todo.id,
                text: text,
                done: todo.done
            }, todo.id);
            setIsOpen(false);
            toast.success("La tarea fue actualizada", {
                description: "Tu tarea ha sido actualizada exitosamente"
            });
        } catch (error) {
            console.error('Error updating todo:', error);
            toast.error("La tarea no fue actualizada.")
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                >
                    <PencilLine className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Actualizar Tarea</DialogTitle>
                    <DialogDescription>
                        Realice cambios en su tarea aquí. Haga clic en guardar cuando haya terminado.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Input
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="col-span-3"
                            placeholder="Actualiza tu Tarea..."
                            disabled={isloading}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={handleUpdate}
                        disabled={isloading || !text.trim()}
                    >
                        {isloading ? "Actualizando..." : "Guardar Cambios"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}