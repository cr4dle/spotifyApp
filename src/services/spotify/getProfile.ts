import { SpotifyProfile } from "@/types/SpotifyProfile";
import { AxiosInstance, AxiosResponse } from "axios";

export const getProfile: (
  axiosInstance: AxiosInstance
) => Promise<SpotifyProfile> = async (axiosInstance) => {
  const response: AxiosResponse<SpotifyProfile> =
    await axiosInstance.get<SpotifyProfile>(
      `${process.env.VUE_APP_SPOTIFY_BASE}/${process.env.VUE_APP_SPOTIFY_VERSION}/me`
    );

  return response.data;
};
