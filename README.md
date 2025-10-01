
# Dynamic VAPT Dashboard

A fully dynamic, production-ready Vulnerability Assessment & Penetration Testing (VAPT) Dashboard built as a single-page web application. Manage vulnerabilities across multiple companies with real-time visualizations, comprehensive proof-of-concept documentation, and professional export capabilities—all powered by user-created data with zero mock dependencies.

## 🎯 Project Overview

This dashboard eliminates the need for backend infrastructure during development and demonstration phases by leveraging browser-based persistent storage. All data is dynamically created, managed, and persisted through user interactions, making it ideal for:

- **Security Consultants**: Track findings across multiple client engagements
- **Penetration Testers**: Document vulnerabilities with visual proof-of-concept walkthroughs
- **Security Teams**: Centralized vulnerability management and reporting
- **Demonstrations**: Fully functional application without backend dependencies

## ✨ Key Features

### 🏢 Company Management (Multi-Tenant Architecture)

- **Complete Company CRUD**: Create, read, update, and delete client companies
- **Isolated Workspaces**: Each company maintains separate vulnerability tracking
- **Smart Company Switching**: Quick selection from the dashboard filter bar
- **Cascading Deletion**: Removing a company automatically cleans up all associated vulnerabilities
- **Empty State Onboarding**: Guided flow when no companies exist yet
- **Validation**: Ensures company names are unique and non-empty

### 🔍 Vulnerability Management

**Full CRUD Operations** with comprehensive validation:

- **Create**: Add new vulnerabilities with complete metadata
- **Read**: View detailed information in expandable detail modals
- **Update**: Edit any field while maintaining data integrity
- **Delete**: Safe removal with confirmation dialogs

**Rich Data Capture**:
- Vulnerability name and detailed description
- Impact assessment and analysis
- Target URL with validation (must be valid URL format)
- CVSS score input (0.0-10.0) with automatic severity classification
- Multi-step Proof of Concept builder with image uploads
- Remediation recommendations
- Status tracking (Open, In Progress, Resolved)
- Automatic timestamp tracking (discovered date, resolved date)

### 📊 Dynamic Visualizations

**Real-Time Summary Cards**:
- Total vulnerabilities count
- Critical vulnerabilities (CVSS 9.0-10.0)
- Open vulnerabilities
- Resolved vulnerabilities

**Interactive Severity Distribution Chart**:
- Pie chart showing vulnerability breakdown by severity
- Click on slices to filter the dashboard by that severity level
- Color-coded segments:
  - 🔴 **Critical** (Red): CVSS 9.0-10.0
  - 🟠 **High** (Orange): CVSS 7.0-8.9
  - 🟡 **Medium** (Yellow): CVSS 4.0-6.9
  - 🔵 **Low** (Blue): CVSS 0.0-3.9

**Timeline Analysis Chart**:
- Bar chart tracking discovered vs. resolved vulnerabilities
- Last 6 months of trend data
- Automatic grouping by month
- Visual comparison of discovery vs. resolution rates

**Empty State Handling**:
- Graceful degradation when no data exists
- Helpful messages guide users to create content
- Charts display "No data available" states

### 🎯 Advanced Filtering & Search

**Multi-Dimensional Filters**:
- **Company Selection**: Switch between client workspaces
- **Severity Filter**: All, Critical, High, Medium, Low
- **Status Filter**: All, Open, In Progress, Resolved
- **Date Range**: Custom start and end date filtering
- **Real-time Search**: Instant search across:
  - Vulnerability names
  - Descriptions
  - Target URLs

**Filter Features**:
- Filters work in combination (AND logic)
- Live update of all visualizations
- Quick reset to clear all filters
- Filter state persists across sessions

### 📋 Vulnerability Table

**Interactive Data Table**:
- Sortable columns (click headers to sort):
  - Name (alphabetical)
  - Severity (by CVSS score)
  - CVSS Score (numerical)
  - Status (by priority)
  - Discovered Date (chronological)
- Color-coded severity badges
- Status indicators
- Action buttons (View, Edit, Delete)
- Responsive layout (stacks on mobile)
- Empty state when no vulnerabilities match filters

### 🔬 Proof of Concept Builder

**Multi-Step PoC Documentation**:
- Add unlimited PoC steps
- Each step includes:
  - Title (required)
  - Detailed description (required)
  - Multiple image uploads (optional)
- Drag-and-drop image upload with react-dropzone
- Inline image preview
- Remove individual images
- Reorder steps (drag handles)
- Delete entire steps
- Base64 image encoding for persistence

**PoC Viewer**:
- Carousel navigation in detail modal
- Step counter (Step 1 of N)
- Previous/Next navigation
- Full-size image display
- Formatted descriptions

### 📤 Export Capabilities

**Professional PDF Reports**:
- Executive summary with company information
- Severity distribution breakdown
- Complete vulnerability listings with:
  - Full descriptions
  - Impact analysis
  - CVSS scores and severity levels
  - Status information
  - Remediation recommendations
- Automated filename: `VAPT_Report_[CompanyName]_[YYYYMMDD].pdf`
- Disabled when no vulnerabilities to export

**Excel Spreadsheet Export**:
- Structured data export for analysis
- All vulnerability fields included:
  - Name, Description, Impact
  - Target URL, CVSS Score, Severity
  - Status, Remediation
  - Discovered Date, Resolved Date
- Auto-sized columns for readability
- Automated filename: `VAPT_Report_[CompanyName]_[YYYYMMDD].xlsx`
- Ready for pivot tables, charts, and further processing
- Disabled when no vulnerabilities to export

## 🛠️ Tech Stack

### Core Framework
- **React 18.3**: Modern component-based UI with hooks and concurrent features
- **TypeScript 5.x**: Type-safe development with full IntelliSense support
- **Tailwind CSS v4.0**: Utility-first styling with custom design tokens
- **Vite**: Lightning-fast build tool and dev server

### State Management & Persistence
- **Zustand 5.x**: Lightweight, scalable global state management
- **Zustand Persist Middleware**: Automatic localStorage synchronization
  - Persists companies, vulnerabilities, and filter preferences
  - Survives page refreshes
  - Automatic serialization/deserialization

### UI Component Library
- **shadcn/ui**: Accessible, customizable component collection
  - Built on Radix UI primitives
  - Includes: Cards, Tables, Dialogs, Forms, Badges, Alerts, Tabs, Carousels, and more
- **Lucide React**: Beautiful, consistent icon library (500+ icons)

### Forms & Validation
- **React Hook Form v7.55**: High-performance form state management
  - Minimal re-renders
  - Built-in validation
  - TypeScript integration
- **Zod**: Schema validation with TypeScript inference
  - Runtime type checking
  - Custom error messages
  - Complex validation rules
- **react-dropzone**: Accessible drag-and-drop file uploads

### Data Visualization
- **Recharts**: Composable charting library
  - Responsive charts
  - Interactive tooltips and legends
  - Click event handling
  - Built on D3.js

### Export & Utilities
- **jsPDF**: Client-side PDF generation
- **SheetJS (xlsx)**: Excel file creation and manipulation
- **date-fns**: Modern date/time utilities
  - Formatting, parsing, manipulation
  - Timezone support
  - Immutable operations

### Toast Notifications
- **Sonner**: Modern toast notification system
  - Success, error, info states
  - Auto-dismiss
  - Stack management

## 📁 Project Structure

```
/vapt-dashboard
├── App.tsx                          # Main application component & routing
├── /components
│   ├── /Companies
│   │   ├── CompanyManager.tsx       # Company CRUD interface
│   │   └── CompanyDialog.tsx        # Add/Edit company modal
│   ├── /Dashboard
│   │   ├── SummaryCards.tsx         # Metric overview cards
│   │   └── EmptyState.tsx           # First-time user onboarding
│   ├── /Charts
│   │   ├── SeverityChart.tsx        # Interactive pie chart
│   │   └── TimelineChart.tsx        # Monthly trend bar chart
│   ├── /Filters
│   │   └── FilterBar.tsx            # Search & filter controls
│   ├── /Vulnerabilities
│   │   ├── VulnerabilityTable.tsx   # Sortable data table
│   │   └── VulnerabilityDetail.tsx  # Detail modal with PoC carousel
│   ├── /Forms
│   │   ├── VulnerabilityForm.tsx    # Add/Edit vulnerability form
│   │   └── PoCStepsBuilder.tsx      # Multi-step PoC builder
│   ├── /Export
│   │   └── ExportButtons.tsx        # PDF & Excel export logic
│   └── /ui                          # shadcn/ui component library
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── sheet.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       └── ... (40+ components)
├── /store
│   └── useVaptStore.ts              # Zustand store with persistence
├── /types
│   └── index.ts                     # TypeScript type definitions
├── /utils
│   └── severity.ts                  # CVSS severity calculations
├── /styles
│   └── globals.css                  # Tailwind v4 config & design tokens
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation



### First-Time Setup

When you first launch the dashboard:

1. **Empty State**: You'll see a welcome screen
2. **Add First Company**: Click "Add Your First Company"
3. **Fill Company Details**: Enter company name (logo optional)
4. **Start Adding Vulnerabilities**: Select the company and add vulnerabilities

## 📖 Usage Guide

### 1️⃣ Company Management

#### Adding Companies
1. Navigate to **"Companies"** tab
2. Click **"Add Company"** button
3. Enter company name (required, must be unique)
4. Optionally add a logo URL
5. Click **"Create Company"**

#### Editing Companies
1. In the Companies tab, find the company
2. Click **"Edit"** icon
3. Modify name or logo
4. Click **"Update Company"**

#### Deleting Companies
1. Click **"Delete"** icon on a company
2. Confirm deletion (this will also delete all associated vulnerabilities)

### 2️⃣ Managing Vulnerabilities

#### Adding a Vulnerability
1. Go to **"Dashboard"** tab
2. Select a company from the filter dropdown
3. Click **"Add Vulnerability"** button
4. Fill in the required fields:
   - **Name**: Vulnerability title (e.g., "SQL Injection in Login Form")
   - **Description**: Detailed explanation
   - **Impact**: Business and technical impact
   - **Target URL**: Must be a valid URL (e.g., `https://example.com/login`)
   - **CVSS Score**: Enter 0.0-10.0 (severity auto-calculated)
   - **Status**: Open, In Progress, or Resolved
5. **Add PoC Steps** (optional but recommended):
   - Click **"Add PoC Step"**
   - Enter step title: "Step 1: Identify injection point"
   - Add detailed description
   - Drag & drop screenshots or click to upload
   - Repeat for additional steps
6. **Remediation**: Enter fix recommendations
7. Click **"Create Vulnerability"**

#### Viewing Details
- Click the **eye icon** (👁️) in the table
- Modal displays:
  - Complete metadata
  - Impact analysis
  - PoC steps in carousel format
  - Remediation recommendations
- Use **Previous/Next** to navigate PoC steps

#### Editing Vulnerabilities
- Click the **edit icon** (✏️) in the table
- Modify any fields
- Add/remove/edit PoC steps
- Click **"Update Vulnerability"**

#### Deleting Vulnerabilities
- Click the **delete icon** (🗑️) in the table
- Confirm deletion in the alert dialog

### 3️⃣ Filtering & Search

#### Using Filters
- **Company**: Select from dropdown (required to view data)
- **Severity**: Choose All, Critical, High, Medium, or Low
- **Status**: Choose All, Open, In Progress, or Resolved
- **Date Range**: Set start and/or end date
- **Search**: Type to filter by name, description, or URL

#### Interacting with Charts
- **Severity Pie Chart**: Click any slice to filter by that severity
- **Timeline Chart**: Visual overview, no interaction needed

#### Resetting Filters
- Click **"Reset Filters"** to clear all except company selection

### 4️⃣ Exporting Reports

#### Generating PDF Reports
1. Ensure you have vulnerabilities in the current view
2. Click **"Export PDF"** button
3. PDF downloads automatically with format: `VAPT_Report_CompanyName_20251001.pdf`

**PDF Contents**:
- Company name and date
- Executive summary with severity counts
- Detailed vulnerability listings
- All metadata, descriptions, impacts, and remediations

#### Generating Excel Reports
1. Click **"Export Excel"** button
2. Excel file downloads: `VAPT_Report_CompanyName_20251001.xlsx`

**Excel Contents**:
- One row per vulnerability
- All fields in separate columns
- Optimized column widths
- Ready for sorting, filtering, pivot tables

**Note**: Export buttons are disabled when:
- No company is selected
- No vulnerabilities exist for the company
- Filters result in zero vulnerabilities

### 5️⃣ Sorting Table Data

Click any column header to sort:
- **Name**: A-Z or Z-A
- **Severity**: Critical → Low or reverse
- **CVSS Score**: Highest to lowest or reverse
- **Status**: Open → Resolved or reverse
- **Discovered**: Newest to oldest or reverse

## 🎨 Design System

### Color Palette & Severity Coding

| Severity | Color | Hex | CVSS Range | Usage |
|----------|-------|-----|------------|-------|
| **Critical** | Red | `#dc2626` | 9.0 - 10.0 | Badges, chart slices, text |
| **High** | Orange | `#f97316` | 7.0 - 8.9 | Badges, chart slices, text |
| **Medium** | Yellow | `#eab308` | 4.0 - 6.9 | Badges, chart slices, text |
| **Low** | Blue | `#3b82f6` | 0.0 - 3.9 | Badges, chart slices, text |

### Status Indicators

| Status | Color | Badge Style |
|--------|-------|-------------|
| Open | Red | Solid background |
| In Progress | Yellow | Solid background |
| Resolved | Green | Solid background |

### Typography

Defined in `/styles/globals.css` using Tailwind v4 custom properties:

- **Headings**: Medium weight (500)
- **Body Text**: Normal weight (400)
- **Buttons/Labels**: Medium weight (500)
- **Base Font Size**: 16px
- **Line Height**: 1.5 (all elements)

### Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md/lg)
- **Desktop**: 1024px+ (xl)

**Responsive Behaviors**:
- Header stacks on mobile
- Charts stack vertically on small screens
- Table becomes horizontally scrollable
- Modals adjust to screen size
- Touch-friendly tap targets (44px minimum)

### Accessibility Features

✅ **ARIA Labels**: All interactive elements labeled  
✅ **Keyboard Navigation**: Full keyboard support  
✅ **Focus Indicators**: Visible focus rings  
✅ **Screen Readers**: Semantic HTML and ARIA attributes  
✅ **Color Contrast**: WCAG AA compliant  
✅ **Form Validation**: Clear error messages  

## 🔄 Data Flow & Architecture

### State Management Flow

```
User Action → Component Event Handler → Zustand Store Action
                                              ↓
                                    Update Store State
                                              ↓
                                   Persist to localStorage
                                              ↓
                          Computed Values (getFilteredVulnerabilities)
                                              ↓
                            React Re-renders Subscribed Components
```

### Key Store Functions

#### `setFilters(filters)`
Updates active filter criteria and triggers re-computation

#### `addVulnerability(vulnerability)`
Adds new vulnerability to store and persists to localStorage

#### `getFilteredVulnerabilities()`
Computes filtered list based on:
- Company filter (required)
- Severity filter
- Status filter
- Date range filter
- Search query (name, description, URL)

#### `deleteCompany(id)`
Cascade delete:
1. Removes company
2. Removes all associated vulnerabilities
3. Clears company filter if currently selected

### Persistence Strategy

**Zustand Persist Middleware** configuration:
```typescript
persist(
  (set, get) => ({ /* store definition */ }),
  {
    name: 'vapt-storage', // localStorage key
  }
)
```

**What's Persisted**:
- ✅ All companies
- ✅ All vulnerabilities (including PoC steps and images)
- ✅ Current filter state
- ✅ Selected company

**Storage Format**: JSON serialized in `localStorage['vapt-storage']`

**Data Recovery**: Automatic rehydration on page load

## 🧪 Validation Rules

### Company Validation
- Name: Required, non-empty string
- Name: Must be unique across all companies
- Logo: Optional, no validation

### Vulnerability Validation
- **Name**: Required, min 3 characters
- **Description**: Required, min 10 characters
- **Impact**: Required, min 10 characters
- **Target URL**: Required, must be valid URL format
- **CVSS Score**: Required, must be number 0.0-10.0
- **Status**: Required, must be one of: Open, In Progress, Resolved
- **Remediation**: Required, min 10 characters

### PoC Step Validation
- **Title**: Required, min 3 characters
- **Description**: Required, min 10 characters
- **Images**: Optional, automatically converted to base64

## 🔐 Data Privacy & Security Considerations

⚠️ **Important Notes**:

1. **Local Storage Only**: All data stored in browser localStorage
   - Not encrypted
   - Accessible via browser dev tools
   - Cleared when cache is cleared

2. **No Backend**: No server-side persistence or authentication

3. **Production Recommendations**:
   - Implement backend API (Supabase, Firebase, custom REST API)
   - Add user authentication and authorization
   - Encrypt sensitive data
   - Implement audit logging
   - Use HTTPS in production
   - Add role-based access control (RBAC)

4. **PII Warning**: This prototype is **NOT** suitable for:
   - Storing personally identifiable information (PII)
   - Production vulnerability tracking without backend
   - Compliance-regulated environments (HIPAA, GDPR, etc.)

## 🚀 Future Enhancement Roadmap

### Phase 1: Backend Integration
- [ ] Supabase/Firebase integration for cloud persistence
- [ ] RESTful API development
- [ ] Database schema design
- [ ] Real-time synchronization

### Phase 2: Authentication & Authorization
- [ ] User registration and login
- [ ] Role-based access control (Admin, Analyst, Viewer, Client)
- [ ] Company-level user permissions
- [ ] Session management
- [ ] OAuth integration (Google, Microsoft)

### Phase 3: Advanced Features
- [ ] **Real-time Collaboration**: WebSocket-based multi-user editing
- [ ] **Rich Text Editor**: Markdown support for descriptions
- [ ] **File Attachments**: Upload PDFs, logs, pcap files
- [ ] **Comments & Annotations**: Collaborative notes on vulnerabilities
- [ ] **Activity Feed**: Audit trail of all changes
- [ ] **Email Notifications**: Alerts for new critical vulnerabilities
- [ ] **Scheduled Reports**: Automated weekly/monthly PDF delivery

### Phase 4: Analytics & Intelligence
- [ ] **Risk Scoring**: Custom algorithms beyond CVSS
- [ ] **Trend Analysis**: Predictive analytics
- [ ] **Compliance Mapping**: OWASP Top 10, CWE, SANS 25
- [ ] **Custom Dashboards**: Configurable widget layouts
- [ ] **Benchmarking**: Industry comparison metrics

### Phase 5: Integrations
- [ ] **Scanner Integration**: Nessus, Burp Suite, OWASP ZAP imports
- [ ] **Ticketing Systems**: Jira, ServiceNow, Linear integration
- [ ] **CI/CD Pipeline**: GitHub Actions, GitLab CI hooks
- [ ] **Slack/Teams**: Notification webhooks
- [ ] **API Access**: Public API for custom integrations

### Phase 6: Customization
- [ ] **Branded Templates**: Custom PDF report designs
- [ ] **White Labeling**: Custom logos, colors, domains
- [ ] **Custom Fields**: Configurable vulnerability attributes
- [ ] **Workflow Automation**: Custom status transitions
- [ ] **Dark Mode**: Theme toggle

## 🐛 Known Limitations

1. **Browser Storage Limits**: localStorage typically limited to 5-10MB
   - Large number of images in PoC steps may hit limits
   - Consider implementing image compression

2. **No Concurrent Editing**: Multiple tabs/users will conflict
   - Last write wins
   - No merge conflict resolution

3. **No Export of PoC Images**: PDF/Excel exports currently exclude images
   - Future enhancement planned

4. **No Undo/Redo**: Permanent deletions (with confirmation)
   - Future enhancement: revision history

5. **Client-Side Only**: No server-side validation or processing
   - All computations happen in browser

## 🔧 Troubleshooting

### Data Not Persisting
- Check browser localStorage is enabled
- Verify not in private/incognito mode
- Check browser storage quota

### Images Not Uploading
- Verify file is valid image format (JPG, PNG, GIF, WebP)
- Check browser console for errors
- Ensure file size is reasonable (< 2MB recommended)

### Export Buttons Disabled
- Ensure a company is selected
- Verify vulnerabilities exist for that company
- Check that filters haven't excluded all results

### Charts Not Displaying
- Ensure vulnerabilities exist with valid dates
- Check browser console for errors
- Verify no ad blockers interfering

## 🤝 Contributing


1. **Fork/Clone** the project structure
2. **Add Backend**: Implement Supabase, Firebase, or custom API
3. **Enhance Features**: Build from the roadmap
4. **Submit PRs**: Contribute improvements back

## 📄 License

For production use, implement proper backend and authentication.

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Recharts** for beautiful, accessible charts
- **Zustand** for simple state management

---

**Built with React, TypeScript, and Tailwind CSS**  

📅 Last Updated: October 1, 2025  
🔖 Version: 2.0.0 (Fully Dynamic - Zero Mock Data)


  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  #   V A P T - D a s h b o a r d  
 #   v a p t d a s h  
 