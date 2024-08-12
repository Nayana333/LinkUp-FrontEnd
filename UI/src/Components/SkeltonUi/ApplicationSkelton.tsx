
const ApplicationsSkeleton = () => {
  return (
    <>
     
          <div
           
            className="home-post-section bg-white p-4 animate-pulse"
            style={{ height: "165px" }}
          >
            <div className="w-full flex justify-between">
              <div className="flex">
                <div className="w-14 h-14 rounded-md bg-gray-200" />
                <div className="mx-5">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-36" />
                </div>
              </div>
              <div className="flex text-xs gap-1">
                <div className="h-4 bg-gray-200 rounded w-16" />
              </div>
            </div>
            <div className="flex items-end justify-between mt-3">
              <div className="flex flex-col items-start">
                <div className="flex gap-2">
                  <div className="h-4 bg-gray-200 rounded w-16" />
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="h-4 bg-gray-200 rounded w-16" />
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="h-4 bg-gray-200 rounded w-16" />
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </div>
              </div>
              <div className="flex justify-end mt-10">
                <div className="h-8 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        
    </>
  );
};

export default ApplicationsSkeleton;
