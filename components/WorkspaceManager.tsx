"use client";

import { useState } from "react";
import SelectableTable from "@/components/SelectableDataTable";
import styles from "@/components/creative.module.css";


type WorkspaceNode = {
    id: string;
    name: string;
    workspace?: { id: string };
};

type ProductGroupNode = {
    id: string;
    academicYear: string;
    internalReference: string;
    contractEarliestEndDate: string;
    contractEarliestStartDate: string;
    products?: { totalCount: string };

};

type ProductNode = {
    id: string;
    unitType?: { code: string, id: string };
    allocatedUnits?: { totalCount: string };

};


export default function WorkspaceManager() {
    const [wsData, setWsData] = useState<WorkspaceNode[]>([]);
    const [selectedWs, setSelectedWs] = useState<WorkspaceNode | null>(null);

    const [pgData, setPgData] = useState<ProductGroupNode[]>([]);
    const [selectedPg, setSelectedPg] = useState<ProductGroupNode | null>(null);

    const [prodData, setProdData] = useState<ProductNode[]>([]);
    const [selectedProd, setSelectedProd] = useState<ProductNode | null>(null);

    //const [workspaceId, setWorkspaceId] = useState<string>(""); // state to store current time


    const loadWorkspaces = async () => {
        const res = await fetch("/api/spaces");
        const json = await res.json();
        setWsData(json.spaces.buildings.nodes);
    };

    const deleteWorkspace = () => {
        if (!selectedWs) return;
        console.log("Deleting:", selectedWs.id);
    };

    const loadProductGroups = async () => {
        const wsId = selectedWs?.workspace?.id;
        console.log("attempting to load Product Groups: WsId:", wsId)

        const res = await fetch(`/api/product-groups?wsId=${wsId}`);
        const json = await res.json();

        setPgData(json.catalog.productGroups.nodes)
    };

    const loadProducts = async () => {
        const prodId = selectedPg?.id;
        console.log("attempting to load Products: pgId:", prodId)

        const res = await fetch(`/api/products?pgId=${prodId}`);
        const json = await res.json();

        setProdData(json.catalog.productGroup.products.nodes)
    };

    return (
        <div>

            <div className={styles.buttonRow}>
                <button onClick={loadWorkspaces}>Load Workspaces</button>
            </div>

            <SelectableTable<WorkspaceNode>
                data={wsData}
                getRowId={(ws) => ws.id}
                columns={[
                    { header: "Workspace ID", render: (ws) => ws.workspace?.id },
                    { header: "Name", render: (ws) => ws.name },
                    { header: "Building ID", render: (ws) => ws.id },

                ]}
                onSelect={setSelectedWs}
            />

            <div className={styles.buttonRow}>
                <button disabled={!selectedWs} onClick={loadProductGroups}>Load Product Groups</button>
            </div>

            <SelectableTable<ProductGroupNode>
                data={pgData}
                getRowId={(ws) => ws.id}
                columns={[
                    { header: "ProdGroup ID", render: (ws) => ws.id },
                    { header: "Academic Year", render: (ws) => ws.academicYear },
                    { header: "Internal Reference", render: (ws) => ws.internalReference },
                    { header: "Start Date", render: (ws) => ws.contractEarliestStartDate },
                    { header: "End Date", render: (ws) => ws.contractEarliestEndDate },
                    { header: "Products", render: (ws) => ws.products?.totalCount },


                    // { header: "Workspace ID", render: (ws) => ws.workspace?.id },
                ]}
                onSelect={setSelectedPg}
            />

            <div className={styles.buttonRow}>
                <button disabled={!selectedPg} onClick={loadProducts}>Load Products</button>
            </div>


            <SelectableTable<ProductNode>
                data={prodData}
                getRowId={(rowId) => rowId.id}
                columns={[
                    { header: "Product ID", render: (wtf) => wtf.id },
                    { header: "UnitType", render: (wtf) => wtf.unitType?.code },
                    { header: "UnitTypeId", render: (wtf) => wtf.unitType?.id },
                    { header: "Units", render: (wtf) => wtf.allocatedUnits?.totalCount },

                ]}
                onSelect={setSelectedProd}
            />

        </div>
    );
}