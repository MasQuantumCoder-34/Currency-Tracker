// App.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRates, fetchHistory } from "./features/currencySlice";
import CurrencySelector from "./components/CurrencySelector";
import CurrencyTable from "./components/CurrencyTable";
import CurrencyChart from "./components/CurrencyChart";

function App() {
  const dispatch = useDispatch();
  const base = useSelector((state) => state.currency.base);
  const [target, setTarget] = useState("INR");
  const [colorTheme, setColorTheme] = useState("blue");
  
  // Define color themes
  const themes = {
    blue: {
      primary: "#3b82f6",
      gradient: "from-blue-500 to-purple-600",
      chart: "#2563eb",
      bg: "bg-gradient-to-br from-blue-50 to-indigo-100"
    },
    green: {
      primary: "#10b981",
      gradient: "from-emerald-500 to-teal-600",
      chart: "#059669",
      bg: "bg-gradient-to-br from-emerald-50 to-cyan-100"
    },
    rose: {
      primary: "#f43f5e",
      gradient: "from-rose-500 to-pink-600",
      chart: "#e11d48",
      bg: "bg-gradient-to-br from-rose-50 to-pink-100"
    },
    amber: {
      primary: "#f59e0b",
      gradient: "from-amber-500 to-orange-600",
      chart: "#d97706",
      bg: "bg-gradient-to-br from-amber-50 to-orange-100"
    }
  };

  useEffect(() => {
    dispatch(fetchRates(base));
    dispatch(fetchHistory({ base, target }));
    
    // Rotate color theme every 30 seconds for dynamic effect
    const themeInterval = setInterval(() => {
      const themeKeys = Object.keys(themes);
      const currentIndex = themeKeys.indexOf(colorTheme);
      const nextIndex = (currentIndex + 1) % themeKeys.length;
      setColorTheme(themeKeys[nextIndex]);
    }, 30000);
    
    return () => clearInterval(themeInterval);
  }, [base, target, dispatch]);

  return (
    <div className={`min-h-screen p-6 ${themes[colorTheme].bg} transition-all duration-1000`}>
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 mb-2">
            Global Currency Tracker
          </h1>
          <p className="text-gray-600">Real-time exchange rates with beautiful analytics</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="glass-card p-6 rounded-2xl shadow-xl animate-float">
              <CurrencySelector colorTheme={colorTheme} themes={themes} />
              <CurrencyTable colorTheme={colorTheme} />
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="glass-card p-6 rounded-2xl shadow-xl animate-float" style={{animationDelay: '0.2s'}}>
              <h2 className="text-xl font-semibold mb-4">Theme Selector</h2>
              <div className="flex gap-3 flex-wrap">
                {Object.keys(themes).map(theme => (
                  <button
                    key={theme}
                    onClick={() => setColorTheme(theme)}
                    className={`p-2 rounded-full ${colorTheme === theme ? 'ring-2 ring-offset-2 ring-white' : ''}`}
                    style={{backgroundColor: themes[theme].primary}}
                    title={`Select ${theme} theme`}
                  >
                    <span className="sr-only">{theme}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-2xl shadow-xl animate-float" style={{animationDelay: '0.4s'}}>
              <label className="block text-lg font-semibold mb-3">Chart Currency:</label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className={`p-3 rounded-xl border-0 shadow-md w-full bg-white/80 focus:ring-2 focus:ring-offset-2 transition-all`}
                style={{focusRingColor: themes[colorTheme].primary}}
              >
                {["INR", "EUR", "GBP", "JPY", "AUD", "CAD"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <CurrencyChart target={target} colorTheme={colorTheme} themes={themes} />
      </div>
    </div>
  );
}

export default App;