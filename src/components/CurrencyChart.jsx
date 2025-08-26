import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function CurrencyChart({ target }) {
  const history = useSelector((state) => state.currency.history);

  if (!history) return <p className="text-gray-600">No chart data yet</p>;

  const data = Object.entries(history).map(([date, value]) => ({
    date,
    rate: Object.values(value)[0], // since API returns { "date": { "INR": value } }
  }));

  return (
    <div className="p-6 mt-6 border rounded-2xl shadow-xl bg-white w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-4 text-center">7-Day Trend ({target})</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="rate" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
