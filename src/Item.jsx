import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Item = ({ item, editItem, removeItem }) => {
  return (
    <li>
      <h4>{item.name}</h4>
      <div>
        <button onClick={() => editItem(item.id)}>
          <FaEdit style={{ color: "green" }} />
        </button>
        <button onClick={() => removeItem(item.id)}>
          <FaTrash style={{ color: "red" }} />
        </button>
      </div>
    </li>
  );
};

export default Item;
