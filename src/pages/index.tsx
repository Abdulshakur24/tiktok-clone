import React from "react";
import axios from "axios";
import Head from "next/head";

import VideoCard from "src/components/VideoCard";
import { BASE_URL } from "src/utils";
import { Video } from "src/types/default";
import NoResults from "src/components/NoResults";

interface IProps {
  videos: Video[];
  topic: string;
}

const Home = ({ videos, topic }: IProps) => {
  return (
    <>
      <Head>
        <title>{topic || "Home"}</title>
      </Head>
      <div className="flex flex-col gap-10 videos h-full">
        {videos.length ? (
          videos?.map((video: Video) => (
            <VideoCard post={video} isShowingOnHome key={video._id} />
          ))
        ) : (
          <NoResults text={`No Videos`} />
        )}
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }

  return {
    props: { videos: response.data, topic: topic || "" },
  };
};
