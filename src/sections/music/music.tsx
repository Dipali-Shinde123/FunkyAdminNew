import { useEffect, useState } from "react";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import { Trash2, Edit } from "lucide-react";
import { useGetMusic, useUpdateMusic, useDeleteMusic } from "../../api/dashboard/music";
import { useSnackbar } from "notistack";

interface Music {
  id: number;
  song_name: string;
  artist_name: string;
  music_file: string | File;
  created_at: string;
  price: number;
  isActive: string;
}

const MusicPage = () => {
  const { music, musicLoading, mutate: mutateMusic } = useGetMusic();
  const [tableData, setTableData] = useState<any[]>([]);
  const { updateMusic } = useUpdateMusic();
  const { deleteMusic } = useDeleteMusic();
  const { enqueueSnackbar } = useSnackbar();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<Music | null>(null);

  // Handle Edit
  const handleEditRow = (musicItem: Music) => {
    setEditData(musicItem);
    setEditModalOpen(true);
  };

  // Handle Update
  const handleUpdate = async () => {
    if (!editData) return;
    try {
      const formData = new FormData();
      formData.append("song_name", editData.song_name);
      formData.append("artist_name", editData.artist_name);
      formData.append("price", editData.price.toString());
      formData.append("isActive", editData.isActive);

      if (editData.music_file && typeof editData.music_file !== "string") {
        formData.append("music_file", editData.music_file);
      } else if (editData.music_file) {
        formData.append("existing_music_file", editData.music_file);
      }

      const result = await updateMusic(editData.id, formData);
      if (result.success) {
        enqueueSnackbar("Music updated successfully!", { variant: "success" });
        mutateMusic();
        setEditModalOpen(false);
      } else {
        enqueueSnackbar(result.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Failed to update music.", { variant: "error" });
    }
  };

  // Handle Delete
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this music?")) {
      try {
        const result = await deleteMusic(id);
        if (result.success) {
          enqueueSnackbar("Music deleted successfully!", { variant: "success" });
          mutateMusic();
        } else {
          enqueueSnackbar(result.message, { variant: "error" });
        }
      } catch (error) {
        enqueueSnackbar("Failed to delete music.", { variant: "error" });
      }
    }
  };

  useEffect(() => {
    if (music?.data) {
      const updatedTableData = music.data.map((musicItem: Music) => [
        musicItem.song_name,
        musicItem.artist_name,
        musicItem.price,
        musicItem.isActive === "1" ? "Active" : "Inactive",
        musicItem.created_at,
        (
          <div className="flex gap-2" key={musicItem.id}>
            <button onClick={() => handleEditRow(musicItem)} className="text-blue-500 hover:text-blue-700">
              <Edit size={18} />
            </button>
            <button onClick={() => handleDelete(musicItem.id)} className="text-red-500 hover:text-red-700">
              <Trash2 size={18} />
            </button>
          </div>
        ),
        <audio controls className="w-32 max-w-full" key={`audio-${musicItem.id}`}>
          <source
            src={
              typeof musicItem.music_file === "string"
                ? musicItem.music_file
                : URL.createObjectURL(musicItem.music_file)
            }
            type="audio/mp3"
          />
        </audio>,
      ]);
      setTableData(updatedTableData);
    }
  }, [music]);

  const tableHeadings = ["Song Name", "Artist Name", "Price", "Status", "Created At", "Action", "Preview"];

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full">
      {musicLoading ? (
        <div className="text-center text-gray-500">Loading music data...</div>
      ) : (
        <BasicTableOne
          tableData={tableData}
          tableHeadings={tableHeadings}
          searchColumns={["song_name", "artist_name"]}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      )}

      {editModalOpen && editData && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto px-2 py-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Music</h2>

            <label className="block text-gray-700 text-sm font-medium mb-1">Song Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={editData.song_name}
              onChange={(e) => setEditData({ ...editData, song_name: e.target.value })}
            />

            <label className="block text-gray-700 text-sm font-medium mb-1">Artist Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={editData.artist_name}
              onChange={(e) => setEditData({ ...editData, artist_name: e.target.value })}
            />

            <label className="block text-gray-700 text-sm font-medium mb-1">Music File</label>
            {editData.music_file && (
              <audio controls className="w-full mb-4">
                <source
                  src={
                    typeof editData.music_file === "string"
                      ? editData.music_file
                      : URL.createObjectURL(editData.music_file)
                  }
                  type="audio/mp3"
                />
              </audio>
            )}

            <input
              type="file"
              accept="audio/*"
              className="w-full p-2 border rounded mb-4"
              onChange={(e) =>
                setEditData({
                  ...editData,
                  music_file: e.target.files?.[0] || editData.music_file,
                })
              }
            />

            <div className="flex flex-col sm:flex-row gap-2 justify-end">
              <button
                onClick={() => setEditModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPage;
