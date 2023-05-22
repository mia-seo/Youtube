import React from "react";
import { useQuery } from "@tanstack/react-query";
import Video from "../components/Video";
import { useYoutubeApi } from "../context/YoutubeApiContext";

export default function Videos() {
  const { youtube } = useYoutubeApi();

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["videos", "popular"], () => youtube.videos(), {
    staleTime: 1000 * 60,
  });

  if (isLoading) return <h1>Loading...💫</h1>;
  if (error) return <p>{error}</p>;
  return (
    <main className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {videos &&
        videos.map((video) => (
          <Video key={video.id} id={video.id} video={video.snippet} />
        ))}
    </main>
  );
}
