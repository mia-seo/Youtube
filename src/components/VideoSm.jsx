import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import agoForm from "../utils/agoForm";

export default function VideoSm({ id, video }) {
  const { thumbnails, title, channelId, channelTitle, publishedAt } = video;
  const thumbnail = thumbnails.medium.url;
  const { youtube } = useYoutubeApi();
  const { data: channelUrl } = useQuery(["channelUrl", channelId], () =>
    youtube.channelUrl(channelId)
  );

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${id}`, { state: { video, channelUrl } });
  };

  return (
    <div className="flex gap-3" onClick={handleClick}>
      <img className="w-[168px] rounded-md" src={thumbnail} alt={title} />
      <div>
        <h2 className="text-base font-semibold line-clamp-2">{title}</h2>
        <p className="text-sm opacity-80">{channelTitle}</p>
        <p className="text-sm opacity-80">{agoForm(publishedAt)} 전</p>
      </div>
    </div>
  );
}
