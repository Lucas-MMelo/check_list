import React, { useState } from "react";

const AddTask = ({ setTask, setModal }) => {
  // States para a task:
  const [useTitle, setTitle] = useState("");
  const [useDescription, setDescription] = useState("");
  const [usePriority, setPriority] = useState("Low");
  const [useData, setData] = useState("");

  // States para os steps:
  const [useStepDescription, setStepDescription] = useState("");
  const [useStep, setStep] = useState([]);

  /*---------------------------------------------------------*
  | Função de Adcionar uma nova tarefa a lista de tarefas:   |
  *---------------------------------------------------------*/

  const handleSubmit = (e) => {
    e.preventDefault();
    // preventDefault() impede o padrão normal de fechar a janela.
    const newTask = {
      id: Date.now(),
      title: useTitle,
      description: useDescription,
      priority: usePriority,
      data: useData,
      steps: useStep,
      state: false,
    };

    setTask((prev) => [...prev, newTask]);
    // Adciona a newTask a lista prévia de steps.

    setTitle("");
    setDescription("");
    setPriority("Low");
    setData("");
    setStepDescription("");

    setModal(false);
    // Aqui eu retorno falso, para que o addTask esconda o FormTask.
  };

  /*-----------------------------------------------------------*
  | Função de Adicionar um novo step a lista da tarefa atual:  |
  *-----------------------------------------------------------*/

  const handleAddStep = (e) => {
    e.preventDefault();
    // preventDefault() impede o padrão normal de fechar a janela.
    if (useStepDescription.trim() === "") return;
    // Checa se existe uma string, caso não, retorna.

    const newStep = {
      id: Date.now(),
      description: useStepDescription.trim(),
      state: false,
      edite: false,
    };

    setStep((prev) => [...prev, newStep]);
    // Adciona o newStep a lista prévia de steps.
    setStepDescription("");
    // Limpa o cache de setStepDescription().
  };

  /*-----------------------------------------------------------*
  | Função de remover o step alvo da lista da tarefa atual:    |
  *-----------------------------------------------------------*/

  const handleDeleteStep = (id) => {
    setStep((prevStep) => prevStep.filter((step) => step.id !== id));
    //setStep pois ele que atualiza os steps, prevStep para ver todos os steps dentro desta lista; prevStep.filter((step)) usa step para ver entre todos os steps da lista, qual deve ser removido da lista.
  };

  //--------------------------------------------------------//
  //--------------------------------------------------------//
  //--------------------------------------------------------//

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>New Task</h2>
        <form onSubmit={handleSubmit}>
          {/* Usamos onSubmit pois ele é ativado ao enviar todas as informações */}
          <span>Title:</span>
          <input
            type="text"
            name="title"
            placeholder="Type the title..."
            value={useTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* e.target.value é o valor do input atualizado em tempo real pelo o onChange, que neste é {useTitle}. */}
          <span>Description:</span>
          <input
            type="text"
            name="description"
            placeholder="Type the description of that task..."
            value={useDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* e.target.value é o valor do input atualizado em tempo real pelo o onChange, que neste é {useDescription}. */}
          <span>Priority:</span>
          <select
            name="priority"
            value={usePriority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {/* e.target.value é o valor do select atualizado em tempo real pelo o onChange, que neste é {usePriority}. */}
          <span>Data:</span>
          <input
            type="text"
            name="data"
            placeholder="Type the delivery data ()..."
            value={useData}
            onChange={(e) => setData(e.target.value)}
          />
          {/* e.target.value é o valor do input atualizado em tempo real pelo o onChange, que neste é {useData}. */}
          <span>Steps:</span>
          <div className="flex">
            <input
              className="inputStep"
              type="text"
              name="steps"
              placeholder="Type the description of that step..."
              value={useStepDescription}
              onChange={(e) => setStepDescription(e.target.value)}
            />
            {/* e.target.value é o valor do input atualizado em tempo real pelo o onChange, que neste é {useStepDescription}. */}
            <button className="addStep" type="button" onClick={handleAddStep}>
              add
            </button>
            {/* Apesar da função handleAddStep ter na sua declaração um parâmetro, ela não é enviada aqui, pois o react entende que o e será enviado automaticamente */}
          </div>

          <ul>
            {useStep.map((step) => (
              <li key={step.id}>
                {" "}
                <button
                  className="delStep"
                  onClick={() => handleDeleteStep(step.id)}
                >
                  X
                </button>
                {step.description}
              </li>
            ))}
          </ul>

          <button className="save" type="submit">
            save
          </button>
          {/* Ao colocar este botão com type="submit", ao clicar nele, o formulário que é onSubmit, tem sua função chamada.*/}
        </form>
      </div>
    </div>
  );
};

export default AddTask;

/*-----------------------------------------------------------*
| Anotações:                                                 |
*-----------------------------------------------------------*/

// onChange={(e) => ...}    -> Captura o texto digitado em tempo real e atualiza o state
// e.target.value           -> É o valor que o usuário digitou no input
// onClick={handleAddStep}  -> O React já envia o event automaticamente para a função
// onSubmit={handleSubmit}  -> Controla o envio do formulário completo, ideal para salvar tudo junto
