import React from "react";
import RfidTable from "./components/RfidTable";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <RfidTable />
    </div>
  );
};

export default App;
