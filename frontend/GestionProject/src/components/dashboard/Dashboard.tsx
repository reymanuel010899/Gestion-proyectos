
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Users, CheckCircle2, AlertCircle, LayoutDashboard, ListTodo } from "lucide-react"
import { DashboardStats } from "@/interfaces/dashboard"

export default function Dashboard({ dashboard }: { dashboard?: DashboardStats }) {
  if (!dashboard) {
    return (
      <div className="db-layout db-flex-center">
        <p className="db-text-error">Error al cargar el dashboard</p>
      </div>
    )
  }

  const statusData = dashboard?.tasksByStatus?.map((item) => ({ name: item._id || "Unknown", value: item.count, }))
  const priorityData = dashboard?.tasksByPriority?.map((item) => ({ name: item._id || "Unknown", count: item.count, }))

  const chartColors = ["var(--color-chart-blue)", "var(--color-chart-green)", "var(--color-chart-yellow)", "var(--color-chart-red)", "var(--color-chart-purple)"]

  return (
    <main className="db-layout">


      <div className="db-header-sticky">
        <div className="db-container db-padding-x">
          <div>
            <h1 className="db-title">Dashboard</h1>
            <p className="db-subtitle">Resumen de tu actividad en proyectos y tareas</p>
          </div>
        </div>
      </div>

      <div className="db-container db-padding-x db-padding-y">


        <div className="db-grid-stats">
          <Card className="db-card db-card-stat db-hover-primary">
            <CardHeader className="db-card-header">
              <CardTitle className="db-card-title">Proyectos Propios</CardTitle>
              <CheckCircle2 className="db-icon db-icon-primary" />
            </CardHeader>
            <CardContent>
              <div className="db-stat-value">{dashboard?.totalOwned}</div>
              <p className="db-stat-label">Donde eres propietario</p>
            </CardContent>
          </Card>
          <Card className="db-card db-card-stat db-hover-accent">
            <CardHeader className="db-card-header">
              <CardTitle className="db-card-title">En Colaboración</CardTitle>
              <Users className="db-icon db-icon-accent" />
            </CardHeader>
            <CardContent>
              <div className="db-stat-value">{dashboard?.collabCount}</div>
              <p className="db-stat-label">Proyectos compartidos</p>
            </CardContent>
          </Card>
          <Card className="db-card db-card-stat db-hover-info">
            <CardHeader className="db-card-header">
              <CardTitle className="db-card-title">Total Proyectos</CardTitle>
              <TrendingUp className="db-icon db-icon-info" />
            </CardHeader>
            <CardContent>
              <div className="db-stat-value">{dashboard?.totalProjects}</div>
              <p className="db-stat-label">En total</p>
            </CardContent>
          </Card>
          <Card className="db-card db-card-stat db-hover-warning">
            <CardHeader className="db-card-header">
              <CardTitle className="db-card-title">Total Tareas</CardTitle>
              <AlertCircle className="db-icon db-icon-warning" />
            </CardHeader>
            <CardContent>
              <div className="db-stat-value">{dashboard?.totalTasks}</div>
              <p className="db-stat-label">Tareas activas</p>
            </CardContent>
          </Card>
        </div>


        <div className="db-grid-charts-three-col">
          <Card className="db-card db-card-chart db-project-progress-card">
            <CardHeader>
              <CardTitle className="db-chart-title">Progreso de Proyectos</CardTitle>
              <p className="db-chart-subtitle">Avance porcentual</p>
            </CardHeader>
            <CardContent className="db-progress-list-content">
              {dashboard?.projectsProgress && dashboard.projectsProgress.length > 0 ? (
                <div className="db-progress-list">
                  {dashboard?.projectsProgress.map((project) => (
                    <div key={project.name} className="db-progress-item">
                      <div className="db-progress-item-header">
                        <span className="db-progress-name">{project.name}</span>
                        <span className="db-progress-percentage">{project.progress > 100 ? 100 : project.progress}%</span>
                      </div>
                      <div className="db-progress-bar-container">
                        <div
                          className={`db-progress-bar db-progress-${project.progress < 100 ? 'active' : 'completed'}`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="db-chart-placeholder db-progress-placeholder">
                  No hay proyectos activos.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="db-card db-card-chart">
            <CardHeader>
              <CardTitle className="db-chart-title">Tareas por Estado</CardTitle>
              <p className="db-chart-subtitle">Distribución de estados</p>
            </CardHeader>
            <CardContent>
              {(statusData ?? []).length > 0 ? (
                <div className="db-chart-container db-pie-chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="var(--color-chart-blue)"
                        dataKey="value"
                      >
                        {(statusData ?? [])?.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--color-card)",
                          border: "1px solid var(--color-border)",
                          color: "var(--color-foreground)"
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="db-chart-placeholder">No hay datos disponibles</div>
              )}
            </CardContent>
          </Card>

          <Card className="db-card db-card-chart">
            <CardHeader>
              <CardTitle className="db-chart-title">Tareas por Prioridad</CardTitle>
              <p className="db-chart-subtitle">Análisis de prioridades</p>
            </CardHeader>
            <CardContent>
              {priorityData && priorityData.length > 0 ? (
                <div className="db-chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={priorityData} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                      <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
                      <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--color-card)",
                          border: "1px solid var(--color-border)",
                          color: "var(--color-foreground)"
                        }}
                      />
                      <Bar dataKey="count" fill="var(--color-chart-blue)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="db-chart-placeholder">No hay datos disponibles</div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="db-button-navigation-container">
          <Link to="/projects" className="db-nav-button db-nav-projects">
            <LayoutDashboard className="db-nav-icon" />
            <span>Ver Proyectos</span>
          </Link>
          <Link to="/tasks" className="db-nav-button db-nav-tasks">
            <ListTodo className="db-nav-icon" />
            <span>Ver Tareas</span>
          </Link>
        </div>
      </div>
    </main>
  )
}