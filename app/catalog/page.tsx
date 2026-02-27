//import styles from "@/components/creative.module.css";
import styles from "@/components/TextInputWithButton.module.css";

import WorkspaceManager from "@/components/WorkspaceManager";


import Link from "next/link"

export default async function UsersPage() {


    return (
        <>
            <WorkspaceManager />

            <div className={styles.justifyCenter} >
                <Link href="/">
                    <button className={styles.bigButton}>
                        Go to Home
                    </button>
                </Link>
            </div>
        </>
    );
}



