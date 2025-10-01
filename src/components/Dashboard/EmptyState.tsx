import { Card, CardContent } from '../ui/card';
import { Building2, Shield, Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface EmptyStateProps {
  onAddCompany: () => void;
}

export function EmptyState({ onAddCompany }: EmptyStateProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-12 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <div className="bg-primary/10 p-4 rounded-full">
              <Building2 className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h2 className="mb-3">Welcome to VAPT Dashboard</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Get started by adding your first company to begin tracking vulnerabilities, 
            managing penetration testing results, and generating professional reports.
          </p>

          <Button onClick={onAddCompany} size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Add Your First Company
          </Button>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-3">
                1
              </div>
              <h4 className="mb-1">Add Companies</h4>
              <p className="text-sm text-muted-foreground">
                Create company profiles to organize vulnerabilities by client
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-3">
                2
              </div>
              <h4 className="mb-1">Track Vulnerabilities</h4>
              <p className="text-sm text-muted-foreground">
                Document findings with detailed PoC steps and screenshots
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-3">
                3
              </div>
              <h4 className="mb-1">Generate Reports</h4>
              <p className="text-sm text-muted-foreground">
                Export professional PDF and Excel reports for clients
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
