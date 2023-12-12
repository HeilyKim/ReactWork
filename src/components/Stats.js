export default function Stats({ itemsArray }) {
  if (!itemsArray.length)
    return (
      <p className="stats">
        <em>Start adding new items to your packing list! 🚧</em>
      </p>
    );
  const numItems = itemsArray.length;
  const numPacked = itemsArray.filter((i) => i.package).length;
  const pctg = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {pctg === 100
          ? "You got everthing! Lets Go!💨"
          : `📝You have ${numItems} items on your list and you alrd packed ${numPacked}
        (${pctg}%)`}
      </em>
    </footer>
  );
}
