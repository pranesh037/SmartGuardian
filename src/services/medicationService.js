/**
 * SmartGuardian NFC Medication Verification Service
 * Simulates hardware NFC reader scan (PN532 reader on Smart Cuff)
 */

export class MedicationService {
  static verifyNfcScan(scannedTagId, scheduledMeds) {
    // Find if scanned tag corresponds to any scheduled medication
    const matchingMed = scheduledMeds.find(m => m.nfcTagId === scannedTagId);

    if (matchingMed) {
      return {
        success: true,
        tagId: scannedTagId,
        medicineName: matchingMed.name,
        scheduledTime: matchingMed.time,
        result: "Correct Medicine",
        message: "Medication successfully verified through NFC."
      };
    } else {
      return {
        success: false,
        tagId: scannedTagId,
        medicineName: "Unknown / Mismatched Medicine",
        scheduledTime: "--",
        result: "Wrong Medicine",
        message: "Warning: Scanned container tag does not match scheduled medication!"
      };
    }
  }
}
