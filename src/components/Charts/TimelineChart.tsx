import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Vulnerability } from '../../types';
import { format, startOfMonth, subMonths } from 'date-fns';

interface TimelineChartProps {
  vulnerabilities: Vulnerability[];
}

export function TimelineChart({ vulnerabilities }: TimelineChartProps) {
  // Group vulnerabilities by month
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(startOfMonth(new Date()), 5 - i);
    return {
      month: format(date, 'MMM yyyy'),
      date: date,
      discovered: 0,
      resolved: 0,
    };
  });

  vulnerabilities.forEach((vuln) => {
    const discoveredMonth = format(startOfMonth(vuln.discoveredDate), 'MMM yyyy');
    const monthData = last6Months.find((m) => m.month === discoveredMonth);
    if (monthData) {
      monthData.discovered += 1;
    }

    if (vuln.resolvedDate) {
      const resolvedMonth = format(startOfMonth(vuln.resolvedDate), 'MMM yyyy');
      const monthData = last6Months.find((m) => m.month === resolvedMonth);
      if (monthData) {
        monthData.resolved += 1;
      }
    }
  });

  const hasData = vulnerabilities.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vulnerability Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="mb-1">No data available</p>
              <p className="text-sm">Add vulnerabilities to see the timeline</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={last6Months}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="discovered" fill="#f97316" name="Discovered" />
              <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
