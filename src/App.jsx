import { useState } from "react";
import "./App.css";

import AddTask from "./components/AddTask";
import PrtTask from "./components/PrtTask";

function App() {
  const [useTask, setTask] = useState([]);

  return (
    <div className="conteiner">
      <h1>Task Lists</h1>
      <p className="obs">Project by Lucas de Moura Melo.</p>
      <AddTask setTask={setTask} />
      {/* Componente responsável por adcionar uma nova tarefa ao useTask. */}
      <PrtTask useTask={useTask} setTask={setTask} />
      {/* Componente responsável por imprimir as tarefas na tela. */}
    </div>
  );
}

export default App;
