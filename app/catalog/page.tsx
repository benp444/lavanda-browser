import styles from "@/components/creative.module.css";
import WorkspaceManager from "@/components/WorkspaceManager";


import Link from "next/link"

export default async function UsersPage() {


    return (
        <>
            <WorkspaceManager />

            <Link href="/">
                <button className={styles["homeButton"]}>
                    Go to Home
                </button>
            </Link>
        </>
    );
}




