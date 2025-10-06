import FileUpload from "./FileUpload";
import FileList from "./FileList";

export default function ProjectFiles({ projectId }) {
  const refresh = () => {
    // Trigger Re-Render von FileList (z. B. mit useState oder Ref)
    window.location.reload(); // MVP: quick & dirty
  };

  return (
    <div className="space-y-4">
      <FileUpload projectId={projectId} onUpload={refresh} />
      <FileList projectId={projectId} />
    </div>
  );
}
