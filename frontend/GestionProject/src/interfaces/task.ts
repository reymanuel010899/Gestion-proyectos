// SUCCEES_MEDIA, FAILED_MEDIA

export const SUCCEES_GET_TASKS = "SUCCEES_GET_TASKS";
export const FAILED_GET_TASKS = "FAILED_GET_TASKS";

export const SUCCEES_GET_TASK = "SUCCEES_GET_TASK";
export const FAILED_GET_TASK = "FAILED_GET_TASK";

export const SUCCEES_CREATE_TASK = "SUCCEES_CREATE_TASK";
export const FAILED_CREATE_TASK = "FAILED_CREATE_TASK";

export const SUCCEES_UPDATE_TASK = "SUCCEES_UPDATE_TASK";
export const FAILED_UPDATE_TASK = "FAILED_UPDATE_TASK";

export const SUCCEES_DELETE_TASK = "SUCCEES_DELETE_TASK";
export const FAILED_DELETE_TASK = "FAILED_DELETE_TASK";

type assignee = {
    name: string
}

export interface ITask {
    _id: string;          // ID generado por MongoDB
    projectId: string;          // ID del proyecto al que pertenece la tarea
    title: string;              // Título de la tarea
    description?: string;       // Descripción opcional
    status: "pending" | "in-progress" | "completed"; // Estado de la tarea
    priority: "low" | "medium" | "high"; // Nivel de prioridad
    due_date: string;
    assignee?: string | assignee;        // Usuario asignado
    createdAt?: string;         // Fecha de creación
    updatedAt?: string;         // Fecha de actualización
}
