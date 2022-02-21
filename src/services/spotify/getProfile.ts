import { SpotifyProfile } from "@/types/SpotifyProfile";
import axios, { AxiosResponse } from "axios";

export const getProfile: (
  access_token: string
) => Promise<SpotifyProfile> = async (access_token) => {
  const response: AxiosResponse<SpotifyProfile> =
    await axios.get<SpotifyProfile>(
      `${process.env.VUE_APP_SPOTIFY_BASE}/${process.env.VUE_APP_SPOTIFY_VERSION}/me`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

  return response.data;
};
