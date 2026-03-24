import { useState } from "react";
import "./ListItem.css";

export interface ListItemType {
  id: string;
  name: string;
}

export interface ListItemProps {
  item: ListItemType;
  onClick: (item: ListItemType) => void;
  onDoubleClick?: (item: ListItemType) => void;
}

export const ListItem = ({ item, onClick, onDoubleClick }: ListItemProps) => {
  const [isItemSelected, setIsItemSelected] = useState(false);

  const handleSelect = () => {
    setIsItemSelected(!isItemSelected);
    onClick(item);
  };

  const handleDoubleClick = () => {
    setIsItemSelected(false);
    onDoubleClick?.(item);
  };

  return (
    <li
      key={item.id}
      className={`list-item ${isItemSelected ? "selected" : ""}`}
      onClick={handleSelect}
      onDoubleClick={handleDoubleClick}
      title={item.name}
    >
      {item.name}
    </li>
  );
};

export default ListItem;
