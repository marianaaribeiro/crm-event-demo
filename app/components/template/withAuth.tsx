"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = localStorage.getItem("auth");
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}
