
import { useEffect, useState } from "react";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import { Trash2, Edit } from "lucide-react";
import { useGetMusic, useDeleteMusic } from "../../api/dashboard/music";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

interface Music {
  id: number;
  song_name: string;
  artist_name: string;
  music_file: string;
  created_at: string;
  price: number;
  isActive: string;
}

const MusicPage = () => {
  const { music, musicLoading, mutate: mutateMusic } = useGetMusic();
  const { deleteMusic } = useDeleteMusic();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [tableData, setTableData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  // Handle Edit
  const handleEditRow = (musicItem: Music) => {
    navigate(`/music/edit-music/${musicItem.id}`);
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
          <source src={musicItem.music_file} type="audio/mp3" />
        </audio>,
      ]);
      setTableData(updatedTableData);
    }
  }, [music]);

  const tableHeadings = ["Song Name", "Artist Name", "Price", "Status", "Created At", "Action", "Preview"];

  return (
    <div className="p-4  sm:4 md:6 lg:12 sm:p-6 md:p-8 w-full">
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
    </div>
  );
};

export default MusicPage;
