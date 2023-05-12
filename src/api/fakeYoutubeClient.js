import axios from "axios";

export default class FakeYoutubeClient {
  async videos() {
    return await axios.get("/data/popular.json");
  }

  async channels() {
    return await axios.get("/data/channel.json");
  }

  async search() {
    return await axios.get("/data/related.json");
  }
}
