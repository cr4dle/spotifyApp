import { spotify } from "@/services";
import { Track } from "@/types/common/Track";
import { CurrentlyPlaying } from "@/types/CurrentlyPlaying";
import axios from "axios";

jest.mock("axios");

describe("getCurrentlyPlaying", () => {
  let mockAxios: jest.Mocked<typeof axios>;
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

    mockAxios.get.mockResolvedValue(mockedGetData);
    mockAxios.create.mockImplementation(() => {
      defaults: {
        hedaers: {
          common: {
            Authorization: "Bearer someRandomTokenHere";
          }
        }
      }
    });
  });

  it("returns value as expected", async () => {
    const response: CurrentlyPlaying = await spotify.getCurrentlyPlaying();

    expect(response).toStrictEqual(mockedGetData);
  });

  it("throws an error", async () => {
    const error: Error = new Error("Error simulation");
    mockAxios.get.mockRejectedValueOnce(error);

    expect(await spotify.getCurrentlyPlaying()).rejects.toThrowError(error);
  });
});
