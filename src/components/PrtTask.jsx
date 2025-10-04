import React from "react";
import Search from "./Search";

const PrtTask = ({ useTask, setTask, searchTerm, setSearchTerm }) => {
  /*-----------------------------------------------------------*
  | Função de remover o step alvo da lista da tarefa atual:    |
  *-----------------------------------------------------------*/

  const handleDeleteStep = (taskId, stepId) => {
    // Recebe de parâmetro o ID do step alvo dentro da task alvo
    const updatedTasks = useTask.map((task) => {
      // Cria uma lista de steps referente a Task recebida.
      if (task.id === taskId) {
        return {
          ...task,
          steps: task.steps.filter((step) => step.id !== stepId),
        };
        // Após conferir todos os steps da Task, ele vê qual possui o mesmo ID e remove da lista.
      }
      return task;
      // Caso ele não encontra nada, ele devolve como criou a lista de steps.
    });

    setTask(updatedTasks);
  };

  /*-----------------------------------------------------------*
  | Função de alterar o estado do passo da tarefa atual:       |
  *-----------------------------------------------------------*/

  const handleToggleState = (taskId, stepId) => {
    const updatedSteps = useTask.map((task) => {
      // Percorre todas as tarefas atuais
      if (task.id === taskId) {
        // Verifica se o ID da tarefa corresponde ao que queremos alterar
        return {
          ...task,
          steps: task.steps.map(
            (step) =>
              // Verifica se o ID do passo corresponde ao que queremos alterar
              step.id === stepId
                ? { ...step, state: !step.state }
                : // Inverte o estado do passo (true/false) com um operador ternário.
                  step
            // Caso contrário, retorna o passo sem alterações
          ),
        };
      }

      // Se a tarefa não for a que queremos, retorna sem alterações
      return task;
    });

    // Atualiza o estado com a nova lista de tarefas modificadas
    setTask(updatedSteps);
  };

  /*-----------------------------------------------------------*
  | Função para editar a descrição de um step específico:      |
  *-----------------------------------------------------------*/

  const handleEditStep = (taskId, stepId, newDescription) => {
    const updatedTasks = useTask.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          steps: task.steps.map((step) =>
            step.id === stepId
              ? {
                  ...step,
                  description: newDescription,
                  edite: false,
                  tempValue: undefined,
                  // Remove tempValue ao salvar.
                }
              : step
          ),
        };
      }
      return task;
    });

    setTask(updatedTasks);
  };

  /*-----------------------------------------------------------*
  | Função para alternar entre visualizar/editar o step:       |
  *-----------------------------------------------------------*/

  const handleToggleEditStep = (taskId, stepId) => {
    const updatedTasks = useTask.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          steps: task.steps.map((step) =>
            step.id === stepId ? { ...step, edite: !step.edite } : step
          ),
        };
      }
      return task;
    });

    setTask(updatedTasks);
  };

  const filteredTasks = useTask.filter(
    (itemTask) =>
      itemTask.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      itemTask.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      itemTask.steps.some((step) =>
        step.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  //--------------------------------------------------------//
  //--------------------------------------------------------//
  //--------------------------------------------------------//

  return (
    <section>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="checkScream">
        {filteredTasks.map((itemTask) => {
          // Cria o itemTask que responde a cada task dentro da lista.

          let classPriority;
          switch (itemTask.priority) {
            case "Low":
              classPriority = "Low";
              break;
            case "Medium":
              classPriority = "Medium";
              break;
            case "High":
              classPriority = "High";
              break;
            default:
              classPriority = "Low";
              break;
          }

          return (
            <div
              className={itemTask.state ? "taskTag complete" : "taskTag"}
              key={itemTask.id}
            >
              {/* Checa se esta task está completa ou não, se sim adciona a
              classe .complete. */}
              <div className={classPriority}></div>
              {/* Cria a barra de prioridade na lateral de toda tarefa */}
              <div>
                <section className="header">
                  <div>
                    <h3>{itemTask.title}</h3>
                  </div>

                  <div className="flex infos">
                    <div className={`${classPriority} info`}>
                      <i class="fa-solid fa-bullseye"></i>
                      <p>{itemTask.priority}</p>
                    </div>
                    <div className="info">
                      <i class="fa-regular fa-calendar"></i>
                      <p>{itemTask.data ? itemTask.data : "No deadline"}</p>
                    </div>
                  </div>
                </section>

                <section className="mainTask">
                  {/* Insere o Título da tarefa. */}
                  <span className="spnTitle">Description:</span>
                  <p className="description">{itemTask.description}</p>
                  {/* Insere a descrição da tarefa. */}
                </section>

                <section className=" footTask">
                  {/* Abaixo, se houver passos nesta tarefa, ele redenriza: */}
                  {itemTask.steps && itemTask.steps.length > 0 && (
                    <>
                      <span className="spnTitle">Steps:</span>
                      <ul>
                        {itemTask.steps.map((targetStep) => (
                          // Cria o itemTask que responde a cada task dentro da lista.

                          <li
                            key={targetStep.id}
                            className={targetStep.state ? "li-complete" : ""}
                            onClick={
                              targetStep.edite
                                ? undefined
                                : () =>
                                    handleToggleState(
                                      itemTask.id,
                                      targetStep.id
                                    )
                            }
                            //
                            onDoubleClick={() =>
                              handleToggleEditStep(itemTask.id, targetStep.id)
                            }
                            // Com o duplo clique, chama a função que muda o estado de edição para veirdadeiro, o que ativa a condição da linha "targetStep.edite ?" do código.
                          >
                            {/* Visualização ou edição condicional */}
                            {targetStep.edite ? (
                              <section>
                                <div className="modal">
                                  <div
                                    className="modal-content stepMenu"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <input
                                      type="text"
                                      value={
                                        targetStep.tempValue ??
                                        targetStep.description
                                        // Se 'tempValue' existir, usa ele (valor temporário que o usuário está digitando).
                                        // Caso contrário, exibe o valor atual salvo em 'description'.
                                      }
                                      onChange={(e) => {
                                        // Função chamada a cada alteração no campo de input.

                                        // Atualiza a lista de tarefas com o novo valor temporário do step em edição.
                                        const updatedTasks = useTask.map(
                                          (task) => {
                                            if (task.id === itemTask.id) {
                                              return {
                                                ...task,
                                                steps: task.steps.map((step) =>
                                                  step.id === targetStep.id
                                                    ? {
                                                        ...step,
                                                        tempValue:
                                                          e.target.value,
                                                      }
                                                    : // Se o step atual é o que está sendo editado, atualiza o tempValue com o que o usuário digitou.
                                                      step
                                                ),
                                              };
                                            }
                                            return task;
                                            // Mantém as outras tarefas inalteradas.
                                          }
                                        );

                                        setTask(updatedTasks);
                                        // Atualiza o estado global com a nova lista de tarefas (com o valor editado).
                                      }}
                                      autoFocus
                                      // Coloca o cursor dentro do input para garantir a edição.
                                    />
                                    <button
                                      className="savBtn"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditStep(
                                          itemTask.id,
                                          targetStep.id,
                                          targetStep.tempValue ??
                                            targetStep.description
                                        );
                                      }}
                                    >
                                      Save
                                    </button>
                                    {/* Salva as edições feitas no input. */}
                                  </div>
                                </div>
                              </section>
                            ) : (
                              <>
                                {/* Botão de deletar */}
                                <button
                                  className="delStep"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteStep(
                                      itemTask.id,
                                      targetStep.id
                                    );
                                    // Envia o id da tarefa e do passo alvo.
                                  }}
                                >
                                  X
                                </button>
                                <span>{targetStep.description}</span>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <section className="boxBtn">
                    <button
                      onClick={() => {
                        const updatedTasks = useTask.map(
                          (task) =>
                            task.id === itemTask.id
                              ? { ...task, state: !task.state }
                              : task
                          // Copia todas as propriedades deste objeto mas inverte o valor booleano do .state.
                        );
                        setTask(updatedTasks);
                      }}
                    >
                      {itemTask.state ? "Start" : "Finish"}
                    </button>
                    {/* Imprime Start ou Finish dependente do estado da tarefa. */}
                    <button
                      onClick={() => {
                        const updatedTasks = useTask.filter(
                          (task) => task.id !== itemTask.id
                        );
                        setTask(updatedTasks);
                      }}
                    >
                      Trash
                    </button>
                    {/* Deleta a tarefa alvo. */}
                  </section>
                </section>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PrtTask;
