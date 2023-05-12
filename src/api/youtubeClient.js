import axios from "axios";

export default class YoutubeClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3",
      params: {
        key: process.env.REACT_APP_API_KEY,
      },
    });
  }

  async videos(params) {
    return this.httpClient.get("videos", params);
  }

  async channels(params) {
    return this.httpClient.get("channels", params);
  }

  async search(params) {
    return this.httpClient.get("search", params);
  }
}
