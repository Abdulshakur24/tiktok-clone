import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import useAuthStore from "src/store/authStore";
import { IUser } from "src/types/default";
import { createOrGetUser } from "src/utils";
import Logo from "src/assets/tiktok-logo.svg";

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <>
      <Link href="/">
        <div className="w-[30px] md:w-[40px] flex items-center">
          <Image
            width={"100%"}
            height={"100%"}
            priority
            className="cursor-pointer"
            src={Logo}
            alt="logo"
          />
        </div>
      </Link>

      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="h-[40px] flex items-center bg-white"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="h-full bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full"
            placeholder="Search accounts and videos"
          />
          <button
            type="submit"
            className="translate-x-[-60px] md:right-5 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {user ? (
          <div className="flex gap-5 md:gap-10 items-center">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />
                <span className="hidden md:block">Upload </span>
              </button>
            </Link>
            {user.image && (
              <Link href={`/profile/${user._id}`}>
                <div className="w-[30px] md:w-[40px]">
                  <Image
                    priority
                    className="rounded-full cursor-pointer"
                    src={user.image}
                    alt="user"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
              </Link>
            )}
            <button
              type="button"
              className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex items-center justify-center border-[1px] p-2  rounded-full cursor-pointer outline-none shadow-md"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Login Failed")}
          />
        )}
      </div>
    </>
  );
};

export default Navbar;
