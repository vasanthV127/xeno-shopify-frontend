const DateRangeFilter = ({ dateRange, setDateRange }) => {
  const handleChange = (e) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex gap-4 mt-2">
      <div>
        <label className="block text-xs text-gray-600 mb-1">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={dateRange.startDate}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1">End Date</label>
        <input
          type="date"
          name="endDate"
          value={dateRange.endDate}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
