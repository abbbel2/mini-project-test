import { FC, ReactNode, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cls from "classnames";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import { NavigationItems } from "../util/constants";
import axiosInstance from "../redux/axios";

export type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = useMemo(() => location.pathname, [location]);
  const userName = useMemo(() => localStorage.getItem("name"), []);
  const role = useMemo(() => localStorage.getItem("role"), []) as 'admin' | 'user';

  const handleLogout = useCallback(() => {
    delete axiosInstance.defaults.headers.Authorization;
    localStorage.clear();
    navigate("/login");
  }, [navigate]);

  return (
    <div className="w-full flex flex-row">
      <div
        className="d-flex flex-column px-3 pt-8 bg-dark text-white vh-100 w-2/12"
      >
        <h4 className="text-center">Ticketing</h4>
        <div className="py-3" />
        <ul className="nav flex-column space-y-2">
          {NavigationItems.filter(nav => role === 'user' ? nav.name.toLowerCase() !== 'kanban' : true).map((nav, index) => (
            <li className="nav-item" key={index}>
              <Link
                to={nav.path}
                className={cls("nav-link text-white rounded-lg", {
                  "bg-primary": nav.path === pathName,
                })}
              >
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-10/12">
        <Navbar expand="lg" className="bg-light">
          <Container className="px-4">
            <Navbar.Collapse className="flex flex-row justify-end">
              <Nav>
                <NavDropdown
                  title={userName}
                  drop="start"
                  id="dropdown-button-drop-down"
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="m-4 h-[85vh] overflow-scroll">{children}</div>
      </div>
    </div>
  );
};
