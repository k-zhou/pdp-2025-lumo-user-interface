import { useState } from "react";
import StartupScreen from "./components/StartupScreen";
import ConfigScreen from "./components/ConfigScreen.tsx";
import ProgressScreen from "./components/ProgressScreen.tsx";
import CustomButton from "./components/custom-button.tsx";

interface Config {
  coreType: string | null;
  tray: number;
  cores: number;
}

const App = () => {
  // 0 starting up, 1 config, 2 buttons panel, 9 processing
  const [screen, setScreen] = useState<Number>(0); // <"startup" | "config" | "progress">("startup");
  const [config, setConfig] = useState<Config | null>(null);

  const handleInit = () => {
    setConfig(null);
    setScreen(1);
  };

  const handleStart = (cfg: Config) => {
    setConfig(cfg);
    setScreen(9);
  };

  const handleReset = () => {
    setConfig(null);
    setScreen(1);
  };

  return (
    <div className="size-full flex items-center justify-center px-8">
      {screen === 0 && <StartupScreen onClick={handleInit} />}
      {screen === 1 && <ConfigScreen onStart={handleStart} />}
      {screen === 9 && config && (
        <ProgressScreen config={config} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;