import React from "react";
import Playground from "./components/Playground";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>TypeScript + React Playground</h1>
      <Playground />
    </div>
  );
};

export default App;
