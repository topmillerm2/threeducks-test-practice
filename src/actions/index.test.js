import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import { fetchPosts, createPost } from "./index";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("axios");
afterEach(() => jest.clearAllMocks());

describe("fetchPosts", () => {
  it("should fetch a list of posts", () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            content: "This is my first post.",
            id: 1,
          },
          {
            content: "This is my second post.",
            id: 2,
          },
        ],
      }),
    );

    const store = mockStore({ posts: [] });
    const exepctedType = "FETCH_POSTS";
    const expectedPayload = [
      {
        content: "This is my first post.",
        id: 1,
      },
      {
        content: "This is my second post.",
        id: 2,
      },
    ];

    return store.dispatch(fetchPosts()).then(() => {
      const [{ type, payload }] = store.getActions();
      expect(type).toEqual(exepctedType);
      expect(payload).toEqual(expectedPayload);
    });
  });
});

describe("createPost", () => {
  it("should create a single post", () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          content: "This is my third post.",
          id: 3,
        },
      }),
    );

    const store = mockStore({ posts: [] });

    const exepctedType = "CREATE_POST";
    const expectedPayload = {
      content: "This is my third post.",
      id: 3,
    };

    return store.dispatch(createPost()).then(() => {
      const [{ type, payload }] = store.getActions();
      expect(type).toEqual(exepctedType);
      expect(payload).toEqual(expectedPayload);
    });
  });
});
