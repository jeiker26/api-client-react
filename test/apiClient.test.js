import { Apiclient } from "../src/Apiclient";
// import axios from "axios";

jest.mock("axios");

describe("Apiclient suite", () => {
  it("should create new api client without errors", () => {
    expect(Object.keys(new Apiclient({}))).toEqual([
      "fetch",
      "getApiClient",
      "settings",
      "client$"
    ]);
  });

  /*it("should create new api client without errors", () => {
    axios.mockImplementation(() => Promise.resolve({ status: 200, data: ["foo", "var"] }));

    const testWrapper = new Apiclient({});
    expect(axiosStub).toEqual();
  });*/
});
