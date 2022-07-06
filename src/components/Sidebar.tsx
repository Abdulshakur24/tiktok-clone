import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import SuggestedAccounts from "./SuggestedAccounts";
import Discover from "./Discover";
import Footer from "./Footer";
import useAuthStore from "src/store/authStore";

const Sidebar: NextPage = () => {
  const { query, pathname } = useRouter();
  const { fetchAllUsers, allUsers }: any = useAuthStore();

  const activeLink =
    "flex items-center gap-3 hover:bg-[#111] bg-[#000000] p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#ffffff] rounded";

  const normalLink =
    "flex items-center gap-3 hover:bg-[#515151] hover:text-[white] p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded";
  return (
    <div>
      <div className="xl:w-400 w-20 gap-3 max-h-[88vh] overflow-auto  scrollbar-none  flex flex-col justify-start border-r-2 border-gray-100 xl:border-0 p-3 ">
        <div className="xl:border-b-2 border-gray-200 xl:pb-4">
          <Link href="/">
            <div
              className={
                !query.topic && pathname === "/" ? activeLink : normalLink
              }
            >
              <p className="text-2xl">
                <AiFillHome />
              </p>
              <span className="capitalize text-xl hidden xl:block">
                For You
              </span>
            </div>
          </Link>
        </div>

        <Discover />
        <SuggestedAccounts fetchAllUsers={fetchAllUsers} allUsers={allUsers} />
        <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
