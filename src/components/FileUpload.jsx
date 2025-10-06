import { useState } from "react";
import { supabase } from "../lib/supabase";

const FileUpload = ({ projectId, onUpload }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      const filePath = `${projectId}/${Date.now()}-${file.name}`;

      // 1. Upload zu Storage
      const { error: uploadError } = await supabase.storage
        .from("project_files")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Metadaten in DB eintragen
      const { data: { user } } = await supabase.auth.getUser()

      const { error: dbError } = await supabase.from("files").insert([
        {
          project_id: projectId,
          uploader_id: user.id,
          file_name: file.name,
          file_url: filePath,
        },
      ]);

      if (dbError) throw dbError;

      onUpload(); // Liste aktualisieren
    } catch (err) {
      console.error("Upload failed:", err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded">
        {uploading ? "Lade hoch..." : "Datei hochladen"}
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>
    </div>
  );
};

export default FileUpload;