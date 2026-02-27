import Link from "next/link"
import styles from "@/components/TextInputWithButton.module.css";



export default function NotImplementedPage() {
  return (
    <>
      <div style={localStyles.container}>
        <div style={localStyles.card}>
          <h1 style={localStyles.title}>🚧 Page Not Implemented</h1>
          <p style={localStyles.text}>
            This page has not been built yet.
          </p>
          <Link href="/">
            <button className={styles.bigButton}>
              Home
            </button>
          </Link>
        </div>
      </div>



    </>

  );
}

const localStyles: Record<string, React.CSSProperties> = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    padding: "40px 60px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "16px",
  },
  text: {
    color: "#666",
  },
};

// <div className={styles.centerPage}>
//   <div className={styles.buttonStack}>
//     <Link href="/">
//       <button className={styles.bigButton}>
//         Home
//       </button>
//     </Link>


//   </div>
// </div>


