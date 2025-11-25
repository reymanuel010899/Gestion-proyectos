import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITask } from "../../interfaces/task";
import { deleteTask } from "../../redux/actions/task/deleteTask";
import { getTaks } from "@/redux/actions/task/taskList";
import { ChevronDown, ChevronLeft, ChevronRight, Edit2, Trash2 } from "lucide-react";
import { formatDate } from "../urlts";

interface TaskListProps {
  onEdit: (task: ITask) => void;
  asignado?: string,
  priority?: string

}
type PaginationState = {
  page: number;
  limit: number;
  totalCount: number;
};


export default function TaskList({ onEdit, asignado, priority }: TaskListProps) {
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    totalCount: 0,
  });


  const { tasks, loading, error } = useSelector((state: any) => state.getTasksReducer.tasks);
  const getStatusBadge = (status: string) => {
    const displayStatus = status?.toUpperCase() || "N/A";
    let className = "db-status-badge ";

    const normalizedStatus = status?.toLowerCase();

    if (normalizedStatus === "active" || normalizedStatus === "pendiente") className += "db-status-active";
    else if (normalizedStatus === "delivered" || normalizedStatus === "completado") className += "db-status-delivered";
    else className += "db-status-pending";

    return <span className={className}>{displayStatus}</span>;
  };

  const getPriorityBadge = (priority: string) => {
    const displayPriority = priority || "N/A";
    let className = "db-priority-badge ";

    const normalizedPriority = priority?.toLowerCase();

    if (normalizedPriority === "high") className += "db-priority-high";
    else if (normalizedPriority === "medium") className += "db-priority-medium";
    else className += "db-priority-low";

    return <span className={className}>{displayPriority}</span>;
  };

  useEffect(() => {
    getTaks({ pages: pagination.page })(dispatch).then((res: any) => {
      console.log(res)
      if (res) {
        setPagination((prev) => ({
          ...prev,
          page: res.page || prev.page,
          limit: res.limit || prev.limit,
          totalCount: res.totalCount || prev.totalCount,
        }));
      }
    });
  }, [pagination.page]);

  const handleDelete = (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta tarea?")) return;
    deleteTask(id)(dispatch);
    window.location.reload()
  };


  if (loading) {
    return <div className="loading-message">Cargando tareas...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        Error al cargar tareas: {error}
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-list-message">
        <p>No hay tareas disponibles. Crea una nueva.</p>
      </div>
    );
  }


  const filteredTask = tasks?.filter((p: ITask) => {
    const assigneeName = p.assignee && typeof p.assignee === 'object'
      ? p.assignee.name
      : '';

    const matchesAsignado = asignado
      ? assigneeName.toLowerCase().includes(asignado.toLowerCase())
      : true;

    const matchesPriority = priority
      ? p.priority?.toLowerCase() === priority.toLowerCase()
      : true;

    return matchesAsignado && matchesPriority;
  });
  const totalPages = Math.ceil(pagination.totalCount / pagination.limit);

  const handleNextPage = () => {
    if (pagination.page < totalPages) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const PaginationControls = () => (
    <div className="pagination-wrapper">
      <p className="pagination-text">
        Mostrando {((pagination.page - 1) * pagination.limit) + 1} a{" "}
        {Math.min(pagination.page * pagination.limit, pagination.totalCount)} de{" "}
        {pagination.totalCount} Tareas
      </p>

      <div className="pagination-controls-group">
        <button onClick={handlePrevPage} disabled={pagination.page === 1} className="pagination-button">
          <ChevronLeft size={16} className="pagination-icon-prev" /> Anterior
        </button>

        <span className="pagination-current">
          Página {pagination.page} de {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={pagination.page >= totalPages}
          className="pagination-button"
        >
          Siguiente <ChevronRight size={16} className="pagination-icon-next" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="db-table-responsive">
      <table className="db-project-table">
        <thead>
          <tr>
            <th className="db-col-name">
              Título <ChevronDown size={14} className="db-sort-icon" />
            </th>


            <th className="db-col-assignee">Asignado</th>

            <th className="db-col-priority">Prioridad</th>
            <th className="db-col-description">Descripción</th>
            <th className="db-col-due-date">Fecha Límite</th>

            <th className="db-col-status">Estado</th>
            <th className="db-col-actions">Acciones</th>
          </tr>
        </thead>

        <tbody>

          {filteredTask.map((t: ITask) => (
            <tr key={t._id} className="db-table-row">

              <td className="db-col-name">
                <span
                  className="db-link-name"
                  onClick={() => onEdit(t)}
                >
                  {t.title}
                </span>
                <span className="db-col-code db-show-mobile">{t._id}</span>
              </td>

              <td className="db-col-assignee">
                {t.assignee && typeof t.assignee === 'object'
                  ? t.assignee.name || "N/A"
                  : "N/A"}
              </td>

              <td className="db-col-priority">
                {getPriorityBadge(t.priority)}
              </td>

              <td className="db-col-description">
                {t.description || "Sin descripción"}
              </td>


              <td className="db-col-due-date">
                {formatDate(t.due_date)}
              </td>


              <td className="db-col-status">
                {getStatusBadge(t.status)}
              </td>


              <td className="db-col-actions">
                <button
                  className="db-action-btn db-btn-edit"
                  onClick={() => onEdit(t)}
                  title="Editar"
                >
                  <Edit2 size={16} />
                </button>

                <button
                  className="db-action-btn db-btn-delete"
                  onClick={() => t._id && handleDelete(t._id)}
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      {pagination.page > totalPages ? <PaginationControls /> : ""}
    </div>
  );

}