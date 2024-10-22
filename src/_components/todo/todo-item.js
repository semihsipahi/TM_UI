import EditSVG from "../../icon/EditIconSVG.svg";
import RemoveSVG from "../../icon/RemoveIconSVG.svg";
import { deleteTodo } from "../../_services/todo-service";
import { useState } from "react";

const TodoItem = (props) => {
  const [formData, setFormData] = useState();

  const handleRemoveTodo = async (id) => {
    await deleteTodo(id);
    window.location.reload();
  };

  const handleSaveTodo = async () => {
    console.log(formData);
  };

  return (
    <>
      <ul>
        <li className="person">{props.item?.displayPriority}</li>
        <li className="task-diff easy">{props.item?.displayStatus}</li>
        <li className="task-diff easy">{props.item?.userEmail}</li>
        <li className="task-descrip">
          <b>Task:</b> {props.item?.title}
        </li>
        {props.item?.editMode && (
          <>
            <li className="todo-item-right">
              <img
                src={RemoveSVG}
                height={30}
                onClick={() => handleRemoveTodo(props.item?.pkTodoId)}
              />
            </li>

            <li className="todo-item-right">
              <a href="#modal">
                <img src={EditSVG} href="" />
              </a>
            </li>
          </>
        )}
      </ul>

      <div id="modal" className="modal-container">
        <div className="modal-inner">
          <a href="#" className="modal-close">
            Close
          </a>

          <div className="card">
            <div className="card-header">
              <h2>Edit Todo</h2>
            </div>
            <div className="card-body">
              <form>
                <label htmlFor="name">Description:</label>
                <input
                  type="text"
                  value={props.item?.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                  }}
                />

                <label htmlFor="email">Story Point:</label>
                <input
                  type="text"
                  value={props.item?.storyPoint}
                  onChange={(e) => {
                    setFormData({ ...formData, storyPoint: e.target.value });
                  }}
                />

                <label htmlFor="email">Detail:</label>
                <input
                  type="text"
                  value={props.item?.detail}
                  onChange={(e) => {
                    setFormData({ ...formData, detail: e.target.value });
                  }}
                />

                <label htmlFor="phone">Status:</label>
                <select
                  className="basic"
                  onChange={(e) => {
                    setFormData({ ...formData, status: e.target.value });
                  }}>
                  {props?.status?.map((item, index) => {
                    return (
                      <>
                        {item.value === props.item.status ? (
                          <option defaultChecked value={item.value} key={index}>
                            {item?.name}
                          </option>
                        ) : (
                          <option value={item.value} key={index}>
                            {item?.name}
                          </option>
                        )}
                      </>
                    );
                  })}
                </select>

                <label htmlFor="password">User:</label>
                <select
                  className="basic"
                  onChange={(e) => {
                    setFormData({ ...formData, fKUserId: e.target.value });
                  }}>
                  {props.users?.map((item, index) => {
                    return (
                      <option key={index} value={item.pkUserId}>
                        {item.email}
                      </option>
                    );
                  })}
                </select>

                <label htmlFor="password">Priority:</label>

                <select
                  className="basic"
                  onChange={(e) => {
                    setFormData({ ...formData, priority: e.target.value });
                  }}>
                  {props.priority?.map((item, index) => {
                    <option value="0">Please Select</option>;
                    return (
                      <option value={item.value} key={index}>
                        {item?.name}
                      </option>
                    );
                  })}
                </select>
              </form>
            </div>
            <div className="card-footer">
              <button onClick={handleSaveTodo}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TodoItem;
