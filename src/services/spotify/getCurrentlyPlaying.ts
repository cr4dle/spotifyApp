import { CurrentlyPlaying } from "@/types/CurrentlyPlaying";
import axios, { AxiosResponse } from "axios";

export const getCurrentlyPlaying: (
  access_token: string
) => Promise<CurrentlyPlaying> = async (access_token) => {
  const response: AxiosResponse<CurrentlyPlaying> =
    await axios.get<CurrentlyPlaying>(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

  console.log(response.data);

  return response.data;
};
