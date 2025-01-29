import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface PassData {
  passId: string;
  studentId: string;
  studentName: string;
  destination: string;
  date: string;
  time: string;
  timestamp: string;
}

interface ScanResultProps {
  data: PassData;
  isValid: boolean;
  onClose: () => void;
}

function ScanResult({ data, isValid, onClose }: ScanResultProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
        <div className="text-center mb-6">
          {isValid ? (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          ) : (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          )}
          <h3 className="text-2xl font-bold text-gray-800">
            {isValid ? 'Valid Pass' : 'Invalid Pass'}
          </h3>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">Student Name</label>
            <p className="text-lg font-medium text-gray-900">{data.studentName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Student ID</label>
            <p className="text-lg font-medium text-gray-900">{data.studentId}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Destination</label>
            <p className="text-lg font-medium text-gray-900">{data.destination}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Date</label>
              <p className="text-lg font-medium text-gray-900">{data.date}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Time</label>
              <p className="text-lg font-medium text-gray-900">{data.time}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
        >
          Scan Another Pass
        </button>
      </div>
    </div>
  );
}

export default function QRScanner() {
  const [scanResult, setScanResult] = useState<PassData | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      { 
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      },
      false
    );

    const onScanSuccess = (decodedText: string) => {
      try {
        const data: PassData = JSON.parse(decodedText);
        const passDate = new Date(data.date);
        const passTime = data.time.split(':');
        passDate.setHours(parseInt(passTime[0]), parseInt(passTime[1]));
        
        // Check if pass is valid for current date/time
        const now = new Date();
        const isValidTime = Math.abs(passDate.getTime() - now.getTime()) < 1000 * 60 * 60; // 1 hour window
        
        setIsValid(isValidTime);
        setScanResult(data);
        scanner.clear();
      } catch (error) {
        console.error('Invalid QR code data:', error);
      }
    };

    scanner.render(onScanSuccess, (error) => {
      console.warn('QR scan error:', error);
    });

    return () => {
      scanner.clear();
    };
  }, []);

  const handleClose = () => {
    setScanResult(null);
    window.location.reload(); // Restart scanner
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Scan Gate Pass
          </h2>
          
          <div className="aspect-square w-full max-w-sm mx-auto mb-6">
            <div id="qr-reader" className="overflow-hidden rounded-lg"></div>
          </div>
          
          <p className="text-center text-gray-600">
            Position the QR code within the frame to scan
          </p>
        </div>
      </div>

      {scanResult && (
        <ScanResult
          data={scanResult}
          isValid={isValid}
          onClose={handleClose}
        />
      )}
    </div>
  );
}