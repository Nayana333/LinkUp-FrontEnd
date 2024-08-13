import PeopleCard from "./PeopleCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserConnection } from "../services/api/user/apiMethods";
import { useParams } from "react-router-dom";
import NoConnections from "./SkeltonUi/NoConnections";

function ViewerConnections() {
  const selectUser = (state: any) => state.auth.user;
  const userData = useSelector(selectUser);
  const { userId } = useParams();
  const currentUserId = userData._id;
  const [connections, setConnections] = useState<any[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
        const response :any= await getUserConnection({ userId });
        const connectionData = response.data.connection.connections;

        if (Array.isArray(connectionData)) {
          setConnections(connectionData);
        } else {
          setConnections([]); 
        }
      } catch (error:any) {
        console.log(error.message);
        setConnections([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, [userId]);

  return (
    <div>
      {loading ? (
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 justify-center">
        </div>
      ) : connections.length > 0 ? (
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 justify-center">
          {connections.map((user: any) => (
            <PeopleCard key={user.id} user={user} updateConnection={setConnections} />
          ))}
        </div>
      ) : (
        <NoConnections/>
      )}
    </div>
  );
  
}

export default ViewerConnections;
