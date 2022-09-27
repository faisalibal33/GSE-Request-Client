import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./page/dashboard/Dashboard";
import Home from "./page/home/Home";
import ListPersonil from "./page/listPersonil/ListPersonil";
import Login from "./page/login/Login";
import Request from "./page/request/Request";
import ListWorktoDo from "./page/listWorktoDo/ListWorktoDo";
import { fetchEquipment } from "./redux/EquipmentSlice";
import { fetchRequest } from "./redux/RequestSlice";
import { fetchUsers } from "./redux/usersSlice";
import "./style/dark.scss";
import ListAllRequest from "./page/listAllRequest/ListAllRequest";
import { cycleFalse, cycleTrue } from "./redux/cycle";
import ListEquipment from "./page/listEquipment/ListEquipment";

const App = () => {
  const { darkMode } = useSelector((state) => state.darkMode);
  const { cycle } = useSelector((state) => state.cycle);
  const dispatch = useDispatch();
  console.log(cycle);

  useEffect(() => {
    dispatch(cycleFalse());
    dispatch(fetchRequest());
    dispatch(fetchEquipment());
    dispatch(fetchUsers());
    console.log("cycle");
  }, [cycle]);
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard"
              index
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="request"
              index
              element={
                <ProtectedRoute>
                  <Request />
                </ProtectedRoute>
              }
            />
            <Route
              path="personil"
              index
              element={
                <ProtectedRoute>
                  <ListPersonil />
                </ProtectedRoute>
              }
            />
            <Route
              path="worktodo"
              index
              element={
                <ProtectedRoute>
                  <ListWorktoDo />
                </ProtectedRoute>
              }
            />
            <Route
              path="allrequest"
              index
              element={
                <ProtectedRoute>
                  <ListAllRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="equipment"
              index
              element={
                <ProtectedRoute>
                  <ListEquipment />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
