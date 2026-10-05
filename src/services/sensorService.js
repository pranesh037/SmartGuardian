/**
 * SmartGuardian Sensor Service Layer
 * Abstracts MAX30102 (HR/SpO2), MPU6050 (Fall/Motion), GPS, and Battery telemetry.
 */

export const generateSimulatedPulse = (currentHr) => {
  // Random slight variation around baseline (68 to 85 BPM)
  const delta = (Math.random() - 0.48) * 3;
  const newHr = Math.round(Math.min(130, Math.max(55, currentHr + delta)));
  return newHr;
};

export const generateSimulatedSpO2 = (currentSpo2) => {
  // Slight fluctuation 96-99%
  const values = [97, 98, 98, 99, 97, 98, 99, 96];
  return values[Math.floor(Math.random() * values.length)];
};

export class SensorService {
  static getLiveReadings(currentData) {
    return {
      heartRate: generateSimulatedPulse(currentData.heartRate),
      spo2: generateSimulatedSpO2(currentData.spo2),
      steps: currentData.steps + (Math.random() > 0.6 ? 1 : 0),
      lastSync: new Date().toLocaleTimeString()
    };
  }
}
