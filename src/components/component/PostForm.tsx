"use client";

import React, { useActionState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { addPostAction } from "@/lib/actions";

const PostForm = () => {
  const initialState = {
    error: undefined,
    success: false,
  };

  const [state, formAction] = useActionState(addPostAction, initialState);

  return (
    <>
      <form action={formAction} className="flex items-center gap-2">
        <div></div>
        <input
          type="text"
          name="post"
          className="border-none rounded-2xl w-full py-2 px-4 outline-none bg-gray-100"
          placeholder="What's on your mind?"
        />
        <button>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>

      {state.error && <p className="text-red-500 mt-1 ml-14">{state.error}</p>}
    </>
  );
};

export default PostForm;
