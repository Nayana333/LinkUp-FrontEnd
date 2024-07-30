import React from 'react';

const SkeletonUserCard = () => {
  return (
    <div className="home-recommed-section bg-white flex justify-between px-4 py-4 items-end relative" style={{width: '346px'}}>
      <div className="flex items-center">
        <div className="skeleton-image bg-gray-200 h-9 w-9 rounded-full mb-3 mr-4"></div>
        <div className="flex flex-col">
          <div className="skeleton-text bg-gray-200 h-4 w-32 mb-2 rounded"></div>
          <div className="skeleton-text bg-gray-200 h-3 w-24 mb-1 rounded"></div>
          <div className="skeleton-text bg-gray-200 h-3 w-20 rounded"></div>
        </div>
      </div>
      <div className="skeleton-button bg-gray-200 h-6 w-20 rounded"></div>
    </div>
  );
};

export default SkeletonUserCard;
