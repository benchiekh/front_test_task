import { Dancing_Script } from "next/font/google";
import Image from "next/image";
import styles from "./Header.module.css";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
});

type HeaderProps = {
  userName?: string;
  profileImage?: string;
};

export default function Header({ userName = "Iheb", profileImage }: HeaderProps) {
  return (
    <header className={styles.header}>
      {/* Groupe gauche : cercles + initiale */}
      <div className={styles.leftGroup}>
        <div className={styles.ellipse1}></div>
        <div className={styles.ellipse2}></div>
        <div className={styles.logoCircle}>
          {userName ? userName[0].toUpperCase() : "?"}
        </div>
        <span className={`${styles.title} ${dancingScript.className}`}>
          Todo List
        </span>
      </div>

      {/* Avatar à droite */}
      <Image
        src={profileImage || "/default-avatar.png"}
        alt="User avatar"
        className={styles.avatar}
        width={50}
        height={50}
      />
    </header>
  );
}
