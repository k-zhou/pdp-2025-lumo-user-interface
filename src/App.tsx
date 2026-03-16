import { useState } from "react";
import StartupScreen from "./components/StartupScreen";
import ConfigScreen from "./components/ConfigScreen.tsx";
import ProgressScreen from "./components/ProgressScreen.tsx";

interface Config {
  coreType: string | null;
  tray: number;
  cores: number;
}

const App = () => {
  const [screen, setScreen] = useState<"startup" | "config" | "progress">("startup");
  const [config, setConfig] = useState<Config | null>(null);

  const handleInit = () => {
    setConfig(null);
    setScreen("config");
  };

  const handleStart = (cfg: Config) => {
    setConfig(cfg);
    setScreen("progress");
  };

  const handleReset = () => {
    setConfig(null);
    setScreen("config");
  };

  return (
    <div className="size-full flex items-center justify-center px-8">
      {screen === "startup" && <StartupScreen onClick={handleInit} />}
      {screen === "config" && <ConfigScreen onStart={handleStart} />}
      {screen === "progress" && config && (
        <ProgressScreen config={config} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;