import { Button } from '../ui/button';
import { Download, FileText, Table } from 'lucide-react';
import { Vulnerability, Company } from '../../types';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { toast } from 'sonner@2.0.3';

interface ExportButtonsProps {
  vulnerabilities: Vulnerability[];
  company: Company | undefined;
}

export function ExportButtons({ vulnerabilities, company }: ExportButtonsProps) {
  const exportToPDF = () => {
    if (vulnerabilities.length === 0) {
      toast.error('No vulnerabilities to export');
      return;
    }

    const doc = new jsPDF();
    let yPos = 20;

    // Title
    doc.setFontSize(20);
    doc.text('Vulnerability Assessment Report', 20, yPos);
    yPos += 10;

    // Company name
    if (company) {
      doc.setFontSize(14);
      doc.text(company.name, 20, yPos);
      yPos += 10;
    }

    // Date
    doc.setFontSize(10);
    doc.text(`Generated: ${format(new Date(), 'MMMM dd, yyyy')}`, 20, yPos);
    yPos += 15;

    // Summary
    doc.setFontSize(12);
    doc.text('Executive Summary', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    const criticalCount = vulnerabilities.filter((v) => v.severity === 'Critical').length;
    const highCount = vulnerabilities.filter((v) => v.severity === 'High').length;
    const mediumCount = vulnerabilities.filter((v) => v.severity === 'Medium').length;
    const lowCount = vulnerabilities.filter((v) => v.severity === 'Low').length;

    doc.text(`Total Vulnerabilities: ${vulnerabilities.length}`, 20, yPos);
    yPos += 6;
    doc.text(`Critical: ${criticalCount} | High: ${highCount} | Medium: ${mediumCount} | Low: ${lowCount}`, 20, yPos);
    yPos += 15;

    // Vulnerabilities
    doc.setFontSize(12);
    doc.text('Vulnerability Details', 20, yPos);
    yPos += 10;

    vulnerabilities.forEach((vuln, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text(`${index + 1}. ${vuln.name}`, 20, yPos);
      yPos += 6;

      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(`Severity: ${vuln.severity} | CVSS: ${vuln.cvssScore.toFixed(1)} | Status: ${vuln.status}`, 20, yPos);
      yPos += 6;
      doc.text(`URL: ${vuln.targetUrl}`, 20, yPos);
      yPos += 6;

      // Description
      const descLines = doc.splitTextToSize(`Description: ${vuln.description}`, 170);
      doc.text(descLines, 20, yPos);
      yPos += descLines.length * 5;

      // Impact
      const impactLines = doc.splitTextToSize(`Impact: ${vuln.impact}`, 170);
      doc.text(impactLines, 20, yPos);
      yPos += impactLines.length * 5;

      // Remediation
      const remedLines = doc.splitTextToSize(`Remediation: ${vuln.remediation}`, 170);
      doc.text(remedLines, 20, yPos);
      yPos += remedLines.length * 5 + 8;
    });

    const fileName = company
      ? `VAPT-Report-${company.name.replace(/\s+/g, '-')}-${format(new Date(), 'yyyy-MM-dd')}.pdf`
      : `VAPT-Report-${format(new Date(), 'yyyy-MM-dd')}.pdf`;

    doc.save(fileName);
    toast.success('PDF report generated successfully');
  };

  const exportToExcel = () => {
    if (vulnerabilities.length === 0) {
      toast.error('No vulnerabilities to export');
      return;
    }

    const data = vulnerabilities.map((vuln) => ({
      'Vulnerability Name': vuln.name,
      Severity: vuln.severity,
      'CVSS Score': vuln.cvssScore,
      Status: vuln.status,
      'Target URL': vuln.targetUrl,
      Description: vuln.description,
      Impact: vuln.impact,
      Remediation: vuln.remediation,
      'Discovered Date': format(vuln.discoveredDate, 'yyyy-MM-dd'),
      'Resolved Date': vuln.resolvedDate ? format(vuln.resolvedDate, 'yyyy-MM-dd') : 'N/A',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Vulnerabilities');

    // Set column widths
    ws['!cols'] = [
      { wch: 30 }, // Name
      { wch: 10 }, // Severity
      { wch: 10 }, // CVSS
      { wch: 12 }, // Status
      { wch: 40 }, // URL
      { wch: 50 }, // Description
      { wch: 50 }, // Impact
      { wch: 50 }, // Remediation
      { wch: 15 }, // Discovered
      { wch: 15 }, // Resolved
    ];

    const fileName = company
      ? `VAPT-Report-${company.name.replace(/\s+/g, '-')}-${format(new Date(), 'yyyy-MM-dd')}.xlsx`
      : `VAPT-Report-${format(new Date(), 'yyyy-MM-dd')}.xlsx`;

    XLSX.writeFile(wb, fileName);
    toast.success('Excel report generated successfully');
  };

  const hasVulnerabilities = vulnerabilities.length > 0;

  return (
    <div className="flex gap-2">
      <Button onClick={exportToPDF} variant="outline" disabled={!hasVulnerabilities}>
        <FileText className="h-4 w-4 mr-2" />
        Export PDF
      </Button>
      <Button onClick={exportToExcel} variant="outline" disabled={!hasVulnerabilities}>
        <Table className="h-4 w-4 mr-2" />
        Export Excel
      </Button>
    </div>
  );
}
