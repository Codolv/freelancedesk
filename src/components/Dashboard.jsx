import ProjectForm from "./ProjectForm"
import ProjectList from "./ProjectList"

export default function Dashboard() {
  <div className="max-w-2xl mx-auto p-6">
    <h1 className="text-2xl font-bold mb-4">FreelanceDesk Dashboard</h1>
    <ProjectForm onProjectCreated={() => window.location.reload()} />
    <ProjectList />
  </div>
}
