import { useEffect, useState } from "react";
import { Trash2, Edit2, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { getProjects } from "@/redux/actions/project/getProjects";
import { useDispatch } from "react-redux";
import { deleteProject } from "@/redux/actions/project/deleteProject";

type Project = {
  _id: string;
  name: string;
  description: string;
  status: 'Active' | 'Delivered' | 'Pending';
  progress: number;
  lastUpdated: string;
  priority: 'High' | 'Medium' | 'Low'; 
  updatedAt: string;
};

type ProjectListProps = {
  onSelect?: (project: Project) => void;
  onEdit?: (project: Project) => void;
  filterName: string;
  filterStatus: string;
};

type PaginationState = {
    page: number;
    limit: number;
    totalCount: number;
};

export default function ProjectList({ onSelect, onEdit, filterName, filterStatus }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    totalCount: 0,
  });

  const dispatch = useDispatch();

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este proyecto?")) return;

    try {
      deleteProject(id)(dispatch).then(() => {
        setProjects(projects ? projects.filter((p) => p._id !== id) : null);
      });
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  useEffect(() => {
    getProjects({ pages: pagination.page })(dispatch).then((res) => {
      if (res && res.projects) {
        setProjects(res.projects as Project[]);
        setPagination((prev) => ({
          ...prev,
          page: res.page || prev.page,
          limit: res.limit || prev.limit,
          totalCount: res.totalCount || prev.totalCount,
        }));
      } else {
        setProjects([]);
      }
    });
  }, [pagination.page]);

  const getStatusBadge = (status: string) => {
    let className = "db-status-badge ";
    if (status === "Active") className += "db-status-active";
    else if (status === "Delivered") className += "db-status-delivered";
    else className += "db-status-pending";

    return <span className={className}>{status}</span>;
  };

  const getPriorityBadge = (priority: string) => {
    let className = "db-priority-badge ";

    if (priority === "High") className += "db-priority-high";
    else if (priority === "Medium") className += "db-priority-medium";
    else className += "db-priority-low";

    return <span className={className}>{priority}</span>;
  };

  if (!projects || projects.length === 0) {
    return (
      <div className="empty-list-message">
        <p>No hay proyectos disponibles. Crea uno nuevo para empezar.</p>
      </div>
    );
  }

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

  const filteredProjects = projects?.filter((p) => {
    const matchesName = filterName ? p.name.toLowerCase().includes(filterName.toLowerCase()) : true;
    const matchesStatus = filterStatus ? p.status.toLowerCase() === filterStatus.toLowerCase() : true;
    return matchesName && matchesStatus;
  });

  const PaginationControls = () => (
    <div className="pagination-wrapper">
      <p className="pagination-text">
        Mostrando {((pagination.page - 1) * pagination.limit) + 1} a{" "}
        {Math.min(pagination.page * pagination.limit, pagination.totalCount)} de{" "}
        {pagination.totalCount} proyectos
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
              Nombre <ChevronDown size={14} className="db-sort-icon" />
            </th>
            <th className="db-col-status">Estado</th>
            <th className="db-col-priority">Prioridad</th> 
            <th className="db-col-progress">Progreso</th>
            <th className="db-col-desc db-hide-mobile">Descripción</th>
            <th className="db-col-date db-hide-mobile">Última Actualización</th>
            <th className="db-col-actions">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filteredProjects.map((p) => (
            <tr key={p._id} className="db-table-row">
              

              <td className="db-col-name">
                <span className="db-link-name" onClick={() => onSelect && onSelect(p)}>
                  {p.name}
                </span>
                <span className="db-col-code db-show-mobile">{p._id}</span>
              </td>

              <td className="db-col-status">{getStatusBadge(p.status)}</td>

      
              <td className="db-col-priority">{getPriorityBadge(p.priority)}</td>


              <td className="db-col-progress">
                <div className="db-progress-container">
                  <div className="db-progress-bar" style={{ width: `${p.progress}%` }}></div>
                  <span className="db-progress-text">{p.progress}%</span>
                </div>
              </td>

              <td className="db-col-desc db-hide-mobile">
                {p.description ? (p.description.length > 30 ? p.description.slice(0, 30) + "..." : p.description) : ""}
              </td>

              <td className="db-col-date db-hide-mobile">
                {new Date(p.updatedAt).toISOString().slice(0, 10)}
              </td>


              <td className="db-col-actions">
                <button className="db-action-btn db-btn-edit" title="Editar" onClick={() => onEdit && onEdit(p)}>
                  <Edit2 size={16} />
                </button>

                <button className="db-action-btn db-btn-delete" title="Eliminar" onClick={() => handleDelete(p._id)}>
                  <Trash2 size={16} />
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

       { pagination.page > totalPages ?  <PaginationControls /> : ""}
    </div>
  );
}
