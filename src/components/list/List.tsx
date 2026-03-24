import ListItem, {
  type ListItemProps,
  type ListItemType,
} from "../list-item/ListItem";
import "./List.css";

export interface ListProps {
  items: ListItemType[];
  onClick: ListItemProps["onClick"];
  onDoubleClick?: ListItemProps["onDoubleClick"];
}

export const List = ({ items, onDoubleClick, onClick }: ListProps) => {
  return (
    <ul className="list">
      {items.map((item) => (
        <ListItem
          item={item}
          key={item.id}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
        />
      ))}
    </ul>
  );
};

export default List;
