import { useDispatch, useSelector } from "react-redux";
import { setBase, fetchRates } from "../features/currencySlice";

const currencies = [
  "USD", "EUR", "INR", "JPY", "GBP", "AUD", "CAD", "CNY", "SGD", "NZD"
]; // you can expand this list as needed

export default function CurrencySelector() {
  const dispatch = useDispatch();
  const base = useSelector((state) => state.currency.base);

  const handleChange = (e) => {
    const newBase = e.target.value;
    dispatch(setBase(newBase));
    dispatch(fetchRates(newBase));
  };

  return (
    <div className="mb-4">
      <label className="mr-2 font-semibold">Select Base Currency: </label>
      <select
        value={base}
        onChange={handleChange}
        className="p-2 border rounded-md"
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
