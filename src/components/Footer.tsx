import { Dancing_Script } from "next/font/google";
import styles from "./Footer.module.css";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
});

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Logo Todo List */}
      <div className={styles.leftGroup}>
        <div className={styles.ellipse1}></div>
        <div className={styles.ellipse2}></div>
        <div className={styles.logoCircle}>T</div>
        <span className={`${styles.title} ${dancingScript.className}`}>
          Todo List
        </span>
      </div>

      {/* Texte copyright */}
      <small className={styles.copy}>
        © 2024 Tekandme. All Rights Reserved.
      </small>

      {/* Icônes réseaux sociaux */}
      <div className={styles.socialIcons}>
        <a href="#"><FaFacebookF /></a>
        <a href="#"><FaLinkedinIn /></a>
        <a href="#"><FaTwitter /></a>
        <a href="#"><FaGithub /></a>
      </div>
    </footer>
  );
}
