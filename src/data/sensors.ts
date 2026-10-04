export interface SensorChannelConfig {
  id: string;
  name: string;
  key: 'vibration' | 'temperature' | 'current' | 'speed';
  unit: string;
  samplingRate: string;
  location: string;
  sensorModel: string;
  description: string;
  normalRange: [number, number];
  warningRange: [number, number];
  criticalRange: [number, number];
}

export const SENSOR_CHANNELS: SensorChannelConfig[] = [
  {
    id: 'SEN-VIB-01',
    name: 'Vibration RMS',
    key: 'vibration',
    unit: 'mm/s',
    samplingRate: '10 kHz Tri-Axial',
    location: 'Idler Junction / Splice Impact Sensor',
    sensorModel: 'IEPE Piezoelectric Accelerometer (0.5Hz - 15kHz)',
    description: 'Measures high-frequency dynamic impact and displacement as conveyor belt splices traverse the idler transition sets and drive pulleys.',
    normalRange: [0, 3.5],
    warningRange: [3.5, 6.0],
    criticalRange: [6.0, 15.0]
  },
  {
    id: 'SEN-TMP-02',
    name: 'Splice Temperature',
    key: 'temperature',
    unit: '°C',
    samplingRate: '50 Hz Multi-Point',
    location: 'Drive Pulley Nip / Non-Contact Pyrometer',
    sensorModel: 'Long-Wave Infrared Micro-Pyrometer Array (8-14 µm)',
    description: 'Detects internal friction, shearing heat, and cord pull-out friction along the vulcanized splice layers before catastrophic delamination.',
    normalRange: [20, 48],
    warningRange: [48, 60],
    criticalRange: [60, 100]
  },
  {
    id: 'SEN-CUR-03',
    name: 'Motor Current',
    key: 'current',
    unit: 'A',
    samplingRate: '1 kHz Phase Synchronous',
    location: 'Primary Drive Inverter MCC Panel',
    sensorModel: 'Hall-Effect High-Precision Current Transducer (0-100A)',
    description: 'Monitors transient mechanical resistance and rotational drag spikes as degraded or stiffened belt joints pass over the drive snub pulleys.',
    normalRange: [18, 30],
    warningRange: [30, 40],
    criticalRange: [40, 75]
  },
  {
    id: 'SEN-SPD-04',
    name: 'Belt Speed',
    key: 'speed',
    unit: 'm/s',
    samplingRate: '100 Hz Optical Tachometer',
    location: 'Tail Return Pulley Shaft Encoder',
    sensorModel: 'Incremental Rotary Optical Encoder (2048 PPR)',
    description: 'Tracks belt velocity differential and slip between drive head and tail to detect micro-slippage caused by joint elongation or tension imbalance.',
    normalRange: [2.6, 3.2],
    warningRange: [2.2, 2.6],
    criticalRange: [0, 2.2]
  }
];
