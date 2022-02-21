import { CurrentlyPlaying } from "@/types/CurrentlyPlaying";
import { AxiosInstance, AxiosResponse } from "axios";

export const getCurrentlyPlaying: (
  axiosInstance: AxiosInstance
) => Promise<CurrentlyPlaying> = async (axiosInstance) => {
  const response: AxiosResponse<CurrentlyPlaying> =
    await axiosInstance.get<CurrentlyPlaying>(
      `${process.env.VUE_APP_SPOTIFY_BASE}/${process.env.VUE_APP_SPOTIFY_VERSION}/${process.env.VUE_APP_SPOTIFY_PLAYER_RESOURCE}/currently-playing`
    );

  return response.data;
};
