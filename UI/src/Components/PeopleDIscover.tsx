import { useSelector } from "react-redux";
import PeopleCard from "./PeopleCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { followUser, getUserSuggestions } from "../services/api/user/apiMethods";

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
        setLoading(false);
      })
      .catch((error: any) => {
        console.log(error.message);
      });
  }, [userId]);

  const handleFollow = (followedUserId: string, followedUsername: string) => {
    followUser({ userId, followingUser: followedUserId })
      .then((response: any) => {
        setUsers(users.filter((user: any) => user._id !== followedUserId));
        response.data.followed
          ? toast.info(`Followed ${followedUsername}`)
          : toast.info(`Follow request sent to ${followedUsername}`);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      {loading ? (
        <div className="">
          <div className="flex flex-row flex-wrap gap-x-8 gap-y-0"></div>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-0">
          {users?.map((user: any) => (
            <PeopleCard key={user._id} user={user} handleFollow={handleFollow} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PeopleDiscover;
