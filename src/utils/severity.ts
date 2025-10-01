import { SeverityLevel } from '../types';

export const getSeverityColor = (severity: SeverityLevel): string => {
  switch (severity) {
    case 'Critical':
      return 'bg-red-600 text-white';
    case 'High':
      return 'bg-orange-500 text-white';
    case 'Medium':
      return 'bg-yellow-500 text-white';
    case 'Low':
      return 'bg-blue-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export const getSeverityChartColor = (severity: SeverityLevel): string => {
  switch (severity) {
    case 'Critical':
      return '#dc2626';
    case 'High':
      return '#f97316';
    case 'Medium':
      return '#eab308';
    case 'Low':
      return '#3b82f6';
    default:
      return '#6b7280';
  }
};

export const formatCVSS = (score: number): string => {
  return score.toFixed(1);
};
