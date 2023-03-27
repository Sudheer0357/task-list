import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import List from "./List";

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const [isEditing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAlert({
        show: false,
        msg: "",
        type: "",
      });
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [alert]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setAlert({
        show: true,
        msg: "Please Enter Value",
        type: "danger",
      });
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (editId === item.id) {
            return { ...item, name: name };
          }
          return item;
        })
      );
      setAlert({
        show: true,
        msg: "Value Changed",
        type: "success",
      });
      setEditId(null);
      setEditing(false);
      setName("");
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        name: name,
      };
      setList([...list, newItem]);
      setAlert({
        show: true,
        msg: "Item Added",
        type: "success",
      });
      setName("");
    }
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setEditId(id);
    setEditing(true);
    setName(specificItem.name);
  };

  const removeItem = (id) => {
    setAlert({
      show: true,
      msg: "Item Deleted",
      type: "danger",
    });
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  return (
    <section className="task-form">
      {alert.show && <Alert {...alert} />}
      <h1>Task List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="ex: Go to school"
        />
        <button className="add-btn" type="submit">
          {isEditing ? "Edit" : "add"}
        </button>
      </form>
      {list.length > 0 && (
        <section>
          <List list={list} removeItem={removeItem} editItem={editItem} />
          <button
            className="clear-btn"
            onClick={() => {
              setAlert({
                show: true,
                msg: "All Items are Cleared",
                type: "danger",
              });
              setList([]);
            }}
          >
            Clear Items
          </button>
        </section>
      )}
    </section>
  );
};

export default App;
