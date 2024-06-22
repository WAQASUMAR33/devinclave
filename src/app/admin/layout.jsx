import Navbar from "../dashboard/navbar/navbar";
import Sidebar from "../dashboard/sidebar/sidebar";
import styles from "../dashboard/dashboard.module.css";
import Footer from "../dashboard/footer/footer";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <ToastContainer />
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
