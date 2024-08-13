import { formatDistanceToNow } from "date-fns";
import  { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { BellRing } from "lucide-react";
import { getAdminNotifications } from "../../../services/api/admin/AdminApiMethods";
import { useNavigate } from "react-router-dom";
import NoNotifications from "../../../Components/SkeltonUi/NoNotification";

interface Notification {
    _id: string;
    senderId: {
        profileImageUrl: string;
        userName: string;
    } | null;
    message: string;
    createdAt: string;
    link: string;
    read?: boolean;
}

function AdminNotification() {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.auth.user);
    const userId = user?._id || "";
    const [loading, setLoading] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const response :any= await getAdminNotifications({ userId });
                setNotifications(response.data.notifications);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchNotifications();
        }
    }, [userId]);

    const handleViewClick = (link: string) => {
        if (link) {
            if (link.startsWith("http")) {
                window.location.href = link;
            } else {
                navigate(link);
            }
        }
    };

    return (
        <div>
            <div className="home-notification-section-2">
                <div className="border profile-nav flex items-center justify-start ps-6 bg-white rounded-md mt-5 mx-5">
                    <p className="text-xs flex gap-2 text-gray-500">
                        Notifications <BellRing color="gray" size={15} />
                    </p>
                </div>

                <div className="home-scroll">
                    <div className="home-scrollbox">
                        {loading ? (
                            <p>Loading...</p>
                        ) : notifications.length === 0 ? (
                            <NoNotifications/>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    className="pl-3 pb-2 bg-white mx-5 mt-2 rounded-lg"
                                >
                                    <div className="flex justify-between py-4 ml-2">
                                        <div className="info flex items-center justify-between w-full">
                                            <div className="flex gap-2">
                                                <div className="bg-gradient-to-b from-green-600 to-green-400 w-1 mr-3"></div>
                                                <div className="flex items-center">
                                                    {notification.senderId && (
                                                        <img
                                                            src={notification.senderId.profileImageUrl}
                                                            alt="User"
                                                            className="h-10 rounded-full"
                                                        />
                                                    )}
                                                    <div className="flex">
                                                        <p className="text-gray-800 ms-4 text-xs font-semibold mx-1">
                                                            {notification.senderId?.userName || "Unknown User"}
                                                        </p>
                                                        <p className="text-gray-500 text-xs mx-1">
                                                            {notification.message}
                                                        </p>
                                                    </div>
                                                    <p className="text-gray-500 text-xs ms-4 px-2" style={{ fontSize: "9px" }}>
                                                        {formatDistanceToNow(
                                                            new Date(notification.createdAt),
                                                            { addSuffix: true }
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex justify-end p-4 py-2">
                                                <button
                                                    className="text-xs rounded btn border px-4 py-2 cursor-pointer bg-white ml-2 text-green-600"
                                                    onClick={() => handleViewClick(notification.link)}
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminNotification;
