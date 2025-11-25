import TaskForm from "@/components/tasks/TaskForm";
import TaskList from "@/components/tasks/TaskList";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function TaskPage() {
  const [editingTask, setEditingTask] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [asignado, setAsignado] = useState("")
  const [ priority, setPriority] = useState("")
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (task) => {
    console.log(task)
    setEditingTask(task);
    setIsFormOpen(true); 
  };

  const handleSuccess = () => {
    setEditingTask(null);
    setIsFormOpen(false);
    setRefreshKey(prev => prev + 1);
    console.log(refreshKey)
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };
  
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1); 
    window.location.reload()
    console.log("Refrescando lista de tareas...");
  };


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
                onClick={handleNewTask}
            >
                New Task
            </button>
        </div>
  
        <div className="db-card filter-box">
            <h2 className="filter-heading">Filtros</h2>
            <div className="filter-input-group horizontal-group">
                <input type="text" placeholder="Asignado" className="db-filter-input" onChange={e=>setAsignado(e.target.value)}/>
                <input type="text" placeholder="Priority" className="db-filter-input" onChange={e=>setPriority(e.target.value)}/>
                <button className="db-btn-filter-add">Search</button>
            </div>
        </div>
        <div className="db-card project-list-card">

           <TaskList onEdit={handleEdit}  asignado={asignado} priority={priority}/>
        </div>
      </main>

       {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content  custom-scrollbar"  style={{
            overflowY: "auto",
            maxHeight: "900px"
          }} >
            <header className="modal-header">
              <h2 className="modal-title">
                {editingTask ? "Editar Tarea" : "Crear Nueva Tarea"}
              </h2>
              <button 
                className="modal-close-btn"
                onClick={() => setIsFormOpen(false)}
              >
                &times;
              </button>
            </header>
            
            <div className="modal-body">
              <TaskForm
                taskToEdit={editingTask}
                onSuccess={handleSuccess}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}