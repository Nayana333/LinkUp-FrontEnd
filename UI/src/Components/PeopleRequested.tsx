import { useState, useEffect } from "react";
import PeopleCard from "./PeopleCard";
import SkeletonUserCard from "../Components/SkeltonUi/PeopleCardSkelton"; 
import { getUserConnection } from "../services/api/user/apiMethods";
import { useSelector } from "react-redux";

function PeopleRequested() {
  const [loading, setLoading] = useState(true);
  const [requested, setRequested] = useState<any[]>([]);
  const selectUser = (state: any) => state.auth.user;
  const userData = useSelector(selectUser);
  const userId = userData._id;

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    getUserConnection({ userId })
      .then((response: any) => {
        const requestedData = response.data.connection;
        setRequested(requestedData.requestSent);
        // Introduce a delay of 500ms before setting loading to false
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
          {Array.from({ length: requested.length }).map((_, index) => (
            <SkeletonUserCard key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-4">
          {requested?.map((user: any) => (
            <PeopleCard key={user._id} user={user} updateRequested={setRequested} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PeopleRequested;
