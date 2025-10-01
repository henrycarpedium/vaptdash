import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { useVaptStore } from '../../store/useVaptStore';
import { Search, X } from 'lucide-react';
import { SeverityLevel, VulnerabilityStatus } from '../../types';

export function FilterBar() {
  const { companies, filters, setFilters } = useVaptStore();

  const handleReset = () => {
    setFilters({
      severity: 'All',
      status: 'All',
      searchQuery: '',
      dateRange: { start: null, end: null },
    });
  };

  const hasActiveFilters =
    filters.severity !== 'All' ||
    filters.status !== 'All' ||
    filters.searchQuery !== '' ||
    filters.dateRange.start !== null ||
    filters.dateRange.end !== null;

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Company Selector */}
        <Select
          value={filters.companyId || undefined}
          onValueChange={(value) => setFilters({ companyId: value })}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder={companies.length === 0 ? "No companies" : "Select Company"} />
          </SelectTrigger>
          <SelectContent>
            {companies.length === 0 ? (
              <div className="p-2 text-sm text-muted-foreground text-center">
                No companies available
              </div>
            ) : (
              companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vulnerabilities..."
            value={filters.searchQuery}
            onChange={(e) => setFilters({ searchQuery: e.target.value })}
            className="pl-9"
          />
        </div>

        {/* Severity Filter */}
        <Select
          value={filters.severity}
          onValueChange={(value) => setFilters({ severity: value as SeverityLevel | 'All' })}
        >
          <SelectTrigger className="w-full md:w-[150px]">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Severities</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select
          value={filters.status}
          onValueChange={(value) => setFilters({ status: value as VulnerabilityStatus | 'All' })}
        >
          <SelectTrigger className="w-full md:w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button variant="outline" onClick={handleReset} size="icon">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
