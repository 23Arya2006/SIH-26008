import { SensorTrendPoint, DemoMode, JointId } from '../types';

export type TimeFilter = '1H' | '6H' | '24H';

export function generateTrendData(
  jointId: JointId,
  demoMode: DemoMode,
  timeFilter: TimeFilter
): SensorTrendPoint[] {
  const pointsCount = timeFilter === '1H' ? 12 : timeFilter === '6H' ? 18 : 24;
  const result: SensorTrendPoint[] = [];
  
  const now = new Date();
  const stepMinutes = timeFilter === '1H' ? 5 : timeFilter === '6H' ? 20 : 60;

  // Base parameters for joint and demoMode
  let baseVib = 1.4;
  let baseTemp = 36;
  let baseCurrent = 24;
  let baseSpeed = 2.8;
  let baseHealth = 92;

  const isTargetDegraded = (jointId === 'J-03' && demoMode === 'WARNING') ||
                          (jointId === 'J-05' && demoMode === 'CRITICAL') ||
                          (jointId === 'J-03' && demoMode === 'CRITICAL');

  for (let i = pointsCount - 1; i >= 0; i--) {
    const pointTime = new Date(now.getTime() - i * stepMinutes * 60000);
    const timeStr = pointTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Normalized progression from 0 (past) to 1 (current moment)
    const progress = (pointsCount - 1 - i) / (pointsCount - 1);
    
    // Controlled pseudo-noise for natural industrial vibration fluctuations
    const noiseVib = Math.sin(i * 1.7) * 0.18 + Math.cos(i * 3.1) * 0.12;
    const noiseTemp = Math.sin(i * 0.9) * 0.4 + Math.cos(i * 1.4) * 0.3;
    const noiseCurrent = Math.sin(i * 2.3) * 0.7 + Math.cos(i * 4.1) * 0.5;
    const noiseSpeed = (Math.sin(i * 2.1) * 0.02);

    let vib = baseVib + noiseVib;
    let temp = baseTemp + noiseTemp;
    let current = baseCurrent + noiseCurrent;
    let speed = baseSpeed + noiseSpeed;
    let health = baseHealth;

    if (isTargetDegraded) {
      if (demoMode === 'WARNING' && jointId === 'J-03') {
        // Curve degrading towards 4.2 mm/s vibration, 46°C, 31A current, health 72
        const ramp = Math.pow(progress, 1.8);
        vib = 1.6 + ramp * 2.6 + noiseVib * 1.4;
        temp = 37 + ramp * 9.0 + noiseTemp;
        current = 24 + ramp * 7.0 + noiseCurrent;
        health = Math.round(92 - ramp * 20);
      } else if (demoMode === 'CRITICAL' && jointId === 'J-05') {
        // Severe exponential spike towards 8.4 mm/s, 64°C, 44A current, health 38
        const ramp = Math.pow(progress, 2.2);
        vib = 1.5 + ramp * 6.9 + noiseVib * 2.2;
        temp = 36 + ramp * 28.0 + noiseTemp * 1.5;
        current = 24 + ramp * 20.0 + noiseCurrent * 2.0;
        speed = 2.8 - ramp * 0.35 + noiseSpeed;
        health = Math.round(93 - ramp * 55);
      } else if (demoMode === 'CRITICAL' && jointId === 'J-03') {
        const ramp = Math.pow(progress, 1.6);
        vib = 2.2 + ramp * 3.4 + noiseVib * 1.6;
        temp = 39 + ramp * 13.0 + noiseTemp;
        current = 26 + ramp * 10.0 + noiseCurrent;
        health = Math.round(88 - ramp * 30);
      }
    } else {
      // Normal joint baseline with standard low-amplitude industrial fluctuations
      if (jointId === 'J-01') { vib = 1.4 + noiseVib; temp = 36 + noiseTemp; current = 24 + noiseCurrent; health = 94; }
      else if (jointId === 'J-02') { vib = 1.6 + noiseVib; temp = 37 + noiseTemp; current = 25 + noiseCurrent; health = 91; }
      else if (jointId === 'J-04') { vib = 1.8 + noiseVib; temp = 39 + noiseTemp; current = 25 + noiseCurrent; health = 89; }
      else if (jointId === 'J-05') { vib = 1.4 + noiseVib; temp = 36 + noiseTemp; current = 24 + noiseCurrent; health = 93; }
      else if (jointId === 'J-03') { vib = 1.5 + noiseVib; temp = 38 + noiseTemp; current = 24 + noiseCurrent; health = 92; }
    }

    result.push({
      time: timeStr,
      timestamp: pointTime.toISOString(),
      vibration: Number(Math.max(0.5, vib).toFixed(2)),
      temperature: Number(Math.max(20, temp).toFixed(1)),
      current: Number(Math.max(15, current).toFixed(1)),
      speed: Number(Math.max(0, speed).toFixed(2)),
      healthScore: Math.min(100, Math.max(10, health))
    });
  }

  return result;
}

export interface HealthHistoryPoint {
  shift: string;
  score: number;
  label?: string;
}

export const HEALTH_HISTORY_CURVES: Record<DemoMode, Record<JointId, HealthHistoryPoint[]>> = {
  NORMAL: {
    'J-01': [{ shift: 'T-6', score: 96 }, { shift: 'T-5', score: 95 }, { shift: 'T-4', score: 95 }, { shift: 'T-3', score: 94 }, { shift: 'T-2', score: 94 }, { shift: 'T-1', score: 95 }, { shift: 'Now', score: 94 }],
    'J-02': [{ shift: 'T-6', score: 94 }, { shift: 'T-5', score: 93 }, { shift: 'T-4', score: 92 }, { shift: 'T-3', score: 92 }, { shift: 'T-2', score: 91 }, { shift: 'T-1', score: 91 }, { shift: 'Now', score: 91 }],
    'J-03': [{ shift: 'T-6', score: 94 }, { shift: 'T-5', score: 94 }, { shift: 'T-4', score: 93 }, { shift: 'T-3', score: 93 }, { shift: 'T-2', score: 92 }, { shift: 'T-1', score: 92 }, { shift: 'Now', score: 92 }],
    'J-04': [{ shift: 'T-6', score: 92 }, { shift: 'T-5', score: 91 }, { shift: 'T-4', score: 90 }, { shift: 'T-3', score: 90 }, { shift: 'T-2', score: 89 }, { shift: 'T-1', score: 89 }, { shift: 'Now', score: 89 }],
    'J-05': [{ shift: 'T-6', score: 95 }, { shift: 'T-5', score: 95 }, { shift: 'T-4', score: 94 }, { shift: 'T-3', score: 94 }, { shift: 'T-2', score: 93 }, { shift: 'T-1', score: 93 }, { shift: 'Now', score: 93 }]
  },
  WARNING: {
    'J-01': [{ shift: 'T-6', score: 95 }, { shift: 'T-5', score: 95 }, { shift: 'T-4', score: 94 }, { shift: 'T-3', score: 94 }, { shift: 'T-2', score: 94 }, { shift: 'T-1', score: 94 }, { shift: 'Now', score: 94 }],
    'J-02': [{ shift: 'T-6', score: 93 }, { shift: 'T-5', score: 92 }, { shift: 'T-4', score: 92 }, { shift: 'T-3', score: 91 }, { shift: 'T-2', score: 91 }, { shift: 'T-1', score: 91 }, { shift: 'Now', score: 91 }],
    'J-03': [{ shift: 'T-6', score: 92 }, { shift: 'T-5', score: 90 }, { shift: 'T-4', score: 88 }, { shift: 'T-3', score: 85 }, { shift: 'T-2', score: 81 }, { shift: 'T-1', score: 77 }, { shift: 'Now', score: 72, label: 'Warning Zone' }],
    'J-04': [{ shift: 'T-6', score: 91 }, { shift: 'T-5', score: 91 }, { shift: 'T-4', score: 90 }, { shift: 'T-3', score: 90 }, { shift: 'T-2', score: 89 }, { shift: 'T-1', score: 89 }, { shift: 'Now', score: 89 }],
    'J-05': [{ shift: 'T-6', score: 92 }, { shift: 'T-5', score: 90 }, { shift: 'T-4', score: 89 }, { shift: 'T-3', score: 88 }, { shift: 'T-2', score: 87 }, { shift: 'T-1', score: 87 }, { shift: 'Now', score: 86 }]
  },
  CRITICAL: {
    'J-01': [{ shift: 'T-6', score: 94 }, { shift: 'T-5', score: 94 }, { shift: 'T-4', score: 93 }, { shift: 'T-3', score: 93 }, { shift: 'T-2', score: 92 }, { shift: 'T-1', score: 92 }, { shift: 'Now', score: 92 }],
    'J-02': [{ shift: 'T-6', score: 93 }, { shift: 'T-5', score: 92 }, { shift: 'T-4', score: 91 }, { shift: 'T-3', score: 91 }, { shift: 'T-2', score: 90 }, { shift: 'T-1', score: 90 }, { shift: 'Now', score: 90 }],
    'J-03': [{ shift: 'T-6', score: 88 }, { shift: 'T-5', score: 82 }, { shift: 'T-4', score: 76 }, { shift: 'T-3', score: 70 }, { shift: 'T-2', score: 66 }, { shift: 'T-1', score: 62 }, { shift: 'Now', score: 58, label: 'Critical Threshold' }],
    'J-04': [{ shift: 'T-6', score: 90 }, { shift: 'T-5', score: 89 }, { shift: 'T-4', score: 89 }, { shift: 'T-3', score: 88 }, { shift: 'T-2', score: 88 }, { shift: 'T-1', score: 87 }, { shift: 'Now', score: 87 }],
    'J-05': [{ shift: 'T-6', score: 82 }, { shift: 'T-5', score: 74 }, { shift: 'T-4', score: 63 }, { shift: 'T-3', score: 52 }, { shift: 'T-2', score: 45 }, { shift: 'T-1', score: 41 }, { shift: 'Now', score: 38, label: 'Rupture Threat' }]
  }
};
