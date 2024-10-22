const TopBar = () => {
  let activeUser;
  const auth = localStorage.getItem("active-user-logged");

  if (auth) {
    activeUser = JSON.parse(auth);
  }

  return (
    <nav className="nav">
      <ul>
        <li>
          <a href="#">
            <strong>{activeUser?.email}</strong>
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default TopBar;
