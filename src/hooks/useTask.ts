import { useState, type SubmitEventHandler } from "react";
import { type ListItemType } from "../components";
import { TaskService } from "../services/task.service";

const taskService = TaskService.getInstance();

export const useTask = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<ListItemType[]>([]);
  const [items, setItems] = useState<ListItemType[]>(() =>
    taskService.getTasks(),
  );

  const handleAddNewItem = (name: string) => {
    const newTask = { id: crypto.randomUUID(), name };
    const tasks = taskService.addTask(newTask);

    setItems(tasks);
  };

  const handleDelete = (items: ListItemType | ListItemType[]) => {
    const isArray = Array.isArray(items);
    const tasks = taskService.deleteTasks(isArray ? items : [items]);

    setItems(tasks);
    setSelectedItems([]);
  };

  const handleIsOpenModal = (value: boolean) => {
    setIsOpenModal(value);
  };

  const handleSelect = (item: (typeof items)[number]) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name")?.toString() || "";

    handleAddNewItem(name);
    handleIsOpenModal(false);
  };

  const handleUndo = () => {
    const tasks = taskService.undoTask();

    setItems(tasks);
    setSelectedItems([]);
  };

  return {
    handleAddNewItem,
    handleDelete,
    handleSelect,
    handleIsOpenModal,
    handleUndo,
    handleSubmit,
    isOpenModal,
    items,
    selectedItems,
  };
};
