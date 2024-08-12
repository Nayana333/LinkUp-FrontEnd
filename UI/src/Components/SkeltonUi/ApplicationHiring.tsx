import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-4 p-5">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse space-y-4 bg-white p-5 rounded-md shadow-sm"
          style={{ height: "180px" }}
        >
          <div className="w-full flex justify-between">
            <div className="flex">
              <div className="w-14 h-14 bg-gray-200 rounded-md"></div>
              <div className="ml-5 space-y-2">
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
                <div className="w-16 h-3 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
          </div>
          
          <div className="space-y-2">
            <div className="w-40 h-3 bg-gray-200 rounded"></div>
            <div className="w-32 h-3 bg-gray-200 rounded"></div>
            <div className="w-40 h-3 bg-gray-200 rounded"></div>
          </div>

          <div className="flex justify-end space-x-2 mt-5">
            <div className="w-16 h-8 bg-gray-200 rounded"></div>
            <div className="w-16 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
