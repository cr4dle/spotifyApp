import { CurrentlyPlaying } from "@/types/CurrentlyPlaying";
import axios, { AxiosResponse } from "axios";

export const getCurrentlyPlaying: (
  access_token: string
) => Promise<CurrentlyPlaying> = async (access_token) => {
  const response: AxiosResponse<CurrentlyPlaying> =
    await axios.get<CurrentlyPlaying>(
      `${process.env.VUE_APP_SPOTIFY_BASE}/${process.env.VUE_APP_SPOTIFY_VERSION}/${process.env.VUE_APP_SPOTIFY_PLAYER_RESOURCE}/currently-playing`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

  return response.data; // TODO if there is no guard to check for status, we should return here the AxiosResponse and check for status
};
