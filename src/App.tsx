import { Button, List, Modal } from "./components";
import { UndoIcon } from "./icons";
import { useTask } from "./hooks/useTask";
import { TextField } from "./components/text-field/TextField";

import "./App.css";

const App = () => {
  const {
    handleDelete,
    handleIsOpenModal,
    handleSelect,
    handleSubmit,
    handleUndo,
    isOpenModal,
    items,
    selectedItems,
  } = useTask();

  return (
    <main className="app">
      <div className="container">
        <section className="content-title">
          <h1>This is a technical proof</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis
            nec inceptos. Lacinia habitasse arcu molestie maecenas cursus quam
            nunc, hendrerit posuere augue fames dictumst placerat porttitor, dis
            mi pharetra vestibulum venenatis phasellus.
          </p>
        </section>
        <List
          items={items}
          onDoubleClick={handleDelete}
          onClick={handleSelect}
        />
        <section
          aria-label="Task actions"
          className="group-button"
          role="group"
        >
          <div className="buttons-secondary">
            <Button
              disabled={!items.length}
              label={<UndoIcon size={26} />}
              onClick={handleUndo}
              variant="secondary"
            />
            <Button
              disabled={!selectedItems.length}
              label="delete"
              onClick={() => handleDelete(selectedItems)}
              variant="secondary"
            />
          </div>
          <Button
            label="add"
            variant="primary"
            onClick={() => handleIsOpenModal(true)}
          />
        </section>
      </div>
      <Modal isOpen={isOpenModal} onClose={() => handleIsOpenModal(false)}>
        <form onSubmit={handleSubmit}>
          <div className="modal-container">
            <TextField
              autofocus
              label="Add item to list"
              name="name"
              placeholder="Type the text here..."
              required
            />
            <div className="modal-group-button">
              <Button label="add" type="submit" />
              <Button
                label="cancel"
                onClick={() => handleIsOpenModal(false)}
                variant="secondary"
              />
            </div>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default App;
