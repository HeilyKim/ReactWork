import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [itemsArray, setItemsArray] = useState([]);
  function handleAddItems(item) {
    setItemsArray((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItemsArray((items) => items.filter((item) => item.id !== id));
  }
  function handleUpdateItem(id) {
    setItemsArray((items) =>
      items.map((item) =>
        item.id === id ? { ...item, package: !item.package } : item
      )
    );
  }
  function handleClearItem() {
    const confirmed = window.confirm(
      "Are you sure you wanna delete everything ?"
    );

    if (confirmed) setItemsArray([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={itemsArray}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
        onClearItem={handleClearItem}
      />
      <Stats itemsArray={itemsArray} />
    </div>
  );
}
