import { useState, useEffect } from 'react';
import { getUserConnection } from '../services/api/user/apiMethods';
import PeopleCard from './PeopleCard';
import SkeletonUserCard from '../Components/SkeltonUi/PeopleCardSkelton';
import { useSelector } from 'react-redux';

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

          // Simulate a delay
          setTimeout(() => setLoading(false), 500); // 2000ms delay
        })
        .catch((error) => {
          console.log(error.message);
          setLoading(false); // Ensure loading state is stopped on error
        });
    } catch (error) {
      console.log(error);
      setLoading(false); // Ensure loading state is stopped on catch block error
    }
  }, [userId]);

  return (
    <div>
      {loading ? (
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-4">
          {Array.from({ length: connections.length }).map((_, index) => ( // Show 5 skeleton cards during loading
            <SkeletonUserCard key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-4">
          {connections?.map((user: any) => (
            <PeopleCard key={user._id} user={user} updateConnection={setConnections} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PeopleConnections;
