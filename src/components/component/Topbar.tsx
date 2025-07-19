import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Topbar = () => {
  return (
    <div className="shadow flex justify-between items-center p-4">
      <div className="font-bold text-xl">Next SNS</div>
      <div className="relative flex items-center gap-4">
        <input
          className="border border-gray-300 rounded-lg py-1 px-2"
          type="text"
          placeholder="Search..."
        />
        <FontAwesomeIcon icon={faBell} className="text-gray-400" />
        <FontAwesomeIcon icon={faMessage} className="text-gray-400" />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link href={"/sign-in"}>ログイン</Link>
          <Link href={"/sign-up"}>新規登録</Link>
        </SignedOut>
      </div>
    </div>
  );
};

export default Topbar;
