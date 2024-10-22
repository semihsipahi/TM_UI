import { useEffect, useState } from "react";
import {
  fetchTodos,
  createTodo,
  fetchTodoStatus,
  fetchTodoPriority,
} from "../../_services/todo-service";
import { fetchUsers, fetchUserTodos } from "../../_services/user-service";
import "./layout.css";
import Todos from "../todo/todo-list";
import TopBar from "../top-bar/top-bar";

const Layout = () => {
  const [todos, SetTodos] = useState();
  const [todoStatus, setTodoStatus] = useState();
  const [formData, setFormData] = useState();
  const [users, setUsers] = useState();
  const [userTodos, setUserTodos] = useState();
  const [userPriority, setUserPriority] = useState();

  useEffect(() => {
    (async () => {
      Promise.all([
        fetchUsers(),
        fetchTodos(),
        fetchUserTodos(1),
        fetchTodoStatus(),
        fetchTodoPriority(),
      ]).then(
        ([
          userResponse,
          todoResponse,
          todoUserResponse,
          todoStatusResponse,
          todoPriorityResponse,
        ]) => {
          SetTodos(todoResponse);
          setUsers(userResponse);
          setUserTodos(todoUserResponse);
          setTodoStatus(todoStatusResponse);
          setUserPriority(todoPriorityResponse);
        }
      );
    })();
  }, []);

  const handleCreateTodo = async () => {
    await createTodo(formData);
    await refresh();
  };

  const refresh = async () => {
    const response = await fetchTodos();

    if (!response) {
      return;
    }

    SetTodos(response);
  };

  return (
    <main className="main">
      <TopBar />
      <div id="left">
        <div id="form-wrapper">
          <input
            type="submit"
            className="submit-button pointer"
            onClick={handleCreateTodo}
            value="Add Task"
          />
          <h1>Add Task</h1>

          <h3>Description</h3>
          <input
            type="text"
            name="description"
            placeholder="Write a new task here."
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <h3>Story Point</h3>
          <input
            type="text"
            name="storyPoint"
            placeholder="Story Point."
            onChange={(e) =>
              setFormData({ ...formData, storyPoint: e.target.value })
            }
          />

          <h3>Detail</h3>
          <textarea
            name="detail"
            placeholder="Write a new task here."
            id="detail"
            onChange={(e) =>
              setFormData({ ...formData, detail: e.target.value })
            }
          />

          <div id="form-col-wrapper">
            <div id="form-left">
              <h3>Status</h3>
              <select
                className="basic"
                onChange={(e) => {
                  setFormData({ ...formData, status: e.target.value });
                }}>
                <option value="0">Please Select</option>
                {todoStatus?.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item?.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div id="form-left">
              <h3>Assigned To</h3>
              <select
                className="basic"
                onChange={(e) => {
                  setFormData({ ...formData, fKUserId: e.target.value });
                }}>
                <option value="0">Please Select</option>
                {users?.map((item, index) => {
                  return (
                    <option key={index} value={item.pkUserId}>
                      {item.email}
                    </option>
                  );
                })}
              </select>
            </div>

            <div id="form-right">
              <h3>Priority</h3>
              <select
                className="basic"
                onChange={(e) => {
                  setFormData({ ...formData, priority: e.target.value });
                }}>
                {userPriority?.map((item, index) => {
                  <option value="0">Please Select</option>;
                  return (
                    <option value={item.value} key={index}>
                      {item?.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-footer" />
          </div>
        </div>
      </div>

      {todoStatus?.length > 0 && (
        <div id="right">
          <div id="right-wrapper">
            <Todos
              title="All"
              todos={todos}
              status={todoStatus}
              users={users}
              priority={userPriority}
            />
          </div>
        </div>
      )}

      <div id="right">
        <div id="right-wrapper">
          <Todos title="My" todos={userTodos} />
        </div>
      </div>
    </main>
  );
};
export default Layout;
