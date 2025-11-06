import { GoBellFill } from "react-icons/go";
import { IoIosMail } from "react-icons/io";
import { IoMailOpenOutline } from "react-icons/io5";

import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axios";
import { toast } from "sonner";

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  url?: string;
  time: string;
  is_read?: boolean;
}

interface NotificationsData {
  unread_count: number;
  notifications: NotificationItem[];
}

export default function Notification({ token }: any) {
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationsData>({
    unread_count: 0,
    notifications: [],
  });

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const getNotificationData = async () => {
    if (token) {
      try {
        const response = await axiosInstance.get("/notifications/list");
        const data = response.data?.data;
        setNotifications(data);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    getNotificationData();
  }, [token]);

  const notificationRead = async (id: number) => {
    try {
      const response = await axiosInstance.get(`notifications/${id}/read`);
      getNotificationData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const notificationReadAll = async () => {
    try {
      const response = await axiosInstance.get(`notifications/read-all`);
      getNotificationData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-end relative group size-7">
      <div
        onClick={toggleNotification}
        className="p-1 rounded-full bg-white border border-purple-400 font-semibold relative cursor-pointer"
      >
        <GoBellFill className="size-5 text-purple-600" />
        {notifications?.unread_count > 0 && (
          <p className="size-3 bg-red-600 rounded-full absolute -top-1 -right-1"></p>
        )}
      </div>
      <div
        className={`absolute right-0 top-[30px] scale-0 group-hover:scale-100 w-[300px] sm:w-[350px] bg-white shadow rounded h-[400px] overflow-y-scroll duration-500 transform origin-top-right border border-gray-200 ${
          isNotificationOpen ? "scale-100 xl:scale-0" : "scale-0 xl:scale-0"
        }`}
      >
        <div className="border-b border-gray-200 flex gap-3 justify-between items-center p-2 sticky top-0 bg-white">
          <p className="font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Notification</p>

          <button
            disabled={notifications?.unread_count < 1}
            onClick={notificationReadAll}
            className={`duration-300 text-xs font-medium ${
              notifications?.unread_count > 0
                ? "cursor-pointer hover:text-purple-600"
                : "text-gray-500 cursor-not-allowed"
            }`}
          >
            Mark as read
          </button>
        </div>
        {notifications?.notifications.length > 0 ? (
          notifications.notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => notificationRead(item.id)}
              className={`p-2 flex gap-3 border-b border-b-gray-200 hover:bg-blue-50/70 mb-2 cursor-pointer ${
                !item?.is_read ? "bg-blue-50/50" : ""
              }`}
            >
              <div className="size-7 p-1 bg-blue-100 rounded-full text-blue-700 ">
                {!item?.is_read ? (
                  <IoIosMail className="size-5" />
                ) : (
                  <IoMailOpenOutline className="size-5" />
                )}
              </div>
              <div className="w-[calc(100%-28px)] space-y-1">
                <p className="font-semibold text-sm">{item?.title}</p>
                <p className="text-xs">{item?.message}</p>
                <p className="text-xs">{item?.time}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm p-2 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">No notification</p>
        )}
      </div>
    </div>
  );
}
