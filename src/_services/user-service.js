import customFetch from "../_common/custom-fetch";

export const login = async (payload) => {
  return await customFetch({
    options: {
      url: `http://localhost:5273/api/Auth`,
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
};

export const createUser = async (payload) => {
  return await customFetch({
    options: {
      url: `http://localhost:5273/api/user/`,
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
};

export const fetchUsers = async () => {
  return await customFetch({
    options: {
      url: "http://localhost:5273/api/User",
    },
  });
};

export const fetchUserTodos = async (id) => {
  return await customFetch({
    options: {
      url: `http://localhost:5273/api/user/${id}/todos`,
    },
  });
};
