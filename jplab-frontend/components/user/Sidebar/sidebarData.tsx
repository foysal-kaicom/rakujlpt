import {
  FaTachometerAlt,
  FaUser,
  FaHistory,
  FaPoll,
  FaHeadset,
  FaKey,
} from "react-icons/fa";
import { PiExamFill } from "react-icons/pi";

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
  // {
  //   label: "Exam Booking",
  //   to: "/exam_history",
  //   icon: <FaHistory />,
  // },
  // {
  //   label: "Results & Certificate",
  //   to: "/exam_result",
  //   icon: <FaPoll />,
  // },
  {
    label: "Mock Test",
    to: "/mock_test_result",
    icon: <PiExamFill />,
  },
  {
    label: "My Subscriptions",
    to: "/my_subscriptions",
    icon: <PiExamFill />,
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
