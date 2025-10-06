import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const FileList = ({ projectId }) => {
  const [files, setFiles] = useState([]);
  const [userId, setUserId] = useState([]);

  const fetchFiles = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUserId(user.id)
    const { data, error } = await supabase
      .from("files")
      .select("*")
      .eq("project_id", projectId)
      .order("uploaded_at", { ascending: false });

    if (!error) setFiles(data);
  };

  const getDownloadUrl = async (path) => {
    const { data, error } = await supabase.storage
      .from("project_files")
      .createSignedUrl(path, 60 * 60); // 1h gültig
    if (error) {
      console.log(error)
    } else {
      return data.signedUrl;
    }
  };

  const handleDelete = async (file) => {
    try {
      console.log("Deleting file " + file.file_url);
      // 1. Aus Storage entfernen
      const { error: storageError } = await supabase.storage
        .from("project_files")
        .remove([file.file_url]);

      if (storageError) throw storageError;

      // 2. Aus DB entfernen
      const { error: dbError } = await supabase
        .from("files")
        .delete()
        .eq("id", file.id);

      if (dbError) throw dbError;
    } catch (err) {
      console.error("Fehler beim Löschen:", err.message);
    }
  };

  useEffect(() => {
    
    fetchFiles();

    // Realtime-Channel für Insert/Delete
    const channel = supabase
      .channel("files-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "files",
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          console.log("Realtime update:", payload);
          fetchFiles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId]);

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex justify-between items-center border p-2 rounded"
        >
          <span>{file.file_name}</span>
          <a
            href="#"
            onClick={async (e) => {
              e.preventDefault();
              const url = await getDownloadUrl(file.file_url);
              window.open(url, "_blank");
            }}
            className="text-blue-600 underline"
          >
            Download
          </a>
          {file.uploader_id === userId && (
            <button
              onClick={async (e) => { 
                e.preventDefault();
                await handleDelete(file)
              }
            }
              className="text-red-600 hover:underline"
            >
              Löschen
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FileList;
