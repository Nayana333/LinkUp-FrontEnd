import { ShieldAlert, ShieldCheck } from "lucide-react";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { adminPostBlockReport, ReportList } from '../../../services/api/admin/AdminApiMethods';

function AdminReportList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response: any = await ReportList(currentPage);
        const { report, totalPages: fetchTotalPages } = response.data;
        setPosts(report);
        setTotalPages(fetchTotalPages);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [currentPage]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePostBlock = (postId: string, status: string) => {
    try {
      const requestData = { postId };
      adminPostBlockReport(requestData)
        .then((response: any) => {
          const data = response.data;
          if (status === "block") {
            toast.error(data.message);
          } else {
            toast.info(data.message);
          }
          setPosts(prevPosts =>
            prevPosts.map(post => {
              if (post._id === postId) {
                return { ...post, isBlocked: !post.isBlocked };
              }
              return post;
            })
          );
        })
        .catch((error: any) => {
          toast.error(error.message);
        });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full border-collapse rounded-lg p-6">
      <div className="w-full border-collapse rounded-lg overflow-hidden" style={{ maxHeight: '530px', maxWidth: '100%' }}>
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Post</th>
              <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Reason</th>
              <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Posted By</th>
              <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Reported By</th>
              <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Posted on</th>
              <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Status</th>
              <th scope="col" className="text-xs px-6 py-4 font-medium flex justify-center text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {posts.length > 0 && posts.map((post: any) => (
              <tr key={post._id} className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="relative h-10 w-10">
                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      src={post.postId?.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-gray-700">{post.postname}</div>
                    <div className="text-gray-400">{post.email}</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div className="text-xs">
                    <div className="font-medium text-gray-700">{post.cause}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs">
                    <div className="font-medium text-gray-700">{post.postId?.userId?.userName}</div>
                    <div className="text-gray-400">{post.postId?.userId?.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs">
                    <div className="font-medium text-gray-700">{post.userId?.userName}</div>
                    <div className="text-gray-400">{post.userId?.email}</div>
                  </div>
                </td>
                <td className="text-xs px-6 py-4">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="text-xs px-6 py-4">
                  {post.isBlocked ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                      Blocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                      UnBlocked
                    </span>
                  )}
                </td>
                <td className="text-xs px-6 py-4">
                  <div className="flex justify-end gap-4">
                    {post.isBlocked ? (
                      <button
                        type="button"
                        style={{ width: '110px' }}
                        onClick={() => handlePostBlock(post._id, "unblock")}
                        className="text-xs bg-white text-green-600 hover:bg-gray-100 border border-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
                      >
                        <ShieldCheck size={18} /> UnBlock
                      </button>
                    ) : (
                      <button
                        type="button"
                        style={{ width: '110px' }}
                        onClick={() => handlePostBlock(post._id, "block")}
                        className="text-xs bg-white text-red-600 hover:bg-gray-100 border border-gray-200 focus:outline-none font-medium rounded-lg ps-7 py-2.5 text-center inline-flex items-center me-2 mb-2"
                      >
                        <ShieldAlert size={18} /> Block
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination flex justify-end mt-5 pe-12">
        <Pagination className="text-xs" currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
      </div>
    </div>
  );
}

export default AdminReportList;
