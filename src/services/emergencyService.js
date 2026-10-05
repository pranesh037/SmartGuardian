/**
 * SmartGuardian Emergency System Service
 * Manages fall detection logic, SOS button alerts, GSM SMS simulation, and 10s countdown.
 */

export class EmergencyService {
  static createEmergencyRecord(type, heartRate, spo2, response, status, locationStr = "11.3410, 77.7172") {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    return {
      id: `emg-${Date.now()}`,
      date: dateStr,
      time: timeStr,
      event: type,
      heartRate: `${heartRate} BPM`,
      spo2: `${spo2}%`,
      response: response,
      status: status,
      location: locationStr
    };
  }

  static simulateGsmSmsNotification(contactPhone, elderName, eventType, location) {
    console.log(`[GSM SIMULATOR - SIM800L] Transmitting Emergency SMS to ${contactPhone}...`);
    console.log(`[SMS Content]: "ALERT: ${eventType} detected for ${elderName}. Location: ${location}. View app: https://smartguardian.app"`);
    return {
      sent: true,
      timestamp: new Date().toLocaleTimeString(),
      recipient: contactPhone
    };
  }
}
