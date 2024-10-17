import { useEffect, useState } from "react";
import {
  fetchTodos,
  createTodo,
  deleteTodo,
} from "../../_services/todo-service";
import { fetchUsers } from "../../_services/user-service";
import "../main/main.css";

const Layout = () => {
  const [todos, SetTodos] = useState();
  const [formData, setFormData] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    (async () => {
      Promise.all([fetchUsers(), fetchTodos()]).then(
        ([userResponse, todoResponse]) => {
          SetTodos(todoResponse);
          setUsers(userResponse);
        }
      );
    })();
  }, []);

  const handleCreateTodo = async () => {
    await createTodo(formData);
    await refresh();
  };

  const handleLogOut = () => {
    localStorage.removeItem("active-user");
    window.location.reload();
  };

  const handleRemoveTodo = async (id) => {
    await deleteTodo(id);
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
    <div>
      <header>
        <h4 style={{ cursor: "pointer" }} onClick={handleLogOut}>
          Log Out
        </h4>
        <h1 className="btn">TODO LIST</h1>
      </header>

      <div className="heading">
        <div id="addn">
          <div className="hvr">
            <div className="inp">
              <input
                className="myTextarea input grd1"
                placeholder="Title"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }></input>
              <br></br>
              <input
                className="myTextarea input grd2"
                placeholder="Detail"
                onChange={(e) =>
                  setFormData({ ...formData, detail: e.target.value })
                }></input>
              <br></br>

              <input
                type="number"
                className="myTextarea input grd2"
                placeholder="Status"
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }></input>
              <br></br>

              <input
                type="number"
                className="myTextarea input grd2"
                placeholder="Priority"
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }></input>
              <br></br>

              <input
                type="number"
                className="myTextarea input grd2"
                placeholder="StoryPoint"
                onChange={(e) =>
                  setFormData({ ...formData, storyPoint: e.target.value })
                }></input>
              <br></br>

              <select
                className="myTextarea input grd2"
                onChange={(e) => {
                  setFormData({ ...formData, fkUserId: e.target.value });
                }}>
                <option value="0">Users</option>
                {users?.map((item, index) => {
                  return (
                    <option key={index} value={item.pkUserId}>
                      {item.email}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="task center">
          <div className="center">
            <img
              src="https://raw.githubusercontent.com/rahulpaul127/Google-TasksBoard-Clone/ab0d3708c29dd314f9ce8d3a678c1ce6d573cf63/svg/icon%20copy.svg"
              alt="plus"
              onClick={() => handleCreateTodo()}
            />
          </div>
        </div>
      </div>

      {todos?.map((item) => {
        return (
          <div key={item.pkTodoId} className="heading">
            <div id="addn">
              <div className="hvr">
                <div className="inp">
                  <span className="input">{item.title}</span>
                  <span className="input">{item.detail}</span>
                  <span className="input">{item.userEmail}</span>
                  <span className="input">{item.displayStatus}</span>
                  <span className="input">{item.displayPriority}</span>
                </div>
              </div>
            </div>

            <div className="task center">
              <div className="center">
                <img
                  src="https://raw.githubusercontent.com/rahulpaul127/Google-TasksBoard-Clone/ab0d3708c29dd314f9ce8d3a678c1ce6d573cf63/svg/delete.svg"
                  alt="plus"
                  onClick={() => handleRemoveTodo(item.pkTodoId)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Layout;
