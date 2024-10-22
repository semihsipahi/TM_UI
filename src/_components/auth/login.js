import { useState } from "react";
import "../auth/login.css";
import { login, createUser } from "../../_services/user-service";
import { useGlobalState } from "../../_store/index";

const Login = () => {
  const state = useGlobalState();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isNewUser, setIsNewUser] = useState();
  const [showIsNewUser, setShowIsNewUser] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isNewUser) {
      const response = await createUser({
        email,
        password,
      });

      if (!response) {
        alert("FAIL");
      }

      alert(
        "The user has been successfully registered. Please try logging in again."
      );

      setIsNewUser(false);
      setShowIsNewUser(false);
      return;
    }

    const response = await login({
      email,
      password,
    });

    if (!response) {
      alert("FAIL");
      return;
    }

    state.setActiveUser({ ...response.user });
    localStorage.setItem("active-user", response.token);
    window.location.reload();
  };

  return (
    <div className="body">
      <section className="user-panel">
        <input
          type="radio"
          id="radio-1"
          name="panel-toggle"
          className="sr-only peer/radio-1"
          checked
        />

        <header>
          <span>Login to your account</span>
        </header>

        <form>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="none-border"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="none-border"
            />
          </div>

          <div className="buttons">
            <button onClick={(e) => handleLogin(e)}>
              {isNewUser ? "Create" : "Login"}
            </button>
          </div>

          {showIsNewUser && (
            <label>
              <input
                type="checkbox"
                checked={isNewUser}
                onChange={(e) => {
                  setIsNewUser(e.target.checked);
                }}
              />
              New User
            </label>
          )}
        </form>
      </section>
    </div>
  );
};
export default Login;
