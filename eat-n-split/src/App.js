import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFrenz, setShowAddFrenz] = useState(false);
  const [selectedFrenz, setSelectedFrenz] = useState(null);
  function handleShowAddFrenz() {
    setShowAddFrenz((show) => !show);
  }
  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFrenz(false);
  }
  function handleSelection(friend) {
    setSelectedFrenz((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFrenz(false);
  }
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFrenz.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFrenz(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFrenz={selectedFrenz}
        />

        {showAddFrenz && <FormAddFriend onAddFriends={handleAddFriend} />}

        <Button onClick={handleShowAddFrenz}>
          {showAddFrenz ? "Close" : "Add Friends"}
        </Button>
      </div>
      {selectedFrenz && (
        <FormSplitBill
          selectedFrenz={selectedFrenz}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}
function FriendsList({ friends, onSelection, selectedFrenz }) {
  return (
    <ul>
      {friends.map((i) => (
        <Friend
          friend={i}
          key={i.id}
          onSelection={onSelection}
          selectedFrenz={selectedFrenz}
        />
      ))}
    </ul>
  );
}
function Friend({ friend, onSelection, selectedFrenz }) {
  const isSelected = selectedFrenz?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)} 💸
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even 🎈</p>}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you ${Math.abs(friend.balance)} 💰
        </p>
      )}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriends }) {
  const [name, setName] = useState("");
  const [image, setImg] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const newFriend = {
      name,
      image,
      balance: 0,
      id: crypto.randomUUID(),
    };
    onAddFriends(newFriend);
    setName("");
    setImg("");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👩🏼‍🤝‍👩🏻 Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌆 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImg(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
function FormSplitBill({ selectedFrenz, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFren = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFren : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFrenz.name}</h2>
      <label>🧾 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🤸🏻‍♀️ Your expenses</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>👩🏼‍🤝‍👩🏻 {selectedFrenz.name}'s expense</label>
      <input type="text" disabled value={paidByFren} />

      <label>💴 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">you</option>
        <option value="friend">{selectedFrenz.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
