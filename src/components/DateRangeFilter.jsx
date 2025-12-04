const DateRangeFilter = ({ dateRange, setDateRange }) => {
  const handleChange = (e) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex gap-4 mt-2">
      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
          📅 Start Date
        </label>
        <input
          type="date"
          name="startDate"
          value={dateRange.startDate}
          onChange={handleChange}
          className="input-dark w-full"
        />
      </div>
      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
          📅 End Date
        </label>
        <input
          type="date"
          name="endDate"
          value={dateRange.endDate}
          onChange={handleChange}
          className="input-dark w-full"
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
