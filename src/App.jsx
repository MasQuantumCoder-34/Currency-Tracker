import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRates, fetchHistory } from "./features/currencySlice";
import CurrencySelector from "./components/CurrencySelector";
import CurrencyTable from "./components/CurrencyTable";
import CurrencyChart from "./components/CurrencyChart";

function App() {
  const dispatch = useDispatch();
  const base = useSelector((state) => state.currency.base);
  const [target, setTarget] = useState("INR"); // default chart currency

  useEffect(() => {
    dispatch(fetchRates(base));
    dispatch(fetchHistory({ base, target }));
  }, [base, target, dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-100">
      <CurrencySelector />
      <CurrencyTable />
      
      <div className="mt-6 flex items-center gap-3">
        <label>Select Chart Currency:</label>
        <select
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="p-2 border rounded-md shadow"
        >
          {["INR", "EUR", "GBP", "JPY", "AUD", "CAD"].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <CurrencyChart target={target} />
    </div>
  );
}

export default App;
