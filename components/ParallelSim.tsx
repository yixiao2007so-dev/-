import React, { useState } from 'react';
import { Battery, Bulb, Switch, ElectronPath } from './CircuitParts';
import { PARALLEL_INFO } from '../constants';

const ParallelSim: React.FC = () => {
  const [mainSwitchOpen, setMainSwitchOpen] = useState(false);
  const [branch1SwitchOpen, setBranch1SwitchOpen] = useState(false);
  const [branch2SwitchOpen, setBranch2SwitchOpen] = useState(false);

  // Simulation State
  const [voltage, setVoltage] = useState(3);
  const [r1, setR1] = useState(10);
  const [r2, setR2] = useState(10);

  // Determine if branches have connectivity
  const isBranch1Closed = !mainSwitchOpen && !branch1SwitchOpen;
  const isBranch2Closed = !mainSwitchOpen && !branch2SwitchOpen;

  // --- Physics Calculations ---
  // In parallel, Voltage across each branch is equal to Source Voltage (ideal wires)
  const u1 = isBranch1Closed ? voltage : 0;
  const u2 = isBranch2Closed ? voltage : 0;

  // Current (I = U / R)
  const i1 = isBranch1Closed ? voltage / r1 : 0;
  const i2 = isBranch2Closed ? voltage / r2 : 0;
  const iTotal = i1 + i2;

  // Power (Brightness) P = U^2 / R
  const p1 = isBranch1Closed ? (voltage * voltage) / r1 : 0;
  const p2 = isBranch2Closed ? (voltage * voltage) / r2 : 0;

  // Normalized brightness (adjust divisor to calibrate visual sensitivity)
  const brightness1 = p1 / 2;
  const brightness2 = p2 / 2;

  const isMainCurrentFlowing = iTotal > 0;

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
      <div className="flex-1 bg-white p-4 rounded-2xl shadow-lg border-2 border-purple-100">
        <h3 className="text-xl font-bold text-center mb-4 text-purple-800">实验台</h3>
        <div className="relative w-full aspect-video bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
          <svg viewBox="0 0 400 250" className="w-full h-full select-none">
            {/* Main Loop Wire */}
            <path d="M 170 220 L 50 220 L 50 125" stroke={isMainCurrentFlowing ? "#FDE047" : "black"} strokeWidth={isMainCurrentFlowing ? 5 : 3} />
            <path d="M 230 220 L 350 220 L 350 125" stroke={isMainCurrentFlowing ? "#FDE047" : "black"} strokeWidth={isMainCurrentFlowing ? 5 : 3} />
             {isMainCurrentFlowing && (
                <>
                 <path d="M 170 220 L 50 220 L 50 125" stroke="#EAB308" strokeWidth="3" strokeDasharray="10,10" className="current-flow" style={{ animationDuration: `${Math.max(0.2, 2/iTotal)}s` }} />
                 <path d="M 230 220 L 350 220 L 350 125" stroke="#EAB308" strokeWidth="3" strokeDasharray="10,10" className="current-flow" style={{ animationDuration: `${Math.max(0.2, 2/iTotal)}s` }} />
                </>
             )}

            {/* Branch 1 (Top) */}
            <ElectronPath d="M 50 50 L 350 50" current={i1} />
            <path d="M 50 125 L 50 50" stroke={isMainCurrentFlowing ? "#FDE047" : "black"} strokeWidth={isMainCurrentFlowing ? 5 : 3} />
            <path d="M 350 125 L 350 50" stroke={isMainCurrentFlowing ? "#FDE047" : "black"} strokeWidth={isMainCurrentFlowing ? 5 : 3} />

            {/* Branch 2 (Middle) */}
            <ElectronPath d="M 50 125 L 350 125" current={i2} />

            {/* Battery */}
            <Battery x={200} y={220} voltage={voltage} />
            
            {/* Main Switch */}
            <Switch x={100} y={220} isOpen={mainSwitchOpen} onClick={() => setMainSwitchOpen(!mainSwitchOpen)} label="干路开关" />

            {/* Branch 1 Components */}
            <Switch x={120} y={50} isOpen={branch1SwitchOpen} onClick={() => setBranch1SwitchOpen(!branch1SwitchOpen)} label="支路 S1" />
            <Bulb x={250} y={50} brightness={brightness1} label="L1" resistance={r1} />

            {/* Branch 2 Components */}
            <Switch x={120} y={125} isOpen={branch2SwitchOpen} onClick={() => setBranch2SwitchOpen(!branch2SwitchOpen)} label="支路 S2" />
            <Bulb x={250} y={125} brightness={brightness2} label="L2" resistance={r2} />
          </svg>
        </div>

        {/* Physics Dashboard */}
        <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
           <div className="bg-purple-50 p-2 rounded border border-purple-100">
             <div className="text-gray-500">干路总电流</div>
             <div className="font-mono font-bold text-purple-700">{iTotal.toFixed(2)} A</div>
           </div>
           <div className="bg-indigo-50 p-2 rounded border border-indigo-100">
             <div className="text-gray-500">L1 电流</div>
             <div className="font-mono font-bold text-indigo-700">{i1.toFixed(2)} A</div>
           </div>
           <div className="bg-indigo-50 p-2 rounded border border-indigo-100">
             <div className="text-gray-500">L2 电流</div>
             <div className="font-mono font-bold text-indigo-700">{i2.toFixed(2)} A</div>
           </div>
        </div>

        {/* Control Panel */}
        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
           <h4 className="font-bold text-gray-700 border-b pb-2">🎛️ 实验控制面板</h4>
           
           {/* Voltage */}
           <div className="space-y-1">
             <div className="flex justify-between text-sm">
               <label className="font-bold text-gray-700">电池电压 (U)</label>
               <span className="text-purple-600 font-mono">{voltage} V</span>
             </div>
             <input 
               type="range" min="1" max="12" step="1" 
               value={voltage} onChange={(e) => setVoltage(Number(e.target.value))}
               className="w-full accent-purple-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
             />
           </div>

           <div className="grid grid-cols-2 gap-4">
             {/* R1 */}
             <div className="space-y-1">
               <div className="flex justify-between text-sm">
                 <label className="font-bold text-gray-700">L1 电阻</label>
                 <span className="text-indigo-600 font-mono">{r1} Ω</span>
               </div>
               <input 
                 type="range" min="1" max="20" step="1" 
                 value={r1} onChange={(e) => setR1(Number(e.target.value))}
                 className="w-full accent-indigo-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
               />
             </div>
             
             {/* R2 */}
             <div className="space-y-1">
               <div className="flex justify-between text-sm">
                 <label className="font-bold text-gray-700">L2 电阻</label>
                 <span className="text-indigo-600 font-mono">{r2} Ω</span>
               </div>
               <input 
                 type="range" min="1" max="20" step="1" 
                 value={r2} onChange={(e) => setR2(Number(e.target.value))}
                 className="w-full accent-indigo-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
               />
             </div>
           </div>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-100 shadow-sm">
          <h2 className="text-2xl font-bold text-indigo-600 mb-2">{PARALLEL_INFO.title}</h2>
          <p className="text-gray-700 mb-4">{PARALLEL_INFO.description}</p>
          
          <div className="bg-white p-4 rounded-lg border border-indigo-200 mb-4">
            <h4 className="font-bold text-indigo-500 mb-2">💡 观察小贴士</h4>
             <ul className="text-sm text-gray-600 space-y-2">
              <li>👉 <b>最重要的发现：</b> 改变 L1 的电阻，L2 的亮度完全<b>不会变</b>！(互不干扰)</li>
              <li>👉 哪条路电阻小 (路宽)，哪条路的电流就大 (跑的车多)。</li>
              <li>👉 减小电阻，总电流会变大，电池会感觉“压力山大”哦！</li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-serif">I=I+I</div>
          <h3 className="text-lg font-bold mb-3 text-cyan-400">📝 即时计算公式</h3>
          <div className="font-mono text-sm space-y-2 bg-slate-900 p-3 rounded border border-slate-600">
             <div className="flex justify-between">
               <span>电压 U:</span>
               <span>{voltage} V (各支路相同)</span>
             </div>
             <div className="flex justify-between text-cyan-300">
               <span>L1 电流 I1 = U/R1:</span>
               <span>{voltage} ÷ {r1} = {i1.toFixed(2)} A</span>
             </div>
             <div className="flex justify-between text-cyan-300">
               <span>L2 电流 I2 = U/R2:</span>
               <span>{voltage} ÷ {r2} = {i2.toFixed(2)} A</span>
             </div>
             <div className="border-t border-slate-600 pt-1 mt-1 flex justify-between font-bold">
                <span>总电流 I_total:</span>
                <span>{iTotal.toFixed(2)} A</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallelSim;