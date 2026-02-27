import Link from "next/link";
import styles from "@/components/TextInputWithButton.module.css";

export default function HomePage() {
  return (
    <div className={styles.centerPage}>
      <div className={styles.buttonStack}>
        <Link href="/catalog">
          <button className={styles.bigButton}>
            View Catalog
          </button>
        </Link>

        <Link href="/bookings">
          <button className={styles.bigButton}>
            View Bookings
          </button>
        </Link>
      </div>
    </div>
  );
}