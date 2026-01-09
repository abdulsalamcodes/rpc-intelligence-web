# Frontend Agent Prompt: RFP Intelligence Web Application

> **Objective**: Build a production-ready, modern web application for the RFP Intelligence & Proposal Assistant platform. This application consumes a FastAPI backend that provides AI-driven RFP analysis, proposal generation, and compliance checking powered by CrewAI multi-agent workflows.

---

## 1. Project Overview

### 1.1 What is RFP Intelligence?

RFP Intelligence is an AI-powered platform that helps organizations:
- **Upload and parse RFP (Request for Proposal) documents** (PDF, DOCX)
- **Extract requirements automatically** using AI agents
- **Generate compliance matrices** tracking mandatory/optional requirements
- **Match past projects and personnel** to requirements
- **Draft technical proposals** with AI assistance
- **Review proposals** for quality, risks, and compliance

### 1.2 Target Users

- **Proposal Managers**: Oversee the entire RFP response process
- **Technical Writers**: Draft and edit proposal sections
- **Subject Matter Experts**: Review and validate content
- **Executives**: View dashboards and approve submissions

### 1.3 Tech Stack (Backend)

| Component | Technology |
|-----------|------------|
| API | FastAPI (Python 3.10+) |
| Database | PostgreSQL (Neon) |
| Auth | JWT (access + refresh tokens) |
| AI Agents | CrewAI with multi-provider LLM support |
| Document Processing | Tesseract OCR, python-docx, pdfminer |
| Job Queue | Redis (optional for background jobs) |

---

## 2. API Reference

**Base URL**: `/api/v1`  
**Authentication**: Bearer token (JWT) in `Authorization` header

### 2.1 Authentication Endpoints

#### `POST /api/v1/auth/register`
Register a new user and create their organization.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "full_name": "John Doe",
  "organization_name": "Acme Corp"
}
```

**Response** (200):
```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

---

#### `POST /api/v1/auth/login`
OAuth2-compatible login endpoint.

**Request Body** (form data):
```
username=user@example.com
password=securePassword123
```

**Response** (200): Same as register

**Errors**:
- `401`: Invalid email or password
- `403`: Account is inactive

---

#### `POST /api/v1/auth/refresh`
Refresh an access token.

**Request Body**:
```json
{
  "refresh_token": "eyJ..."
}
```

**Response** (200): Same as register

---

#### `GET /api/v1/auth/me`
Get current user info and organizations.

**Headers**: `Authorization: Bearer <access_token>`

**Response** (200):
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "John Doe",
  "is_active": true,
  "organizations": [
    {
      "id": "org-uuid",
      "name": "Acme Corp",
      "slug": "acme-corp-abc123",
      "role": "owner"
    }
  ]
}
```

---

#### `POST /api/v1/auth/switch-org`
Switch to a different organization context.

**Query Params**: `org_id=<uuid>`

**Response** (200): New tokens for the selected organization

---

### 2.2 Organization Endpoints

#### `GET /api/v1/organizations`
List all organizations the user belongs to.

**Response** (200):
```json
[
  {
    "id": "uuid",
    "name": "Acme Corp",
    "slug": "acme-corp-abc123",
    "settings": {},
    "member_count": 5
  }
]
```

---

#### `POST /api/v1/organizations`
Create a new organization.

**Request Body**:
```json
{
  "name": "New Company",
  "slug": "new-company"
}
```

---

#### `GET /api/v1/organizations/{org_id}`
Get organization details.

---

#### `PATCH /api/v1/organizations/{org_id}`
Update organization (admin/owner only).

**Request Body**:
```json
{
  "name": "Updated Name",
  "settings": { "theme": "dark" }
}
```

---

#### `GET /api/v1/organizations/{org_id}/members`
List organization members.

**Response** (200):
```json
[
  {
    "id": "member-uuid",
    "user_id": "user-uuid",
    "email": "member@example.com",
    "full_name": "Jane Doe",
    "role": "member"
  }
]
```

---

#### `POST /api/v1/organizations/{org_id}/members`
Add a member (admin/owner only).

**Request Body**:
```json
{
  "email": "newmember@example.com",
  "role": "member"
}
```

**Roles**: `owner`, `admin`, `member`, `viewer`

---

#### `PATCH /api/v1/organizations/{org_id}/members/{user_id}`
Update member role (owner only).

---

#### `DELETE /api/v1/organizations/{org_id}/members/{user_id}`
Remove a member (admin/owner only).

---

### 2.3 RFP Management Endpoints

#### `POST /api/v1/rfps/upload`
Upload an RFP document for processing.

**Request** (multipart/form-data):
- `file`: PDF or DOCX file (required)
- `client_name`: string (optional)
- `sector`: string (optional)
- `submission_deadline`: ISO date string (optional)

**Response** (200):
```json
{
  "rfp_id": "rfp_20260109_073957_a1b2c3d4",
  "filename": "government_rfp.pdf",
  "status": "uploaded",
  "text_length": 45000,
  "ocr_used": false,
  "warnings": []
}
```

**Errors**:
- `400`: Unsupported file format
- `402`: Usage limit exceeded (upgrade required)

---

#### `GET /api/v1/rfps`
List all RFPs for the current organization.

**Response** (200):
```json
[
  {
    "rfp_id": "rfp_20260109_073957_a1b2c3d4",
    "filename": "government_rfp.pdf",
    "client_name": "Department of Energy",
    "sector": "Government",
    "submission_deadline": "2026-02-15",
    "status": "analyzed",
    "text_length": 45000,
    "ocr_used": false,
    "created_at": "2026-01-09T07:39:57Z"
  }
]
```

---

#### `GET /api/v1/rfps/{rfp_id}`
Get RFP metadata.

---

#### `GET /api/v1/rfps/{rfp_id}/text`
Get extracted text content.

**Response** (200):
```json
{
  "rfp_id": "rfp_...",
  "text": "Full extracted text...",
  "length": 45000
}
```

---

#### `DELETE /api/v1/rfps/{rfp_id}`
Delete an RFP and all associated data.

---

### 2.4 Analysis Endpoints (Legacy - `/api`)

> These endpoints run AI agent workflows. They are currently at `/api` prefix but may move to `/api/v1` in future.

#### `POST /api/analyze`
Start full RFP analysis workflow.

**Request Body**:
```json
{
  "rfp_id": "rfp_20260109_073957_a1b2c3d4",
  "run_full_workflow": true,
  "company_context": {
    "company_name": "Acme Corp",
    "industry": "Technology",
    "strengths": ["Cloud infrastructure", "AI/ML"]
  }
}
```

**Response** (200):
```json
{
  "job_id": "job_rfp_20260109_073957_a1b2c3d4_143957",
  "rfp_id": "rfp_...",
  "status": "queued",
  "message": "Analysis workflow started. Check /api/status/{job_id} for progress."
}
```

---

#### `POST /api/analyze/{rfp_id}/rerun`
Rerun analysis for an existing RFP.

---

#### `GET /api/status/{job_id}`
Get detailed job status with progress.

**Response** (200):
```json
{
  "job_id": "job_...",
  "rfp_id": "rfp_...",
  "status": "running",
  "started_at": "2026-01-09T07:40:00Z",
  "completed_at": null,
  "current_step": 2,
  "total_steps": 5,
  "step_name": "Compliance Analysis",
  "step_description": "Generating compliance matrix and flagging risks",
  "progress_percent": 40,
  "logs": [
    "[07:40:00] Starting RFP analysis agent...",
    "[07:40:15] Extracted 47 requirements",
    "[07:40:20] Starting compliance analysis..."
  ],
  "error": null,
  "results_summary": null
}
```

**Status Values**: `queued`, `running`, `completed`, `failed`

---

#### `GET /api/rfp/{rfp_id}/status`
Get latest job status for an RFP.

---

#### `GET /api/results/{rfp_id}`
Get all analysis results.

**Response** (200):
```json
{
  "rfp_id": "rfp_...",
  "metadata": { ... },
  "outputs": {
    "analysis": { ... },
    "compliance": { ... },
    "experience": { ... },
    "proposal": { ... },
    "review": { ... }
  }
}
```

---

#### `GET /api/results/{rfp_id}/{agent_name}`
Get specific agent output.

**Agent Names**: `analysis`, `compliance`, `experience`, `proposal`, `review`

---

#### `POST /api/agents/{agent_name}`
Run a single agent.

**Request Body**:
```json
{
  "rfp_id": "rfp_...",
  "agent_name": "compliance"
}
```

---

#### `POST /api/proposal/{rfp_id}/revise`
Revise proposal based on review feedback.

---

### 2.5 Billing Endpoints

#### `GET /api/v1/billing/usage`
Get current usage summary.

**Response** (200):
```json
{
  "has_subscription": true,
  "plan": {
    "name": "pro",
    "display_name": "Professional",
    "rfp_limit": 50,
    "user_limit": 10
  },
  "subscription_status": "active",
  "billing_cycle": "monthly",
  "current_period_end": "2026-02-09T00:00:00Z",
  "rfps_used": 12,
  "rfps_limit": 50,
  "rfps_remaining": 38
}
```

---

#### `GET /api/v1/billing/can-create-rfp`
Check if organization can create a new RFP.

**Response** (200):
```json
{
  "can_create": true,
  "message": "You have 38 RFPs remaining this month"
}
```

---

## 3. Data Models & Schemas

### 3.1 RFP Analysis Result

```typescript
interface RFPAnalysisResult {
  summary: string;
  scope_of_work: string[];
  eligibility_criteria: EligibilityCriterion[];
  deadlines: {
    submission: string | null;
    questions: string | null;
    site_visit: string | null;
    contract_start: string | null;
  };
  evaluation_methodology: {
    technical_weight: number | null;
    price_weight: number | null;
    experience_weight: number | null;
    other_criteria: Record<string, number> | null;
  } | null;
  mandatory_documents: string[];
  requirements: Requirement[];
  raw_text_length: number;
  extraction_warnings: string[];
}

interface Requirement {
  id: string;           // e.g., "REQ-001"
  text: string;
  mandatory: boolean;
  confidence: number;   // 0.0 - 1.0
  source_section: string | null;
  category: string | null; // "technical", "administrative", etc.
}

interface EligibilityCriterion {
  criterion: string;
  confidence: number;
}
```

---

### 3.2 Compliance Result

```typescript
interface ComplianceResult {
  rfp_id: string;
  compliance_matrix: ComplianceItem[];
  risk_flags: RiskFlag[];
  missing_information: string[];
  mandatory_count: number;
  mandatory_met: number;
  optional_count: number;
  optional_met: number;
  overall_compliance_score: number; // 0.0 - 1.0
}

interface ComplianceItem {
  requirement_id: string;
  requirement_text: string | null;
  mandatory: boolean;
  status: "pending" | "met" | "not_met" | "partial" | "not_applicable";
  response_location: string | null;
  notes: string;
  evidence: string | null;
}

interface RiskFlag {
  requirement_id: string;
  risk_level: "low" | "medium" | "high" | "critical";
  category: string | null;
  explanation: string;
  mitigation: string | null;
}
```

---

### 3.3 Experience Matching Result

```typescript
interface ExperienceResult {
  rfp_id: string;
  experience_mapping: ExperienceMapping[];
  gaps: ExperienceGap[];
  overall_experience_score: number;
}

interface ExperienceMapping {
  requirement_id: string;
  requirement_text: string | null;
  matched_projects: ExperienceMatch[];
  matched_personnel: PersonnelMatch[];
  confidence: number;
}

interface ExperienceMatch {
  project_name: string;
  client: string | null;
  description: string;
  relevance: number; // 0.0 - 1.0
  year: number | null;
}

interface PersonnelMatch {
  name: string;
  role: string;
  current_title: string | null;
  years_experience: number | null;
  relevant_certifications: string[];
  relevance: number;
}

interface ExperienceGap {
  requirement_id: string;
  gap_description: string;
  severity: string;
  recommendation: string | null;
}
```

---

### 3.4 Proposal Draft

```typescript
interface ProposalDraft {
  rfp_id: string;
  sections: ProposalSection[];
  total_word_count: number;
  created_at: string;
  updated_at: string;
}

interface ProposalSection {
  title: string;
  content: string;
  order: number;
  source_references: string[];
  assumptions: string[];
  word_count: number;
  status: "draft" | "reviewed" | "approved";
}
```

---

### 3.5 Review Result

```typescript
interface ReviewResult {
  rfp_id: string;
  review_items: ReviewItem[];
  overall_quality_score: number; // 0.0 - 1.0
  critical_issues_count: number;
  recommendation: string;
}

interface ReviewItem {
  section: string;
  issue_type: "ambiguity" | "overconfidence" | "missing_justification" | 
              "inconsistency" | "incomplete" | "unsupported_claim" | "grammar";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  location: string | null;
  suggested_fix: string | null;
}
```

---

## 4. Application Structure

### 4.1 Required Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Marketing page with features, pricing, CTA |
| `/login` | Login | User login form |
| `/register` | Register | User registration with org creation |
| `/dashboard` | Dashboard | Overview of RFPs, usage stats, quick actions |
| `/rfps` | RFP List | Table of all organization RFPs |
| `/rfps/:id` | RFP Detail | Full RFP analysis with tabs |
| `/rfps/:id/analysis` | Analysis View | Requirements, compliance matrix |
| `/rfps/:id/proposal` | Proposal Editor | Edit proposal sections |
| `/rfps/:id/review` | Review View | Quality issues and recommendations |
| `/settings` | Settings | Organization settings, billing |
| `/settings/team` | Team Management | Add/remove members, manage roles |
| `/settings/billing` | Billing | Usage, plan, upgrade |

---

### 4.2 Core Features to Implement

#### A. Authentication Flow
- JWT-based auth with access/refresh tokens
- Persist tokens in localStorage or httpOnly cookies
- Auto-refresh expired tokens
- Redirect to login on 401
- Organization switcher in header

#### B. RFP Upload Flow
1. Check `can-create-rfp` before showing upload
2. Show file picker (PDF/DOCX only)
3. Optional metadata: client name, sector, deadline
4. Upload with progress indicator
5. Show success with RFP ID
6. Redirect to RFP detail or start analysis

#### C. Analysis Workflow UI
1. **Trigger Analysis**: Button to start full workflow
2. **Progress Tracking**: 
   - Real-time polling of `/api/status/{job_id}`
   - Visual progress bar (current_step / total_steps)
   - Live logs display
   - Step-by-step status updates
3. **Results Display**:
   - Tabbed interface for each agent output
   - Summary cards with key metrics
   - Drill-down into requirements

#### D. Compliance Matrix
- Table with all requirements
- Status badges (Met/Not Met/Partial)
- Risk level indicators
- Filtering by status, mandatory, risk
- Edit status and add notes
- Export to Excel/PDF

#### E. Proposal Editor
- Section-based editor (rich text)
- Side-by-side with requirements
- AI suggestions panel
- Word count tracking
- Save draft functionality
- "Revise with AI" button (calls `/api/proposal/{rfp_id}/revise`)

#### F. Review Dashboard
- Quality score visualization
- Issue list with severity
- Grouped by section
- Quick navigation to issues
- Accept/dismiss suggestions

#### G. Team Management
- Member list with roles
- Invite by email
- Role management (owner only)
- Remove members

#### H. Usage & Billing
- Current plan display
- Usage meter (RFPs used/limit)
- Upgrade CTA when near limit
- Plan comparison table

---

## 5. UI/UX Requirements

### 5.1 Design System

- **Framework**: React with TypeScript (or Next.js)
- **Styling**: Tailwind CSS or CSS-in-JS
- **Component Library**: shadcn/ui, Radix, or Chakra UI
- **Icons**: Lucide, Heroicons, or Phosphor

### 5.2 Visual Style

- **Modern and Professional**: Suitable for enterprise B2B
- **Dark/Light Mode**: Toggle with system preference detection
- **Responsive**: Desktop-first, mobile-optimized
- **Accessible**: WCAG 2.1 AA compliance

### 5.3 Key UI Patterns

| Pattern | Usage |
|---------|-------|
| Data Tables | RFP lists, requirements, compliance matrix |
| Progress Indicators | Analysis jobs, file uploads |
| Tabs | Agent outputs, settings sections |
| Modals | Confirmations, quick actions |
| Toast Notifications | Success/error feedback |
| Command Palette | Quick navigation (Cmd+K) |
| Skeleton Loading | Content placeholders |

### 5.4 Dashboard Widgets

- **Active RFPs**: Count with trend
- **Pending Reviews**: Proposals needing attention
- **Usage Meter**: Visual RFP usage bar
- **Recent Activity**: Timeline of actions
- **Quick Actions**: Upload RFP, Start Analysis

---

## 6. State Management

### 6.1 Recommended Approach

```
React Query (TanStack Query) for:
- Server state (API data)
- Caching and invalidation
- Background refetching
- Optimistic updates

Zustand or Context for:
- Auth state (tokens, user, org)
- UI state (theme, sidebar, modals)
- Local preferences
```

### 6.2 Key Queries/Mutations

```typescript
// Queries
useQuery(['me'], () => authApi.getMe());
useQuery(['rfps'], () => rfpApi.listRFPs());
useQuery(['rfp', rfpId], () => rfpApi.getRFP(rfpId));
useQuery(['results', rfpId], () => analysisApi.getResults(rfpId));
useQuery(['job-status', jobId], () => analysisApi.getJobStatus(jobId), {
  refetchInterval: (data) => data?.status === 'running' ? 2000 : false
});
useQuery(['usage'], () => billingApi.getUsage());

// Mutations
useMutation(authApi.login);
useMutation(authApi.register);
useMutation(rfpApi.uploadRFP);
useMutation(analysisApi.startAnalysis);
useMutation(analysisApi.rerunAnalysis);
useMutation(analysisApi.reviseProposal);
```

---

## 7. Error Handling

### 7.1 HTTP Error Codes

| Code | Meaning | Frontend Action |
|------|---------|-----------------|
| 400 | Bad Request | Show validation errors |
| 401 | Unauthorized | Try refresh token, then redirect to login |
| 402 | Payment Required | Show upgrade modal |
| 403 | Forbidden | Show "Access Denied" message |
| 404 | Not Found | Show 404 page or "Not Found" |
| 422 | Validation Error | Show field-level errors |
| 500 | Server Error | Show generic error, log details |

### 7.2 Error Response Format

```json
{
  "detail": "RFP not found"
}
```

Or for validation errors:
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

---

## 8. Real-Time Features

### 8.1 Job Progress Polling

For analysis jobs, implement polling:

```typescript
const useJobProgress = (jobId: string) => {
  return useQuery(['job-status', jobId], 
    () => analysisApi.getJobStatus(jobId),
    {
      enabled: !!jobId,
      refetchInterval: (data) => {
        if (!data) return 2000;
        if (data.status === 'completed' || data.status === 'failed') {
          return false; // Stop polling
        }
        return 2000; // Poll every 2 seconds
      }
    }
  );
};
```

### 8.2 Progress UI Component

Display:
- Progress bar: `progress_percent`%
- Current step: `step_name` - `step_description`
- Steps indicator: Step `current_step` of `total_steps`
- Live logs: scrollable log viewer
- Error state: red banner with `error` message

---

## 9. File Upload Handling

### 9.1 Upload Implementation

```typescript
const uploadRFP = async (
  file: File,
  metadata: { client_name?: string; sector?: string; submission_deadline?: string }
) => {
  const formData = new FormData();
  formData.append('file', file);
  if (metadata.client_name) formData.append('client_name', metadata.client_name);
  if (metadata.sector) formData.append('sector', metadata.sector);
  if (metadata.submission_deadline) formData.append('submission_deadline', metadata.submission_deadline);

  const response = await fetch('/api/v1/rfps/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    },
    body: formData
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Upload failed');
  }

  return response.json();
};
```

### 9.2 Supported File Types

- `.pdf` - PDF documents (OCR applied if needed)
- `.docx` - Microsoft Word documents
- `.doc` - Legacy Word documents

---

## 10. Security Considerations

### 10.1 Token Storage

- Store access token in memory or httpOnly cookie
- Store refresh token in httpOnly cookie (preferred)
- Never store tokens in localStorage (XSS vulnerable)

### 10.2 CSRF Protection

- Use `SameSite=Strict` cookies
- Include CSRF token if using cookie-based auth

### 10.3 Input Validation

- Validate all file types before upload
- Sanitize user inputs
- Escape HTML in user-generated content

---

## 11. Performance Considerations

### 11.1 Optimization Strategies

- **Code Splitting**: Route-based lazy loading
- **Data Caching**: React Query with stale-while-revalidate
- **Virtualization**: For long lists (requirements, logs)
- **Debouncing**: Search inputs, auto-save
- **Image Optimization**: Lazy loading, WebP format

### 11.2 Bundle Size

Target initial bundle < 200KB gzipped

---

## 12. Testing Requirements

### 12.1 Test Coverage

| Type | Tools | Coverage |
|------|-------|----------|
| Unit | Vitest/Jest | Components, utilities |
| Integration | Testing Library | Page flows, API mocking |
| E2E | Playwright/Cypress | Critical user journeys |

### 12.2 Critical User Journeys to Test

1. Registration → Login → Dashboard
2. Upload RFP → Start Analysis → View Results
3. Edit Proposal → Revise with AI → Review
4. Invite Team Member → Change Role → Remove
5. View Usage → Hit Limit → Upgrade Prompt

---

## 13. Deployment Considerations

### 13.1 Environment Variables

```env
NEXT_PUBLIC_API_URL=https://api.rfp-intelligence.com
NEXT_PUBLIC_APP_URL=https://app.rfp-intelligence.com
```

### 13.2 CORS Configuration

Backend allows these origins (configurable in settings):
```
http://localhost:8501,http://localhost:3000
```

For production, add your frontend domain to `CORS_ORIGINS` env var on backend.

---

## 14. AI Agent Workflow Details

### 14.1 Workflow Steps

| Step | Agent | Description | Output |
|------|-------|-------------|--------|
| 1 | RFP Analysis | Parse document, extract requirements | `analysis` |
| 2 | Compliance | Generate compliance matrix, flag risks | `compliance` |
| 3 | Experience Matching | Match to past projects/personnel | `experience` |
| 4 | Technical Drafting | Draft proposal sections | `proposal` |
| 5 | Risk Review | Quality review, identify issues | `review` |

### 14.2 Rerun Capabilities

- **Full Rerun**: `POST /api/analyze/{rfp_id}/rerun` - Runs all 5 agents
- **Single Agent**: `POST /api/agents/{agent_name}` - Run specific agent
- **Revise Proposal**: `POST /api/proposal/{rfp_id}/revise` - AI-powered revision

---

## 15. Example Implementation Priorities

### Phase 1: Core (Week 1-2)
- [x] Project setup (Next.js + TypeScript)
- [ ] Auth flow (login, register, token refresh)
- [ ] Dashboard layout with navigation
- [ ] RFP upload functionality
- [ ] Basic RFP list view

### Phase 2: Analysis (Week 3-4)
- [ ] Analysis trigger and progress tracking
- [ ] Results display (all agents)
- [ ] Compliance matrix view
- [ ] Requirements table

### Phase 3: Editing (Week 5-6)
- [ ] Proposal section editor
- [ ] AI revision integration
- [ ] Review issues display
- [ ] Comments and notes

### Phase 4: Team & Billing (Week 7-8)
- [ ] Organization settings
- [ ] Team management
- [ ] Usage display
- [ ] Billing integration

### Phase 5: Polish (Week 9-10)
- [ ] Dark mode
- [ ] Keyboard shortcuts
- [ ] Export features
- [ ] E2E tests
- [ ] Performance optimization

---

## 16. Additional Notes

### 16.1 Existing Streamlit App

There is an existing Streamlit app at `streamlit_app/` for reference. It provides:
- File upload interface
- Analysis triggering
- Results viewing
- Basic proposal editing

This can be used as a reference for expected behavior.

### 16.2 Knowledge Base

The system supports a knowledge base for experience matching:
- `data/knowledge_base/past_projects.json` - Past projects
- `data/knowledge_base/personnel.json` - Team personnel

Future enhancement: Allow CRUD operations for knowledge base from frontend.

### 16.3 Export Formats

Proposals can be exported (future API endpoints needed):
- Markdown
- Word document (DOCX)
- PDF

---

## 17. Questions for Clarification

Before starting implementation, clarify:

1. **Preferred framework**: Next.js (SSR), Vite + React (SPA), or other?
2. **Component library preference**: shadcn/ui, Chakra UI, MUI, or custom?
3. **Auth strategy**: httpOnly cookies vs localStorage for tokens?
4. **Deployment target**: Vercel, AWS, self-hosted?
5. **Design files**: Are there Figma/Sketch designs to follow?
6. **Real-time needs**: WebSocket for job progress or polling sufficient?
7. **Offline support**: PWA requirements?
8. **Internationalization**: Multi-language support needed?

---

*This prompt document provides all necessary context for building a production-ready frontend application for the RFP Intelligence platform. Update as the backend evolves.*
