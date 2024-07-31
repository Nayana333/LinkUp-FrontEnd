import React from 'react';

const NoNotifications: React.FC = () => {
    return (
        <div className="no-notifications flex flex-col items-center justify-center h-full">
            <p className="text-lg text-gray-600 mt-5">No notifications available.</p>
            <p className="text-sm text-gray-500 mt-2">
                You will be notified when there are new updates.
            </p>
        </div>
    );
};

export default NoNotifications;
