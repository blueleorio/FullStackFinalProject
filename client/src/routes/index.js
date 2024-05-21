import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import AccountPage from "../pages/AccountPage";
import UserProfilePage from "../pages/UserProfilePage";
import HabitPage from "../pages/HabitPage";
import HabitForm from "../features/habit/HabitForm";
import GoalPage from "../pages/GoalPage";
import ProgressPage from "../pages/ProgressPage";

function Router() {
  return (
    <Routes>
      {/* <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route> */}

      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="habit" element={<HabitPage />} />
        <Route path="goal" element={<GoalPage />} />
        <Route path="progress" element={<ProgressPage />} />

        <Route path="user/:userId" element={<UserProfilePage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
