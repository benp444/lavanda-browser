"use client";
import styles from "./TextInputWithButton.module.css";

import { useState } from "react";

export default function GetWorkspacesButton() {
    const [workspaces, setWorkspaces] = useState<any[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleClick = async () => {
        try {
            console.log("attempting to retrieve workspaces...:")
            const res = await fetch("/api/spaces");
            const jsonWs = await res.json();
            const nodes = jsonWs.spaces.buildings.nodes;
            // const jsonString = JSON.stringify(jsonWs, null, 2);
            setWorkspaces(nodes)
        } catch (err) {
            console.error("Failed to get Workspaces", err)
        }
    }


    return (
        <div className={styles["input-container"]}>
            <button type="button" onClick={handleClick}>
                Load Workspaces
            </button>

            {workspaces.length > 0 && (
                <div className={styles.tableContainer}>
                    <table className={styles.dataTable}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Building ID</th>
                                <th>Name</th>
                                <th>Workspace ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workspaces.map((ws) => (
                                <tr
                                    key={ws.id}
                                    className={`${styles.clickableRow} ${selectedId === ws.id ? styles.selectedRow : ""
                                        }`}
                                    onClick={() => setSelectedId(ws.id)}
                                >
                                    <td>
                                        <input
                                            type="radio"
                                            name="workspaceSelection"
                                            value={ws.id}
                                            checked={selectedId === ws.id}
                                            onChange={() => setSelectedId(ws.id)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </td>
                                    <td>{ws.id}</td>
                                    <td>{ws.name}</td>
                                    <td>{ws.workspace?.id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

