import { cards } from "../lib/data";
import Card from "../dashboard/card/card";
import Chart from "../dashboard/chart/chart";
import styles from "../dashboard/dashboard.module.css";
import Rightbar from "../dashboard/rightbar/rightbar";
import Transactions from "../dashboard/transactions/transactions";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {/* {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))} */}
        </div>
        <Transactions />
        <Chart />
      </div>
      {/* <div className={styles.side}>
        <Rightbar />
      </div> */}
    </div>
  );
};

export default Dashboard;
