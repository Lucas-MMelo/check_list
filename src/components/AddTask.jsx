import { useState } from "react";
import FormTask from "./FormTask";

const AddTask = ({ setTask }) => {
  const [useModal, setModal] = useState(false);
  // Controla se o formulário está visível (true) ou escondido (false)

  return (
    <div className="flex">
      <button className="newTask" onClick={() => setModal(!useModal)}>
        Add new task
      </button>
      {/* Controla o estado da janela do FormTask. */}
      {useModal && <FormTask setTask={setTask} setModal={setModal} />}
      {/* Envia o setTask para alterar a lista de Tasks e o setModal para controlar se o FormTask deve aparecer ou não na tela. */}
    </div>
  );
};

export default AddTask;
