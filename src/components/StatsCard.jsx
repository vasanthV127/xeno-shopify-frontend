const StatsCard = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
    indigo: 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30',
    pink: 'from-pink-500/20 to-pink-600/20 border-pink-500/30',
    teal: 'from-teal-500/20 to-teal-600/20 border-teal-500/30'
  };

  const iconColorClasses = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    yellow: 'text-yellow-400',
    indigo: 'text-indigo-400',
    pink: 'text-pink-400',
    teal: 'text-teal-400'
  };

  const glowClasses = {
    blue: 'hover:shadow-blue-500/20',
    green: 'hover:shadow-green-500/20',
    purple: 'hover:shadow-purple-500/20',
    yellow: 'hover:shadow-yellow-500/20',
    indigo: 'hover:shadow-indigo-500/20',
    pink: 'hover:shadow-pink-500/20',
    teal: 'hover:shadow-teal-500/20'
  };

  return (
    <div className={`stat-card bg-gradient-to-br ${colorClasses[color] || colorClasses.blue} border hover:shadow-2xl ${glowClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-2 font-medium tracking-wide uppercase">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`p-4 rounded-2xl bg-dark-card/50 backdrop-blur-sm ${iconColorClasses[color] || iconColorClasses.blue}`}>
          <Icon className="w-8 h-8" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
