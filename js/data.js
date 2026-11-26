/* =====================================================================
   PORTFOLIO DATA — the only file you need to edit to add a project.

   Add an object to `projects` (copy an existing one). Fields:
     id          unique, lowercase, used in links: ?p=<id>
     title       project name
     tagline     one line (shown in the index)
     domain      ai | flight | hardware | desktop | mobile | trading | docs
     status      live | build | dev | design   (statusText overrides the label)
     stack       technologies (first 3 are shown in the index)
     platforms   optional
     summary     2–3 sentences (shown in the case study)
     highlights  bullet points
     metrics     optional [["value","label"], ...] — big numbers
     featured    optional true  → appears in "Selected work" (keep it to 6)
     motif       for featured cards: code | neural | pcb | radar | browser | geo
     layers      optional, drone-stack rows: hw | fw | link | gcs | analysis | design
     link        optional { href, label }
   ===================================================================== */

window.PORTFOLIO = {
  profile: {
    name: "Abdul Rehman",
    email: "abduhifz@gmail.com",
    github: "https://github.com/abduhifz-dev",
    linkedin: "https://www.linkedin.com/in/abdul-rehman-01b588256/",
    location: "Islamabad, Pakistan",
    timezone: "Asia/Karachi"
  },

  domains: {
    ai:       { label: "AI & ML" },
    flight:   { label: "Flight software" },
    hardware: { label: "Hardware" },
    desktop:  { label: "Desktop" },
    mobile:   { label: "Mobile" },
    trading:  { label: "Trading" },
    docs:     { label: "Docs & courses" }
  },

  statuses: {
    live:   "Released",
    build:  "Working build",
    dev:    "In development",
    design: "Hardware design"
  },

  layers: [
    { id: "hw",       name: "Hardware",            desc: "Boards, power and RF ground equipment designed in KiCad." },
    { id: "fw",       name: "Firmware & autopilot", desc: "Custom ArduPilot builds, flight firmware and Lua scripts." },
    { id: "link",     name: "Link & security",     desc: "Encrypted, forward-secret radio links and tracking." },
    { id: "gcs",      name: "Ground control",      desc: "Ground stations and multi-vehicle control." },
    { id: "analysis", name: "Logs & analysis",     desc: "Turning flight logs into answers and reports." },
    { id: "design",   name: "Design & knowledge",  desc: "Aircraft design tools, parts data and training material." }
  ],

  projects: [
    /* ------------------------------------------------------------ AI */
    {
      id: "coder",
      title: "CorePilot Coder",
      tagline: "Desktop AI coding agent that reads, plans, edits and runs. One agent per project, and you approve every step.",
      domain: "ai", status: "dev",
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
      featured: true, motif: "code"
    },
    {
      id: "omni",
      title: "CorePilot-Omni",
      tagline: "A multimodal, tool-using model trained from scratch on a 6 GB laptop GPU, with a 181-page course on how it was built.",
      domain: "ai", status: "build",
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
      featured: true, motif: "neural"
    },
    {
      id: "intelligence",
      title: "AbduIntelligence Systems",
      tagline: "Multi-client LLM inference platform: a Qt server, a FastAPI model host and concurrent chat slots that share one copy of the weights.",
      domain: "ai", status: "dev",
      stack: ["C++ / Qt", "FastAPI", "llama.cpp", "QML", "WebSockets", "SSE"],
      platforms: ["Windows"],
      summary: "A streaming inference stack. A Qt server owns every WebSocket client plus authentication, the database and plans. A FastAPI backend owns the model and streams each chat. The weights load once and are shared across N independent slots through llama.cpp's memory-mapped pages.",
      highlights: [
        "N chats stream at the same time from one copy of the weights",
        "Runs GGUF models through llama.cpp, or Hugging Face safetensors with LoRA / PEFT adapters from training runs",
        "Qt / QML desktop client connects to the server over WebSockets",
        "Includes its own 10,000-example fine-tuning dataset"
      ]
    },
    {
      id: "imager",
      title: "CorePilot AI Imager",
      tagline: "Offline image, video and video-with-sound generation in a native C++20 / Qt 6 app.",
      domain: "ai", status: "build",
      stack: ["C++20", "Qt 6 / QML", "stable-diffusion.cpp", "CUDA", "Vulkan"],
      platforms: ["Windows"],
      summary: "A desktop studio that generates and edits images with Qwen-Image, makes short clips with Wan 2.2, and makes clips with a matching soundtrack with MiniMax-H3. It is built on stable-diffusion.cpp and runs on CUDA, Vulkan or the CPU. Nothing leaves the machine; the only network access is the optional model download.",
      highlights: [
        "Generate from text, edit with up to 10 reference images, and output transparent RGBA",
        "Video clips of 1–5 s, saved as H.264 MP4 with the system encoder, so no ffmpeg install is needed",
        "Live denoising preview, a queue, ETA and cancel",
        "Model manager detects the hardware, recommends variants, checks SHA-256 and resumes broken downloads",
        "Searchable gallery, full metadata embedded in every PNG, and a headless CLI for scripting"
      ]
    },
    {
      id: "ayah",
      title: "Ayah AI",
      tagline: "Quran recitation checker that listens and colours every word: correct, wrong or missed, or a harakat mistake.",
      domain: "ai", status: "dev",
      stack: ["Flutter", "Dart", "On-device Arabic STT"],
      platforms: ["Android", "iOS"],
      summary: "The user recites a surah and the app follows word by word. A word turns green when it is read correctly, red when it is wrong or skipped, and blue when the word is right but a zabar, zer or pesh is wrong. Speech recognition runs on the device.",
      highlights: [
        "Live, word-level feedback during recitation",
        "Separate detection for harakat (vowel-mark) errors",
        "Demo mode that simulates a recitation with injected mistakes",
        "Starts with Surah Al-Fatiha"
      ]
    },
    {
      id: "social-agent",
      title: "Agentic Social Inbox",
      tagline: "AI agent that answers a business's Facebook and Instagram messages, with a live dashboard and a multilingual fine-tuning set.",
      domain: "ai", status: "build",
      stack: ["Node.js", "Claude API", "React", "Socket.IO", "FastAPI", "Transformers"],
      summary: "An agentic messaging backend that replies to customers on Facebook and Instagram, queues and schedules follow-ups, and streams activity to a React dashboard. Built for an aviation-tourism client, together with a production fine-tuning dataset and a local model engine.",
      highlights: [
        "883-example dataset in English, Urdu, Roman Urdu and Arabic",
        "The dataset teaches the model to stay on topic, never invent prices or dates, and resist prompt injection",
        "Queued, cron-scheduled follow-ups and a real-time dashboard over Socket.IO",
        "Local inference engine on FastAPI + Transformers as an alternative to the hosted model"
      ]
    },

    /* ------------------------------------------------- Flight software */
    {
      id: "antidrone",
      title: "AntiDroneSystem",
      tagline: "Secure drone command and control: an encrypted, forward-secret radio link, GPS-spoofing resilience and GPS-denied navigation.",
      domain: "flight", status: "dev",
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
      featured: true, motif: "radar",
      layers: ["link", "gcs"]
    },
    {
      id: "abdusky", short: "AbduSky",
      title: "AbduSky UAV Ecosystem",
      tagline: "Drone, antenna tracker and ground station designed as one system: flight firmware, ROS 2 autonomy and an encrypted link.",
      domain: "flight", status: "dev",
      stack: ["C / C++17", "FreeRTOS", "ROS 2", "Python", "Qt 6 / QML", "STM32"],
      platforms: ["STM32H743", "Jetson Orin Nano", "Raspberry Pi 5"],
      summary: "Three connected projects: AbduAir (the drone), AbduTracker (an antenna-tracking hub) and AbduStation (the ground station). The drone runs its own flight firmware on an STM32H743, plus a Jetson companion running ROS 2 for detection, following, obstacle avoidance and precision landing.",
      highlights: [
        "AbduFlight firmware on FreeRTOS: IMU at 1 kHz, PID at 400 Hz, navigation at 50 Hz",
        "10 sensor drivers, including ICM-42688, BMI088, MS5611, dual u-blox GPS, CRSF and DShot",
        "12 ROS 2 packages: AI detection, follow, mission AI, obstacle avoidance, optical flow and precision landing",
        "AbduLink v2 protocol: AES-256-GCM with Curve25519 ECDH and 52 message types",
        "20 flight modes, SITL, a bootloader and 126 unit tests"
      ],
      layers: ["fw", "link"]
    },
    {
      id: "freefall",
      title: "CorePilot FreeFall",
      tagline: "ArduCopter firmware that detects a fall, arms itself, levels the airframe and recovers. Made for drop launches and as a safety net.",
      domain: "flight", status: "build",
      stack: ["C++", "ArduPilot", "ChibiOS", "SITL"],
      platforms: ["Cube Orange / Orange+ / Black", "Pixhawk 6C", "CUAV X25 EVO / MEGA"],
      summary: "A custom ArduCopter 4.7.2 build that watches the descent rate in every mode, armed or not. When it detects a fall it can arm the vehicle, switch to a new FREEFALL flight mode, hold the airframe level, stop the descent after a set delay, and then rejoin the mission or switch to a mode you choose.",
      highlights: [
        "New flight mode (29) with its own CPFF_ parameter group and RC option",
        "Drop launch from a carrier aircraft, a balloon or by hand",
        "Optional flight back towards the mission before handing over to AUTO",
        "Builds for 6 flight controllers and passes 6 automated SITL tests",
        "14-page user manual with safety procedures"
      ],
      layers: ["fw"]
    },
    {
      id: "switchblade",
      title: "CorePilot SwitchBlade",
      tagline: "ArduPlane firmware for folding-wing aircraft that deploys the wings automatically at launch or in flight.",
      domain: "flight", status: "build",
      stack: ["C++", "ArduPilot", "ArduPlane 4.7.2"],
      platforms: ["CUAV X25-EVO"],
      summary: "Firmware that controls wing deployment for folding-wing aircraft. Deployment runs as a state machine triggered by an RC switch, a catapult launch or measured velocity. It adds level assist while the wings unfold, plus throttle hold and auto takeoff.",
      highlights: [
        "CPSB_ parameter group, three new servo output functions and an RC option",
        "Triggers: RC switch, catapult or bungee launch, and in-flight velocity",
        "Level-assist control law with a tuning procedure",
        "Full manual covering installation, bench tests and operating procedures"
      ],
      layers: ["fw"]
    },
    {
      id: "efi-zk",
      title: "EFI ZK Driver",
      tagline: "ArduPilot Lua driver that brings telemetry from ZK-protocol engine ECUs into the autopilot, read-only by design.",
      domain: "flight", status: "build",
      stack: ["Lua", "ArduPilot scripting", "Python"],
      summary: "A scripting EFI driver for engine control units that speak ZK protocol V1.2 over a UART. It parses the ECU's status packets and feeds them to ArduPilot's EFI library, so engine data shows up in the ground station and in the logs. It never sends throttle or start commands.",
      highlights: [
        "Telemetry only: the one thing it can transmit is the protocol's idle command, and only when that is enabled",
        "Serial sniffer tool that finds the ECU's baud rate",
        "Python unit tests for the packet parser"
      ],
      layers: ["fw"]
    },
    {
      id: "dead-reckoning", short: "Dead Reckoning",
      title: "Mission-aware Dead Reckoning",
      tagline: "Lua script that keeps a multicopter flying its mission on an estimated position when GPS or the EKF fails.",
      domain: "flight", status: "build",
      stack: ["Lua", "ArduCopter 4.5+"],
      summary: "Monitors GPS quality and the EKF failsafe. When either one degrades far from home in a protected mode, the script takes over in Guided_NoGPS and flies on an open-loop position estimate built from the last known velocity, heading and wind. It either returns home or continues through the remaining AUTO waypoints.",
      highlights: [
        "Two behaviours: fly straight home, or continue the mission on the estimate",
        "Syncs the mission index back when GPS or the EKF recovers",
        "Wind-aware estimate built from the last known state"
      ],
      layers: ["fw"]
    },
    {
      id: "dronecontroller",
      title: "DroneController",
      tagline: "One server for controlling Pixhawk and DJI drones from desktop and Android, with telemetry fan-out over MQTT.",
      domain: "flight", status: "dev",
      stack: ["Python", "MAVSDK", "MQTT", "FastAPI", "React", "Electron", "Capacitor"],
      summary: "A three-tier, multi-vehicle control system. Agents on the drone side talk to the hardware (Pixhawk over MAVLink, DJI through Android). An MQTT broker with a FastAPI service relays telemetry and commands. A single React control app runs on desktop (Electron) and Android (Capacitor).",
      highlights: [
        "Pixhawk and DJI drones behind one protocol",
        "Each drone's data fans out to many control apps at once",
        "Missions, parameters and full control from a desktop or a phone, on Leaflet maps",
        "One-click launcher for the server"
      ],
      layers: ["gcs"]
    },
    {
      id: "dronehud",
      title: "Drone HUD",
      tagline: "Glass-cockpit flight display in a single HTML file: attitude, tapes, compass and a mini-map.",
      domain: "flight", status: "dev",
      stack: ["HTML", "CSS", "JavaScript"],
      summary: "A lightweight heads-up display for drone telemetry that runs in any browser: artificial horizon, speed and altitude tapes, heading, battery and a mini-map with a home marker.",
      highlights: [
        "No dependencies, just one file",
        "Attitude, tapes, heading, battery and a mini-map with home position"
      ],
      layers: ["gcs"]
    },
    {
      id: "stream-analyzer", short: "Stream Analyzer",
      title: "CorePilot Stream Analyzer",
      tagline: "Desktop ArduPilot log analyzer with GPU plotting, a 3D globe replay and live telemetry.",
      domain: "flight", status: "live",
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
      layers: ["analysis"]
    },
    {
      id: "one-pager",
      title: "CorePilot 1P Report",
      tagline: "Turns an ArduPilot flight log into a one-page A4 report for every flight, as PDF or PNG at 300 DPI.",
      domain: "flight", status: "live",
      stack: ["C++", "Qt 6 / QML", "CMake"],
      platforms: ["Windows"],
      summary: "Import a DataFlash, telemetry or raw MAVLink log and get a print-ready one-page report for each flight. Works for multicopters, fixed wings and VTOL QuadPlanes.",
      highlights: [
        "Reads .bin, .log, .tlog and .rlog",
        "One A4 page per flight, exported to PDF and PNG at 300 DPI",
        "Hardened build: stack protector, FORTIFY_SOURCE, high-entropy ASLR, DEP, and a stripped, deterministic binary",
        "Self-contained install that includes every Qt runtime piece it needs"
      ],
      layers: ["analysis"]
    },
    {
      id: "aerorecords",
      title: "AeroRecords",
      tagline: "Encrypted build and flight records for a drone fleet. Attach a telemetry log and it fills itself in.",
      domain: "flight", status: "live",
      stack: ["Python", "PySide6", "pymavlink", "AES-256-GCM"],
      platforms: ["Windows"],
      summary: "Every drone, with its hardware, tests, photos, videos and logs, lives in one password-protected .aerodb file encrypted with AES-256-GCM. Add a .tlog and the app extracts the Pixhawk serial, firmware, GPS, frame type and flight statistics, without overwriting anything typed by hand.",
      highlights: [
        "Gallery of drones with cover photos and status badges",
        "Without the right password there is no access, enforced by the encryption",
        "Auto-fill from MAVLink logs: board, UID, firmware, GPS fix, maximum altitude and speed, and home location",
        "Generated user-manual PDF"
      ],
      layers: ["analysis"]
    },
    {
      id: "aerocalculator",
      title: "AeroCalculator",
      tagline: "Aircraft design studio on a phone: planes, multirotors and helicopters with 3D, polars and STL / DXF / GLB export.",
      domain: "flight", status: "build",
      stack: ["Flutter", "Dart", "3D rendering"],
      platforms: ["Android"],
      summary: "Design fixed-wing aircraft, multirotors and helicopters, see them in 3D, get aerodynamic estimates and export them for CAD or 3D printing. It also has a flight log analyzer and an offline encyclopedia of more than 1,200 articles. Everything works offline from one APK.",
      highlights: [
        "14 aircraft layouts, from trainer and glider to delta-canard, double-delta, forward-swept and joined-wing",
        "12 multirotor frames and 5 helicopter types, with propulsion suggestions",
        "Cl-α and Cd-Cl polars, V-n envelope and performance estimates",
        "Exports PDF, STL, DXF and GLB, and compares two designs side by side",
        "Flight log analyzer for .tlog and DataFlash .bin, with PDF export"
      ],
      layers: ["design"]
    },
    {
      id: "aerodex",
      title: "CorePilot Aerodex",
      tagline: "Offline Android library of drone parts, with specs, photos, manuals and pinouts, built by a Python data pipeline.",
      domain: "flight", status: "build",
      stack: ["Kotlin", "Jetpack Compose", "Python"],
      platforms: ["Android"],
      summary: "Flight controllers, ESCs, motors, radios, VTX, cameras, batteries, engines, ECUs and complete drones, with photos, specifications, manuals and wiring diagrams stored on the phone. A pipeline collects data from manufacturer and retailer stores, cleans it and packages it into content packs.",
      highlights: [
        "Data from 18+ manufacturer stores and 8 retailer catalogues",
        "Offline HTML spec pages and linked PDF manuals",
        "Content ships as .adx packs; launcher icons and splash are generated from the source logos",
        "Jetpack Compose interface"
      ],
      layers: ["design"]
    },

    /* --------------------------------------------------------- Hardware */
    {
      id: "fc",
      title: "CorePilot FC",
      tagline: "Flight-controller carrier board: an STM32H743 running ArduPilot next to a Radxa CM5 for video and AI.",
      domain: "hardware", status: "design", statusText: "Ready for fab",
      stack: ["KiCad 10", "Python", "ArduPilot", "STM32H743", "RK3588S2"],
      summary: "One board, two processors. The STM32H743 runs ArduPilot, and the Radxa CM5 runs Linux for video encoding, object detection and tracking. They talk MAVLink2 over an on-board UART. Each side has its own 5 V regulator, so the flight controller keeps flying if the computer crashes or reboots.",
      highlights: [
        "Schematic: 6 sheets, 254 parts, 211 nets, with 0 KiCad ERC violations",
        "150 × 80 mm board, 6 layers, all parts on the top side",
        "Routed by the project's own autorouter: 404 nets, 5,432 track segments, 786 vias, with 0 DRC errors",
        "ArduPilot board definition with 16 PWM outputs; the bootloader and ArduCopter build for it",
        "Gerbers, drill files, pick-and-place, a STEP / GLB 3D model and a generated, printable enclosure"
      ],
      metrics: [["6-layer", "150 × 80 mm board"], ["404", "nets routed by its own autorouter"], ["0", "DRC errors"]],
      featured: true, motif: "pcb",
      layers: ["hw"]
    },
    {
      id: "antenna-tracker", short: "AntennaTracker",
      title: "CorePilot AntennaTracker",
      tagline: "The ground end of the drone link on one board: tracks the aircraft, routes MAVLink and serves video over Wi-Fi.",
      domain: "hardware", status: "design", statusText: "Schematic complete",
      stack: ["KiCad 10", "STM32H743", "Radxa CM5", "Python"],
      summary: "A ground-station app on a tablet runs everything over the tracker's Wi-Fi: video, drone and tracker settings, and flying with on-screen sticks. The board reads the drone's position out of the link, keeps a directional antenna pointed at it with pan and tilt steppers, and re-streams the data to Wi-Fi and Ethernet clients.",
      highlights: [
        "Radxa CM5: Wi-Fi access point, video server, MAVLink router and Gigabit Ethernet",
        "STM32H743: position, heading, two stepper drivers, and RC (S.Bus / PPM) with fail-safe",
        "Schematic: 7 sheets, 512 parts, 349 nets, with 0 ERC violations",
        "Pin allocation checked against ArduPilot's alternate-function table; BOM with 52 verified part numbers"
      ],
      layers: ["hw", "link"]
    },
    {
      id: "ubec",
      title: "CorePilot UBEC",
      tagline: "Dual-input 6S–18S power converter with seven 10 A outputs and hardware failover that never drops the outputs.",
      domain: "hardware", status: "design", statusText: "Schematic stage",
      stack: ["KiCad 10", "Python", "C11"],
      summary: "A main and a backup battery input. The backup stays idle until the main fails, and the switch happens in hardware without interrupting the 5, 6, 7, 8, 12, 16 and 24 V outputs. The schematic is generated from Python and checked in KiCad.",
      highlights: [
        "A calculation script produces every component value",
        "Python schematic generator with netlist comparison and ERC",
        "Portable C11 supervisor firmware, with host tests against a model of the hardware"
      ],
      layers: ["hw"]
    },

    /* ---------------------------------------------------------- Desktop */
    {
      id: "browser",
      title: "CorePilot Browser",
      tagline: "Private, all-in-one desktop browser in C++20 on Qt WebEngine, with a download manager that handles almost anything.",
      domain: "desktop", status: "dev",
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
      featured: true, motif: "browser"
    },
    {
      id: "secured-browser",
      title: "SoloPilot Secured Browser",
      tagline: "One C++ / Qt 6 code base for a secured browser on Windows, Linux, macOS and Android, with a hand-drawn interface.",
      domain: "desktop", status: "build",
      stack: ["C++", "Qt 6", "QPainter", "CMake"],
      platforms: ["Windows", "Linux", "macOS", "Android"],
      summary: "Every pixel of the interface is drawn with QPainter, so the browser looks the same on every platform. Its design system is based on elevation, and the accent colour has one meaning only: this browser is protecting you.",
      highlights: [
        "Attached-card tab strip and a pill-shaped address bar with a fixed security slot",
        "Shield icon with a live count of blocked items",
        "Dark and light themes with a live preview",
        "Self-test harness and an Android build"
      ]
    },
    {
      id: "nova",
      title: "Nova Browser",
      tagline: "Glassmorphism Electron browser with a built-in VPN, ad blocker, password manager and download manager.",
      domain: "desktop", status: "live",
      stack: ["Electron", "JavaScript", "Tor"],
      platforms: ["Windows", "Android"],
      summary: "A frameless, translucent browser with everything built in: a free proxy VPN you pick by country, network-level ad and tracker blocking, a password manager encrypted with the OS keychain, incognito windows and Safe Browsing.",
      highlights: [
        "Free VPN: pick a country and it finds a working server",
        "Password manager encrypted with the OS keychain (safeStorage)",
        "Reader mode, session restore and per-site permissions",
        "Installs together with CorePilot Download Manager, with auto-updates"
      ]
    },
    {
      id: "download-manager",
      title: "CorePilot Download Manager",
      tagline: "Downloads almost anything from almost anywhere (1800+ sites, torrents and streams), with a browser extension.",
      domain: "desktop", status: "build",
      stack: ["Electron", "React", "TypeScript", "yt-dlp", "aria2", "FFmpeg"],
      platforms: ["Windows", "Chrome / Edge / Firefox"],
      summary: "A desktop download manager powered by yt-dlp, aria2 and ffmpeg, plus an MV3 extension for Chromium browsers and Firefox. Paste any link and it works out what kind of download it is.",
      highlights: [
        "Quality picker, audio extraction with cover art, and trimming to a time range",
        "Playlists and channels expand into one task per item",
        "Concurrent queue, speed limit, pause, resume and retry",
        "Clipboard watch and automatic sorting into categories"
      ]
    },
    {
      id: "torrent",
      title: "CorePilot Torrent",
      tagline: "Fast BitTorrent client for Windows with a clean interface in the style of uTorrent.",
      domain: "desktop", status: "live",
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
      id: "player",
      title: "SoloPilot Player",
      tagline: "Media player in the style of VLC, built on mpv with a modern React interface.",
      domain: "desktop", status: "build",
      stack: ["Electron", "React", "TypeScript", "mpv", "Tailwind"],
      platforms: ["Windows"],
      summary: "A full-featured media player that uses mpv for playback, with a React + Tailwind interface and an experimental native Qt / QML front end.",
      highlights: [
        "mpv playback engine for wide codec support",
        "Zustand state and a Tailwind interface",
        "Experimental Qt / QML front end"
      ]
    },
    {
      id: "news",
      title: "CorePilot News",
      tagline: "World news from 100+ sources in one desktop app, with an in-app reader and read-aloud in Urdu and English.",
      domain: "desktop", status: "live",
      stack: ["Electron", "Node.js", "Express", "Readability", "DOMPurify"],
      platforms: ["Windows"],
      summary: "Reads public RSS feeds, with no API key, across 18 categories and regions. Opening a story shows the full article inside the app, loaded through a hidden browser window and shown in a sanitised reader view.",
      highlights: [
        "100+ sources, including BBC, Al Jazeera, the Guardian, DW and Dawn",
        "Dedicated Urdu news category",
        "Text-to-speech that detects Urdu or English",
        "Search across every source, and bookmarks"
      ]
    },
    {
      id: "tv",
      title: "CorePilot TV",
      tagline: "Watch 10,800+ free TV channels from 175 countries in a glassy HD desktop app.",
      domain: "desktop", status: "live",
      stack: ["Electron", "React", "Vite", "Tailwind", "hls.js"],
      platforms: ["Windows"],
      summary: "Merges the public IPTV-org catalogue with logos, flags and categories, and plays HLS streams with the right headers for each stream, so far more channels actually work.",
      highlights: [
        "Browse 175 countries and 29 categories",
        "Falls back to other sources when one fails, and shows the stream quality",
        "Import your own M3U / M3U8 playlists",
        "Cached catalogue for browsing offline"
      ]
    },
    {
      id: "designsuite",
      title: "DesignSuite",
      tagline: "Creative-suite prototype: a vector editor, a keyframe motion editor and a video timeline on one shared core.",
      domain: "desktop", status: "dev",
      stack: ["React", "TypeScript", "Vite", "Electron"],
      summary: "Three apps on one foundation: VectorStudio for shapes and layers with SVG and PNG export, MotionStudio with timeline keyframes and interpolation, and VideoStudio with clip import, trimming and scrubbing.",
      highlights: [
        "Shared model for types and keyframe sampling",
        "Runs in the browser or as a desktop app",
        "SVG and PNG export"
      ]
    },
    {
      id: "secchecker",
      title: "SecChecker",
      tagline: "Windows security scanner with a WPF dashboard: processes, persistence, network, accounts and remote-access tools.",
      domain: "desktop", status: "live",
      stack: ["PowerShell", "WPF", "C#"],
      platforms: ["Windows"],
      summary: "Audits a Windows machine in one pass: Defender and antivirus state, unsigned non-Microsoft processes, external connections and open ports, persistence entries, accounts and logons, firewall rules, remote-access tools and recently changed executables.",
      highlights: [
        "GUI dashboard or command line",
        "Text and JSON reports for automation",
        "Flags remote-access tools such as AnyDesk, TeamViewer and RustDesk"
      ]
    },
    {
      id: "presentation",
      title: "Presentation Builder",
      tagline: "Build a modern PowerPoint step by step, with text, images and video and a live preview, exported as .pptx.",
      domain: "desktop", status: "build",
      stack: ["Python", "python-pptx", "CustomTkinter", "Flask"],
      platforms: ["Windows", "Web"],
      summary: "A desktop app and a web app share one engine and one project file. Pick a theme, add slides, check the live preview and export a real .pptx.",
      highlights: [
        "Four themes: Minimal, Dark, Corporate and Vibrant",
        "Drag-and-drop media, and slides you can reorder or duplicate",
        "Desktop app and browser version"
      ]
    },
    {
      id: "abduos",
      title: "AbduOS",
      tagline: "Custom Linux distribution based on Ubuntu 24.04, with its own GNOME theme, login screen and boot animation.",
      domain: "desktop", status: "dev",
      stack: ["Linux", "Bash", "GNOME", "Plymouth"],
      summary: "A branded amd64 distribution built from Ubuntu 24.04 LTS by a single build script. It has a dark purple and cyan GNOME theme, GDM3 login branding, a Plymouth boot splash and custom SVG artwork.",
      highlights: [
        "ISO built by one script",
        "Branded GDM3 login and Plymouth boot splash",
        "Curated default apps"
      ]
    },
    {
      id: "silsila",
      title: "Silsila-e-Lakhvi",
      tagline: "Family-tree (Shajra-e-Nasb) platform: a Qt desktop app, a C++ server and a Flutter mobile app.",
      domain: "desktop", status: "dev",
      stack: ["C++", "Qt / QML", "Flutter", "SQL"],
      summary: "Records and displays a family's lineage across generations, with a desktop editor, a server and a mobile app for family members.",
      highlights: [
        "Desktop editor in Qt / QML",
        "C++ server with SQL storage",
        "Flutter mobile app"
      ]
    },

    /* ----------------------------------------------------------- Mobile */
    {
      id: "zikrify",
      title: "Zikrify: Azkar-ul-Muslim",
      tagline: "Azkar, the Quran with 7 offline tafsirs, prayer times, Qibla and 8,500+ books. Free, with no ads and no account.",
      domain: "mobile", status: "live",
      stack: ["Flutter", "Dart", "Gemma (fine-tuned)", "llama.cpp", "LiteRT"],
      platforms: ["Android", "Windows", "Linux"],
      summary: "A calm, complete Islamic app in English, Urdu and Arabic. It has daily azkar with reminders and streaks, the full Quran in Uthmani script with translations and seven built-in tafsirs, accurate prayer times with ten azan recordings, Qibla, tasbih and a large library. A fine-tuned Gemma model is being brought onto the device through LiteRT, with llama.cpp built for Android.",
      highlights: [
        "87+ morning, evening and sleep azkar with Urdu and English translations, reminders, goals and streaks",
        "Full Quran styled like a printed mushaf, with Urdu and English under every ayah, 7 offline tafsirs and search in three languages",
        "Prayer times with 12 calculation methods, Hanafi or Shafi Asr, high-latitude rules and 10 azans",
        "Fine-tuned Gemma model exported to LiteRT and GGUF; llama.cpp built for Android arm64 and x86_64",
        "Google Play listing in English, Urdu and Arabic; 31 release builds so far"
      ],
      metrics: [["8,500+", "Islamic books in the library"], ["7", "tafsirs that work offline"], ["31", "release builds"]],
      featured: true, motif: "geo",
      link: { href: "https://github.com/abduhifz-dev/zikrify-privacy-policy", label: "Privacy policy on GitHub" }
    },
    {
      id: "chess",
      title: "CP Chess",
      tagline: "Chess app with a live offline coach that rates every move and explains why, plus Lichess and chess.com integration.",
      domain: "mobile", status: "build",
      stack: ["Flutter", "Dart", "C++ engine", "OAuth + PKCE"],
      platforms: ["Android"],
      summary: "Play a native chess engine at six levels while a coach rates each move from Best to Blunder, explains mistakes, draws the better move and warns about threats. Review games from chess.com and Lichess, practise your own mistakes, solve puzzles and learn openings.",
      highlights: [
        "Coach that gives a reason for every suggestion, names the opening and allows take-backs",
        "Game review with accuracy for both sides",
        "3,660 rated puzzles, 19 interactive lessons and 3,865 named opening positions",
        "Lichess login (OAuth + PKCE) and play; chess.com profile and games",
        "Real-board mode: enter moves by tapping or with the camera"
      ]
    },
    {
      id: "chatos",
      title: "ChatOS",
      tagline: "Dark-first messaging platform for SKYNEX: a Flutter app, an encrypted PHP relay, a website and a desktop archive.",
      domain: "mobile", status: "build",
      stack: ["Flutter", "PHP", "MySQL", "libsodium", "Electron"],
      platforms: ["Android", "Web", "Windows"],
      summary: "A messaging product built end to end: an Android app in Flutter, a relay on PHP 8 and MySQL that refuses to start without working sodium cryptography, a static website, and an Electron archive that runs on a Windows machine.",
      highlights: [
        "Username and email sign-up with live availability checks and a password-strength meter",
        "Relay with libsodium cryptography and cron jobs, deployable on cPanel hosting",
        "Electron archive machine that registers itself with the relay",
        "Flutter UI covered by widget tests"
      ]
    },
    {
      id: "famiflix",
      title: "FamiFlix",
      tagline: "A family's own streaming service: a Flutter app and a self-hosted media server with transcoding and an admin dashboard.",
      domain: "mobile", status: "live",
      stack: ["Flutter", "Node.js", "Express", "FFmpeg", "JWT", "Electron"],
      platforms: ["Android", "Windows"],
      summary: "Movies and reels for one family, hosted at home. The server processes uploads with FFmpeg, issues JWT sessions, sends email codes and shows usage charts in an admin dashboard. The Flutter app streams it all.",
      highlights: [
        "Version 1.8 after 16 builds",
        "Uploads processed with FFmpeg and ffprobe",
        "bcrypt passwords, JWT authentication, and TLS certificates generated by the server",
        "Server packaged as a desktop app"
      ]
    },
    {
      id: "quickx",
      title: "QuickX",
      tagline: "Delivery and marketplace platform: Flutter apps, a hardened Node.js API and a React admin dashboard.",
      domain: "mobile", status: "dev",
      stack: ["Flutter", "Node.js", "Prisma", "Redis", "Socket.IO", "React"],
      platforms: ["Android", "Windows", "Linux", "Web"],
      summary: "Customer, rider and vendor flows in Flutter, a real-time backend with Prisma, Redis and Socket.IO, and an operations dashboard with live maps.",
      highlights: [
        "Security middleware: Helmet, rate limiting, input sanitising, HPP protection and validation",
        "Real-time order tracking over Socket.IO, with geo calculations",
        "S3 uploads with image processing, and Firebase push notifications",
        "React + Tailwind dashboard with Leaflet maps and charts"
      ]
    },
    {
      id: "keyboard",
      title: "CorePilot Keyboard",
      tagline: "System keyboard for HarmonyOS NEXT and Android: Urdu and English by default, and 22 languages from one shared core.",
      domain: "mobile", status: "build",
      stack: ["ArkTS", "Kotlin", "Python", "HarmonyOS IME"],
      platforms: ["HarmonyOS", "Android"],
      summary: "Each OS gets a thin native shell around its own input-method API, while the layouts and dictionaries live in a shared core that both use. One Python tool generates and validates every layout.",
      highlights: [
        "22 languages, with Urdu and English by default",
        "Word suggestions and a personal dictionary",
        "All layouts generated and validated from one source",
        "AppGallery listing assets ready"
      ]
    },
    {
      id: "homehub",
      title: "HomeHub",
      tagline: "Home Assistant client for Flutter, with live WebSocket state, cameras, an encrypted local store and biometric app lock.",
      domain: "mobile", status: "dev",
      stack: ["Flutter", "Bloc", "Dio", "Drift", "MQTT"],
      platforms: ["Android", "iOS"],
      summary: "A smart-home control app that connects to Home Assistant over REST and WebSockets and keeps devices in sync in real time. It is built in Clean Architecture layers with dependency injection, typed errors and localisation.",
      highlights: [
        "Home Assistant REST and WebSocket clients, plus MQTT",
        "App lock with biometrics or a PIN, secure storage and encryption",
        "Bloc state management with get_it / injectable dependency injection and fpdart results",
        "Demo data mode for working without a live home"
      ]
    },
    {
      id: "madrasa",
      title: "Madrasa Management System",
      tagline: "Offline-first school management for Android and Windows, with on-device face attendance.",
      domain: "mobile", status: "build",
      stack: ["Flutter", "SQLite", "Provider", "Google ML Kit", "fl_chart"],
      platforms: ["Android", "Windows"],
      summary: "Students, fees, expenses, attendance and reports for a madrasa, from a single Flutter code base. Attendance can be marked by face: the camera detects the face on the device and matches it to an enrolled student.",
      highlights: [
        "Dashboard with the balance and an expense breakdown",
        "Fee history per student, expense categories and monthly totals",
        "AI face attendance on Android",
        "Clean layering: models → repositories → providers → screens"
      ]
    },
    {
      id: "stepup",
      title: "StepUp",
      tagline: "Step tracker with a foreground counting service, levels, challenges, rewards and a water tracker.",
      domain: "mobile", status: "build",
      stack: ["Flutter", "Dart", "Sensors", "Provider"],
      platforms: ["Android"],
      summary: "Counts steps in a foreground service using the pedometer and its own sensor-based step detector, then turns them into levels, challenges and achievements. History, analytics charts and reminders are built in.",
      highlights: [
        "Foreground service with its own accelerometer step detector",
        "Levels, challenges, achievements and confetti rewards",
        "History calendar, analytics charts and a water tracker",
        "Local notifications and themes"
      ]
    },
    {
      id: "cv-generator",
      title: "CV Generator",
      tagline: "Build a CV once and export it in six designs as PDF or PNG, fully offline.",
      domain: "mobile", status: "build",
      stack: ["Flutter", "pdf", "Hive", "Provider"],
      platforms: ["Android"],
      summary: "Fill in your details once, then pick from six templates (Classic, Minimal, Modern, Sidebar, Timeline and Spec) with your own accent colour and photo. Export as PDF or PNG, print or share.",
      highlights: [
        "Six templates built on a shared layout kit",
        "Preview, print and share",
        "Offline storage with Hive"
      ]
    },
    {
      id: "games",
      title: "Indie Games Collection",
      tagline: "Five Flutter / Flame games, each built around one mechanic: kite fights, time-loop ghosts, shadow puzzles and more.",
      domain: "mobile", status: "dev",
      stack: ["Flutter", "Flame", "Dart"],
      platforms: ["Android"],
      summary: "Patang Bazi (top-down kite fighting against three AI opponents), Time Echoes (a time-loop platformer where your recorded inputs become ghosts), Shadow Solver (rotate a 3D mesh until its shadow matches the target), Echo (see the world by sending out sound waves) and Dhaba Tycoon (a time-management sim).",
      highlights: [
        "Patang Bazi: complete first version with an Android build",
        "Four more games with playable core mechanics and 3–5 levels each",
        "All five pass flutter analyze with no issues"
      ]
    },

    /* ---------------------------------------------------------- Trading */
    {
      id: "abdutrading",
      title: "AbduTrading EA",
      tagline: "Multi-strategy MetaTrader 5 Expert Advisor for gold, with confluence scoring and an optional C++ HFT module.",
      domain: "trading", status: "build",
      stack: ["MQL5", "C++", "Qt", "FastAPI", "Flutter"],
      platforms: ["MetaTrader 5", "Android"],
      summary: "Ten plug-in strategies vote on every setup. A trade opens only when the weighted score passes a threshold and enough strategies agree. It has full risk and position management, an on-chart control panel and a Flutter app for remote control.",
      highlights: [
        "Strategies: ICT, SMC order blocks and FVG, liquidity sweep with CHoCH, supply and demand, price action, session breakout, multi-timeframe confluence and HFT",
        "Risk caps per trade and per day, plus session and spread filters",
        "Partial take-profit at 1R, break-even and an ATR trailing stop",
        "Tick-level C++ DLL, with a pure-MQL5 fallback"
      ]
    },
    {
      id: "tradebeacon",
      title: "CorePilot TradeBeacon",
      tagline: "Multi-timeframe RSI alerts that ring like a phone call, for MT5 and TradingView, with optional auto-trading.",
      domain: "trading", status: "live",
      stack: ["Electron", "MQL5", "Pine Script", "Android", "Lightweight Charts"],
      platforms: ["Windows", "Android", "MetaTrader 5", "TradingView"],
      summary: "Pick up to eight timeframes and any number of pairs. When all the selected timeframes are oversold or overbought at the same moment, the app calls you. It can also build a calculated timeframe (the average of the selected ones) and auto-trade on its signal, but only when risk and reward are set.",
      highlights: [
        "Builds custom timeframes itself, for example 1 + 5 + 15 + 30 + 45 + 60 → 26m",
        "Minute-based and second-based methods running side by side",
        "Pair × timeframe grid with charts and buttons for manual trades",
        "Desktop app, MT5 Expert Advisor, TradingView indicator and an Android app"
      ]
    },
    {
      id: "whale-bot",
      title: "Whale-Follow Forex Bot",
      tagline: "Python bot for MT5 that follows institutional positioning and trades liquidity sweeps in the London and New York sessions.",
      domain: "trading", status: "build",
      stack: ["Python", "MetaTrader5", "pandas", "pytest"],
      platforms: ["MetaTrader 5"],
      summary: "Every morning it sets a bias for each pair from CFTC COT data, open interest, the daily EMA200 trend and, optionally, retail sentiment. During the London and New York killzones it waits for a liquidity sweep and a structure break in the direction of that bias.",
      highlights: [
        "1% risk per trade, 2R target and break-even at 1R",
        "3% daily loss limit, a halt at 20% drawdown, and all positions closed by 4 PM New York time",
        "Handles daylight-saving shifts against Pakistan time automatically",
        "Trades EURUSD, GBPUSD and XAUUSD; tested with pytest"
      ]
    },

    /* ------------------------------------------------------------- Docs */
    {
      id: "learning-guide", short: "Learning Guide",
      title: "ArduPilot & Mission Planner Learning Guide",
      tagline: "Zero-to-advanced drone course as print-quality PDFs in English and Urdu Nastaliq, with every parameter name verified.",
      domain: "docs", status: "live",
      stack: ["Python", "Markdown", "SVG", "Headless Chromium"],
      summary: "Written for ArduCopter / ArduPlane 4.7 and Mission Planner 1.3. Markdown chapters become HTML and then PDF, with a two-pass table of contents, bookmarks and diagrams drawn in SVG. A checker verifies every parameter name against the official metadata and keeps the Urdu edition structurally identical to the English one.",
      highlights: [
        "Two editions: English, and Urdu in Nastaliq with a right-to-left print stylesheet",
        "Parameter names checked against the official 4.7.3 metadata",
        "Every diagram generated as inline SVG",
        "Contact-sheet previews for visual review"
      ],
      layers: ["design"]
    },
    {
      id: "vtol-handbook", short: "VTOL Handbook",
      title: "ArduPilot VTOL Handbook",
      tagline: "Complete VTOL and Mission Planner handbook with a release-pinned reference of 5,948 ArduPlane parameters.",
      domain: "docs", status: "live",
      stack: ["Python", "ReportLab", "PyMuPDF", "pytest"],
      summary: "Covers setup, calibration, missions, transitions, tuning, failsafes and logs for QuadPlane, tiltrotor and tailsitter aircraft on ArduPlane 4.7.3, with a Roman Urdu quick-start. The parameter reference is generated from the official metadata, pinned by commit and SHA-256.",
      highlights: [
        "5,948 documented entries, including 231 Q_ parameters",
        "Build manifest with source URLs, the commit and file hashes",
        "Automated checks of the PDF's content and layout",
        "Filterable CSV catalogue alongside the PDF"
      ],
      layers: ["design"]
    }
  ]
};
