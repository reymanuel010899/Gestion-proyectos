

export const SUCCEES_GET_DASHBOARD = "SUCCEES_GET_DASHBOARD";
export const FAILED_GET_DASHBOARD = "FAILED_GET_DASHBOARD";


export interface StatCount {
    _id: string;
    count: number;
}

type projectProgress = {
    name: string;
    progress: number
}

export interface DashboardStats {
    totalOwned: number;
    collabCount: number;
    totalProjects: number;
    totalTasks: number;
    tasksByStatus: StatCount[];
    tasksByPriority: StatCount[];
    projectsProgress?: projectProgress[]
}