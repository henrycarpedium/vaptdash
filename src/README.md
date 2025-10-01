# Dynamic VAPT Dashboard

A comprehensive Vulnerability Assessment & Penetration Testing (VAPT) Dashboard built as a single-page web application. Track vulnerabilities across multiple companies with dynamic visualizations, detailed proof-of-concept walkthroughs, and exportable client-ready reports.

## 🚀 Features

### Company-Specific Tracking
- **Multi-company Support**: Manage vulnerabilities across different client organizations
- **Isolated Data**: Each company workspace maintains separate vulnerability tracking
- **Easy Switching**: Quick company selection from the dashboard

### Vulnerability Management
- **Complete CRUD Operations**: Create, read, update, and delete vulnerabilities
- **Rich Data Capture**:
  - Vulnerability name and detailed description
  - Impact assessment
  - Target URL validation
  - CVSS scoring (0.0-10.0) with automatic severity classification
  - Multi-step Proof of Concept (PoC) documentation
  - Screenshot uploads for each PoC step
  - Remediation recommendations
  - Status tracking (Open, In Progress, Resolved)

### Dynamic Visualizations
- **Summary Cards**: Real-time metrics for total vulnerabilities, critical issues, open items, and resolved cases
- **Severity Distribution**: Interactive pie chart showing vulnerability breakdown by severity
  - Click on chart slices to filter vulnerabilities
  - Color-coded: Critical (Red), High (Orange), Medium (Yellow), Low (Blue)
- **Timeline Chart**: Bar chart tracking discovered vs. resolved vulnerabilities over the last 6 months
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Advanced Filtering & Search
- **Multi-dimensional Filters**:
  - Company selection
  - Severity level (Critical, High, Medium, Low)
  - Status (Open, In Progress, Resolved)
  - Date range filtering
- **Real-time Search**: Instant search across vulnerability names, descriptions, and URLs
- **Sortable Table**: Click column headers to sort by name, severity, CVSS score, status, or date
- **Filter Reset**: Quick reset to clear all active filters

### Proof of Concept Builder
- **Multi-Step Documentation**: Create comprehensive PoC walkthroughs
- **Visual Evidence**: Drag-and-drop image upload for each step
- **Image Preview**: Inline image previews with removal capability
- **Carousel Display**: Navigate through PoC steps in detail view

### Export Capabilities
- **PDF Reports**: Generate professional vulnerability assessment reports with:
  - Executive summary with severity breakdown
  - Detailed vulnerability listings
  - Descriptions, impacts, and remediation steps
  - Automated filename with company name and date
- **Excel Reports**: Export structured data for further analysis
  - All vulnerability fields included
  - Optimized column widths
  - Ready for pivot tables and charts

## 🛠️ Tech Stack

### Core Framework
- **React 18**: Component-based UI with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first styling with custom design tokens

### State Management
- **Zustand**: Lightweight global state management
- Mock data included for demonstration

### UI Components
- **shadcn/ui**: Accessible, customizable component library
  - Cards, Tables, Dialogs, Forms, Badges
  - Alert Dialogs, Carousels, Tooltips
- **Lucide React**: Icon library

### Forms & Validation
- **React Hook Form v7.55**: Performant form handling
- **Zod**: Schema validation with TypeScript inference
- **react-dropzone**: Drag-and-drop file uploads

### Data Visualization
- **Recharts**: Interactive charts and graphs
  - Pie charts with click interactions
  - Bar charts with tooltips
  - Responsive containers

### Export Libraries
- **jsPDF**: Client-side PDF generation
- **SheetJS (xlsx)**: Excel file creation and export

### Utilities
- **date-fns**: Modern date manipulation and formatting

## 📁 Project Structure

```
/vapt-dashboard
├── /components
│   ├── /Dashboard
│   │   └── SummaryCards.tsx         # Metric cards
│   ├── /Charts
│   │   ├── SeverityChart.tsx        # Pie chart for severity distribution
│   │   └── TimelineChart.tsx        # Bar chart for trends
│   ├── /Filters
│   │   └── FilterBar.tsx            # Search and filter controls
│   ├── /Vulnerabilities
│   │   ├── VulnerabilityTable.tsx   # Sortable data table
│   │   └── VulnerabilityDetail.tsx  # Detail modal with PoC carousel
│   ├── /Forms
│   │   ├── VulnerabilityForm.tsx    # Add/Edit form with validation
│   │   └── PoCStepsBuilder.tsx      # Multi-step PoC builder
│   ├── /Export
│   │   └── ExportButtons.tsx        # PDF and Excel export
│   └── /ui                           # shadcn/ui components
├── /store
│   └── useVaptStore.ts              # Zustand state management
├── /types
│   └── index.ts                      # TypeScript interfaces
├── /utils
│   └── severity.ts                   # Severity utilities
├── /styles
│   └── globals.css                   # Tailwind v4 configuration
├── App.tsx                           # Main application component
└── README.md
```

## 🎯 Usage Guide

### Dashboard Overview
1. **Select a Company**: Use the company dropdown to switch between client workspaces
2. **View Metrics**: Summary cards show real-time statistics
3. **Analyze Charts**: Click on severity slices to filter vulnerabilities
4. **Apply Filters**: Use the filter bar to narrow down results

### Adding Vulnerabilities
1. Click **"Add Vulnerability"** button
2. Fill in required fields:
   - Name, Description, Impact
   - Target URL (validated)
   - CVSS Score (0.0-10.0) - severity auto-calculated
   - Status
3. Add PoC steps (optional):
   - Click "Add PoC Step"
   - Enter step title and description
   - Upload screenshots via drag-and-drop
4. Add remediation recommendations
5. Click **"Create Vulnerability"**

### Viewing Details
- Click the eye icon on any vulnerability to view full details
- Navigate through PoC steps using the carousel controls
- View all metadata, impact, and remediation

### Editing & Deleting
- Click the edit icon to modify a vulnerability
- Click the delete icon to remove (with confirmation dialog)

### Exporting Reports
- **PDF Export**: Click "Export PDF" to generate a formatted report
- **Excel Export**: Click "Export Excel" for spreadsheet analysis
- Files automatically named with company and date

## 🎨 Design Features

### Color-Coded Severity
- **Critical**: Red (#dc2626) - CVSS 9.0-10.0
- **High**: Orange (#f97316) - CVSS 7.0-8.9
- **Medium**: Yellow (#eab308) - CVSS 4.0-6.9
- **Low**: Blue (#3b82f6) - CVSS 0.0-3.9

### Responsive Layout
- Mobile-first design
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Touch-friendly controls

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader friendly

## 🔄 Data Flow

1. **User Interaction** → UI Components
2. **State Updates** → Zustand Store
3. **Filtered Data** → `getFilteredVulnerabilities()` computed values
4. **Re-render** → React updates affected components
5. **Export** → Generate files from current filtered data

## 🚧 Future Enhancements

- **Backend Integration**: Connect to Supabase or REST API for persistent storage
- **User Authentication**: Role-based access control (Admin, Analyst, Viewer)
- **Real-time Collaboration**: Multi-user editing with WebSockets
- **Advanced Analytics**:
  - Risk scoring algorithms
  - Trend predictions
  - Compliance mapping (OWASP Top 10, CWE)
- **Automated Scanning**: Integration with security scanning tools
- **Email Reports**: Scheduled report delivery
- **Custom Templates**: Branded PDF templates
- **Audit Logs**: Track all changes and user actions
- **Dark Mode**: Toggle between light and dark themes
- **Custom Fields**: Configurable vulnerability attributes
- **Attachment Support**: Upload additional files beyond images
- **Comments & Notes**: Collaborative annotations

## 📝 Notes

- Current implementation uses mock data stored in memory
- Refreshing the page will reset all changes
- For production use, implement backend persistence
- Consider deploying behind authentication for real-world usage

## 🤝 Contributing
To extend functionality:
1. Fork the project structure
2. Add backend API integration
3. Implement persistent storage
4. Add authentication layer
5. Deploy to your preferred hosting platform

---

Built with React, TypeScript, and Tailwind CSS.
