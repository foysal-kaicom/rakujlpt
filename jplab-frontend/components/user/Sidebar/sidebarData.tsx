import {
  FaTachometerAlt,
  FaUser,
  FaHeadset,
  FaKey,
} from "react-icons/fa";
import { PiExamFill } from "react-icons/pi";
import { MdSubscriptions } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { GiStairsGoal } from "react-icons/gi";



const SidebarData = [
  // {
  //   label: "Dashboard",
  //   to: "/dashboard",
  //   icon: <FaTachometerAlt />,
  // },
  // {
  //   label: "My Profile",
  //   to: "/profile",
  //   icon: <FaUser />,
  // },
  // {
  //   label: "Mock Test",
  //   to: "/mock_test_result",
  //   icon: <PiExamFill />,
  // },
  // {
  //   label: "My Subscriptions",
  //   to: "/my_subscriptions",
  //   icon: <MdSubscriptions />,
  // },
  // {
  //   label: "Support",
  //   to: "/support",
  //   icon: <FaHeadset />,
  // },
  // {
  //   label: "Update Password",
  //   to: "/update_password",
  //   icon: <FaKey />,
  // },
  // {
  //   label: "settings",
  //   to: "/settings",
  //   icon: <FaGear />,
  // },



  {
    label: "Dashboard",
    to: "/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    label: "Practice",
    to: "/practice",
    icon: <GiStairsGoal />,
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
  // {
  //   label: "Support",
  //   to: "/support",
  //   icon: <FaHeadset />,
  // },
   {
    label: "Settings",
    to: "/settings",
    icon: <FaGear />,
  },

  // {
  //   label: "Profile",
  //   to: "/profile",
  //   icon: <FaUser />,
  // },
  // {
  //   label: "Update Password",
  //   to: "/update_password",
  //   icon: <FaKey />,
  // },
];

export { SidebarData };
