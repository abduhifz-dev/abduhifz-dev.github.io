/* =====================================================================
   PORTFOLIO DATA: edit this file to add or change projects.

   Copy any object in `projects`. Fields:
     id          unique, lowercase, used in links: ?p=<id>
     title       project name
     tagline     one line, shown in the lists
     domain      ai | drone | apps
     status      live | build | dev | planned   (statusText overrides the label)
                 "planned" projects show in All projects with the label "Planned".
                 When you start building one, change its status to dev, then build or live.
     stack       technologies (the first 3 show in the list)
     platforms   optional
     summary     2-3 sentences, shown in the project details
     highlights  bullet points
     metrics     optional [["value", "label"], ...]
     images      optional [{ src, w, h, alt, phone? }], files go in assets/img/
     featured    optional true: shows in "Featured projects" (keep it to 6)
     link        optional { href, label }
     hidden      optional true: kept in this file but not shown on the site
   ===================================================================== */

window.PORTFOLIO = {
  profile: {
    name: "Abdul Rehman",
    email: "abduhifz@gmail.com",
    github: "https://github.com/abduhifz-dev",
    linkedin: "https://www.linkedin.com/in/abdul-rehman-01b588256/",
    location: "Islamabad, Pakistan",
    timezone: "Asia/Karachi",
    // Background music (see js/music.js). Current track: Max Concors - Reassemble.
    // To change it, copy another file into assets/music/ and change file.
    // With file: null, soft ambient music is generated in the browser.
    // autoStart: true starts it on the visitor's first click (browsers block sound before that).
    music: { file: "assets/music/max-concors-reassemble.mp3", volume: 0.45, autoStart: true }
  },

  domains: {
    ai: { label: "AI & ML" },
    drone: { label: "Drones & GCS" },
    apps: { label: "Apps & tools" }
  },

  statuses: { live: "Released", build: "Working build", dev: "In development", planned: "Planned" },

  projects: [
    /* ------ Your projects ------ */
    {
      id: "coder",
      title: "CorePilot Coder",
      tagline: "Desktop AI coding agent that reads, plans, edits and runs. One agent per project, and you approve every step.",
      domain: "ai",
      status: "dev",
      stack: ["C++20", "Qt 6 / QML", "MCP", "Flutter", "LLM APIs"],
      platforms: ["Windows", "Linux", "Android companion"],
      summary: "A cross-platform AI coding agent written in C++20 with a Qt Quick interface. It reads the codebase, plans the work, proposes edits as diffs, runs commands and calls MCP tools, and nothing lands without your approval. Each open project gets its own agent, so several codebases can move forward at the same time.",
      highlights: [
        "Diff-first workflow: the agent proposes, you approve each edit and each command",
        "Parallel agents, one per open project",
        "Works with OpenRouter, Mistral, xAI and local LM Studio models, and works out per model whether it can read images",
        "Reads attachments as text: code, PDF (via PDFium), Word, Excel and PowerPoint, up to 10 files per message",
        "Plain chats with web search, and a one-click “Move to a project” when a conversation turns into real work",
        "Companion Flutter app, CorePilot Messenger, sends agent reports, questions and urgent calls to your phone through a relay"
      ],
      metrics: [["1 : 1", "agent per open project"], ["C++20", "native core, Qt Quick UI"], ["MCP", "tool servers supported"]],
      featured: true
    },
    {
      id: "custom-gcs",
      title: "CorePilot GCS (AH-COMMAND)",
      tagline: "Custom ground control station in Qt 6 / QML, built to replace Mission Planner, with an encrypted link to the drone.",
      domain: "drone",
      status: "dev",
      stack: ["C++", "Qt 6", "QML", "MAVLink", "AES-256-GCM"],
      platforms: ["Windows", "Linux"],
      summary: "A desktop ground station for ArduPilot drones with its own screens for flight data, mission planning, setup and configuration. It connects through CorePilot's encryption gateway, so telemetry and commands travel over an AES-256-GCM link with new ECDH keys for every session.",
      highlights: [
        "Screens for flight data, mission planning, vehicle setup, configuration and the encrypted link",
        "MAVLink over UDP to the encryption gateway and the RFD900x radio",
        "Part of the AntiDroneSystem secure command-and-control stack",
        "Custom frameless window and dark theme"
      ],
      metrics: [["Qt 6", "C++ / QML desktop app"], ["AES-256", "encrypted link with ECDH keys"], ["6", "main screens"]],
      featured: true
    },
    {
      id: "browser",
      title: "CorePilot Browser",
      tagline: "Privacy-focused desktop browser in C++20 on Qt WebEngine, with a built-in download manager.",
      domain: "apps",
      status: "dev",
      stack: ["C++20", "Qt 6", "Qt WebEngine", "yt-dlp", "FFmpeg"],
      platforms: ["Windows", "Linux"],
      summary: "A Chromium-based browser written in C++20, with ad and tracker blocking, HTTPS-First, encrypted DNS and private windows. Its download manager handles files, video and audio from 1000+ sites, plus torrents and magnet links. When the engine can't play a video codec, CorePilot Player streams the video through a local media gateway instead.",
      highlights: [
        "Chrome-style tabs: pin, mute, duplicate, sleeping tabs and lazy session restore",
        "Built-in ad and tracker blocking, HTTPS-First and encrypted DNS",
        "Reader mode, screenshots, save as PDF, developer tools and find in page",
        "A media gateway on 127.0.0.1 that keeps the window's cookies and route (direct or Tor) and rewrites HLS playlists",
        "Successor to the Electron-based Nova browser, with a roadmap tracking feature parity"
      ],
      metrics: [["C++20", "on Chromium through Qt"], ["1000+", "sites supported for media downloads"], ["Tor", "route per window"]],
      featured: true
    },
    {
      id: "torrent",
      title: "CorePilot Torrent",
      tagline: "Fast BitTorrent client for Windows with a clean interface in the style of uTorrent.",
      domain: "apps",
      status: "live",
      stack: ["Electron", "React", "TypeScript", "WebTorrent"],
      platforms: ["Windows"],
      summary: "The torrent engine runs in the main process behind a single, swappable module. The React UI talks to it over typed IPC and receives a snapshot of the stats every second.",
      highlights: [
        "DHT, magnet links and trackers",
        "Typed, context-isolated preload bridge",
        "Windows installer with auto-update"
      ]
    },
    {
      id: "zikrify",
      title: "Zikrify: Azkar-ul-Muslim",
      tagline: "Azkar, the Quran with 7 offline tafsirs, prayer times, Qibla and 8,500+ books. Free, with no ads and no account.",
      domain: "apps",
      status: "live",
      stack: ["Flutter", "Dart", "Gemma (fine-tuned)", "llama.cpp", "LiteRT"],
      platforms: ["Android", "Windows", "Linux"],
      summary: "An Islamic app in English, Urdu and Arabic. It has daily azkar with reminders and streaks, the full Quran in Uthmani script with translations and seven built-in tafsirs, accurate prayer times with ten azan recordings, Qibla, tasbih and a large library. A fine-tuned Gemma model is being brought onto the device through LiteRT, with llama.cpp built for Android.",
      highlights: [
        "87+ morning, evening and sleep azkar with Urdu and English translations, reminders, goals and streaks",
        "Full Quran styled like a printed mushaf, with Urdu and English under every ayah, 7 offline tafsirs and search in three languages",
        "Prayer times with 12 calculation methods, Hanafi or Shafi Asr, high-latitude rules and 10 azans",
        "Fine-tuned Gemma model exported to LiteRT and GGUF; llama.cpp built for Android arm64 and x86_64",
        "Google Play listing in English, Urdu and Arabic; 31 release builds so far"
      ],
      metrics: [["8,500+", "Islamic books in the library"], ["7", "tafsirs that work offline"], ["31", "release builds"]],
      featured: true,
      link: { href: "https://github.com/abduhifz-dev/zikrify-privacy-policy", label: "Privacy policy on GitHub" }
    },

    /* ------ Planned (shown in All projects with the label "Planned") ------ */
    {
      id: "vault",
      title: "CorePilot Vault: Private Knowledge Assistant",
      tagline: "Ask questions across a company's documents and get answers with citations, without data leaving the company network.",
      domain: "ai",
      status: "planned",
      stack: ["Python", "FastAPI", "PostgreSQL + pgvector", "vLLM / llama.cpp", "React"],
      platforms: ["On-premise", "Private cloud"],
      summary: "A retrieval-augmented assistant for teams. It will index documents from file shares, SharePoint and Google Drive, respect each user's access rights, and answer with links to the exact source passages. It is designed to run on the customer's own servers with local models.",
      highlights: [
        "Connectors for file shares, SharePoint, Google Drive and Confluence",
        "Permission-aware search: users only see answers from documents they can open",
        "Every answer cites its sources at paragraph level",
        "SSO (SAML / OIDC), role-based access and a full audit log"
      ]
    },
    {
      id: "gateway",
      title: "CorePilot Gateway: LLM Gateway & Cost Control",
      tagline: "One API in front of every AI model a company uses, with routing, budgets, caching and audit logs.",
      domain: "ai",
      status: "planned",
      stack: ["Go", "Redis", "PostgreSQL", "OpenTelemetry"],
      platforms: ["Docker", "Kubernetes"],
      summary: "A self-hosted gateway that will sit between applications and model providers (OpenAI, Anthropic, Mistral and local models). Teams get one key and one API, while the company controls cost, access and data handling in one place.",
      highlights: [
        "OpenAI-compatible API with routing and automatic failover between providers",
        "Budgets, quotas and rate limits per team and per key",
        "Response caching and PII redaction before requests leave the network",
        "Usage dashboards and an exportable audit trail"
      ]
    },
    {
      id: "observe",
      title: "CorePilot Observe: LLM Observability & Evaluation",
      tagline: "Tracing, cost tracking and automated quality checks for AI features in production.",
      domain: "ai",
      status: "planned",
      stack: ["TypeScript", "ClickHouse", "OpenTelemetry", "React"],
      platforms: ["Cloud", "Self-hosted"],
      summary: "Developer tooling that will record every prompt, tool call and model response in an AI application, so teams can debug failures, track cost and latency, and catch quality regressions before release.",
      highlights: [
        "Step-by-step traces of agent runs and tool calls",
        "Latency, token and cost dashboards per feature and per customer",
        "Evaluation suites that run in CI and block releases that score worse",
        "SDKs for Python, TypeScript and C++"
      ]
    },
    {
      id: "agents",
      title: "CorePilot Agents: Enterprise Agent Platform",
      tagline: "Build, run and supervise tool-using AI agents for business processes, with approvals at every risky step.",
      domain: "ai",
      status: "planned",
      stack: ["Python", "MCP", "Docker", "PostgreSQL", "React"],
      platforms: ["On-premise", "Cloud"],
      summary: "Takes the agent harness behind CorePilot Coder to business workflows. Teams will define agents with tools and permissions, run them in sandboxes, and approve sensitive actions such as sending email or changing records.",
      highlights: [
        "Tool connectors through MCP: email, CRM, databases, file storage",
        "Sandboxed execution with human approval for sensitive actions",
        "Versioned agent definitions with test runs before deployment",
        "Complete activity history for compliance"
      ]
    },
    {
      id: "forge",
      title: "CorePilot Forge: Model Fine-tuning Studio",
      tagline: "Prepare data, fine-tune, evaluate and ship small language models on your own GPUs, without writing training scripts.",
      domain: "ai",
      status: "planned",
      stack: ["C++", "Qt 6 / QML", "PyTorch", "PEFT", "MLflow"],
      platforms: ["Windows", "Linux"],
      summary: "A desktop studio built on the training pipelines I use for my own models. It will guide a team from raw data to a deployable model, with every run tracked and comparable.",
      highlights: [
        "Dataset editor with validation, de-duplication and train/test splits",
        "LoRA and QLoRA training with live loss and GPU memory charts",
        "Side-by-side evaluation against the base model on held-out tests",
        "Model registry with export to GGUF, ONNX and LiteRT"
      ]
    },
    {
      id: "docai",
      title: "CorePilot DocAI: Intelligent Document Processing",
      tagline: "Turns invoices, receipts, contracts and forms into structured data for ERP and accounting systems.",
      domain: "ai",
      status: "planned",
      stack: ["Python", "OCR", "LayoutLM", "FastAPI", "React"],
      platforms: ["Cloud API", "On-premise"],
      summary: "A document pipeline that will classify incoming documents, extract the fields that matter and send clean data to systems such as SAP, Odoo or QuickBooks, with a review screen for low-confidence results.",
      highlights: [
        "Invoice, receipt, purchase order and ID card models, English and Urdu",
        "Confidence scores with a human review queue",
        "REST API, email inbox and folder-watch intake",
        "Exports to ERP and accounting systems and to Excel"
      ]
    },
    {
      id: "review",
      title: "CorePilot Review: AI Code Review",
      tagline: "Automated pull-request reviews for GitHub and GitLab, focused on bugs, security and team rules.",
      domain: "ai",
      status: "planned",
      stack: ["Go", "TypeScript", "GitHub Apps API", "LLM"],
      platforms: ["GitHub", "GitLab", "Self-hosted"],
      summary: "A review bot that will comment on pull requests with likely bugs, security issues and missing tests, following rules each team writes in plain language. It can run against local models for private code.",
      highlights: [
        "Inline comments with suggested fixes",
        "Team rules in a simple config file in the repository",
        "Secret and dependency vulnerability checks",
        "Self-hosted mode for private code and local models"
      ]
    },
    {
      id: "meet",
      title: "CorePilot Meet: Meeting Intelligence",
      tagline: "Transcribes meetings in English and Urdu and turns them into decisions, action items and searchable notes.",
      domain: "ai",
      status: "planned",
      stack: ["C++", "Qt 6", "whisper.cpp", "pyannote", "PostgreSQL"],
      platforms: ["Windows", "macOS", "On-premise server"],
      summary: "A desktop recorder and server that will transcribe meetings, separate speakers, write a short summary with decisions and owners, and push action items to Jira or Asana. Audio can stay on company hardware.",
      highlights: [
        "Transcription with speaker separation, English and Urdu",
        "Summaries with decisions and action items",
        "Jira, Asana and Microsoft Teams integration",
        "Search across all past meetings"
      ]
    },
    {
      id: "speech-sdk",
      title: "CorePilot Speech SDK for Urdu",
      tagline: "Offline speech recognition and text-to-speech for Urdu and Roman Urdu, as an SDK for apps and devices.",
      domain: "ai",
      status: "planned",
      stack: ["C++", "whisper.cpp", "ONNX Runtime", "Kotlin"],
      platforms: ["Android", "Windows", "Linux"],
      summary: "An SDK that will give developers accurate Urdu speech input and natural Urdu voice output without an internet connection, for call centres, kiosks, accessibility tools and in-car systems.",
      highlights: [
        "Speech recognition for Urdu, Roman Urdu and English",
        "Natural Urdu text-to-speech",
        "Runs fully offline on phones and PCs",
        "C API with Kotlin and C# bindings"
      ]
    },
    {
      id: "nastaliq-ocr",
      title: "CorePilot Nastaliq OCR",
      tagline: "OCR engine for Urdu Nastaliq script, turning scanned books, newspapers and records into searchable text.",
      domain: "ai",
      status: "planned",
      stack: ["Python", "PyTorch", "OpenCV", "ONNX Runtime"],
      platforms: ["Windows", "Linux", "REST API"],
      summary: "A recognition engine trained for Nastaliq, the script most Urdu print uses and most OCR tools handle poorly. It will process whole archives and produce searchable PDFs for libraries, publishers and government records.",
      highlights: [
        "Line and ligature recognition for Nastaliq and Naskh",
        "Batch processing of scanned PDFs and images",
        "Searchable PDF, Word and plain-text output",
        "Desktop app and REST API"
      ]
    },
    {
      id: "translate",
      title: "CorePilot Translate: Urdu Language API",
      tagline: "Translation between Urdu and English and conversion between Roman Urdu and Urdu script, as a fast API.",
      domain: "ai",
      status: "planned",
      stack: ["Python", "Transformers", "CTranslate2", "FastAPI"],
      platforms: ["Cloud API", "On-premise"],
      summary: "Language models tuned for Pakistani text that will translate Urdu and English and convert the many spellings of Roman Urdu into correct Urdu script, for apps, keyboards and customer-support tools.",
      highlights: [
        "Urdu ↔ English translation",
        "Roman Urdu ↔ Urdu script conversion that handles spelling variants",
        "Glossaries for brand and domain terms",
        "Low-latency API with batch mode"
      ]
    },
    {
      id: "assist",
      title: "CorePilot Assist: AI Customer Support",
      tagline: "AI agents that answer customers on WhatsApp, Instagram, Messenger and web chat, and hand over to staff when needed.",
      domain: "ai",
      status: "planned",
      stack: ["Node.js", "PostgreSQL", "Redis", "WhatsApp Cloud API", "React"],
      platforms: ["Cloud", "On-premise"],
      summary: "Builds on my agentic messaging work for Facebook and Instagram. It will answer common questions from the company's own knowledge, take orders and bookings, and pass conversations to agents with full context.",
      highlights: [
        "WhatsApp, Instagram, Messenger and website chat in one inbox",
        "Answers in Urdu, Roman Urdu, English and Arabic from approved content",
        "Human handover, assignment rules and response-time targets",
        "CRM integration and conversation analytics"
      ]
    },
    {
      id: "vision",
      title: "CorePilot Vision: AI Video Analytics",
      tagline: "Real-time analytics for existing CCTV cameras: people, vehicles, intrusion zones and alerts.",
      domain: "ai",
      status: "planned",
      stack: ["C++", "TensorRT", "DeepStream", "ONNX Runtime", "React"],
      platforms: ["Jetson edge box", "Windows", "Linux"],
      summary: "Software for security teams that will connect to existing NVRs and IP cameras (Hikvision, Dahua and others), detect events on an edge device and send alerts with video clips, without moving video to the cloud.",
      highlights: [
        "Person, vehicle, loitering and intrusion detection",
        "Works with existing RTSP and ONVIF cameras and NVRs",
        "Alerts on mobile and web with event clips",
        "Runs on an on-site edge appliance"
      ]
    },
    {
      id: "anpr",
      title: "CorePilot ANPR: Number Plate Recognition",
      tagline: "Automatic number plate recognition for gates, parking, housing societies and toll plazas.",
      domain: "ai",
      status: "planned",
      stack: ["C++", "YOLO", "TensorRT", "PostgreSQL"],
      platforms: ["Edge device", "Windows", "Linux"],
      summary: "A plate detection and reading system trained on Pakistani plate formats, including Urdu text, that will control barriers and keep an entry and exit record with photos.",
      highlights: [
        "Trained on Pakistani plate formats",
        "Barrier and access-control integration",
        "Allow and block lists with instant alerts",
        "Entry and exit reports with photo evidence"
      ]
    },
    {
      id: "attend",
      title: "CorePilot Attend: Face Attendance & Access Control",
      tagline: "Face recognition attendance with liveness detection for offices, factories and schools.",
      domain: "ai",
      status: "planned",
      stack: ["C++", "Qt 6", "ONNX Runtime", "PostgreSQL"],
      platforms: ["Windows kiosk", "Android tablet", "Server"],
      summary: "Builds on face attendance I have already shipped in a school app. It will add liveness checks, multiple sites, shift rules and payroll exports, with all face data kept on company servers.",
      highlights: [
        "Face recognition with anti-spoofing liveness checks",
        "Multiple sites, shifts and departments",
        "Payroll and HR exports",
        "Face data stays on company servers"
      ]
    },
    {
      id: "shield",
      title: "CorePilot Shield: Phishing Detection SDK",
      tagline: "Machine-learning detection of phishing and malicious websites for browsers and email gateways.",
      domain: "ai",
      status: "planned",
      stack: ["Python", "LightGBM", "ONNX Runtime", "C++"],
      platforms: ["C++ SDK", "REST API"],
      summary: "A small, fast model that will score URLs and pages for phishing risk inside CorePilot Browser and in other products through an SDK, with a clear reason for every warning.",
      highlights: [
        "Decisions in milliseconds, on the device",
        "Explains why a page was flagged",
        "SDK for browsers and email gateways",
        "Regular model updates"
      ]
    },
    {
      id: "soc-copilot",
      title: "CorePilot SOC Copilot: Security Log Triage",
      tagline: "AI-assisted triage of Windows, Sysmon and firewall logs, mapped to MITRE ATT&CK.",
      domain: "ai",
      status: "planned",
      stack: ["Python", "OpenSearch", "Sigma rules", "LLM"],
      platforms: ["On-premise"],
      summary: "A tool for small security teams that will collect logs, group related events into incidents, map them to MITRE ATT&CK techniques and explain each incident in plain language with suggested next steps.",
      highlights: [
        "Ingests Windows Event Log, Sysmon, syslog and firewall logs",
        "Correlates events into incidents with risk scores",
        "MITRE ATT&CK mapping and plain-language explanations",
        "Reports for management and auditors"
      ]
    },
    {
      id: "media-ai",
      title: "CorePilot Media AI: Subtitles & Video Summaries",
      tagline: "Automatic subtitles, translation and chapter summaries for video libraries.",
      domain: "ai",
      status: "planned",
      stack: ["whisper.cpp", "FFmpeg", "LLM", "Electron"],
      platforms: ["Windows", "Linux", "REST API"],
      summary: "A batch tool for media teams and educators that will subtitle videos, translate them between Urdu and English, and create chapters and summaries for long recordings.",
      highlights: [
        "Subtitles from speech in English and Urdu",
        "Translation with editable subtitle files (SRT, VTT)",
        "Chapters and summaries with timestamps",
        "Batch processing of whole folders"
      ]
    },
    {
      id: "browser-ai",
      title: "CorePilot Browser AI",
      tagline: "On-device AI assistant inside CorePilot Browser for summarising, translating and asking about pages.",
      domain: "ai",
      status: "planned",
      stack: ["C++", "Qt WebEngine", "llama.cpp"],
      platforms: ["Windows", "Linux"],
      summary: "A sidebar for CorePilot Browser that will read the current page and summarise it, translate it or answer questions about it using a local model, with policies for company deployments.",
      highlights: [
        "Page summaries and questions about the open tab",
        "Translation between Urdu and English",
        "Local model: page content never leaves the device",
        "Admin policies for company deployments"
      ]
    },
    {
      id: "mobile-agent",
      title: "CorePilot Mobile Agent: Android Test Automation",
      tagline: "Describe a test in plain language and an AI agent runs it on real Android devices.",
      domain: "ai",
      status: "planned",
      stack: ["Kotlin", "UIAutomator", "Python", "LLM"],
      platforms: ["Android", "Windows", "Linux"],
      summary: "A QA tool that will turn plain-language test steps into actions on real devices, record evidence, and run the same tests on many phones at once.",
      highlights: [
        "Tests written in plain language, run on real devices",
        "Screenshots and video for every step",
        "Parallel runs across many phones",
        "CI integration with JUnit-style reports"
      ]
    },
    {
      id: "edge-runtime",
      title: "CorePilot Edge Runtime",
      tagline: "Deploy, update and monitor AI models on Jetson, Android and Windows devices from one console.",
      domain: "ai",
      status: "planned",
      stack: ["C++", "TensorRT", "ONNX Runtime", "LiteRT", "gRPC"],
      platforms: ["Jetson", "Android", "Windows", "Linux"],
      summary: "One runtime and management console for models running on devices in the field, from drones to CCTV boxes to phones. It will handle the right engine per device, over-the-air updates and health monitoring.",
      highlights: [
        "Single API over TensorRT, ONNX Runtime and LiteRT",
        "Over-the-air model updates with rollback",
        "Device health and inference metrics",
        "Device groups and staged rollouts"
      ]
    },
    {
      id: "benchmark",
      title: "CorePilot Benchmark: Local LLM Sizing",
      tagline: "Measures speed, memory and answer quality of local models on a company's own hardware, before buying more.",
      domain: "ai",
      status: "planned",
      stack: ["C++", "llama.cpp", "Qt Charts"],
      platforms: ["Windows", "Linux"],
      summary: "Runs standard tasks on several local models and hardware setups and reports which model and machine meet the team's speed and quality targets.",
      highlights: [
        "Tokens per second, latency and memory use",
        "Quality tests with automatic scoring",
        "Hardware sizing recommendations",
        "Shareable PDF reports"
      ]
    },
    {
      id: "edu",
      title: "CorePilot Edu: Urdu AI Tutor",
      tagline: "A curriculum-aligned AI tutor that explains maths and science step by step in Urdu, with a teacher dashboard.",
      domain: "ai",
      status: "planned",
      stack: ["Flutter", "LLM", "OCR", "PostgreSQL"],
      platforms: ["Android", "Web"],
      summary: "Students will photograph a question and get a step-by-step explanation in simple Urdu, aligned to Pakistani boards, while teachers see progress and weak topics for each class.",
      highlights: [
        "Photo of a question as input",
        "Step-by-step explanations in Urdu and English",
        "Teacher dashboard with class progress",
        "Practice sets for each weak topic"
      ]
    },
    {
      id: "market-sentiment",
      title: "CorePilot Market Sentiment",
      tagline: "Real-time news sentiment for each currency, delivered as a signal API for trading systems.",
      domain: "ai",
      status: "planned",
      stack: ["Python", "Transformers", "Kafka", "FastAPI"],
      platforms: ["Cloud API"],
      summary: "A service that will read financial news as it arrives, score sentiment and impact for each currency and expose the result to trading systems and MetaTrader 5 Expert Advisors, with history for backtesting.",
      highlights: [
        "Per-currency sentiment and impact scores",
        "Low-latency streaming API",
        "MetaTrader 5 connector",
        "Historical data for backtesting"
      ]
    },
    {
      id: "zikrify-ask",
      title: "Zikrify Ask: Source-Grounded Islamic Q&A",
      tagline: "Answers questions about the Quran and duas only from the app's own verified sources, always with references.",
      domain: "ai",
      status: "planned",
      stack: ["Gemma", "LiteRT", "RAG"],
      platforms: ["Android", "On-device"],
      summary: "An on-device question-answering feature for Zikrify that will answer only from the tafsirs and books already in the app and refuse anything outside them.",
      highlights: [
        "Every answer shows its reference",
        "Runs on the phone, offline",
        "Refuses questions outside its sources",
        "Urdu, English and Arabic"
      ]
    },
    {
      id: "tajweed",
      title: "Tajweed Coach",
      tagline: "A tajweed assessment engine that gives rule-by-rule feedback on Quran recitation, with a teacher mode.",
      domain: "ai",
      status: "planned",
      stack: ["PyTorch", "Audio models", "Flutter"],
      platforms: ["Android", "iOS"],
      summary: "Extends my Quran recitation checker with feedback on tajweed rules such as madd, ghunnah and qalqalah, and a mode for teachers to follow their students' practice.",
      highlights: [
        "Feedback on common tajweed rules",
        "Highlights the exact word and rule",
        "Teacher mode with student progress",
        "Practice drills per rule"
      ]
    },
    {
      id: "fleet",
      title: "CorePilot Fleet: Drone Fleet Management",
      tagline: "One platform for a drone operation: aircraft, pilots, flight logs, maintenance and compliance.",
      domain: "drone",
      status: "planned",
      stack: ["Go", "PostgreSQL + PostGIS", "React", "MAVLink"],
      platforms: ["Cloud", "On-premise"],
      summary: "Software for companies that run many drones. It will import logs automatically from the GCS, track flight hours and maintenance, manage pilot certificates and produce compliance reports.",
      highlights: [
        "Aircraft, battery and component life tracking",
        "Automatic flight log import from CorePilot GCS",
        "Pilot records, certificates and duty time",
        "Maintenance schedules and compliance reports"
      ]
    },
    {
      id: "cloud-gcs",
      title: "CorePilot Cloud GCS",
      tagline: "Browser-based ground control with live video over 4G/5G, for operating drones beyond visual line of sight.",
      domain: "drone",
      status: "planned",
      stack: ["TypeScript", "WebRTC", "Go", "MAVLink"],
      platforms: ["Web", "Cloud", "On-premise"],
      summary: "A web ground station that will connect to drones over cellular networks, so operators can monitor and control missions from a control room or another city, with several operators on one mission.",
      highlights: [
        "Live telemetry and low-latency video over 4G/5G",
        "Multi-operator missions with roles",
        "Encrypted links end to end",
        "Recording and replay of every flight"
      ]
    },
    {
      id: "mission-ai",
      title: "CorePilot Mission AI",
      tagline: "Plans survey, inspection and corridor missions from a plain-language request and a map selection.",
      domain: "drone",
      status: "planned",
      stack: ["Python", "LLM tool calling", "MAVLink"],
      platforms: ["Windows", "Linux"],
      summary: "An assistant inside CorePilot GCS that will turn a request such as \"survey this field at 60 m\" into a complete ArduPilot mission, check it against terrain and airspace rules, and upload it.",
      highlights: [
        "Survey, orbit, corridor and inspection patterns",
        "Terrain, battery and airspace checks before upload",
        "Explains every choice it made",
        "Built into CorePilot GCS"
      ]
    },
    {
      id: "log-intel",
      title: "CorePilot Log Intelligence",
      tagline: "Automatic analysis of ArduPilot flight logs that finds problems and explains their likely cause.",
      domain: "drone",
      status: "planned",
      stack: ["Python", "pymavlink", "scikit-learn"],
      platforms: ["Windows", "Cloud"],
      summary: "A model trained on many flight logs that will flag vibration, power, GPS and control issues at the exact moment they happen, and show fleet-wide trends when used with CorePilot Fleet.",
      highlights: [
        "Detects vibration, power, GPS and control anomalies",
        "Likely cause in plain language",
        "Fleet-wide trend reports",
        "Reads DataFlash .bin and .log and MAVLink .tlog files"
      ]
    },
    {
      id: "tune",
      title: "CorePilot Tune: AI-Assisted Tuning",
      tagline: "Suggests PID and filter settings from a flight log and verifies the improvement on the next flight.",
      domain: "drone",
      status: "planned",
      stack: ["Python", "Signal processing", "ML"],
      platforms: ["Windows", "Linux"],
      summary: "Analyses step responses and noise in a log and suggests specific parameter changes, then compares before and after so tuning becomes repeatable instead of trial and error.",
      highlights: [
        "Parameter suggestions with reasons",
        "Before and after comparison",
        "Copter, plane and VTOL",
        "Exports a parameter file for Mission Planner or CorePilot GCS"
      ]
    },
    {
      id: "agrimap",
      title: "CorePilot AgriMap: Precision Agriculture",
      tagline: "Turns drone imagery into crop health maps and variable-rate spray plans.",
      domain: "drone",
      status: "planned",
      stack: ["Python", "OpenCV", "PyTorch", "GDAL"],
      platforms: ["Windows", "Cloud"],
      summary: "Software for farms and agri-service companies that will stitch drone images, compute vegetation indices, find stressed areas with a model and produce prescription maps for spray drones.",
      highlights: [
        "Orthomosaic stitching and NDVI maps",
        "Stress and disease zones detected by AI",
        "Variable-rate prescription maps for sprayers",
        "Field reports for farmers"
      ]
    },
    {
      id: "inspect",
      title: "CorePilot Inspect: Infrastructure Inspection AI",
      tagline: "Finds defects in solar farms, power lines and telecom towers from drone photos and thermal images.",
      domain: "drone",
      status: "planned",
      stack: ["YOLO", "Thermal imaging", "Python", "PostgreSQL"],
      platforms: ["Windows", "Cloud"],
      summary: "An inspection workflow that will detect hotspots, cracks, corrosion and damaged insulators, place every defect on a map and track its repair status over time.",
      highlights: [
        "Thermal and RGB defect detection",
        "GPS location and photo for every defect",
        "Defect tracking across inspections",
        "PDF reports for asset owners"
      ]
    },
    {
      id: "track",
      title: "CorePilot Track: AI Gimbal Payload",
      tagline: "Locks the camera gimbal on a selected object using onboard detection and tracking.",
      domain: "drone",
      status: "planned",
      stack: ["C++", "TensorRT", "SimpleBGC"],
      platforms: ["Jetson"],
      summary: "Tap an object in the GCS video and the gimbal will follow it, using onboard detection and tracking on a Jetson companion computer.",
      highlights: [
        "Tap-to-track from the GCS video",
        "Smooth gimbal control with prediction",
        "Works with the onboard AI detection",
        "Track status and target position in telemetry"
      ]
    },
    {
      id: "swarm",
      title: "CorePilot Swarm",
      tagline: "Coordinated flight of multiple drones with formation control and collision avoidance.",
      domain: "drone",
      status: "planned",
      stack: ["C++", "ROS 2", "PyTorch", "SITL"],
      platforms: ["Jetson", "Linux"],
      summary: "Formation flying and deconfliction for drone teams, with policies trained in simulation and tested in ArduPilot SITL before real flights.",
      highlights: [
        "Formation changes on command",
        "Collision avoidance between drones",
        "Training and testing in ArduPilot SITL",
        "Swarm view in CorePilot GCS"
      ]
    },
    {
      id: "sar",
      title: "CorePilot SAR: Search & Rescue",
      tagline: "Onboard person detection in thermal and colour video, with GPS-tagged alerts to the ground station.",
      domain: "drone",
      status: "planned",
      stack: ["YOLO", "TensorRT", "MAVLink"],
      platforms: ["Jetson", "Windows"],
      summary: "A payload and software package for rescue teams that will detect people during search flights and mark each detection on the GCS map with a photo and coordinates.",
      highlights: [
        "Thermal and colour person detection",
        "GPS-tagged alerts on the GCS map",
        "Search pattern planning",
        "Works at night"
      ]
    },
    {
      id: "gcs-copilot",
      title: "CorePilot GCS Copilot",
      tagline: "An assistant inside the ground station that explains warnings and failsafes from live telemetry.",
      domain: "drone",
      status: "planned",
      stack: ["LLM", "Qt 6", "MAVLink"],
      platforms: ["Windows", "Linux"],
      summary: "Answers questions such as \"why did it switch to RTL?\" from live telemetry and logs, and explains pre-arm errors in plain language, so operators fix problems faster.",
      highlights: [
        "Explains warnings, pre-arm errors and failsafes",
        "Answers from live telemetry and logs",
        "Voice input during flight",
        "Built into CorePilot GCS"
      ]
    },

    /* ------ Hidden: real projects kept here but not shown on the site. Delete the hidden line to show one again ------ */
    {
      id: "omni",
      images: [
        {
          src: "assets/img/omni-architecture.webp",
          w: 1400,
          h: 724,
          alt: "CorePilot-Omni architecture: vision and audio encoders feeding Qwen3-0.6B"
        }
      ],
      title: "CorePilot-Omni",
      tagline: "A small multimodal agent model (images, video, audio and tools) trained on a 6 GB laptop GPU, with a 181-page course.",
      domain: "ai",
      status: "build",
      stack: ["PyTorch", "Transformers", "PEFT / LoRA", "SigLIP2", "Whisper"],
      platforms: ["RTX 4050 Laptop (6 GB)"],
      summary: "A small agentic model that sees images and video, hears audio, reasons in a short think block and acts through a real agent harness. Qwen3-0.6B (LoRA r=64) is connected to a frozen SigLIP2 vision tower and a frozen Whisper-small encoder through two trained projectors: about 0.93B parameters, of which 48.8M are trained.",
      highlights: [
        "97.6% on 41 held-out text agent tasks with real tools. The base model scores 39.0% in the same harness",
        "Agent harness: tool registry with automatic JSON schemas, sandboxed workspace, 11 built-in tools, JSON repair, a duplicate-call guard and human confirmation for dangerous tools",
        "Held-out video tests: 79% on colour change, 77% on growth, 68% on ordering",
        "Known weaknesses are published with the results: open speech recognition and counting",
        "181-page course PDF in Roman Urdu with English technical terms"
      ],
      metrics: [["97.6%", "agent tasks (base model: 39.0%)"], ["6 GB", "of GPU memory used to train it"], ["181", "page course written alongside"]],
      hidden: true
    },
    {
      id: "agentic-course",
      title: "CorePilot Agentic AI Course",
      tagline: "A 181-page course in Roman Urdu that explains step by step how CorePilot-Omni was designed, trained and tested.",
      domain: "ai",
      status: "live",
      stack: ["Python", "PyTorch", "ReportLab", "Matplotlib"],
      summary: "Written alongside the CorePilot-Omni model. It walks through the whole build (data, architecture, training stages, the agent harness and the evaluation) using the real loss curves and results from the training runs. Roman Urdu with English technical terms.",
      highlights: [
        "181 pages, generated as a PDF from source",
        "Figures made from the real training runs: loss curves, data mix and learning-rate schedule",
        "Also covers what didn't work, such as speech recognition and counting"
      ],
      hidden: true
    },
    {
      id: "intelligence",
      title: "AbduIntelligence Systems",
      tagline: "Multi-client LLM inference platform: a Qt server, a FastAPI model host and concurrent chat slots that share one copy of the weights.",
      domain: "ai",
      status: "dev",
      stack: ["C++ / Qt", "FastAPI", "llama.cpp", "QML", "WebSockets", "SSE"],
      platforms: ["Windows"],
      summary: "A streaming inference stack. A Qt server owns every WebSocket client plus authentication, the database and plans. A FastAPI backend owns the model and streams each chat. The weights load once and are shared across N independent slots through llama.cpp's memory-mapped pages.",
      highlights: [
        "N chats stream at the same time from one copy of the weights",
        "Runs GGUF models through llama.cpp, or Hugging Face safetensors with LoRA / PEFT adapters from training runs",
        "Qt / QML desktop client connects to the server over WebSockets",
        "Includes its own 10,000-example fine-tuning dataset"
      ],
      hidden: true
    },
    {
      id: "imager",
      title: "CorePilot AI Imager",
      tagline: "Offline image, video and video-with-sound generation in a native C++20 / Qt 6 app.",
      domain: "ai",
      status: "build",
      stack: ["C++20", "Qt 6 / QML", "stable-diffusion.cpp", "CUDA", "Vulkan"],
      platforms: ["Windows"],
      summary: "A desktop studio that generates and edits images with Qwen-Image, makes short clips with Wan 2.2, and makes clips with a matching soundtrack with MiniMax-H3. It is built on stable-diffusion.cpp and runs on CUDA, Vulkan or the CPU. Nothing leaves the machine; the only network access is the optional model download.",
      highlights: [
        "Generate from text, edit with up to 10 reference images, and output transparent RGBA",
        "Video clips of 1–5 s, saved as H.264 MP4 with the system encoder, so no ffmpeg install is needed",
        "Live denoising preview, a queue, ETA and cancel",
        "Model manager detects the hardware, recommends variants, checks SHA-256 and resumes broken downloads",
        "Searchable gallery, full metadata embedded in every PNG, and a headless CLI for scripting"
      ],
      hidden: true
    },
    {
      id: "ayah",
      title: "Ayah AI",
      tagline: "Quran recitation checker that listens and colours every word: correct, wrong or missed, or a harakat mistake.",
      domain: "ai",
      status: "dev",
      stack: ["Flutter", "Dart", "On-device Arabic STT"],
      platforms: ["Android", "iOS"],
      summary: "The user recites a surah and the app follows word by word. A word turns green when it is read correctly, red when it is wrong or skipped, and blue when the word is right but a zabar, zer or pesh is wrong. Speech recognition runs on the device.",
      highlights: [
        "Live, word-level feedback during recitation",
        "Separate detection for harakat (vowel-mark) errors",
        "Demo mode that simulates a recitation with injected mistakes",
        "Starts with Surah Al-Fatiha"
      ],
      hidden: true
    },
    {
      id: "social-agent",
      title: "Agentic Social Inbox",
      tagline: "AI agent that answers a business's Facebook and Instagram messages, with a live dashboard and a multilingual fine-tuning set.",
      domain: "ai",
      status: "build",
      stack: ["Node.js", "Claude API", "React", "Socket.IO", "FastAPI", "Transformers"],
      summary: "An agentic messaging backend that replies to customers on Facebook and Instagram, queues and schedules follow-ups, and streams activity to a React dashboard. Built for an aviation-tourism client.",
      highlights: [
        "Uses the Claude API to understand messages and write replies",
        "Request queue and scheduled follow-ups with node-cron",
        "Real-time React dashboard with charts over Socket.IO",
        "Local inference engine on FastAPI + Transformers as an alternative to the hosted model"
      ],
      hidden: true
    },
    {
      id: "pgc-bot",
      title: "Multilingual Customer-Service Bot",
      tagline: "Fine-tuning dataset and LoRA training pipeline for a customer-service chatbot in English, Urdu, Roman Urdu and Arabic.",
      domain: "ai",
      status: "build",
      stack: ["Python", "Transformers", "LoRA / PEFT", "Qwen"],
      summary: "Built for an aviation-tourism client: 883 conversations about bookings, courses and services in four languages, plus scripts that train a Qwen model with LoRA, merge the adapter and test the result.",
      highlights: [
        "883 examples: English, Urdu, Roman Urdu, Arabic, multi-turn dialogues and edge cases",
        "Teaches the model to politely turn down off-topic questions",
        "Never invents prices, dates or facts",
        "Prompt-injection resistance built into the training data"
      ],
      hidden: true
    },
    {
      id: "zikrify-ai",
      title: "Zikrify AI Model",
      tagline: "Gemma 4 E2B fine-tuned with LoRA for the Zikrify app, exported to run on phones with LiteRT and as GGUF for llama.cpp.",
      domain: "ai",
      status: "build",
      stack: ["Python", "Gemma 4 E2B", "LoRA", "LiteRT", "llama.cpp"],
      summary: "A one-click pipeline that installs everything, checks the base model, trains a LoRA for two epochs, merges it, compares answers with the original model and exports a .litertlm file for the phone. The same model was also converted to GGUF, and llama.cpp was built for Android.",
      highlights: [
        "Dataset: 2,330 training, 124 validation and 88 test examples",
        "Automatic before/after comparison against the base model",
        "Exports .litertlm for on-device use and GGUF files for llama.cpp",
        "llama.cpp built for Android arm64-v8a and x86_64"
      ],
      hidden: true
    },
    {
      id: "messenger",
      title: "CorePilot Messenger",
      tagline: "Phone app for CorePilot Coder that shows your agents' reports, questions and urgent calls like a chat app.",
      domain: "ai",
      status: "dev",
      stack: ["Flutter", "Dart", "Relay server"],
      summary: "When an agent in CorePilot Coder finishes a task, needs an answer or runs into something urgent, the message reaches your phone through CorePilot's relay, so long jobs keep moving while you're away from the desk.",
      highlights: [
        "Reports, questions and urgent calls from every agent in one chat list",
        "Messages travel through CorePilot's relay server",
        "Companion to the CorePilot Coder desktop app"
      ],
      hidden: true
    },
    {
      id: "voice",
      title: "CorePilot Voice",
      tagline: "Offline voice control with a wake word, voice commands and a check that the speaker is you.",
      domain: "ai",
      status: "dev",
      stack: ["Python", "Speech recognition", "Speaker verification"],
      summary: "Early work on an offline voice layer for CorePilot apps. It waits for a wake word, understands the command that follows and ignores other people's voices. Everything runs on the local machine.",
      highlights: [
        "Wake-word detection",
        "Voice commands recognised offline",
        "Speaker check so other voices don't trigger it"
      ],
      hidden: true
    },
    {
      id: "abdustation",
      title: "AbduStation GCS",
      tagline: "Ground station for the AbduSky drone: live telemetry, offline maps, mission planning and video with an AI detection overlay.",
      domain: "drone",
      status: "dev",
      stack: ["C++17", "Qt 6 / QML", "OpenSSL 3", "SQLite"],
      platforms: ["Windows"],
      summary: "The ground side of the AbduSky system. It shows 40+ live values, plans missions on a map that also works offline, streams video with AI detections drawn on top, and talks to the drone over the encrypted AbduLink v2 protocol.",
      highlights: [
        "Telemetry dashboard with 40+ live values",
        "2D map with flight path, waypoints and geofence; offline tile caching and area download",
        "Live video with an AI detection overlay",
        "AbduLink v2: AES-256-GCM, Curve25519 key exchange and anti-replay nonces",
        "PID tuning, motor output and RC views, a 10-phase flight simulator and a SITL connection",
        "Encrypted SQLite settings database"
      ],
      hidden: true
    },
    {
      id: "ai-detection",
      title: "Onboard AI Object Detection",
      tagline: "YOLOv8-nano on a Jetson with TensorRT FP16 for real-time detection and tracking from the drone's camera.",
      domain: "drone",
      status: "dev",
      stack: ["Python", "ROS 2", "YOLOv8", "TensorRT", "OpenCV"],
      platforms: ["Jetson Orin Nano"],
      summary: "A ROS 2 node that subscribes to the camera, runs YOLOv8-nano on the Jetson GPU with TensorRT in FP16 and publishes detections in the standard vision_msgs format. A second node tracks the detected objects from frame to frame.",
      highlights: [
        "TensorRT FP16 inference on the Jetson Orin Nano",
        "Publishes Detection2DArray messages for other nodes",
        "Separate tracking node keeps object IDs stable between frames",
        "Feeds the AI follow mode and the ground station's video overlay"
      ],
      hidden: true
    },
    {
      id: "ai-follow",
      title: "AI Follow Mode",
      tagline: "Follows a tracked person or vehicle in follow-behind, orbit or side-follow mode, with Kalman smoothing and safety limits.",
      domain: "drone",
      status: "dev",
      stack: ["C++", "ROS 2", "DeepSORT", "Kalman filter"],
      summary: "Takes a target tracked with DeepSORT and turns it into GUIDED position targets that the companion bridge sends to the flight controller. Smoothing and limits keep the motion safe.",
      highlights: [
        "Three modes: follow behind, orbit and side follow",
        "Kalman smoothing of the target track",
        "Safety limits on the generated position targets"
      ],
      hidden: true
    },
    {
      id: "obstacle-detection",
      title: "Stereo Obstacle Detection",
      tagline: "CUDA-accelerated stereo depth from two global-shutter cameras, publishing obstacle distances at 20 Hz.",
      domain: "drone",
      status: "dev",
      stack: ["C++", "CUDA", "ROS 2", "OpenCV"],
      platforms: ["Jetson Orin Nano"],
      summary: "Uses a pair of OV9282 global-shutter cameras at 60 Hz to compute depth on the Jetson GPU, then reports the distance to obstacles around the drone for the avoidance logic.",
      highlights: [
        "60 Hz stereo input and 20 Hz obstacle distances",
        "Depth computed on the GPU with CUDA",
        "Calibrated stereo pair with a YAML calibration file",
        "Debug depth image for tuning"
      ],
      hidden: true
    },
    {
      id: "precision-landing",
      title: "Precision Landing",
      tagline: "ArUco marker detection from the downward camera, giving the landing target's position at 30 Hz.",
      domain: "drone",
      status: "dev",
      stack: ["Python", "ROS 2", "OpenCV ArUco"],
      summary: "During landing, the node finds an ArUco marker in the downward camera image and publishes its position, so the drone lands on the marker instead of only the GPS point.",
      highlights: [
        "Landing target pose published at 30 Hz",
        "Target estimate smoothed over recent frames",
        "Annotated debug image for checking detection"
      ],
      hidden: true
    },
    {
      id: "slam",
      title: "Visual-Inertial SLAM",
      tagline: "ORB-SLAM3 with a stereo camera pair and an IMU, giving the drone its position where GPS isn't available.",
      domain: "drone",
      status: "dev",
      stack: ["C++", "ROS 2", "ORB-SLAM3", "Eigen"],
      summary: "Feeds the OV9282 stereo pair and the IMU into ORB-SLAM3 and publishes the drone's pose and a point cloud. The mission and fusion nodes use them when GPS is weak or missing.",
      highlights: [
        "Stereo + IMU visual-inertial mode",
        "Publishes pose with covariance and a point cloud",
        "Used for GPS-denied navigation"
      ],
      hidden: true
    },
    {
      id: "gps-denied-missions",
      title: "GPS-Denied Mission Execution",
      tagline: "Keeps flying a waypoint mission after GPS is lost by switching to SLAM-based local navigation.",
      domain: "drone",
      status: "dev",
      stack: ["C++", "ROS 2", "SLAM"],
      summary: "While GPS and SLAM are both available, the node learns the transform between them. If GPS drops out, it converts the remaining GPS waypoints into SLAM coordinates and finishes the mission.",
      highlights: [
        "Automatic switch between GPS and SLAM navigation",
        "GPS-to-SLAM transform computed while both are available",
        "Remaining waypoints converted on the fly"
      ],
      hidden: true
    },
    {
      id: "sensor-fusion",
      title: "15-State EKF Sensor Fusion",
      tagline: "Extended Kalman Filter that fuses IMU, GPS, barometer, optical flow and SLAM into one position estimate.",
      domain: "drone",
      status: "dev",
      stack: ["C++", "ROS 2", "Eigen"],
      summary: "A 15-state EKF on the companion computer. It combines all of the drone's position sources and keeps a usable estimate when any one of them is missing or noisy.",
      highlights: [
        "Fuses IMU, GPS, barometer, optical flow and SLAM pose",
        "Noise parameters set in a YAML file",
        "Odometry output for the navigation nodes"
      ],
      hidden: true
    },
    {
      id: "antidrone",
      title: "AntiDroneSystem",
      tagline: "Secure drone command and control: an encrypted, forward-secret radio link, GPS-spoofing resilience and GPS-denied navigation.",
      domain: "drone",
      status: "dev",
      stack: ["C++ / Qt 6", "QML", "Python", "OpenCV", "PlatformIO", "Kotlin", "MAVLink"],
      platforms: ["Windows", "Linux", "Jetson", "Arduino Portenta", "Android"],
      summary: "A defensive stack that makes a friendly drone resistant to spoofing and jamming, and lets it fly home when GPS is lost. It has five parts: a Qt 6 ground station, an encryption gateway between the radio and the ground software, a Jetson companion computer running sensor fusion, Portenta firmware, and an Android key app. A written wire protocol defines how they talk.",
      highlights: [
        "AH-COMMAND: a Qt 6 / QML ground station built to replace Mission Planner",
        "gcs-gateway: AES-256-GCM with ephemeral ECDH keys between the RFD900x radio and the ground station",
        "Hybrid multi-sensor fusion EKF for GPS-denied navigation, day and night, on a Jetson companion",
        "Portenta firmware (PlatformIO) and an Android hardware-key app",
        "Written wire-protocol specification and CI workflows"
      ],
      metrics: [["AES-256", "GCM with ECDH forward secrecy"], ["EKF", "for GPS-denied navigation"], ["5", "components working together"]],
      hidden: true
    },
    {
      id: "dronecontroller",
      title: "DroneController",
      tagline: "One server for controlling Pixhawk and DJI drones from desktop and Android, with telemetry fan-out over MQTT.",
      domain: "drone",
      status: "dev",
      stack: ["Python", "MAVSDK", "MQTT", "FastAPI", "React", "Electron", "Capacitor"],
      summary: "A three-tier, multi-vehicle control system. Agents on the drone side talk to the hardware (Pixhawk over MAVLink, DJI through Android). An MQTT broker with a FastAPI service relays telemetry and commands. A single React control app runs on desktop (Electron) and Android (Capacitor).",
      highlights: [
        "Pixhawk and DJI drones behind one protocol",
        "Each drone's data fans out to many control apps at once",
        "Missions, parameters and full control from a desktop or a phone, on Leaflet maps",
        "One-click launcher for the server"
      ],
      hidden: true
    },
    {
      id: "stream-analyzer",
      title: "CorePilot Stream Analyzer",
      tagline: "Desktop ArduPilot log analyzer with GPU plotting, a 3D globe replay and live telemetry.",
      domain: "drone",
      status: "live",
      stack: ["Electron", "Python", "pymavlink", "Plotly", "CesiumJS", "Leaflet"],
      platforms: ["Windows"],
      summary: "Opens DataFlash .bin and .log files and MAVLink .tlog files. You can plot any field, browse every message, replay the flight on a 3D globe with a live HUD, and read parameters with full descriptions, all offline. It can also connect to a live vehicle.",
      highlights: [
        "GPU-accelerated plots with many traces and split Y-axes",
        "3D flight replay on a CesiumJS globe with bundled offline imagery, plus optional satellite imagery",
        "Parameter view in the style of Mission Planner, with units, ranges and descriptions from ArduPilot metadata",
        "Flight-mode timeline, messages by severity and an overview of the flight",
        "Live telemetry, MAVFTP and a SITL manager. The backend is compiled to native modules to protect the code"
      ],
      hidden: true
    },
    {
      id: "chess",
      title: "CP Chess",
      tagline: "Chess app with a live offline coach that rates every move and explains why, plus Lichess and chess.com integration.",
      domain: "apps",
      status: "build",
      stack: ["Flutter", "Dart", "C++ engine", "OAuth + PKCE"],
      platforms: ["Android"],
      summary: "Play a native chess engine at six levels while a coach rates each move from Best to Blunder, explains mistakes, draws the better move and warns about threats. Review games from chess.com and Lichess, practise your own mistakes, solve puzzles and learn openings.",
      highlights: [
        "Coach that gives a reason for every suggestion, names the opening and allows take-backs",
        "Game review with accuracy for both sides",
        "3,660 rated puzzles, 19 interactive lessons and 3,865 named opening positions",
        "Lichess login (OAuth + PKCE) and play; chess.com profile and games",
        "Real-board mode: enter moves by tapping or with the camera"
      ],
      metrics: [["6", "bot levels with a live coach"], ["3,660", "rated puzzles"], ["19", "interactive lessons"]],
      images: [
        { src: "assets/img/chess-home.webp", w: 540, h: 1080, alt: "CP Chess home screen", phone: true },
        { src: "assets/img/chess-coach.webp", w: 540, h: 1080, alt: "CP Chess coach rating a move", phone: true }
      ],
      hidden: true
    },
    {
      id: "madrasa",
      title: "Madrasa Management System",
      tagline: "Offline-first school management for Android and Windows, with on-device face attendance.",
      domain: "apps",
      status: "build",
      stack: ["Flutter", "SQLite", "Provider", "Google ML Kit", "fl_chart"],
      platforms: ["Android", "Windows"],
      summary: "Students, fees, expenses, attendance and reports for a madrasa, from a single Flutter code base. Attendance can be marked by face: the camera detects the face on the device and matches it to an enrolled student.",
      highlights: [
        "Dashboard with the balance and an expense breakdown",
        "Fee history per student, expense categories and monthly totals",
        "AI face attendance on Android",
        "Clean layering: models → repositories → providers → screens"
      ],
      hidden: true
    }
  ]
};
