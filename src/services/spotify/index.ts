import axios, { AxiosError } from "axios";
import { getProfile } from "./getProfile";
import { getRecentlyPlayedTracks } from "./getRecentlyPlayedTracks";
import { getRecentlyPlayedTracksPaged } from "./getRecentlyPlayedTracksPaged";
import { getCurrentlyPlaying } from "./getCurrentlyPlaying";
import { localStorage } from "@/utils";
import { AUTHENTICATION_KEY } from "@/constants";
import router from "@/router";

const axiosInstance = axios.create();

axiosInstance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.get(AUTHENTICATION_KEY)}`;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // an alternative would have been to set up toastr and re-direct to "Home"
    if (error.response?.status === 401) {
      return router.push({
        name: "Unauthorised",
      });
    }

    if (error.response?.status === 403) {
      return router.push({
        name: "ReAuthentication",
      });
    }

    if (error.response?.status === 429) {
      return router.push({
        name: "ApiLimitExceeded",
      });
    }
    return Promise.reject(error);
  }
);

export const spotify = {
  getProfile: () => {
    // Special case as it is calling in App.vue when the user might not have click in "Login to Spotiy" button
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.get(AUTHENTICATION_KEY)}`;
    return getProfile(axiosInstance);
  },
  getCurrentlyPlaying: () => getCurrentlyPlaying(axiosInstance),
  getRecentlyPlayedTracks: () => getRecentlyPlayedTracks(axiosInstance),
  getRecentlyPlayedTracksPaged: (nexResourceUri: string) =>
    getRecentlyPlayedTracksPaged(axiosInstance, nexResourceUri),
};
