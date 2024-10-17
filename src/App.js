import Login from "./_components/auth/login";
import Layout from "./_components/main/layout";
import "./App.css";

function App() {
  const hasLogged = localStorage.getItem("active-user");
  return <div className="App">{hasLogged ? <Layout /> : <Login />}</div>;
}

export default App;
