// CurrencySelector.jsx
import { useDispatch, useSelector } from "react-redux";
import { setBase, fetchRates } from "../features/currencySlice";

const currencies = [
  "USD", "EUR", "INR", "JPY", "GBP", "AUD", "CAD", "CNY", "SGD", "NZD"
];

export default function CurrencySelector({ colorTheme, themes }) {
  const dispatch = useDispatch();
  const base = useSelector((state) => state.currency.base);

  const handleChange = (e) => {
    const newBase = e.target.value;
    dispatch(setBase(newBase));
    dispatch(fetchRates(newBase));
  };

return (
  <div className="mb-6">
    <label className="block text-lg font-semibold mb-3">Base Currency:</label>
    <select
      value={base}
      onChange={handleChange}
      className={`p-3 rounded-xl border-0 shadow-md w-full bg-white/80 focus:ring-2 focus:ring-offset-2 focus:outline-none transition-all`}
      style={{ focusRingColor: themes[colorTheme].primary }}
    >
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  </div>
);
}