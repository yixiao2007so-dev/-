import React, { useState } from 'react';
import { Battery, Bulb, Switch, ElectronPath } from './CircuitParts';
import { SERIES_INFO } from '../constants';

const SeriesSim: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Simulation State
  const [voltage, setVoltage] = useState(3); // Volts
  const [r1, setR1] = useState(5); // Ohms
  const [r2, setR2] = useState(5); // Ohms

  const toggleSwitch = () => setIsOpen(!isOpen);

  // --- Physics Calculations ---
  // Total Resistance
  const rTotal = r1 + r2;
  // Total Current (I = U / R)
  const current = isOpen ? 0 : voltage / rTotal;
  
  // Voltage drop across bulbs (U = I * R)
  const u1 = current * r1;
  const u2 = current * r2;

  // Power (Brightness factor) P = I * I * R
  // We normalize power for visualization. Let's say 5 Watts is "full brightness" (1.0)
  const p1 = current * current * r1;
  const p2 = current * current * r2;
  
  const brightness1 = p1 / 2; 
  const brightness2 = p2 / 2;

  // Path definition
  const wirePath = "M 80 150 L 80 50 L 320 50 L 320 150";

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
      <div className="flex-1 bg-white p-4 rounded-2xl shadow-lg border-2 border-blue-100">
        <h3 className="text-xl font-bold text-center mb-4 text-blue-800">实验台</h3>
        
        {/* SVG Visualization */}
        <div className="relative w-full aspect-video bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
          <svg viewBox="0 0 400 200" className="w-full h-full select-none">
            {/* Wires */}
            <ElectronPath d={wirePath} current={current} />
            
            {/* Connection lines to battery */}
            <path d="M 80 150 L 170 150" stroke={current > 0 ? "#FDE047" : "black"} strokeWidth={current > 0 ? 5 : 3} />
            <path d="M 230 150 L 320 150" stroke={current > 0 ? "#FDE047" : "black"} strokeWidth={current > 0 ? 5 : 3} />
            
            {/* Components */}
            <Battery x={200} y={150} voltage={voltage} />
            <Switch x={200} y={50} isOpen={isOpen} onClick={toggleSwitch} label="总开关" />
            
            <Bulb x={120} y={100} brightness={brightness1} label="灯泡 L1" resistance={r1} />
            <Bulb x={280} y={100} brightness={brightness2} label="灯泡 L2" resistance={r2} />
          </svg>
        </div>

        {/* Physics Dashboard */}
        <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
           <div className="bg-blue-50 p-2 rounded border border-blue-100">
             <div className="text-gray-500">总电流 (I)</div>
             <div className="font-mono font-bold text-blue-700">{current.toFixed(2)} A</div>
           </div>
           <div className="bg-yellow-50 p-2 rounded border border-yellow-100">
             <div className="text-gray-500">L1 电压</div>
             <div className="font-mono font-bold text-yellow-700">{u1.toFixed(1)} V</div>
           </div>
           <div className="bg-yellow-50 p-2 rounded border border-yellow-100">
             <div className="text-gray-500">L2 电压</div>
             <div className="font-mono font-bold text-yellow-700">{u2.toFixed(1)} V</div>
           </div>
        </div>

        {/* Control Panel */}
        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
          <h4 className="font-bold text-gray-700 border-b pb-2">🎛️ 实验控制面板</h4>
          
          {/* Voltage Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <label className="font-bold text-gray-700">电池电压 (U)</label>
              <span className="text-blue-600 font-mono">{voltage} V</span>
            </div>
            <input 
              type="range" min="1" max="12" step="1" 
              value={voltage} onChange={(e) => setVoltage(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* R1 Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <label className="font-bold text-gray-700">L1 电阻</label>
                <span className="text-amber-600 font-mono">{r1} Ω</span>
              </div>
              <input 
                type="range" min="1" max="20" step="1" 
                value={r1} onChange={(e) => setR1(Number(e.target.value))}
                className="w-full accent-amber-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            {/* R2 Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <label className="font-bold text-gray-700">L2 电阻</label>
                <span className="text-amber-600 font-mono">{r2} Ω</span>
              </div>
              <input 
                type="range" min="1" max="20" step="1" 
                value={r2} onChange={(e) => setR2(Number(e.target.value))}
                className="w-full accent-amber-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {/* Explanation Card */}
        <div className="bg-orange-50 p-6 rounded-2xl border-2 border-orange-100 shadow-sm">
          <h2 className="text-2xl font-bold text-orange-600 mb-2">{SERIES_INFO.title}</h2>
          <p className="text-gray-700 mb-4">{SERIES_INFO.description}</p>
          
          <div className="bg-white p-4 rounded-lg border border-orange-200 mb-4">
            <h4 className="font-bold text-orange-500 mb-2">💡 观察小贴士</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>👉 试着<b>增加电阻</b>，看看灯泡是不是变暗了？(因为电流变小了)</li>
              <li>👉 试着<b>增加电压</b>，灯泡会变得超级亮！</li>
              <li>👉 串联电路中，电阻越大的灯泡分到的电压越多 (U=IR)，所以它会更亮一些。</li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-serif">Rx</div>
          <h3 className="text-lg font-bold mb-3 text-green-400">📝 即时计算公式</h3>
          <div className="font-mono text-sm space-y-2 bg-slate-900 p-3 rounded border border-slate-600">
             <div className="flex justify-between">
               <span>总电阻 R_total:</span>
               <span>{r1} + {r2} = {rTotal} Ω</span>
             </div>
             <div className="flex justify-between text-yellow-300">
               <span>总电流 I = U/R:</span>
               <span>{voltage} ÷ {rTotal} ≈ {current.toFixed(2)} A</span>
             </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {SERIES_INFO.formula}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeriesSim;