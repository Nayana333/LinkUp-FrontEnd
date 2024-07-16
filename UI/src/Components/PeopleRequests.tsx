import { useState, useEffect } from "react";
import PeopleCard from "./PeopleCard";
import { getUserConnection } from "../services/api/user/apiMethods";
import { useSelector } from "react-redux";

function PeopleRequests() {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<any>([]);
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
        
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, [userId]);

  return (
    <div>
      {loading ? (
        <div className="">
          <div className="flex flex-row flex-wrap gap-x-8 gap-y-0"></div>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-0">
          {requests?.map((user: any) => (
            <PeopleCard key={user._id} user={user} updateRequestes={setRequests} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PeopleRequests;
