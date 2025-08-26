import { useSelector } from "react-redux";

export default function CurrencyTable() {
  const { rates, base, status } = useSelector((state) => state.currency);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error loading data</p>;
  if (!rates || Object.keys(rates).length === 0) return <p>No data available</p>;

  return (
    <div className="p-4 border rounded-xl shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-3">Currency Rates (Base: {base})</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Currency</th>
            <th className="border p-2">Rate</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rates).map(([currency, rate]) => (
            <tr key={currency}>
              <td className="border p-2">{currency}</td>
              <td className="border p-2">{rate.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
