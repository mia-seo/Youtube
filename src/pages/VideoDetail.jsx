import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Related from "../components/Related";

export default function VideoDetail() {
  const { videoId } = useParams();
  const { video, channelUrl } = useLocation().state;
  const { title, channelTitle, description } = video;

  return (
    <section className="flex xl:flex-row lg:flex-row lg:gap-5 md:flex-col sm:flex-col">
      <article className="lg: w-3/5 md:w-full sm:w-full">
        <iframe
          className="rounded-xl"
          id="player"
          title={title}
          type="text/html"
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
        />
        <div>
          <h2 className="text-xl font-semibold py-3">{title}</h2>
          <div className="flex items-center gap-2">
            <img
              className="w-8 h-8 rounded-full"
              src={channelUrl}
              alt={channelTitle}
            />
            <p className="text-lg font-semibold">{channelTitle}</p>
          </div>
          <pre className="bg-zinc-200 text-sm my-3 p-3 rounded-md whitespace-pre-wrap">
            {description}
          </pre>
        </div>
      </article>
      <section className="lg:w-2/5">
        <Related id={videoId} />
      </section>
    </section>
  );
}
