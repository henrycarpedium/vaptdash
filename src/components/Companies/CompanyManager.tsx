import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useVaptStore } from '../../store/useVaptStore';
import { Company } from '../../types';
import { Building2, Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { CompanyDialog } from './CompanyDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

export function CompanyManager() {
  const { companies, deleteCompany, vulnerabilities } = useVaptStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setEditingCompany(null);
  };

  const handleDelete = () => {
    if (deleteId) {
      const companyVulnCount = vulnerabilities.filter(v => v.companyId === deleteId).length;
      deleteCompany(deleteId);
      toast.success(`Company deleted${companyVulnCount > 0 ? ` along with ${companyVulnCount} vulnerabilities` : ''}`);
      setDeleteId(null);
    }
  };

  const getCompanyVulnCount = (companyId: string) => {
    return vulnerabilities.filter(v => v.companyId === companyId).length;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Companies
            </CardTitle>
            <Button onClick={() => setIsOpen(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Company
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {companies.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No companies yet</p>
              <p className="text-sm mt-1">Add your first company to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p>{company.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {getCompanyVulnCount(company.id)} vulnerabilities
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(company)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(company.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <CompanyDialog
        open={isOpen}
        onClose={handleCloseDialog}
        company={editingCompany}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Company</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this company? 
              {deleteId && getCompanyVulnCount(deleteId) > 0 && (
                <span className="block mt-2 text-destructive">
                  This will also delete {getCompanyVulnCount(deleteId)} associated vulnerabilities.
                </span>
              )}
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
