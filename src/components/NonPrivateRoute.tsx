import { Navigate } from "react-router-dom";

import { userSelector } from "../redux/slices/userSlice";
import { useAppSelector } from "../hook";

type Props = {
  children: React.ReactNode;
}

const NonPrivateRoute = ({ children }: Props) => {
  const { userUid } = useAppSelector(userSelector);

  if (userUid) return <Navigate to="/" replace={true} />;

  return children;
};

export default NonPrivateRoute;
