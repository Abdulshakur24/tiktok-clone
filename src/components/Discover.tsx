import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "src/utils/constants";

const Discover: NextPage = () => {
  const router = useRouter();
  const { topic } = router.query;

  const activeLink =
    "flex items-center gap-3 hover:bg-[#111] bg-[#000000] p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#ffffff] rounded";

  const normalLink =
    "flex items-center gap-3 hover:bg-[#515151] hover:text-[white] p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded";

  return (
    <div className="w-full  xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics?.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={`w-full ${
                topic === item.name ? activeLink : normalLink
              }`}
            >
              <span className="font-bold text-2xl xl:text-md ">
                {item.icon}
              </span>
              <span
                className={`font-medium text-md hidden xl:block capitalize`}
              >
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
