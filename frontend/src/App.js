import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicRoutes from "./routes/PublicRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import DashboardRootLayout from "./components/DashboardRootLayout";
import DashboardIndex from "./pages/dashboard/DashboardIndex";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/dashboard" element={<DashboardRootLayout />}>
          <Route index element={<DashboardIndex />} />
          <Route path="/dashboard/*" element={<DashboardRoutes />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
