import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  initialElderProfile, 
  initialHealthData, 
  initialHardwareComponents, 
  initialMedications, 
  initialMedicationHistory, 
  initialEmergencyHistory, 
  initialNotifications, 
  initialLocation 
} from '../data/mockData';
import { SensorService } from '../services/sensorService';
import { EmergencyService } from '../services/emergencyService';
import { MedicationService } from '../services/medicationService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Core Entities State
  const [elderProfile, setElderProfile] = useState(initialElderProfile);
  const [healthData, setHealthData] = useState(initialHealthData);
  const [hardwareComponents, setHardwareComponents] = useState(initialHardwareComponents);
  const [medications, setMedications] = useState(initialMedications);
  const [medicationHistory, setMedicationHistory] = useState(initialMedicationHistory);
  const [emergencyHistory, setEmergencyHistory] = useState(initialEmergencyHistory);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [location, setLocation] = useState(initialLocation);
  
  // Settings State
  const [settings, setSettings] = useState({
    emergencyCountdownSeconds: 10,
    medicationReminder: true,
    nfcVerification: true,
    fallDetection: true,
    healthMonitoring: true,
    gsmAlerts: true,
    caregiverNotifications: true
  });

  // Emergency Modal & Status State
  const [emergencyStatus, setEmergencyStatus] = useState('SAFE'); // SAFE | POSSIBLE_EMERGENCY | EMERGENCY_CONFIRMED
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [emergencyCause, setEmergencyCause] = useState('Fall Detected');
  const [countdownSeconds, setCountdownSeconds] = useState(10);
  const countdownTimerRef = useRef(null);

  // NFC Scan Modal State
  const [nfcModalOpen, setNfcModalOpen] = useState(false);
  const [nfcScanState, setNfcScanState] = useState('idle'); // idle | scanning | result
  const [nfcScanResult, setNfcScanResult] = useState(null);
  const [targetMedForScan, setTargetMedForScan] = useState(null);

  // Dev Control Panel Drawer state
  const [devPanelOpen, setDevPanelOpen] = useState(false);

  // -------------------------------------------------------------
  // Real-time Simulated Telemetry Loop (updates HR & SpO2 slightly)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!settings.healthMonitoring) return;

    const interval = setInterval(() => {
      if (emergencyStatus === 'SAFE') {
        setHealthData(prev => SensorService.getLiveReadings(prev));
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [emergencyStatus, settings.healthMonitoring]);

  // -------------------------------------------------------------
  // Countdown Timer Effect for Emergency Confirmation
  // -------------------------------------------------------------
  useEffect(() => {
    if (emergencyModalOpen && countdownSeconds > 0) {
      countdownTimerRef.current = setTimeout(() => {
        setCountdownSeconds(prev => prev - 1);
      }, 1000);
    } else if (emergencyModalOpen && countdownSeconds === 0) {
      // Timeout reached -> Confirm Emergency
      triggerEmergencyConfirmed();
    }

    return () => clearTimeout(countdownTimerRef.current);
  }, [emergencyModalOpen, countdownSeconds]);

  // Add Notification Helper
  const addNotification = (title, message, type = 'info') => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // -------------------------------------------------------------
  // EMERGENCY SYSTEM CONTROLLERS
  // -------------------------------------------------------------
  const triggerPossibleEmergency = (cause = 'Fall Detected') => {
    setEmergencyCause(cause);
    setCountdownSeconds(settings.emergencyCountdownSeconds);
    setEmergencyModalOpen(true);
    setEmergencyStatus('POSSIBLE_EMERGENCY');
    
    addNotification(
      '⚠ Possible Emergency Detected',
      `${cause} by SmartGuardian sensors. Awaiting 10-second countdown confirmation.`,
      'warning'
    );
  };

  const cancelEmergency = () => {
    clearTimeout(countdownTimerRef.current);
    setEmergencyModalOpen(false);
    setEmergencyStatus('SAFE');
    
    // Log in history
    const record = EmergencyService.createEmergencyRecord(
      emergencyCause,
      healthData.heartRate,
      healthData.spo2,
      'Confirmed Safe',
      'Cancelled',
      `${location.latitude}, ${location.longitude}`
    );
    setEmergencyHistory(prev => [record, ...prev]);

    addNotification(
      'Emergency Cancelled',
      'User clicked "I\'M SAFE". Normal monitoring resumed.',
      'info'
    );
  };

  const triggerEmergencyConfirmed = () => {
    setEmergencyModalOpen(false);
    setEmergencyStatus('EMERGENCY_CONFIRMED');

    // Simulate elevated stats during emergency
    setHealthData(prev => ({
      ...prev,
      heartRate: 104,
      spo2: 96,
      fallStatus: emergencyCause
    }));

    // Log in history
    const record = EmergencyService.createEmergencyRecord(
      emergencyCause,
      104,
      96,
      'No response',
      'Emergency',
      `${location.latitude}, ${location.longitude}`
    );
    setEmergencyHistory(prev => [record, ...prev]);

    // Simulate GSM SMS to primary contact
    EmergencyService.simulateGsmSmsNotification(
      elderProfile.primaryContact.phone,
      elderProfile.name,
      emergencyCause,
      `${location.latitude}, ${location.longitude}`
    );

    addNotification(
      '🚨 EMERGENCY CONFIRMED',
      `No response received after countdown. GSM emergency SMS dispatched to caregiver (${elderProfile.primaryContact.name}).`,
      'error'
    );
  };

  const resetEmergencyState = () => {
    setEmergencyStatus('SAFE');
    setEmergencyModalOpen(false);
    setHealthData(prev => ({
      ...prev,
      heartRate: 72,
      spo2: 98,
      fallStatus: 'No Fall Detected'
    }));
    addNotification('System Reset', 'Emergency status reset to SAFE.', 'info');
  };

  // -------------------------------------------------------------
  // NFC MEDICATION SCAN SIMULATOR CONTROLLERS
  // -------------------------------------------------------------
  const startNfcScanSimulation = (targetMed = null, forceWrong = false) => {
    setTargetMedForScan(targetMed || medications.find(m => m.status === 'Pending') || medications[0]);
    setNfcScanState('scanning');
    setNfcModalOpen(true);

    setTimeout(() => {
      const activeTarget = targetMed || medications.find(m => m.status === 'Pending') || medications[0];
      const scannedTag = forceWrong ? 'MED999_WRONG' : (activeTarget ? activeTarget.nfcTagId : 'MED001');

      const result = MedicationService.verifyNfcScan(scannedTag, medications);
      setNfcScanResult(result);
      setNfcScanState('result');

      if (result.success && activeTarget) {
        // Update medication schedule status
        setMedications(prev => prev.map(m => 
          m.id === activeTarget.id ? { ...m, status: 'Confirmed', takenTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : m
        ));

        // Add history entry
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newHist = {
          id: `hist-${Date.now()}`,
          medication: activeTarget.name,
          scheduledTime: `${activeTarget.time} (${now.getDate()} Aug)`,
          nfcStatus: `Verified (${result.tagId})`,
          confirmationTime: timeStr,
          status: 'Taken'
        };
        setMedicationHistory(prev => [newHist, ...prev]);

        addNotification('✓ Medication Confirmed', `${activeTarget.name} verified via NFC container scan.`, 'success');
      } else {
        addNotification('⚠ Wrong Medicine Scanned', 'NFC Tag ID did not match scheduled prescription.', 'error');
      }
    }, 2200);
  };

  const closeNfcModal = () => {
    setNfcModalOpen(false);
    setNfcScanState('idle');
    setNfcScanResult(null);
  };

  // -------------------------------------------------------------
  // LOCATION GEOLOCATION HANDLER
  // -------------------------------------------------------------
  const fetchCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(prev => ({
            ...prev,
            latitude: parseFloat(position.coords.latitude.toFixed(4)),
            longitude: parseFloat(position.coords.longitude.toFixed(4)),
            status: "GPS Live Location Active",
            lastUpdated: "Just now"
          }));
          addNotification('GPS Updated', 'Live coordinates updated from device location sensor.', 'info');
        },
        (error) => {
          console.warn("Geolocation permission fallback:", error.message);
          setLocation(prev => ({
            ...prev,
            status: "Simulated GPS Location (Erode, TN)",
            lastUpdated: "Just now"
          }));
          addNotification('GPS Simulation', 'Using simulated GPS coordinates (11.3410, 77.7172).', 'info');
        }
      );
    } else {
      addNotification('GPS Simulation', 'Browser location unavailable; using fallback coordinates.', 'info');
    }
  };

  // -------------------------------------------------------------
  // DEVICE HARDWARE SYNC HANDLER
  // -------------------------------------------------------------
  const syncDeviceHardware = () => {
    setHealthData(prev => ({ ...prev, lastSync: "Just now" }));
    addNotification('Device Synchronized', 'ESP32 Smart Cuff handshake complete. All 12 sub-modules operational.', 'info');
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      elderProfile,
      setElderProfile,
      healthData,
      setHealthData,
      hardwareComponents,
      setHardwareComponents,
      medications,
      medicationHistory,
      emergencyHistory,
      notifications,
      location,
      settings,
      setSettings,
      // Emergency states
      emergencyStatus,
      emergencyModalOpen,
      emergencyCause,
      countdownSeconds,
      triggerPossibleEmergency,
      cancelEmergency,
      triggerEmergencyConfirmed,
      resetEmergencyState,
      // NFC state
      nfcModalOpen,
      nfcScanState,
      nfcScanResult,
      targetMedForScan,
      startNfcScanSimulation,
      closeNfcModal,
      // Geolocation
      fetchCurrentLocation,
      // Device sync
      syncDeviceHardware,
      // Dev panel
      devPanelOpen,
      setDevPanelOpen,
      addNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
