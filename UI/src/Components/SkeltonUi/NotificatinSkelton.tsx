
const SkeletonNotificationCard: React.FC = () => {
  return (
    <div className="pl-3 pb-2 bg-white mx-5 mt-2 rounded-lg sm:mx-2 animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between py-4 ml-2">
        <div className="info flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="bg-gradient-to-b from-gray-300 to-gray-100 w-1 sm:w-1 mr-3"></div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <div className="h-10 w-10 rounded-full bg-gray-300"></div>
              <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:mt-0">
                <div className="h-4 w-24 bg-gray-300 rounded ms-4"></div>
                <div className="h-4 w-48 bg-gray-300 rounded mx-1 mt-2 sm:mt-0"></div>
              </div>
              <div className="h-3 w-20 bg-gray-300 rounded ms-4 mt-2 sm:mt-0"></div>
            </div>
          </div>
          <div className="flex justify-end p-4 py-2 sm:py-0 sm:px-4">
            <div className="h-8 w-16 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonNotificationCard;
