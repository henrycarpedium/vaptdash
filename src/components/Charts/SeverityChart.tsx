import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Vulnerability, SeverityLevel } from '../../types';
import { getSeverityChartColor } from '../../utils/severity';
import { useVaptStore } from '../../store/useVaptStore';

interface SeverityChartProps {
  vulnerabilities: Vulnerability[];
}

export function SeverityChart({ vulnerabilities }: SeverityChartProps) {
  const { setFilters } = useVaptStore();

  const severityCounts = vulnerabilities.reduce((acc, vuln) => {
    acc[vuln.severity] = (acc[vuln.severity] || 0) + 1;
    return acc;
  }, {} as Record<SeverityLevel, number>);

  const data = Object.entries(severityCounts).map(([severity, count]) => ({
    name: severity,
    value: count,
    color: getSeverityChartColor(severity as SeverityLevel),
  }));

  const handleClick = (entry: any) => {
    setFilters({ severity: entry.name as SeverityLevel });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Severity Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="mb-1">No data available</p>
              <p className="text-sm">Add vulnerabilities to see the distribution</p>
            </div>
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onClick={handleClick}
                  className="cursor-pointer"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Click on a slice to filter vulnerabilities
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
