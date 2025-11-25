import ProjectForm from "@/components/projects/ProjectForm";
import ProjectList from "@/components/projects/ProjectList";
import { Link } from "react-router-dom";
import { useState } from "react";

type projectEdit = {
    _id: string;
    name: string;
    description: string;
}

export default function ProjectsPage() {
  const [editingProject, setEditingProject] = useState<projectEdit | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false); 
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleEdit = (project: projectEdit) => {
    setEditingProject(project);
    setIsFormOpen(true); 
  };

  const handleSuccess = () => {
    setEditingProject(null);
    setIsFormOpen(false);
  };
  
  const handleRefresh = () => {
  console.log("Refrescando lista...");
  window.location.reload();
};

  const handleNewProject = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleFilter = () => {
    console.log("filtered")
  }
  return (
    <div className="db-layout project-page-layout"> 
      <main className="db-content-container">
        <div className="project-action-buttons">
           <Link to="/">
            <button className="db-btn-action">Menu</button>
          </Link>
            <button className="db-btn-action" onClick={handleRefresh}>Refresh</button>
            
            <button 
                className="db-btn-action db-btn-primary" 
                onClick={handleNewProject}
            >
                New Project
            </button>
        </div>
  
        <div className="db-card filter-box">
            <h2 className="filter-heading">Filtros</h2>
            <div className="filter-input-group horizontal-group">
                <input type="text" placeholder="name" className="db-filter-input"  onChange={(e) => setFilterName(e.target.value)}/>
                <input type="text" placeholder="status" className="db-filter-input" onChange={(e) => setFilterStatus(e.target.value)}/>
                <button className="db-btn-filter-add"  onClick={() => handleFilter()}>Search</button>
            </div>
        </div>
        <div className="db-card project-list-card">
           <ProjectList onEdit={handleEdit}   filterName={filterName} filterStatus={filterStatus} />
        </div>
      </main>

      {isFormOpen && (
        <div className="modal-overlay"> 
          <div className="modal-content">
            <header className="modal-header">
              <h2 className="modal-title">
                {editingProject ? "Editar Proyecto" : "Crear Nuevo Proyecto"}
              </h2>
              <button 
                className="modal-close-btn"
                onClick={() => setIsFormOpen(false)}
              >
                &times;
              </button>
            </header>
            
            <div className="modal-body">
              <ProjectForm
                projectToEdit={editingProject}
                onSuccess={handleSuccess}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}