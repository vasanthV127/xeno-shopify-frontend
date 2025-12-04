const TopCustomersTable = ({ customers }) => {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="table-dark">
        <thead>
          <tr>
            <th className="rounded-tl-lg">Customer</th>
            <th>Orders</th>
            <th className="rounded-tr-lg">Total Spent</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-4 py-12 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="text-gray-500 text-4xl">📊</div>
                  <p className="text-gray-400">No customers found</p>
                  <p className="text-sm text-gray-500">Sync data to see top customers</p>
                </div>
              </td>
            </tr>
          ) : (
            customers.map((customer, index) => (
              <tr key={index} className="group">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-semibold">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-100 group-hover:text-primary transition-colors">
                        {customer.name || 'N/A'}
                      </div>
                      <div className="text-xs text-gray-500">{customer.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                      {customer.ordersCount}
                    </span>
                  </div>
                </td>
                <td>
                  <span className="text-sm font-bold text-green-400">
                    ${customer.totalSpent.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </span>
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
