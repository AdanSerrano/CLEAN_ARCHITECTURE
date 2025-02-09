'use client';

import { FormEvent, useRef, useState } from 'react';
import { Loader, Plus } from 'lucide-react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { createTodo } from '@/infrastructure/actions/todos/create-todo.actions';
import { toast } from "sonner"

export function CreateTodo() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLoading) return;

        const formData = new FormData(event.currentTarget);
        const text = formData.get('text') as string;

        if (!text.trim()) {
            toast.error("Error", {
                description: "Por favor introduce el texto de la tarea"
            });
            return;
        }

        setLoading(true);
        try {
            await createTodo({ text, done: false });

            if (inputRef.current) {
                inputRef.current.value = '';
            }

            toast.success("Éxito", {
                description: "Tu tarea ha sido creada exitosamente"
            });
        } catch (error) {
            console.error('Error creating todo:', error);
            toast.error("Error", {
                description: "La tarea no pudo ser creada"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center w-full gap-2">
            <Input
                ref={inputRef}
                id='text'
                name="text"
                className="flex-1"
                placeholder="Crea una tarea nueva..."
                required
            />
            <Button size="icon" disabled={isLoading} type="submit">
                {isLoading ? <Loader className="animate-spin" /> : <Plus />}
            </Button>
        </form>
    );
}