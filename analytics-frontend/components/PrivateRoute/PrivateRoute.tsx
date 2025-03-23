"use client";

import { useEffect, ReactNode } from "react";
import { redirect } from "next/navigation";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/login");
    }
  }, []);

  return children;
};

export default PrivateRoute;
