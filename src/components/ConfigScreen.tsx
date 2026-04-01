import { useState } from "react";

interface ConfigScreenProps {
  onStart: (config: { coreType: string | null; tray: number; cores: number }) => void;
}

const presets: { name: string; tray: number; cores: number }[] = [
  { name: "Core type 1", tray: 1, cores: 6 },
  { name: "Core type 2", tray: 2, cores: 8 },
  { name: "Core type 3", tray: 3, cores: 10 },
];

const ConfigScreen = ({ onStart }: ConfigScreenProps) => {
  const [selectedCore, setSelectedCore] = useState<string | null>(null);
  const [tray, setTray] = useState("");
  const [cores, setCores] = useState("");

  const handleSelectPreset = (preset: (typeof presets)[number]) => {
    if (selectedCore === preset.name) {
      // 取消选择
      setSelectedCore(null);
      setTray("");
      setCores("");
    } else {
      setSelectedCore(preset.name);
      setTray(String(preset.tray));
      setCores(String(preset.cores));
    }
  };

  const trayNum = Number(tray);
  const coresNum = Number(cores);
  const canStart = tray.trim() !== "" && cores.trim() !== "" && trayNum > 0 && coresNum > 0;

  return (
    <div className="flex flex-col items-center">
      {/* Core type cards - optional presets */}
      <div className="flex gap-8 mb-16 flex-wrap justify-center">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => handleSelectPreset(preset)}
            className={`w-[220px] h-[220px] rounded-[27px] 
              flex flex-col items-center justify-center gap-3 
              cursor-pointer transition-all duration-200 ${
              selectedCore === preset.name
                ? "bg-[#08f]/15 ring-3 ring-[#08f] scale-105"
                : "bg-[#d9d9d9] hover:bg-[#ccc] hover:scale-[1.02]"
            }`}
          >
            <span className="text-[18px] text-black">{preset.name}</span>
            <span className="text-[13px] text-gray-500">
              Tray: {preset.tray} / Cores: {preset.cores}
            </span>
          </button>
        ))}
      </div>

      {/* Input fields */}
      <div className="flex flex-col gap-6 w-full max-w-[500px] mb-12">
        <div className="flex items-center gap-6">
          <label className="w-[80px] text-right text-[18px] text-black shrink-0">
            Tray
          </label>
          <input
            type="number"
            min="1"
            value={tray}
            onChange={(e) => {
              setTray(e.target.value);
              setSelectedCore(null);
            }}
            placeholder="Enter quantity"
            className="flex-1 h-[34px] bg-[#d9d9d9] rounded-[44px] px-5 outline-none focus:ring-2 focus:ring-[#08f] transition-all"
          />
        </div>
        <div className="flex items-center gap-6">
          <label className="w-[80px] text-right text-[18px] text-black shrink-0">
            Cores
          </label>
          <input
            type="number"
            min="1"
            value={cores}
            onChange={(e) => {
              setCores(e.target.value);
              setSelectedCore(null);
            }}
            placeholder="Enter quantity"
            className="flex-1 h-[34px] bg-[#d9d9d9] rounded-[44px] px-5 outline-none focus:ring-2 focus:ring-[#08f] transition-all"
          />
        </div>
      </div>

      {/* Start button */}
      <button
        onClick={() => {
          if (canStart) {
            onStart({ coreType: selectedCore, tray: trayNum, cores: coresNum });
          }
        }}
        disabled={!canStart}
        className={`h-[47px] w-[285px] rounded-[100px] text-white text-[18px] transition-all duration-200 cursor-pointer ${
          canStart
            ? "bg-[#08f] hover:bg-[#007ae6] active:scale-95"
            : "bg-[#08f]/40 cursor-not-allowed"
        }`}
      >
        Start
      </button>
    </div>
  );
}

export default ConfigScreen;