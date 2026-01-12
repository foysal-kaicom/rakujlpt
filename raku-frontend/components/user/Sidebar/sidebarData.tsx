import { FaTachometerAlt, FaWallet } from "react-icons/fa";
import { PiExamFill } from "react-icons/pi";
import { MdSubscriptions } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { GiStairsGoal } from "react-icons/gi";
import { HiMiniUserGroup } from "react-icons/hi2";

const SidebarData = [
  {
    label: "sidebar.dashboard",
    to: "/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    label: "sidebar.my_practice",
    to: "/my_practice",
    icon: <GiStairsGoal />,
  },
  {
    label: "sidebar.my_mock_test",
    to: "/mock_test_result",
    icon: <PiExamFill />,
  },
  {
    label: "sidebar.my_subscriptions",
    to: "/my_subscriptions",
    icon: <MdSubscriptions />,
  },
  {
    label: "sidebar.my_wallet",
    to: "/my_wallet",
    icon: <FaWallet />,
  },
  {
    label: "sidebar.my_agent",
    to: "/my_agent",
    icon: <HiMiniUserGroup />,
  },
  {
    label: "sidebar.settings",
    to: "/settings",
    icon: <FaGear />,
  },
];

export { SidebarData };