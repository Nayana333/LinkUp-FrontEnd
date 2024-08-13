import { useState, useEffect } from 'react';
import { getUserConnection } from '../services/api/user/apiMethods';
import PeopleCard from './PeopleCard';
import SkeletonUserCard from '../Components/SkeltonUi/PeopleCardSkelton';
import { useSelector } from 'react-redux';
import NoConnections from './SkeltonUi/NoConnections';

function PeopleConnections() {
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const selectUser = (state: any) => state.auth.user;
  const userData = useSelector(selectUser);
  const userId = userData?._id;

  useEffect(() => {
    if (!userId) return;

    try {
      getUserConnection({ userId })
        .then((response: any) => {
          const fetchedConnections = response.data.connection.connections;
          setConnections(fetchedConnections);

          setTimeout(() => setLoading(false), 500); 
        })
        .catch((error) => {
          console.log(error.message);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false); 
    }
  }, [userId]);

  return (
    <div>
      {loading ? (
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-4">
          {Array.from({ length: connections.length  }).map((_, index) => (
            <SkeletonUserCard key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-4" style={{width:"728px"}}>
          {connections?.length > 0 ? (
            connections.map((user: any) => (
              <PeopleCard key={user._id} user={user} updateConnection={setConnections} />
            ))
          ) : (
            <NoConnections />
          )}
        </div>
      )}
    </div>
  );
  
}

export default PeopleConnections;
