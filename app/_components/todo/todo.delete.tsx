'use client'

import React, { useState } from 'react'

import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import { deleteTodo } from '@/infrastructure/actions/todos/delete-todo.actions'
import { toast } from 'sonner'

interface TodoDeleteProps {
    id?: number;
}
export const TodoDelete = ({ id }: TodoDeleteProps) => {
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (id?: number) => {
        setLoading(true);
        try {
            await deleteTodo(id);
            toast.success("La tarea fue eliminada", {
                description: "Tu tarea ha sido eliminada exitosamente"
            });
        } catch (error) {
            console.error('Error creating todo:', error);
            toast.error("La tarea no fue eliminada.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => handleSubmit(id)}
            disabled={isLoading}
        >
            <Trash className="h-4 w-4" />
        </Button>
    )
}
