import { useEffect,useState, } from "react";
import { toast } from "sonner";
import { ShieldAlert,ShieldCheck } from "lucide-react";
import { adminUserBlock,adminTransactions,adminUserList } from "../../../services/api/admin/AdminApiMethods";
import { Pagination } from "flowbite-react";
import NoApplicant from "../../../Components/SkeltonUi/NoApplicant";


const TransactionList:React.FC=()=>{


    const [loading,setLoading]=useState(false)
    const [transaction,setTransaction]=useState<any[]>([])
    const [currentPage,setCurrenPage]=useState(1)
    const [totalPages,setTotalPages]=useState(1)


    useEffect(() => {
        const fetchUsers = async () => {
          setLoading(true);
          try {
            const response: any= await adminTransactions(currentPage);
            console.log('transaction',response.data);
            
            const { transaction: transaction, totalPages: fetchedTotalPages } = response.data;
            setTransaction(transaction);
            setTotalPages(fetchedTotalPages);
          } catch (error:any) {
            toast.error(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUsers();
      }, [currentPage]);

      const onPageChange = (page: number) => {
        setCurrenPage(page);
      };
      


      return (
        <div className='w-full border-collapse rounded-lg pe-6'>
          {transaction.length > 0 ? (
            <>
              <div
                className="w-full border-collapse rounded-lg overflow-hidden m-5"
                style={{ height: '530px' }}
              >
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Name</th>
                      <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Amount</th>
                      <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Transaction Id</th>
                      <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Date</th>
                      <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    {transaction.map((transaction: any) => (
                      <tr key={transaction?._id} className="hover:bg-gray-50">
                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                          <div className="relative h-10 w-10">
                            <img
                              className="h-full w-full rounded-full object-cover object-center"
                              src={transaction?.userId?.profileImageUrl}
                              alt=""
                            />
                            <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                          </div>
                          <div className="text-xs">
                            <div className="font-medium text-gray-700">{transaction?.userId?.username}</div>
                            <div className="text-gray-400">{transaction?.userId?.email}</div>
                          </div>
                        </th>
                        <td className="text-xs px-6 py-4">
                          ₹{transaction.amount}
                        </td>
                        <td className="text-xs px-6 py-4">
                          ID_{transaction.transactionId.slice(9, 20)}
                        </td>
                        <td className="text-xs px-6 py-4">
                          {new Date(transaction.startDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {transaction.userId.isPremium ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-red-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                              Not Active
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagnation flex justify-end mt-5 pe-12">
                <Pagination className="text-xs" currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
              </div>
            </>
          ) : (
            <NoApplicant/>
          )}
        </div>
      );
      
}


export default TransactionList

