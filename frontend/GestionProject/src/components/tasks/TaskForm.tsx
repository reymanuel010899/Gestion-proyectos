import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "@/redux/actions/task/createTask";
import { getProjects } from "@/redux/actions/project/getProjects";
import { updateTask } from "@/redux/actions/task/updateTask";
import { getProfiles } from "@/redux/actions/auth/userList";

interface TaskFormProps {
  taskToEdit: any | null;
  onSuccess: () => void;
}

type Project = {
  _id: string;
  name: string;
  description: string;
  status: "Active" | "Delivered" | "Pending";
  progress: number;
  lastUpdated: string;
  priority: "High" | "Medium" | "Low";
  updatedAt: string;
};

type UserProfile = {
  id: string;
  _id: string;
  email: string;
  name: string;
};

export default function TaskForm({ taskToEdit, onSuccess }: TaskFormProps) {
  const dispatch: any = useDispatch();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pendiente");
  const [point, setPoint] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectId, setProjectId] = useState("");
  const [users, setUsers] = useState<UserProfile[]>([]); 
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getProjects({ pages: 1 })(dispatch).then((res) => {
      if (res && res.projects && Array.isArray(res.projects)) {
        setProjects(res.projects as Project[]);
        if (!taskToEdit && res.projects.length > 0) {
          setProjectId(res.projects[0]._id);
        }
      } else {
        setProjects([]);
      }
    });

    getProfiles()(dispatch)
      .then((res: any) => {
        if (res?.users && Array.isArray(res.users)) {
          setUsers(res.users as UserProfile[]);
        }
      })
      .catch(error => console.error("Error al cargar perfiles:", error));
  }, [dispatch]);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.description || "");
      setPriority(taskToEdit.priority || "Medium");

      const assignedId = 
        taskToEdit.assignee &&
        typeof taskToEdit.assignee === "object" &&
        taskToEdit.assignee._id
          ? taskToEdit.assignee._id
          : taskToEdit.assignee || "";

      setAssignee(assignedId);
      setDueDate(taskToEdit.due_date ? taskToEdit.due_date.substring(0, 10) : "");
      setProjectId(taskToEdit.project_id || "");
      setStatus(taskToEdit.status || "pendiente");
      setPoint(taskToEdit.point || 0);

    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setAssignee("");
      setDueDate("");
      setStatus("pendiente");
      setPoint(0);
    }
  }, [taskToEdit]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!projectId) {
      setErrorMessage("Debes seleccionar un proyecto.");
      return;
    }

    const data = {
      title,
      description,
      priority,
      assignee,
      due_date: dueDate || null,
      project_id: projectId,      
      status,
      point: Number(point),       
    };

    if (taskToEdit) {
      updateTask(taskToEdit._id, data)(dispatch)
        .then(() => {
          onSuccess();
          window.location.reload();
        })
        .catch(() => console.error("Ocurrió un error"));
    } else {
      createTask(data)(dispatch)
        .then((res) => {
          if (res === "No tienes acceso a este proyecto") {
            setErrorMessage("No tienes permisos para crear tareas, comunícate con el administrador");
          } else if (res === "El usuario asignado no es colaborador del proyecto") {
            setErrorMessage("Este usuario no es colaborador del proyecto");
          } else {
            onSuccess();
            window.location.reload();
          }
        })
        .catch(() => setErrorMessage("Ocurrió un error inesperado."));
    }
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      {errorMessage && (
        <div className="custom-alert">
          <span>{errorMessage}</span>
          <button className="alert-close-btn" onClick={() => setErrorMessage("")}>✕</button>
        </div>
      )}

      <div className="form-group full-width">
        <label className="form-label">Proyecto</label>
        <select
          className="form-input"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        >
          {projects.length === 0 && <option>No tienes proyectos</option>}
          {projects.map((p: Project) => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group full-width">
        <label className="form-label">Título</label>
        <input
          type="text"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Nombre de la tarea"
        />
      </div>

      <div className="horizontal-group">
        <div className="form-group w-33">
          <label className="form-label">Estado</label>
          <select
            className="form-input"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En Progreso</option>
            <option value="completada">Completada</option> 
          </select>
        </div>

        <div className="form-group w-33">
          <label className="form-label">Prioridad</label>
          <select
            className="form-input"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Baja</option>
            <option value="Medium">Media</option>
            <option value="High">Alta</option>
          </select>
        </div>

        <div className="form-group w-33">
          <label className="form-label">Asignado</label>
          <select
            className="form-input"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          >
            <option value="">-- No Asignado --</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="horizontal-group">
        <div className="form-group w-33">
          <label className="form-label">Fecha límite</label>
          <input
            type="date"
            className="form-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>


      <div className="horizontal-group">
        <div className="form-group w-33">
          <label className="form-label">Puntos (Point)</label>
          <input
            type="number"
            className="form-input"
            value={point}
            min={0}
            onChange={(e) => setPoint(Number(e.target.value))}
            placeholder="Ej: 1, 2, 3, 8"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Breve descripción de la tarea"
        ></textarea>
      </div>

      <div className="form-actions">
        <button className="db-btn-action db-btn-primary" type="submit">
          {taskToEdit ? "Actualizar Tarea" : "Guardar Tarea"}
        </button>
      </div>
    </form>
  );
}
