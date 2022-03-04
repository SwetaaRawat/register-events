import React, { Fragment, useEffect } from "react";
import "./App.css";
import Login from "./components/layout/Login";
import Navbar from "./components/layout/Navbar";
// import Login from "./components/auth/Login";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// redux
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/layout/Register";
import Landing from "./components/layout/Landing";




if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Routes>
          <Route path="/" element={< Landing />} />
          <Route path="/register" element={< Register />} />
            <Route path="/login" element={<Login />} />
            <Fragment>
              <Route path="/dashboard" element={<Dashboard />}  />
            </Fragment>
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
