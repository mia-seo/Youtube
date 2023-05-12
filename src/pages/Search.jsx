import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import Video from "../components/Video";

export default function Search() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["videos", keyword], () => youtube.search(keyword), {
    staleTime: 1000 * 60 * 5,
  });

  const { data: channel } = useQuery(
    ["channel", keyword],
    () => youtube.channel(keyword),
    { staleTime: 1000 * 60 * 5 }
  );

  if (isLoading) return <h1>Loading...💫</h1>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <div className="w-full flex gap-10 justify-between items-center border-y border-zinc-200 py-7 my-7 px-20">
        <img
          className="w-[136px] h-[136px] rounded-full"
          src={channel && channel.thumbnails.medium.url}
          alt={channel && channel.title}
        />
        <div className="w-4/6">
          <h2 className="text-lg font-semibold">{channel && channel.title}</h2>
          <p className="text-sm opacity-80">{channel && channel.customUrl}</p>
          <p className="line-clamp-2">{channel && channel.description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {videos &&
          videos.map((video) => (
            <Video
              key={video.id}
              id={video.id}
              video={video.snippet}
              type="row"
            />
          ))}
      </div>
    </div>
  );
}
