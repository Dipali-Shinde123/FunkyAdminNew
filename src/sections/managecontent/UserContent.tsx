import React, { useEffect, useState } from "react";
import { fetchUserContentList } from "../../api/dashboard/postApi";
import { Trash2, Edit, CheckCircle, XCircle } from "lucide-react";

interface ContentItem {
  id: number;
  userId: number;
  userName: string;
  tagLine?: string;
  address?: string;
  description?: string;
  postImage?: string | null;
  uploadVideo?: string | null;
  coverImage?: string | null;
  status?: number | null;
  commentCount?: number | null;
  shareCount?: number | null;
  reward?: string | null;
  likes?: number | null;
  viewsCount?: number | null;
  title?: string;
  story_photo?: string | string[] | null;
  storyViewCount?: number | null;
  type: "post" | "story";
}

interface UserContentCombined {
  userId: number;
  userName: string;
  post?: ContentItem | null;
  story?: ContentItem | null;
}

const ITEMS_PER_PAGE = 5;

const UserContent: React.FC = () => {
  const [data, setData] = useState<UserContentCombined[]>([]);
  const [filteredData, setFilteredData] = useState<UserContentCombined[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { posts = [], stories = [] } = await fetchUserContentList();

        const normalizedPosts: ContentItem[] = posts.map((post: any) => ({
          id: post.id,
          userId: post.user?.id,
          userName: post.user?.userName || "",
          tagLine: post.tagLine || post.tagline || "",
          address: post.address,
          description: post.description,
          postImage: post.postImage,
          uploadVideo: post.uploadVideo,
          coverImage: post.coverImage,
          status: post.status,
          commentCount: post.commentCount,
          shareCount: post.shareCount,
          reward: post.rewardCount,
          likes: post.likes,
          viewsCount: post.viewsCount,
          story_photo: null,
          storyViewCount: null,
          title: null,
          type: "post",
        }));

        const normalizedStories: ContentItem[] = stories.map((story: any) => ({
          id: story.id,
          userId: story.user?.id,
          userName: story.user?.userName || "N/A",
          tagLine: "",
          address: "",
          description: "",
          postImage: null,
          uploadVideo: null,
          coverImage: null,
          status: null,
          commentCount: null,
          shareCount: null,
          reward: null,
          likes: null,
          viewsCount: null,
          title: story?.story?.title || "N/A",
          story_photo: story?.story_photo || null,
          storyViewCount: story?.viewCount || 0,
          type: "story",
        }));

        const combinedData: UserContentCombined[] = [];

        normalizedPosts.forEach((post) => {
          const existingUser = combinedData.find(item => item.userId === post.userId);
          if (existingUser) {
            existingUser.post = post;
          } else {
            combinedData.push({ userId: post.userId, userName: post.userName, post });
          }
        });

        normalizedStories.forEach((story) => {
          const existingUser = combinedData.find(item => item.userId === story.userId);
          if (existingUser) {
            existingUser.story = story;
          } else {
            combinedData.push({ userId: story.userId, userName: story.userName, story });
          }
        });

        setData(combinedData);
        setFilteredData(combinedData);
      } catch (err) {
        console.error("Failed to load content", err);
      }
    };

    loadContent();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.userName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      const updated = filteredData.filter((item) => item.userId !== id);
      setData(updated);
      setFilteredData(updated);
    }
  };

  const handleEdit = (id: number) => {
    alert(`Edit clicked for ID: ${id}`);
  };

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-4 space-y-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center">User Content List</h2>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search By User Name..."
          className="w-full md:w-1/3 border rounded px-4 py-2 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="w-full md:w-1/4 border rounded px-4 py-2 shadow-sm"
        />
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full bg-white text-sm text-center">
          <thead className="bg-gray-100">
            <tr className="text-xs uppercase text-gray-700">
              <th className="p-2">#</th>
              <th className="p-2">User</th>
              <th className="p-2 hidden sm:table-cell">Tagline</th>
              <th className="p-2">Post</th>
              <th className="p-2 hidden md:table-cell">Likes</th>
              <th className="p-2 hidden md:table-cell">Views</th>
              <th className="p-2 hidden lg:table-cell">Comments</th>
              <th className="p-2 hidden lg:table-cell">Shares</th>
              <th className="p-2 hidden xl:table-cell">Reward</th>
              <th className="p-2 hidden xl:table-cell">Status</th>
              <th className="p-2 hidden 2xl:table-cell">Cover</th>
              <th className="p-2 hidden sm:table-cell">Story Title</th>
              <th className="p-2 hidden sm:table-cell">Story</th>
              <th className="p-2 hidden md:table-cell">Story Views</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={item.userId} className="border-t hover:bg-gray-50">
                <td className="p-2">{startIndex + index + 1}</td>
                <td className="p-2">{item.userName}</td>
                <td className="p-2 hidden sm:table-cell">{item.post?.tagLine || "-"}</td>
                <td className="p-2">
                  {item.post?.postImage ? (
                    <img src={item.post.postImage} alt="Post" width="40" className="mx-auto" />
                  ) : item.post?.uploadVideo ? (
                    <video src={item.post.uploadVideo} width="60" controls className="mx-auto" />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-2 hidden md:table-cell">{item.post?.likes ?? "-"}</td>
                <td className="p-2 hidden md:table-cell">{item.post?.viewsCount ?? "-"}</td>
                <td className="p-2 hidden lg:table-cell">{item.post?.commentCount ?? "-"}</td>
                <td className="p-2 hidden lg:table-cell">{item.post?.shareCount ?? "-"}</td>
                <td className="p-2 hidden xl:table-cell">{item.post?.reward ?? "-"}</td>
                <td className="p-2 hidden xl:table-cell">{item.post?.status ?? "-"}</td>
                <td className="p-2 hidden 2xl:table-cell">
                  {item.post?.coverImage ? (
                    <CheckCircle className="text-green-500 mx-auto" size={18} />
                  ) : (
                    <XCircle className="text-red-500 mx-auto" size={18} />
                  )}
                </td>
                <td className="p-2 hidden sm:table-cell">{item.story?.title ?? "-"}</td>
                <td className="p-2 hidden sm:table-cell">
                  {Array.isArray(item.story?.story_photo)
                    ? item.story?.story_photo?.map((src, i) => (
                        <img key={i} src={src} alt="story" width="40" className="inline-block mr-1" />
                      ))
                    : item.story?.story_photo && (
                        <img src={item.story.story_photo} alt="story" width="40" className="mx-auto" />
                      )}
                </td>
                <td className="p-2 hidden md:table-cell">{item.story?.storyViewCount ?? "-"}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => handleEdit(item.userId)}>
                    <Edit className="text-blue-500 hover:text-blue-700" size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.userId)}>
                    <Trash2 className="text-red-500 hover:text-red-700" size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="font-medium" >
          {currentPage} / {totalPages}
        </span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserContent;
