import styles from "./DashboardHeader.module.css";

export default function DashboardHeader({ name }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.heroTitle}>
        Hello, {name}, <span className={styles.sub}>Start planning today</span>
      </h1>
    </header>
  );
}
