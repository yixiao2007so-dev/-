import React, { useState } from 'react';
import { CircuitType } from './types';
import { APP_TITLE } from './constants';
import SeriesSim from './components/SeriesSim';
import ParallelSim from './components/ParallelSim';
import AITutor from './components/AITutor';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CircuitType>(CircuitType.SERIES);
  const [showAI, setShowAI] = useState(false);

  return (
    <div className="min-h-screen bg-sky-50 text-gray-800 pb-12">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-sky-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">⚡</span>
            <h1 className="text-xl md:text-2xl font-black text-blue-600 tracking-tight">{APP_TITLE}</h1>
          </div>
          <button 
            onClick={() => setShowAI(!showAI)}
            className="bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded-full font-bold shadow transition-transform transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>{showAI ? "关闭助教" : "召唤助教喵"}</span>
            <span className="text-xl">🐱</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 inline-flex">
            <button
              onClick={() => { setActiveTab(CircuitType.SERIES); setShowAI(false); }}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === CircuitType.SERIES && !showAI
                  ? 'bg-blue-500 text-white shadow'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              串联电路
            </button>
            <button
              onClick={() => { setActiveTab(CircuitType.PARALLEL); setShowAI(false); }}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === CircuitType.PARALLEL && !showAI
                  ? 'bg-purple-500 text-white shadow'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              并联电路
            </button>
          </div>
        </div>

        {/* Content Area */}
        {showAI ? (
          <div className="animate-fade-in-up">
            <AITutor />
          </div>
        ) : (
          <div className="min-h-[500px]">
            {activeTab === CircuitType.SERIES ? <SeriesSim /> : <ParallelSim />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm mt-12">
        <p>© 2024 趣味物理 - 让科学变得简单有趣</p>
      </footer>
    </div>
  );
};

export default App;
