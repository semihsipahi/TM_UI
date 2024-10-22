import Login from "./_components/auth/login";
import Layout from "./_components/layout/layout";

function App() {
  const hasLogged = localStorage.getItem("active-user");
  return <div>{hasLogged ? <Layout /> : <Login />}</div>;
}

export default App;
