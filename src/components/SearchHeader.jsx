import React, { useEffect, useState } from "react";
import { BsYoutube, BsSearch } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

export default function SearchHeader() {
  const { keyword } = useParams();
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setText(keyword || "");
  }, [keyword]);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/results/${text}`);
    setText("");
  };

  const handleClick = () => navigate("/");

  return (
    <header className="w-full flex items-center gap-10 p-5 mb-10">
      <div className="flex items-center gap-1" onClick={handleClick}>
        <BsYoutube className="text-brand text-3xl" />
        <h1 className="text-2xl font-bold">Youtube</h1>
      </div>
      <form
        className="w-full flex justify-between border border-zinc-400 rounded-full overflow-hidden text-lg"
        onSubmit={handleSubmit}
      >
        <input
          className="w-7/12 focus:outline-none p-2 px-8"
          type="text"
          placeholder="검색"
          value={text}
          onChange={handleChange}
        />
        <button className="px-8 border-l border-zinc-400 bg-zinc-100">
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
