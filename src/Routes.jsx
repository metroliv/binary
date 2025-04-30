import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Import pages
import Dashboard from "./pages/dashboard";
import LoginScreen from "./pages/login-screen";
import RedirectHandler from "./pages/redirect-screen/RedirectHandler"; // ✅ Correct path
import RegistrationScreen from "./pages/registration-screen";
import TradingInterface from "./pages/trading-interface";
import AssetSelectionScreen from "./pages/asset-selection-screen";
import PortfolioHistoryScreen from "./pages/portfolio-history-screen";
import AccountSettingsScreen from "./pages/account-settings-screen";
import NotificationsCenter from "./pages/notifications-center";
import ChartAnalysisScreen from "./pages/chart-analysis-screen";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <LoginScreen /> },
    { path: "/login-screen", element: <LoginScreen /> },
    { path: "/registration-screen", element: <RegistrationScreen /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/trading-interface", element: <TradingInterface /> },
    { path: "/asset-selection-screen", element: <AssetSelectionScreen /> },
    { path: "/portfolio-history-screen", element: <PortfolioHistoryScreen /> },
    { path: "/account-settings-screen", element: <AccountSettingsScreen /> },
    { path: "/notifications-center", element: <NotificationsCenter /> },
    { path: "/chart-analysis-screen", element: <ChartAnalysisScreen /> },
    { path: "/redirect", element: <RedirectHandler /> }, // ✅ Handles Deriv redirect
  ]);

  return element;
};

const Routes = () => {
  return (
    <Router>
      <ScrollToTop />
      <ProjectRoutes />
    </Router>
  );
};

export default Routes;
