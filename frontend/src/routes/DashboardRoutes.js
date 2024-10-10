import React from "react";
import { Route, Routes } from "react-router-dom";

import { DashBoardPaths } from "./Paths";

import Profile from "../pages/dashboard/Profile";
import CurrentWaste from "../pages/dashboard/manager/CurrentWaste";
import Schedule from "../pages/dashboard/manager/Schedule";
import AssignedSchedule from "../pages/dashboard/collector/AssignedSchedule";
import WasteLevel from "../pages/dashboard/user/WasteLevel";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path={DashBoardPaths.PROFILE} element={<Profile />} />
      <Route path={DashBoardPaths.SCHEDULE} element={<Schedule />} />
      <Route path={DashBoardPaths.CURRENT_WASTE} element={<CurrentWaste />} />
      <Route path={DashBoardPaths.COLLECTOR_ASSIGNED_SCHEDULE} element={<AssignedSchedule />} />
      <Route path={DashBoardPaths.USER_WASTE_LEVEL} element={<WasteLevel />} />
    </Routes>
  );
};

export default DashboardRoutes;
