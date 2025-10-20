interface CircularProgressProps {
  value: number;
  total?: number;
  color: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, total = 100, color }) => {
  const percentage = Math.round((value / (total || 1)) * 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-24 h-24 transform -rotate-90">
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          className="text-gray-200"
          fill="transparent"
        />
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          className={color}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-lg font-bold text-gray-800">{percentage}%</p>
      </div>
    </div>
  );
};

export default CircularProgress;
