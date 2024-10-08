import React from "react";
import { Route, Routes } from "react-router-dom";

import { DashBoardPaths } from "./Paths";

import Profile from "../pages/dashboard/Profile";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path={DashBoardPaths.PROFILE} element={<Profile />} />
    </Routes>
  );
};

export default DashboardRoutes;
