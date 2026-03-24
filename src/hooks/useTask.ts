import { useState, type SubmitEventHandler, type SyntheticEvent } from "react";
import { type ListItemType } from "../components";
import { TaskService } from "../services/task.service";

const taskService = TaskService.getInstance();

export const useTask = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<ListItemType[]>([]);
  const [items, setItems] = useState<ListItemType[]>(() =>
    taskService.getTasks(),
  );
  const lastTaskAdded = taskService.getLastTaskAdded();

  const handleAddItem = (name: string) => {
    const newTask = { id: crypto.randomUUID(), name };
    const tasks = taskService.addTask(newTask);

    setItems(tasks);
  };

  const handleCancel = (e: SyntheticEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.closest("form");
    form?.reset();
    handleShowModal(false);
  };

  const handleDeleteItems = (items: ListItemType | ListItemType[]) => {
    const isArray = Array.isArray(items);
    const tasks = taskService.deleteTasks(isArray ? items : [items]);

    setItems(tasks);
    setSelectedItems([]);
  };

  const handleShowModal = (value: boolean) => {
    setShowModal(value);
  };

  const handleSelectItem = (item: (typeof items)[number]) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString() || "";

    form.reset();
    handleAddItem(name);
    handleShowModal(false);
  };

  const handleUndoItem = () => {
    const tasks = taskService.undoTask();

    setItems(tasks);
    setSelectedItems([]);
  };

  return {
    handleAddItem,
    handleCancel,
    handleDeleteItems,
    handleSelectItem,
    handleShowModal,
    handleUndoItem,
    handleSubmit,
    showModal,
    items,
    lastTaskAdded,
    selectedItems,
  };
};
