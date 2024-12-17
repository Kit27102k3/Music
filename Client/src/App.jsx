import { useState, useEffect } from "react";
import { publicRoutes, privateRoutes } from "./User/routes/routes";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DefaultLayout from "./User/layout/DefaulLayout/DefaulLayout";
import HeaderAdmin from "./Admin/layout/HeaderAdmin";
import "./App.css";
import * as actions from "./User/Store/Action";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./User/components/ScrollToTop";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getHome());
  }, [dispatch]);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <>
      <Router>
        <ScrollToTop />
        <nav>
          <ul>
            {publicRoutes.map((route, index) => (
              <li key={index}>
                <Link to={route.path} onClick={handleClick}>
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="page">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Routes>
              {publicRoutes.map((route, index) =>
                route.children ? (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      route.layout === null ? (
                        <route.page />
                      ) : (
                        <DefaultLayout>
                          <route.page />
                        </DefaultLayout>
                      )
                    }
                  >
                    {route.children.map((child, idx) => (
                      <Route
                        key={idx}
                        path={child.path}
                        element={<child.page />}
                      />
                    ))}
                  </Route>
                ) : (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      route.layout === null ? (
                        <route.page />
                      ) : (
                        <DefaultLayout>
                          <route.page />
                        </DefaultLayout>
                      )
                    }
                  />
                )
              )}
              {privateRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <HeaderAdmin>
                      <route.page />
                    </HeaderAdmin>
                  }
                />
              ))}
            </Routes>
          )}
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
