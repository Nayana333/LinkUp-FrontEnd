import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BellRing } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getNotifications } from "../../services/api/user/apiMethods";
import { setUnreadCount } from "../../utils/context/reducers/NotificationSlice";
import './Notification.css';
import NoNotifications from "../SkeltonUi/NoNotification";

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

const Notifications = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const userId = user._id || "";
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response: any = await getNotifications({ userId });
        const notificationData: Notification[] = response.data.notifications;
        setNotifications(notificationData);
        console.log(notificationData);

        const unreadCount = notificationData.filter(n => n.read === false).length;
        dispatch(setUnreadCount(unreadCount));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId, dispatch]);

  const handleViewClick = (link: string) => {
    if (link) {
      window.location.href = link.startsWith("http") ? link : `https://link-up-jobs.vercel.app/${link}`;
    }
  };

  return (
    <div>
      <div className="home-notification-section-2">
        <div className="border profile-nav flex items-center justify-start ps-6 bg-white rounded-md mt-5 mx-5 sm:mx-2">
          <p className="text-xs flex gap-2 text-gray-500">
            Notifications <BellRing color="gray" size={15} />
          </p>
        </div>

        <div className="home-scroll">
          <div className="home-scrollbox">
            {loading ? (
              <p>Loading...</p>
            ) : notifications.length === 0 ? (
              <NoNotifications />
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="pl-3 pb-2 bg-white mx-5 mt-2 rounded-lg sm:mx-2"
                >
                  <div className="flex flex-col sm:flex-row justify-between py-4 ml-2">
                    <div className="info flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="bg-gradient-to-b from-green-600 to-green-400 w-1 sm:w-1 mr-3"></div>
                        {notification.senderId && (
                          <div className="flex flex-col sm:flex-row items-start sm:items-center">
                            <img
                              src={notification.senderId.profileImageUrl}
                              alt="User"
                              className="h-10 w-10 rounded-full"
                            />
                            <div className="flex flex-col sm:flex-row sm:items-center">
                              <p className="text-gray-800 ms-4 text-xs font-semibold mx-1">
                                {notification.senderId.userName}
                              </p>
                              <p className="text-gray-500 text-xs mx-1">
                                {notification.message}
                              </p>
                            </div>
                            <p
                              className="text-gray-500 text-xs ms-4 px-2"
                              style={{ fontSize: "9px" }}
                            >
                              {formatDistanceToNow(
                                new Date(notification.createdAt),
                                { addSuffix: true }
                              )}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end p-4 py-2 sm:py-0 sm:px-4">
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

export default Notifications;
