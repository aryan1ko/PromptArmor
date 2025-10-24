# 🔒 PromptArmor  
**LLM Input-Output Firewall for Agent Systems**

PromptArmor is a developer-friendly security and observability toolkit for AI agent pipelines.  
It enforces runtime policies that protect against prompt injection, data leaks, goal drift, and tool misuse — acting like a Web Application Firewall (WAF) for LLMs.

---

## Overview
PromptArmor runs between your AI agents (LangChain, OpenAI Agents, CrewAI, AutoGen, etc.) and the model API.  
It monitors every prompt and response for anomalies, enforces tool-usage policies, and provides dashboards for real-time metrics and audit trails.


<p align="center">
  <img src="https://github.com/user-attachments/assets/98df903a-82f3-40a1-8a00-0ecce84e88c1" width="45%" />
  <img src="https://github.com/user-attachments/assets/ea493246-7673-419a-9100-4d8b33872cb4" width="45%" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/95711078-e575-42d7-86a4-ea281a996ff6" width="45%" />
  <img src="https://github.com/user-attachments/assets/d1755b20-7656-471e-9679-f447836c9a16" width="45%" />
</p>


[Live Security Demo](https://github.com/user-attachments/files/23110396/Screen.Recording.2025-10-23.at.7.16.41.PM.mov.zip)





### Key Features
- **Input Sanitizer** – blocks jailbreaks, prompt leaks, and recursive self-injection  
- **Output Inspector** – detects PII, secrets, or hallucinated claims  
- **Tool Policy Gatekeeper** – enforces tool allowlists and prevents unauthorized calls  
- **Context Diff Engine** – detects semantic drift or instruction override attempts  
- **Policy-as-Code** – YAML configuration for rules, redaction, and blocking actions  
- **Metrics Dashboard** – view violations, latency, and system health in real time



---

## Architecture

| Directory / File | Description |
|------------------|-------------|
| **src** | Root source directory |
**components** | Reusable UI and visualization components |
**dashboard** | Dashboard-related components |
`MetricCard.tsx` | Displays key performance and security metrics |
`RecentLogs.jsx` | Lists recent security log entries |
`SystemHealth.jsx` | Shows current system and policy health status |
**logs** | Log management and visualization |
`LogDetailsModal.tsx` | Modal displaying detailed log information |
**navigation** | Navigation-related components |
`BackButton.tsx` | Universal back navigation button |
`Navbar.tsx` | Top navigation bar |
**policy** | Policy management UI components |
`PolicyFormModal.tsx` | Modal form for creating and editing policies |
`ErrorBoundary.jsx` | Global error handler for UI crashes |
**entities** | Data models and schemas |
`Metric.schema.json` | Schema for metric tracking and visualization |
`Policy.schema.json` | Schema defining policy structure and validation |
`SecurityLog.schema.json` | Schema for logging input-output security checks |
**pages** | Core page components (views) |
`Dashboard.tsx` | Main dashboard displaying system metrics and logs |
`Home.tsx` | Home page and app entry view |
`InputSanitizer.jsx` | Page for testing input sanitization and jailbreak detection |
`Landing.tsx` | Marketing and overview landing page |
`LiveDemo.jsx` | Interactive demo of PromptArmor checks |
`OutputInspector.jsx` | Page for analyzing output for hallucinations and leaks |
`PolicyEditor.jsx` | Interface for editing and validating policy configurations |


---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/aryan1ko/PromptArmor.git
cd PromptArmor
```
2. Install dependencies
```bash
npm install
```
3. Run locally
```bash
npm run dev
```
Open http://localhost:5173

4. Build for production
```bash
npm run build
npm run preview
```
Configuration
Environment Variables
Create a .env file in the project root:

```env
VITE_API_BASE_URL=https://promptarmor-api.example.com
```
If you’re running only the frontend (no backend), leave it blank — the app will fall back to mock data.

Policy Example (policy.yaml)
```yaml
Copy code
version: 1
block_on:
  - data_leak
  - context_poisoning
  - jailbreak
allowed_tool_names:
  - search
  - vector_lookup
pii_patterns: preset:strict
thresholds:
  severity_fail_at: high
redaction:
  mode: safe_share
```
Dashboards
Metrics Dashboard – Real-time security analytics

Input Sanitizer – View blocked or modified prompts

Output Inspector – Inspect filtered responses

Reports – Export HTML or JSON audit logs

## Tech Stack

| Layer | Technologies |
|--------|---------------|
| **Frontend** | React 18 · TypeScript · Vite · TailwindCSS |
| **Data** | React Query · Base44 Entities API |
| **Visualization** | Lucide-React Icons · Recharts |
| **Observability** | OpenTelemetry · Prometheus *(optional)* |
| **Hosting** | Base44 App Platform · Vercel |

Example Data Model
SecurityLog

```json
{
  "request_id": "abc123",
  "timestamp": "2025-10-22T12:34:56Z",
  "check_type": "output_inspector",
  "status": "blocked",
  "severity": "critical",
  "latency_ms": 125,
  "violations": [
    { "type": "pii", "description": "Email detected", "confidence": 0.94 }
  ]
}
```
Future Improvements
 Backend service for rule evaluation and persistence

 WebSocket-based live metric updates

 Role-based access control (RBAC)

 Automated policy benchmarking

Contributing
Contributions welcome!

Fork this repo
Create a branch (feature/add-new-component)
Commit your changes
Submit a Pull Request

License
MIT License © 2025 Aryan Kondapally

💬 Contact
For collaboration or feedback:
avk639@utexas.edu
