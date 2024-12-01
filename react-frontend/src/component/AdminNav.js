function AdminNav() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              th:src="@{/images/download.png}"
              src="../static/images/download.png"
              alt="Logo"
            />
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-light" th:href="@{/admin}" href="#">
                  Admin Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-light"
                  th:href="@{/logout}"
                  href="#"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminNav;
