import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import VideoSm from "./VideoSm";

export default function Related({ id }) {
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["videos", "related", id], () => youtube.related(id), {
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <h1>Loading...💫</h1>;
  if (error) return <p>{error}</p>;
  return (
    <div className="flex flex-col gap-2">
      {videos &&
        videos.map((video) => (
          <VideoSm key={video.id} id={video.id} video={video.snippet} />
        ))}
    </div>
  );
}
