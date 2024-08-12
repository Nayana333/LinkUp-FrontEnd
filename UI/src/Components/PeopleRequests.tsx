import { useState, useEffect } from "react";
import PeopleCard from "./PeopleCard";
import SkeletonUserCard from "../Components/SkeltonUi/PeopleCardSkelton";
import { getUserConnection } from "../services/api/user/apiMethods";
import { useSelector } from "react-redux";
import NoApplicant from "./SkeltonUi/NoApplicant";
import NoConnections from "./SkeltonUi/NoConnections";

function PeopleRequests() {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<any[]>([]);
  const selectUser = (state: any) => state.auth.user;
  const userData = useSelector(selectUser);
  const userId = userData._id;

  useEffect(() => {
    if (!userId) return;

    setLoading(true);

    getUserConnection({ userId })
      .then((response: any) => {
        const requestData = response.data.connection;
        setRequests(requestData.requested);

        setTimeout(() => setLoading(false), 500); 
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false); 
      });
  }, [userId]);

  return (
    <div>
      {loading ? (
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-4">
          {Array.from({ length: requests.length }).map((_, index) => (
            <SkeletonUserCard key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-4" style={{width:"728px"}}>
          {requests?.length > 0 ? (
            requests.map((user: any) => (
              <PeopleCard key={user._id} user={user} updateRequestes={setRequests} />
            ))
          ) : (
            <NoConnections/>
          )}
        </div>
      )}
    </div>
  );
  
}

export default PeopleRequests;
