import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import agoForm from "../utils/agoForm";

export default function Video({ id, video, type }) {
  const {
    thumbnails,
    title,
    channelTitle,
    channelId,
    publishedAt,
    description,
  } = video;
  const thumbnail = thumbnails.medium.url;
  const { youtube } = useYoutubeApi();
  const { data: channelUrl } = useQuery(
    ["channelUrl", channelId],
    () => youtube.channelUrl(channelId),
    { staleTime: 1000 * 60 * 5 }
  );
  const navigate = useNavigate();
  const isRow = type === "row";

  const handleClick = () =>
    navigate(`/watch/${id}`, { state: { video, channelUrl } });

  return (
    <div className={isRow ? "flex gap-5" : ""} onClick={handleClick}>
      <img className="rounded-lg" src={thumbnail} alt={title} />
      <div className="flex items-start gap-3 my-2">
        <img
          className="w-8 h-8 rounded-full"
          src={channelUrl}
          alt={channelTitle}
        />
        <div>
          <h2 className="text-base font-semibold line-clamp-2">{title}</h2>
          <p className="text-sm opacity-80">
            {channelTitle} • {agoForm(publishedAt)} 전
          </p>
          {isRow && (
            <pre className="text-sm opacity-80 line-clamp-2 whitespace-pre-wrap">
              {description}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
