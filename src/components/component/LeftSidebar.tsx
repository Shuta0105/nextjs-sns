import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCompass,
  faBookmark,
  faHeart,
  faMessage,
  faUser,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { fetchUser } from "@/lib/user";
import { auth } from "@clerk/nextjs/server";

const LeftSidebar = async () => {
  const { userId } = await auth();

  if(!userId) {
    return null;
  }
  
  const user = await fetchUser(userId);

  if (!user) {
    return null;
  }

  return (
    <div className="shadow m-4 flex flex-col p-4 h-[calc(100vh-66px)] flex-2">
      <div className="flex items-center gap-2">
        <img src={user.image ?? ""} className="w-12 h-12" />
        <div className="flex flex-col">
          <div className="font-bold">{user.name}</div>
          <div className="text-sm text-gray-400">{user.name}</div>
        </div>
      </div>
      <hr className="mt-4" />
      <div className="space-y-4 mt-8">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faHome} className="text-gray-500" />
          <div className="text-gray-600">Home</div>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCompass} className="text-gray-500" />
          <div className="text-gray-600">Explore</div>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faBookmark} className="text-gray-500" />
          <div className="text-gray-600">BookMarks</div>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faUser} className="text-gray-500" />
          <div className="text-gray-600">Profile</div>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faMessage} className="text-gray-500" />
          <div className="text-gray-600">Messages</div>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faHeart} className="text-gray-500" />
          <div className="text-gray-600">Likes</div>
        </div>
      </div>
      <hr className="mt-auto" />
      <div className="flex items-center mt-4 gap-2">
        <FontAwesomeIcon icon={faGear} className="text-gray-500" />
        <div className="text-gray-600">Settings</div>
      </div>
    </div>
  );
};

export default LeftSidebar;
