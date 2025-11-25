export const SUCCEES_GET_PROJECTS = "SUCCEES_GET_PROJECTS";
export const FAILED_GET_PROJECTS = "FAILED_GET_PROJECTS";

export const SUCCEES_GET_PROJECT = "SUCCEES_GET_PROJECT";
export const FAILED_GET_PROJECT = "FAILED_GET_PROJECT";

export const SUCCEES_CREATE_PROJECT = "SUCCEES_CREATE_PROJECT";
export const FAILED_CREATE_PROJECT = "FAILED_CREATE_PROJECT";

export const SUCCEES_UPDATE_PROJECT = "SUCCEES_UPDATE_PROJECT";
export const FAILED_UPDATE_PROJECT = "FAILED_UPDATE_PROJECT";

export const SUCCEES_DELETE_PROJECT = "SUCCEES_DELETE_PROJECT";
export const FAILED_DELETE_PROJECT = "FAILED_DELETE_PROJECT";


export interface IProject {
  _id: string;               // ID de MongoDB
  name: string;              // Nombre del proyecto
  description?: string;      // Descripción opcional
  status?: "pending" | "in-progress" | "completed";  // Estado del proyecto
  startDate?: string;        // Fecha de inicio en formato ISO
  endDate?: string;          // Fecha de fin en formato ISO
  createdAt?: string;        // Cuando se creó
  updatedAt?: string;        // Última actualización
}
