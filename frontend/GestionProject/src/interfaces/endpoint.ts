const ENPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        PROFILE: '/auth/profile',
        PROFILES: '/auth/list-profile'
    },

    PROJECTS: {
        LIST: '/project/get-project',
        DETAIL: (projectId: string) => `/project/get-project-by-id/${projectId}`,
        CREATE: '/project/create-project',
        UPDATE: (projectId: string) => `/project/update-project/${projectId}`,
        DELETE: (projectId: string) => `/project/delete-project/${projectId}`,
    },

    TASKS: {
        LIST: '/task/get-tasks',
        DETAIL: (taskId: string) => `/task/get-task-by-id/${taskId}`,
        CREATE: '/task/create-task',
        UPDATE: (taskId: string) => `/task/update-task/${taskId}`,
        DELETE: (taskId: string) => `/task/delete-task/${taskId}`,
    },
    DASHBOARD: {
        DETAILS:   '/dashboard/get-details', 
    } 
};

export default ENPOINTS;
