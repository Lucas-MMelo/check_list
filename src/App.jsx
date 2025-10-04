import { useState } from "react";
import "./App.css";

import AddTask from "./components/AddTask";
import PrtTask from "./components/PrtTask";
import Search from "./components/Search";

function App() {
  const [useTask, setTask] = useState([
    {
      id: 1,
      title: "🚀 Aprender React",
      description: "Explorar hooks, componentização e estados.",
      priority: "High",
      data: "2025-10-01",
      state: false,
      steps: [
        {
          id: 1,
          description: "Ler a documentação oficial",
          state: false,
          edite: false,
        },
        {
          id: 2,
          description: "Fazer um mini projeto com useState",
          state: true,
          edite: false,
        },
      ],
    },
    {
      id: 2,
      title: "🧼 Organizar portfólio",
      description:
        "Revisar projetos antigos e atualizar README. Melorar as lógicas e passa-los para frameworks mais modernos.",
      priority: "Medium",
      data: "",
      state: false,
      steps: [
        {
          id: 1,
          description:
            "Melhorar apresentação do projeto DnD e passa-lo para React.js",
          state: false,
          edite: false,
        },
        {
          id: 2,
          description:
            "Passar o projeto de cartão de crédito para React.js também!",
          state: false,
          edite: false,
        },
      ],
    },
    {
      id: 3,
      title: "📬 Enviar currículo",
      description: "Atualizar currículo e mandar para as empresas",
      priority: "Low",
      data: "2025-10-02",
      state: false,
      steps: [],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <main className="conteiner">
        <header>
          <h1>Task Lists</h1>
          <p className="obs">Project by Lucas de Moura Melo.</p>
          <AddTask setTask={setTask} />
          {/* Componente responsável por adcionar uma nova tarefa ao useTask. */}
        </header>
        <section>
          <PrtTask
            useTask={useTask}
            setTask={setTask}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          {/* Componente responsável por imprimir as tarefas na tela. */}
        </section>
      </main>
    </div>
  );
}

export default App;
