import TodoItem from "./todo-item";

const TodoList = (props) => {
  return (
    <>
      <h2>{props.title} Todos</h2>
      <div id="list-container">
        {props.todos?.map((item) => {
          return (
            <TodoItem
              item={item}
              status={props.status}
              users={props.users}
              priority={props.priority}
            />
          );
        })}
      </div>
    </>
  );
};
export default TodoList;
