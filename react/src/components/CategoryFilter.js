import React from "react";
import { EXPENSE_ICONS, EXPENSE_TYPES_KEYS } from "../utils/types";
import "./CategoryFilter.css";

export default function CategoryFilter(props) {
  const selectedFilter = props.filter;
  const setNewFilter = props.setNewFilter;

  return (
    <div style={{ display: "flex", justifyContent: "center", borderBottom: '1px solid #33333310', width: 'fit-content', margin: 'auto' }}>
      {Object.keys(EXPENSE_TYPES_KEYS).map(type => {
        return (
          <div
            key={type}
            className={
              selectedFilter === type
                ? "category selected-category"
                : "category"
            }
            onClick={() => setNewFilter(type)}
          >
            <i className={EXPENSE_ICONS[type]}></i>
          </div>
        );
      })}
    </div>
  );
}
