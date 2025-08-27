import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function CurrencyTable({ colorTheme }) {
  const { rates, base, status } = useSelector((state) => state.currency);

  if (status === "loading") return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor: colorTheme.primary}}></div>
    </div>
  );
  
  if (status === "failed") return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 text-center text-red-500 bg-red-50 rounded-xl"
    >
      Error loading data. Please try again.
    </motion.div>
  );
  
  if (!rates || Object.keys(rates).length === 0) return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 text-center text-gray-500"
    >
      No data available
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <h2 className="text-xl font-bold mb-4">Exchange Rates (Base: {base})</h2>
      
      {/* Table container with fixed header */}
      <div className="overflow-hidden rounded-xl shadow-inner bg-white">
        <div className="max-h-80 overflow-y-auto">
          {/* Fixed header table */}
          <table className="w-full">
            <thead>
              <tr className="bg-black/5 sticky top-0 z-10">
                <th className="p-3 text-left font-semibold bg-gray-100">Currency</th>
                <th className="p-3 text-right font-semibold bg-gray-100">Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(rates).map(([currency, rate], index) => (
                <motion.tr 
                  key={currency}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-gray-100 even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <td className="p-3 font-medium">{currency}</td>
                  <td className="p-3 text-right">{rate.toFixed(4)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Table information footer */}
      <div className="mt-2 text-sm text-gray-500 text-center">
        Showing {Object.keys(rates).length} currencies
      </div>
    </motion.div>
  );
}