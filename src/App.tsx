import { useState } from 'react';
import { useVaptStore } from './store/useVaptStore';
import { SummaryCards } from './components/Dashboard/SummaryCards';
import { SeverityChart } from './components/Charts/SeverityChart';
import { TimelineChart } from './components/Charts/TimelineChart';
import { FilterBar } from './components/Filters/FilterBar';
import { VulnerabilityTable } from './components/Vulnerabilities/VulnerabilityTable';
import { VulnerabilityDetail } from './components/Vulnerabilities/VulnerabilityDetail';
import { VulnerabilityForm } from './components/Forms/VulnerabilityForm';
import { ExportButtons } from './components/Export/ExportButtons';
import { CompanyManager } from './components/Companies/CompanyManager';
import { CompanyDialog } from './components/Companies/CompanyDialog';
import { EmptyState } from './components/Dashboard/EmptyState';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Toaster } from './components/ui/sonner';
import { Vulnerability } from './types';
import { Plus, Shield, Building2, BarChart3 } from 'lucide-react';

export default function App() {
  const { companies, filters, getFilteredVulnerabilities } = useVaptStore();
  const [viewVulnerability, setViewVulnerability] = useState<Vulnerability | null>(null);
  const [editVulnerability, setEditVulnerability] = useState<Vulnerability | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCompanyDialog, setShowCompanyDialog] = useState(false);

  const filteredVulnerabilities = getFilteredVulnerabilities();
  const currentCompany = companies.find((c) => c.id === filters.companyId);

  const handleView = (vuln: Vulnerability) => {
    setViewVulnerability(vuln);
  };

  const handleEdit = (vuln: Vulnerability) => {
    setEditVulnerability(vuln);
  };

  const handleCloseDetail = () => {
    setViewVulnerability(null);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditVulnerability(null);
  };

  const handleAddFirstCompany = () => {
    setShowCompanyDialog(true);
  };

  const handleCloseCompanyDialog = () => {
    setShowCompanyDialog(false);
  };

  // Show empty state if no companies exist
  if (companies.length === 0) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <img 
              src="public/logovaptdash-v1.png?v=1" 
              alt="VAPT Logo" 
              className="h-12 w-12 object-contain"
              onError={(e) => {
                console.log('Logo failed to load');
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="bg-primary text-primary-foreground p-3 rounded-lg" style={{display: 'none'}}>
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-3xl">VAPT Dashboard</h1>
          </div>

          <EmptyState onAddCompany={handleAddFirstCompany} />

          {/* Company Dialog */}
          <CompanyDialog
            open={showCompanyDialog}
            onClose={handleCloseCompanyDialog}
          />

          <Toaster />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="public/logovaptdash-v1.png?v=1" 
              alt="VAPT Logo" 
              className="h-12 w-12 object-contain"
              onError={(e) => {
                console.log('Logo failed to load');
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="bg-primary text-primary-foreground p-3 rounded-lg" style={{display: 'none'}}>
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl">VAPT Dashboard</h1>
              {currentCompany && (
                <p className="text-muted-foreground">{currentCompany.name}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ExportButtons
              vulnerabilities={filteredVulnerabilities}
              company={currentCompany}
            />
            <Button onClick={() => setShowAddForm(true)} disabled={!filters.companyId}>
              <Plus className="h-4 w-4 mr-2" />
              Add Vulnerability
            </Button>
          </div>
        </div>

        {/* Tabs for Dashboard and Companies */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Companies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 mt-6">
            {/* Filters */}
            <FilterBar />

            {/* Show message if no company is selected */}
            {!filters.companyId && (
              <Card className="border-2 border-dashed">
                <CardContent className="p-8 text-center">
                  <Building2 className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground mb-2">No company selected</p>
                  <p className="text-sm text-muted-foreground">
                    Please select a company from the filter above to view vulnerabilities
                  </p>
                </CardContent>
              </Card>
            )}

            {filters.companyId && (
              <>
                {/* Summary Cards */}
                <SummaryCards vulnerabilities={filteredVulnerabilities} />

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SeverityChart vulnerabilities={filteredVulnerabilities} />
                  <TimelineChart vulnerabilities={filteredVulnerabilities} />
                </div>

                {/* Vulnerability Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Vulnerabilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <VulnerabilityTable
                      vulnerabilities={filteredVulnerabilities}
                      onView={handleView}
                      onEdit={handleEdit}
                    />
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="companies" className="mt-6">
            <CompanyManager />
          </TabsContent>
        </Tabs>

        {/* Detail Modal */}
        <VulnerabilityDetail
          vulnerability={viewVulnerability}
          open={viewVulnerability !== null}
          onClose={handleCloseDetail}
        />

        {/* Add/Edit Form Modal */}
        <VulnerabilityForm
          vulnerability={editVulnerability}
          open={showAddForm || editVulnerability !== null}
          onClose={handleCloseForm}
        />

        {/* Toast Notifications */}
        <Toaster />
      </div>
    </div>
  );
}
