import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import { SlSizeActual } from "react-icons/sl";
import { BiCategory } from "react-icons/bi";
import { GrProductHunt } from "react-icons/gr";
import { MdTypeSpecimen } from "react-icons/md";
import { PiSelectionBackgroundFill } from "react-icons/pi";
import { RiListOrdered } from "react-icons/ri";
import { TiDocumentText } from "react-icons/ti";
import { MdFiberNew } from "react-icons/md";
import { MdPayments } from "react-icons/md";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
// import { auth, signOut } from "@/app/auth";

const menuItems = [
  {
    title: "Store",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Companies",
        path: "/admin/Companies",
        icon: <BiCategory />,
      },
      {
        title: "Offers",
        path: "/admin/Offers",
        icon: <GrProductHunt />,
      },

    ],
  },
  
  {
    title: "Dev Inclave",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
    ],
  },
];

const Sidebar = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={"/noavatar.png"}
          alt=""
          width="50"
          height="50"
        />
        {/* <div className={styles.userDetail}>
          <span className={styles.username}>{user.username}</span>
          <span className={styles.userTitle}>Administrator</span>
        </div> */}
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
