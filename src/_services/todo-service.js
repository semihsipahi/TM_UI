import customFetch from "../_common/custom-fetch";

export const fetchTodos = async () => {
  return await customFetch({
    options: {
      url: "http://localhost:5273/api/Todo",
    },
  });
};

export const fetchTodo = async (id) => {
  return await customFetch({
    options: {
      url: `http://localhost:5273/api/Todo/${id}`,
    },
  });
};

export const fetchTodoStatus = async () => {
  return await customFetch({
    options: {
      url: "http://localhost:5273/api/Todo/Status/key-values",
    },
  });
};

export const fetchTodoPriority = async () => {
  return await customFetch({
    options: {
      url: "http://localhost:5273/api/Todo/Priority/key-values",
    },
  });
};

export const createTodo = async (payload) => {
  return await customFetch({
    options: {
      url: `http://localhost:5273/api/Todo`,
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
};

export const deleteTodo = async (id) => {
  return await customFetch({
    options: {
      url: `http://localhost:5273/api/Todo/${id}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
};
