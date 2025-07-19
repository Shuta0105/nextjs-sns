import React from "react";

const RightSidebar = () => {
  return (
    <div className="shadow m-4 flex flex-col p-4 h-[calc(100vh-66px)] flex-2">
      <div className="text-lg font-extrabold">Trending Topics</div>
      <div className="mt-2 space-y-2">
        <div className="text-gray-500">#technology</div>
        <div className="text-gray-500">#travel</div>
        <div className="text-gray-500">#fashion</div>
        <div className="text-gray-500">#food</div>
      </div>
    </div>
  );
};

export default RightSidebar;
