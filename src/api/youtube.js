export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async videos() {
    return this.#videos();
  }

  async channelUrl(channelId) {
    return this.#channels(channelId);
  }

  async related(videoId) {
    return this.#related(videoId);
  }

  async search(keyword) {
    return this.#search(keyword);
  }

  async channel(keyword) {
    return this.#searchCh(keyword);
  }

  async #videos() {
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          chart: "mostPopular",
          maxResults: 25,
          regionCode: "KR",
        },
      })
      .then((res) => res.data.items);
  }

  async #channels(channelId) {
    return this.apiClient
      .channels({
        params: {
          part: "snippet",
          id: channelId,
          regionCode: "KR",
        },
      })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }

  async #related(videoId) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          relatedToVideoId: videoId,
          type: "video",
          regionCode: "KR",
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async #search(keyword) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          q: keyword,
          type: "video",
          regionCode: "KR",
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async #searchCh(keyword) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          q: keyword,
          type: "channel",
          regionCode: "KR",
        },
      })
      .then((res) => res.data.items[0].snippet);
  }
}
