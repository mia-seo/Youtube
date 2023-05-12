import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./pages/Search";
import VideoDetail from "./pages/VideoDetail";
import Videos from "./pages/Videos";
import Root from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Videos /> },
      { path: "/results/:keyword", element: <Search /> },
      { path: "/watch/:videoId", element: <VideoDetail /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
