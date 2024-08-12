import { useSelector } from "react-redux";
import PeopleCard from "./PeopleCard";
import SkeletonUserCard from "../Components/SkeltonUi/PeopleCardSkelton";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { followUser, getUserSuggestions } from "../services/api/user/apiMethods";
import NoApplicant from "./SkeltonUi/NoApplicant";

function PeopleDiscover() {
  const selectUser = (state: any) => state.auth.user;
  const userData = useSelector(selectUser);
  const userId = userData._id || '';
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserSuggestions({ userId })
      .then((response: any) => {
        setUsers(response.data.suggestedUsers);
        setTimeout(() => setLoading(false), 500); // Introduce a delay of 2000ms
      })
      .catch((error: any) => {
        console.log(error.message);
        setLoading(false);
      });
  }, [userId]);

  const handleFollow = (followedUserId: string, followedUsername: string) => {
    followUser({ userId, followingUser: followedUserId })
      .then((response: any) => {
        setUsers(users.filter((user: any) => user._id !== followedUserId));
        response.data.followed
          ? toast.info(`Followed ${followedUsername}`)
          : toast.info(`Follow request sent to ${followedUsername}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      {loading ? (
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-4">
          {Array.from({ length: users.length || 5 }).map((_, index) => (
            <SkeletonUserCard key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-4">
          {users?.length > 0 ? (
            users.map((user: any) => (
              <PeopleCard key={user._id} user={user} handleFollow={handleFollow} />
            ))
          ) : (
            <NoApplicant />
          )}
        </div>
      )}
    </div>
  );
  
}

export default PeopleDiscover;
