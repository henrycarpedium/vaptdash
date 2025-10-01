import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { useVaptStore } from '../../store/useVaptStore';
import { Company } from '../../types';
import { toast } from 'sonner@2.0.3';

interface CompanyDialogProps {
  open: boolean;
  onClose: () => void;
  company?: Company | null;
}

export function CompanyDialog({ open, onClose, company }: CompanyDialogProps) {
  const { addCompany, updateCompany } = useVaptStore();
  const [companyName, setCompanyName] = useState(company?.name || '');

  useEffect(() => {
    setCompanyName(company?.name || '');
  }, [company]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyName.trim()) {
      toast.error('Company name is required');
      return;
    }

    if (company) {
      updateCompany(company.id, { name: companyName.trim() });
      toast.success('Company updated successfully');
    } else {
      const newCompany: Company = {
        id: `company-${Date.now()}`,
        name: companyName.trim(),
      };
      addCompany(newCompany);
      toast.success('Company added successfully');
    }

    setCompanyName('');
    onClose();
  };

  const handleClose = () => {
    setCompanyName('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {company ? 'Edit Company' : 'Add New Company'}
          </DialogTitle>
          <DialogDescription>
            {company
              ? 'Update the company details below.'
              : 'Enter the company name to add it to your dashboard.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="e.g., Acme Corporation"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              {company ? 'Update' : 'Add'} Company
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
