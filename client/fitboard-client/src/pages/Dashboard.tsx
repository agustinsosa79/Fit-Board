import { User } from "@heroui/react";
import { useAuth } from "../context/useAuth";

export const Dashboard = () => {
    const { user } = useAuth();

  return (
        <User avatarProps={{src: "https://i.pravatar.cc/150?u=a04258114e29026702d"}} description="Desarrollador" name={user?.nombre ? user?.nombre.charAt(0).toUpperCase() + user?.nombre.slice(1) : ""} />
  );
};
