import { useAuth } from "../context/useAuth";

export const Dashboard = () => {
    const { user } = useAuth();

  return (
        <p>Welcome back, {user?.name}!</p>
  );
};
