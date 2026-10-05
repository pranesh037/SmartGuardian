# SMARTGUARDIAN
> "Intelligent Wearable System for Elderly Safety, Health Monitoring & Medication Management"

**College Engineering Design Thinking Project & Prototype**

---

## 📌 Project Overview
SmartGuardian is a low-cost intelligent wearable system designed to improve the safety, health monitoring, and medication adherence of elderly people living alone.

This repository contains the complete functional caregiver web application dashboard prototype built for college demonstrations and future IoT backend integration.

### Core Innovations
1. **Multi-sensor emergency detection** (MPU6050 fall detection, MAX30102 pulse oximetry, manual SOS button, prolonged inactivity)
2. **10-second emergency confirmation window** with haptic vibration and audio buzzer simulation
3. **NFC-based medication verification system** (matching container tag IDs like `MED001` before marking dose confirmed)
4. **Integrated health monitoring** with simulated continuous heart rate & SpO2 telemetry line charts
5. **GPS-based emergency location tracking** (OpenStreetMap coordinates dispatch)
6. **GSM-based caregiver alert system** (simulated SIM800L SMS notification)
7. **Smart caregiver application** with responsive desktop & mobile interfaces

---

## 📂 Project Structure
```
c:\Users\Indra pranesh.S.N\Documents\DT PROJECT\
├── index.html                  # HTML entry point with Google Fonts
├── package.json                # React, Vite, Lucide-React & Recharts dependencies
├── vite.config.js              # Vite bundler configuration
├── README.md                   # Complete documentation & hardware guide
└── src/
    ├── main.jsx                # React DOM root render
    ├── App.jsx                 # Main application shell & router
    ├── index.css               # Complete Design Thinking CSS token system
    ├── context/
    │   └── AppContext.jsx      # Central state & real-time telemetry simulation engine
    ├── data/
    │   └── mockData.js         # Initial elder profile, vitals, hardware diagnostic list
    ├── services/
    │   ├── firebase.js         # Firebase RTDB / Firestore configuration facade
    │   ├── sensorService.js    # ESP32 sensor telemetry subscriber interface
    │   ├── emergencyService.js # SOS, fall detection, and GSM alert dispatch service
    │   └── medicationService.js# NFC container validation & schedule sync service
    ├── components/
    │   ├── Common/
    │   │   ├── Header.jsx      # Navbar with connection, battery, notifications & profile
    │   │   ├── Sidebar.jsx     # Desktop/Tablet navigation drawer
    │   │   ├── BottomNav.jsx   # Mobile bottom navigation bar
    │   │   ├── NotificationPanel.jsx # Dropdown notifications log
    │   │   └── ProjectHeader.jsx # College design thinking project header banner
    │   ├── Dashboard/          # Quick overview cards & vitals grid
    │   ├── Health/
    │   │   └── HealthCharts.jsx# Dynamic SVG real-time HR & SpO2 line graphs
    │   ├── Emergency/
    │   │   ├── EmergencyModal.jsx # Red 10s countdown modal with "I'M SAFE" action
    │   │   ├── CaregiverAlert.jsx # Confirmed emergency alert card with GPS map link
    │   │   └── EmergencyHistory.jsx# Interactive emergency event log table
    │   ├── Medication/
    │   │   ├── MedicationSchedule.jsx # Today's medication cards
    │   │   ├── NFCScannerModal.jsx # NFC scanning animation & verification (Correct/Wrong)
    │   │   ├── NFCFlowDiagram.jsx # Container -> Tag -> Cuff -> ESP32 -> App workflow
    │   │   └── MedicationHistory.jsx# Table of past confirmations
    │   ├── Device/
    │   │   ├── SmartCuffVisual.jsx # Interactive schematic of the single Smart Cuff with pins
    │   │   ├── DeviceStatus.jsx  # Status cards for all 12 hardware components
    │   │   └── HardwareArchitecture.jsx # ESP32 -> Firebase -> App block diagram
    │   ├── Location/
    │   │   └── InteractiveMap.jsx# OpenStreetMap embed + browser Geolocation fetch
    │   └── DevPanel/
    │       └── HardwareSimulator.jsx # Floating test drawer for college presentation
    └── pages/
        ├── Dashboard.jsx       # Main caregiver overview
        ├── Emergency.jsx       # Emergency detection logic & history
        ├── Health.jsx          # Live telemetry graphs & vitals
        ├── Medication.jsx      # NFC medication verification & schedules
        ├── Location.jsx        # GPS tracking & geolocation
        ├── Device.jsx          # Smart Cuff component diagnostics
        ├── Profile.jsx         # Elder profile & emergency contact editor
        └── Settings.jsx        # Emergency timer & subsystem toggles
```

---

## 🛠️ Installation & How to Run

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Step-by-Step Setup
1. **Open terminal** in the project directory:
   ```bash
   cd "c:\Users\Indra pranesh.S.N\Documents\DT PROJECT"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000` to interact with the SmartGuardian dashboard.

---

## 🔌 ESP32 & Firebase Integration Guide

When ready to connect physical ESP32 hardware to this web application:

1. **Hardware Communication Flow**:
   - `MAX30102` (Heart Rate + SpO2) and `MPU6050` (Fall vector) send data over I2C to ESP32.
   - `PN532 NFC Reader` scans medicine container tags (e.g., `MED001`) and sends Tag ID to ESP32 via SPI/HSU.
   - `NEO-6M GPS` transmits latitude & longitude to ESP32 via UART Serial.
   - `ESP32` publishes telemetry JSON payload to Firebase Realtime Database:
     ```json
     {
       "elderly": {
         "health": { "heartRate": 74, "spo2": 98, "activity": "Normal" },
         "emergency": { "status": "POSSIBLE_EMERGENCY", "cause": "Fall Detected" },
         "medication": { "lastScannedTag": "MED001", "status": "VERIFIED" }
       }
     }
     ```

2. **Connecting to Firebase**:
   - Open `src/services/firebase.js`.
   - Replace `firebaseConfigPlaceholder` with your Firebase Project credentials.
   - Uncomment the `initializeApp` and `getDatabase` lines in `src/services/firebase.js` and `src/services/sensorService.js`.
