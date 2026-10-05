export const initialElderProfile = {
  name: "R. Kumar",
  age: 72,
  gender: "Male",
  device: "SmartGuardian Cuff",
  status: "SAFE",
  bloodGroup: "O+",
  primaryContact: {
    name: "S. Anitha (Daughter)",
    phone: "+91 98765 43210",
    relation: "Daughter"
  },
  emergencyContacts: [
    { id: 1, name: "S. Anitha (Daughter)", phone: "+91 98765 43210", priority: "Primary" },
    { id: 2, name: "K. Ramesh (Son)", phone: "+91 98765 12345", priority: "Secondary" },
    { id: 3, name: "M. Suresh (Neighbor)", phone: "+91 98765 67890", priority: "Local Helper" }
  ],
  medicalNotes: "Hypertension, Mild Arthritis. Scheduled daily blood pressure monitoring and vitamin supplements. Allergic to penicillin."
};

export const initialHealthData = {
  heartRate: 72,
  spo2: 98,
  activity: "Normal",
  steps: 3842,
  fallStatus: "No Fall Detected",
  battery: 84,
  connected: true,
  lastSync: "Just now"
};

export const initialHardwareComponents = [
  { id: "esp32", name: "ESP32 Microcontroller", role: "Main Processing & Wi-Fi/BT Unit", status: "Connected", icon: "Cpu" },
  { id: "max30102", name: "MAX30102 Pulse Oximeter", role: "Heart Rate & SpO2 Sensing", status: "Working", icon: "Activity" },
  { id: "mpu6050", name: "MPU6050 Accelerometer + Gyro", role: "6-Axis Motion & Fall Detection", status: "Working", icon: "Zap" },
  { id: "gps", name: "GPS Module (NEO-6M)", role: "Emergency Location Tracking", status: "Available", icon: "MapPin" },
  { id: "gsm", name: "GSM Module (SIM800L)", role: "Cellular Alerts & Emergency SMS", status: "Connected", icon: "Radio" },
  { id: "nfc", name: "PN532 NFC Reader", role: "Medication Verification", status: "Ready", icon: "Smartphone" },
  { id: "nfc_tags", name: "NFC Container Tags", role: "Medicine ID Tagging", status: "Configured", icon: "HardDrive" },
  { id: "sos", name: "Physical SOS Button", role: "Immediate Manual Alert Trigger", status: "Working", icon: "AlertTriangle" },
  { id: "buzzer", name: "Piezo Alarm Buzzer", role: "Audio Warning & Prompts", status: "Ready", icon: "Volume2" },
  { id: "vibration", name: "Vibration Motor Haptic", role: "Physical Tactile Alarm", status: "Ready", icon: "Zap" },
  { id: "oled", name: "0.96 inch OLED Display", role: "On-cuff Status & Alerts", status: "Active", icon: "Smartphone" },
  { id: "battery", name: "3.7V Li-Po Battery 850mAh", role: "Rechargeable Power Source", status: "84% (Good)", icon: "Battery" }
];

export const initialMedications = [
  {
    id: "med-1",
    name: "BP Tablet (Amlodipine 5mg)",
    time: "08:00 AM",
    nfcTagId: "MED001",
    status: "Confirmed",
    takenTime: "08:01 AM",
    instructions: "Take 1 tablet after breakfast with warm water.",
    dosage: "5mg"
  },
  {
    id: "med-2",
    name: "Vitamin D3 Tablet",
    time: "01:00 PM",
    nfcTagId: "MED002",
    status: "Confirmed",
    takenTime: "01:02 PM",
    instructions: "Take 1 capsule after lunch.",
    dosage: "60,000 IU"
  },
  {
    id: "med-3",
    name: "BP Tablet (Amlodipine 5mg)",
    time: "08:00 PM",
    nfcTagId: "MED001",
    status: "Pending",
    takenTime: "--",
    instructions: "Take 1 tablet before dinner.",
    dosage: "5mg"
  }
];

export const initialMedicationHistory = [
  {
    id: "hist-1",
    medication: "BP Tablet (Amlodipine 5mg)",
    scheduledTime: "08:00 AM (22 Aug)",
    nfcStatus: "Verified (MED001)",
    confirmationTime: "08:01 AM",
    status: "Taken"
  },
  {
    id: "hist-2",
    medication: "Vitamin D3 Tablet",
    scheduledTime: "01:00 PM (22 Aug)",
    nfcStatus: "Verified (MED002)",
    confirmationTime: "01:02 PM",
    status: "Taken"
  },
  {
    id: "hist-3",
    medication: "BP Tablet (Amlodipine 5mg)",
    scheduledTime: "08:00 PM (22 Aug)",
    nfcStatus: "Pending",
    confirmationTime: "--",
    status: "Pending"
  },
  {
    id: "hist-4",
    medication: "BP Tablet (Amlodipine 5mg)",
    scheduledTime: "08:00 PM (21 Aug)",
    nfcStatus: "Verified (MED001)",
    confirmationTime: "08:04 PM",
    status: "Taken"
  }
];

export const initialEmergencyHistory = [
  {
    id: "emg-101",
    date: "22 Aug 2026",
    time: "09:42 AM",
    event: "Fall Detected",
    heartRate: "104 BPM",
    spo2: "96%",
    response: "No response",
    status: "Emergency"
  },
  {
    id: "emg-102",
    date: "21 Aug 2026",
    time: "06:20 PM",
    event: "SOS Button Pressed",
    heartRate: "88 BPM",
    spo2: "98%",
    response: "Confirmed Safe",
    status: "Cancelled"
  },
  {
    id: "emg-103",
    date: "19 Aug 2026",
    time: "11:15 AM",
    event: "Abnormal Heart Rate (124 BPM)",
    heartRate: "124 BPM",
    spo2: "97%",
    response: "Confirmed Safe",
    status: "Cancelled"
  }
];

export const initialNotifications = [
  {
    id: "notif-1",
    title: "Medication Confirmed",
    message: "BP Tablet (MED001) verified through NFC scanner on Smart Cuff.",
    time: "08:01 AM",
    type: "success"
  },
  {
    id: "notif-2",
    title: "Device Connected",
    message: "SmartGuardian Cuff online. ESP32 sensor stream active.",
    time: "07:30 AM",
    type: "info"
  }
];

export const initialLocation = {
  latitude: 11.3410,
  longitude: 77.7172,
  address: "Erode Medical District, Tamil Nadu, India",
  status: "Location Available",
  lastUpdated: "10 seconds ago"
};
