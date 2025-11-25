import { createProject } from "@/redux/actions/project/createProject";
import { updateProject } from "@/redux/actions/project/updateProject";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const statusOptions = ['Active', 'Pending', 'Completed', 'Archived'];
const priorityOptions = ['Low', 'Medium', 'High', 'Critical'];


interface ProjectFormProps {
  projectToEdit?: {
    _id: string;
    name: string;
    description: string;
  } | null;
  onSuccess: () => void;
}

export default function ProjectForm({ projectToEdit, onSuccess }: ProjectFormProps) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  const [estado, setEstado] = useState(statusOptions[0]);
  const [prioridad, setPrioridad] = useState(priorityOptions[1]);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectToEdit) {
      setNombre(projectToEdit.name || '');
      setDescripcion(projectToEdit.description || '');
    } else {
      setNombre('');
      setDescripcion('');
    }
  }, [projectToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = { 
        name: nombre, 
        description: descripcion, 
        status: estado, 
        priority: prioridad 
    };

    if (projectToEdit) {
      await updateProject(projectToEdit._id, projectData)(dispatch);
      console.log('Proyecto actualizado:', { ...projectData, _id: projectToEdit._id });
      window.location.reload()
    } else {
      await createProject(projectData)(dispatch);
      console.log('Proyecto creado:', projectData);
      window.location.reload()
      
    }
    onSuccess(); 

  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      

      <div className="form-group">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input
          type="text"
          id="nombre"
          className="form-input"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del proyecto"
          required
        />
      </div>


      <div className="form-row-2col">
        <div className="form-group">
          <label htmlFor="estado" className="form-label">Estado</label>
          <select
            id="estado"
            className="form-select"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="prioridad" className="form-label">Prioridad</label>
          <select
            id="prioridad"
            className="form-select"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
          >
            {priorityOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="descripcion" className="form-label">Descripción</label>
        <textarea
          id="descripcion"
          className="form-textarea"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Breve descripción del proyecto"
          rows={4}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="db-btn-action db-btn-primary">
          {projectToEdit ? 'Actualizar Proyecto' : 'Guardar Proyecto'}
        </button>
      </div>
    </form>
  );
}