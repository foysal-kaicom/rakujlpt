import {
  FaTachometerAlt,
  FaUser,
  FaHeadset,
  FaKey,
} from "react-icons/fa";
import { PiExamFill } from "react-icons/pi";
import { MdSubscriptions } from "react-icons/md";


const SidebarData = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    label: "My Profile",
    to: "/profile",
    icon: <FaUser />,
  },
  {
    label: "Mock Test",
    to: "/mock_test_result",
    icon: <PiExamFill />,
  },
  {
    label: "My Subscriptions",
    to: "/my_subscriptions",
    icon: <MdSubscriptions />,
  },
  {
    label: "Support",
    to: "/support",
    icon: <FaHeadset />,
  },
  {
    label: "Update Password",
    to: "/update_password",
    icon: <FaKey />,
  },
];

export { SidebarData };
