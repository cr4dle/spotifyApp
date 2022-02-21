import axios, { AxiosInstance } from "axios";
import { getCurrentlyPlaying } from "@/services/spotify/getCurrentlyPlaying";
import { Track } from "@/types/common/Track";
import { CurrentlyPlaying } from "@/types/CurrentlyPlaying";

jest.mock("axios");

describe("getCurrentlyPlaying", () => {
  let axiosInstance: AxiosInstance;
  let mockAxios: jest.Mocked<typeof axios>;
  let mockAxiosInstance: jest.Mocked<typeof axiosInstance>;
  const mockedGetData: CurrentlyPlaying = {
    actions: {
      disallows: {
        resuming: true,
        skipping_prev: false,
      },
    },
    context: {
      external_urls: {
        spotify: "",
      },
      href: "string",
      type: "string",
      uri: "string",
    },
    currently_playing_type: "",
    is_playing: true,
    item: {} as Track,
    progress_ms: 1,
    timestamp: new Date().getMilliseconds(),
  };

  beforeAll(() => {
    mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create = jest.fn(() => jest.genMockFromModule("axios"));
    const axiosInstance: AxiosInstance = mockAxios.create();
    mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

    mockAxiosInstance.get.mockResolvedValue({
      status: 200,
      data: mockedGetData,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns value as expected", async () => {
    const response: CurrentlyPlaying = await getCurrentlyPlaying(
      mockAxiosInstance
    );

    expect(response).toStrictEqual(mockedGetData);
  });

  it("throws an error", async () => {
    const error: Error = new Error("Error simulation");
    mockAxiosInstance.get.mockRejectedValueOnce(error);

    await expect(getCurrentlyPlaying(mockAxiosInstance)).rejects.toThrowError(
      error
    );
  });
});
