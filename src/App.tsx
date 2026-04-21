import { useState } from "react";
import StartupScreen from "./components/StartupScreen";
import ConfigScreen from "./components/ConfigScreen.tsx";
import ButtonPanelScreen from "./components/ButtonPanelScreen.tsx";
import ProgressScreen from "./components/ProgressScreen.tsx";
import CustomButton from "./components/custom-button.tsx";

interface Config {
  coreType: string | null;
  tray: number;
  cores: number;
}

const toggleStateLabels = new Map();
toggleStateLabels.set(0, "Starting up ..."); 
toggleStateLabels.set(1, "Switch to buttons panel",);
toggleStateLabels.set(2, "Switch to program config panel");
toggleStateLabels.set(9, "Processing ...");


const App = () => {
  // 0 starting up, 1 config, 2 buttons panel, 9 processing
  const [screen, setScreen] = useState<Number>(0); // <"startup" | "config" | "progress">("startup");
  const [config, setConfig] = useState<Config | null>(null);
  
  const handleTogglePanel = () => {
    switch (screen) {
      case 1: 
        setScreen(2); return;
      case 2: 
        setScreen(1); return;
      default: return;
    }
  };

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


  // 8*toggleStateLabels.get(screen).length}

  return (
    <div className="size-full flex flex-col items-center justify-center px-8 gap-4">
      <hr/>
      {CustomButton({onClick:handleTogglePanel, label:toggleStateLabels.get(screen), className:`w-[240px]`})} 
      <div>
        {screen === 0 && <StartupScreen onClick={handleInit} />}
        {screen === 1 && <ConfigScreen onStart={handleStart} />}
        {screen === 2 && <ButtonPanelScreen /> }
        {screen === 9 && config && (
          <ProgressScreen config={config} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}

export default App;