import { FaTachometerAlt, FaWallet } from "react-icons/fa";
import { PiExamFill } from "react-icons/pi";
import { MdSubscriptions } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { GiStairsGoal } from "react-icons/gi";
import { HiMiniUserGroup } from "react-icons/hi2";


const SidebarData = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    label: "My Practice",
    to: "/my_practice",
    icon: <GiStairsGoal />,
  },

  {
    label: "My Mock Test",
    to: "/mock_test_result",
    icon: <PiExamFill />,
  },
  {
    label: "My Subscriptions",
    to: "/my_subscriptions",
    icon: <MdSubscriptions />,
  },
  // {
  //   label: "My Wallet",
  //   to: "/my_wallet",
  //   icon: <FaWallet />,
  // },
  // {
  //   label: "My Agent",
  //   to: "/my_agent",
  //   icon: <HiMiniUserGroup />,
  // },
  {
    label: "Settings",
    to: "/settings",
    icon: <FaGear />,
  },
];

export { SidebarData };
