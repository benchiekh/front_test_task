import styles from "./Stats.module.css";
type StatsProps = {
  completed: number;
  pending: number;
  total: number;
};
export default function Stats({ completed, pending, total }: StatsProps) {
  return (
    <section className={styles.container}>
      {/* Completed Tasks */}
      <div className={`${styles.tile} ${styles.completed}`}>
           <div className={styles.label}>Completed Tasks</div>
        <div className={styles.count}>{completed ?? 0}</div>
     
      </div>

      {/* Pending Tasks */}
      <div className={`${styles.tile} ${styles.pending}`}>
         <div className={styles.label}>Pending Tasks</div>
        <div className={styles.count}>{pending ?? 0}</div>
       
      </div>

      {/* Task Created */}
  <div className={styles.taskCreated}>
  <div className={styles.label}>Tasks Created</div>
  <div className={styles.count}>
    {typeof total === "number" ? total.toLocaleString() : total ?? 0}
  </div>
 


</div>

    </section>
  );
}
