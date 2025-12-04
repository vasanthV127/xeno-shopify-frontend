const TopCustomersTable = ({ customers }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Orders
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Spent
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-4 py-8 text-center text-gray-500">
                No customers found. Sync data to see customers.
              </td>
            </tr>
          ) : (
            customers.map((customer, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {customer.name || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">{customer.email}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {customer.ordersCount}
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-green-600">
                  ${customer.totalSpent.toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TopCustomersTable;
