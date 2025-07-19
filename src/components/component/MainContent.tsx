import React from "react";

import PostList from "./PostList";
import PostForm from "./PostForm";

const MainContent = async () => {
  return (
    <div className="shadow m-4 flex flex-col p-4 flex-8 h-screen">
      <PostForm />
      <div className="overflow-y-scroll">
        <PostList />
      </div>
    </div>
  );
};

export default MainContent;
