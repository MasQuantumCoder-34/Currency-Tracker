// CurrencyChart.jsx
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export default function CurrencyChart({ target, colorTheme, themes }) {
  const history = useSelector((state) => state.currency.history);

  if (!history) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 mt-6 glass-card rounded-2xl shadow-xl text-center"
    >
      <p className="text-gray-600">No chart data yet. Select a currency to view trends.</p>
    </motion.div>
  );

  const data = Object.entries(history).map(([date, value]) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    rate: Object.values(value)[0],
    fullDate: date
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-tooltip p-3 rounded-lg shadow-lg border">
          <p className="font-semibold">{label}</p>
          <p className="text-lg" style={{ color: themes[colorTheme].chart }}>
            {payload[0].value.toFixed(4)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-6 glass-card rounded-2xl shadow-xl w-full"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">7-Day Trend ({target})</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="rate" 
            stroke={themes[colorTheme].chart} 
            strokeWidth={3} 
            dot={{ r: 4, fill: themes[colorTheme].chart }} 
            activeDot={{ r: 6, fill: themes[colorTheme].chart }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}