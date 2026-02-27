"use client";

import { useState } from "react";
import styles from "./TextInputWithButton.module.css";

type Column<T> = {
  header: string;
  render: (item: T) => React.ReactNode;
};

type SelectableTableProps<T> = {
  data: T[];
  getRowId: (item: T) => string;
  columns: Column<T>[];
  onSelect?: (item: T) => void;
};

export default function SelectableTable<T>({
  data,
  getRowId,
  columns,
  onSelect,
}: SelectableTableProps<T>) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (item: T) => {
    const id = getRowId(item);
    setSelectedId(id);
    onSelect?.(item);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th></th>
            {columns.map((col, i) => (
              <th key={i}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const id = getRowId(item);
            return (
              <tr
                key={id}
                className={selectedId === id ? styles.selectedRow : ""}
                onClick={() => handleSelect(item)}
              >
                <td>
                  <input
                    type="radio"
                    checked={selectedId === id}
                    onChange={() => handleSelect(item)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                {columns.map((col, i) => (
                  <td key={i}>{col.render(item)}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}