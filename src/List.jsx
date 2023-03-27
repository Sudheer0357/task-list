import React from "react";
import Item from "./Item";

const List = ({ list, editItem, removeItem }) => {
  return (
    <ul>
      {list.map((item) => {
        return (
          <Item
            key={item.id}
            item={item}
            editItem={editItem}
            removeItem={removeItem}
          />
        );
      })}
    </ul>
  );
};

export default List;
