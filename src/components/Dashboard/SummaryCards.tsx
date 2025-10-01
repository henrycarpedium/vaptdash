import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Vulnerability } from '../../types';
import { Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface SummaryCardsProps {
  vulnerabilities: Vulnerability[];
}

export function SummaryCards({ vulnerabilities }: SummaryCardsProps) {
  const totalVulnerabilities = vulnerabilities.length;
  const criticalCount = vulnerabilities.filter((v) => v.severity === 'Critical').length;
  const openCount = vulnerabilities.filter((v) => v.status === 'Open').length;
  const resolvedCount = vulnerabilities.filter((v) => v.status === 'Resolved').length;
  const inProgressCount = vulnerabilities.filter((v) => v.status === 'In Progress').length;

  const cards = [
    {
      title: 'Total Vulnerabilities',
      value: totalVulnerabilities,
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Critical',
      value: criticalCount,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Open',
      value: openCount,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Resolved',
      value: resolvedCount,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">{card.title}</CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{card.value}</div>
              {card.title === 'Open' && inProgressCount > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  {inProgressCount} in progress
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
