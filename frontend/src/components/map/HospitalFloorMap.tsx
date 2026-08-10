import React from 'react';
import { MapPin, Navigation, Compass, AlertCircle } from 'lucide-react';

interface HospitalFloorMapProps {
  assignedRoomNumber?: string;
  assignedWing?: string;
}

export const HospitalFloorMap: React.FC<HospitalFloorMapProps> = ({
  assignedRoomNumber = '101',
  assignedWing = 'Emergency Wing',
}) => {

  const roomsData = [
    { num: '101', wing: 'Emergency Wing', x: 80, y: 70, floor: 1, type: 'EMERGENCY' },
    { num: '102', wing: 'Emergency Wing', x: 160, y: 70, floor: 1, type: 'EMERGENCY' },
    { num: '201', wing: 'Urgent Care', x: 300, y: 70, floor: 2, type: 'URGENT' },
    { num: '301', wing: 'Specialist Wing', x: 440, y: 70, floor: 3, type: 'PRIORITY' },
    { num: '401', wing: 'General OPD', x: 80, y: 220, floor: 4, type: 'GENERAL' },
    { num: '402', wing: 'General OPD', x: 160, y: 220, floor: 4, type: 'GENERAL' },
    { num: '403', wing: 'General OPD', x: 240, y: 220, floor: 4, type: 'GENERAL' },
  ];

  const targetRoom = roomsData.find((r) => r.num === assignedRoomNumber) || roomsData[0];
  const entrancePos = { x: 300, y: 340 };

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-teal-500 animate-pulse" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Interactive Hospital Route Map
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
          Target: Room {assignedRoomNumber} ({assignedWing})
        </span>
      </div>

      <div className="relative w-full h-[360px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 p-2">
        <svg className="w-full h-full" viewBox="0 0 600 380">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Main Entrance / Waiting Lounge Zone */}
          <rect x="220" y="310" width="160" height="50" rx="8" fill="rgba(13, 148, 136, 0.2)" stroke="#0d9488" strokeWidth="2" />
          <text x="300" y="340" fill="#ccfbf1" fontSize="12" fontWeight="bold" textAnchor="middle">
            MAIN ENTRANCE & WAITING LOUNGE
          </text>

          {/* Route path line from entrance to target room */}
          <path
            d={`M ${entrancePos.x} ${entrancePos.y} L ${entrancePos.x} 150 L ${targetRoom.x} 150 L ${targetRoom.x} ${targetRoom.y}`}
            fill="none"
            stroke="#10b981"
            strokeWidth="4"
            strokeDasharray="8 6"
            className="animate-pulse"
          />

          {/* Rooms */}
          {roomsData.map((room) => {
            const isTarget = room.num === assignedRoomNumber;
            let fillColor = 'rgba(51, 65, 85, 0.6)';
            let strokeColor = '#475569';

            if (room.type === 'EMERGENCY') {
              fillColor = isTarget ? 'rgba(239, 68, 68, 0.4)' : 'rgba(239, 68, 68, 0.15)';
              strokeColor = '#ef4444';
            } else if (room.type === 'URGENT') {
              fillColor = isTarget ? 'rgba(249, 115, 22, 0.4)' : 'rgba(249, 115, 22, 0.15)';
              strokeColor = '#f97316';
            } else if (room.type === 'PRIORITY') {
              fillColor = isTarget ? 'rgba(234, 179, 8, 0.4)' : 'rgba(234, 179, 8, 0.15)';
              strokeColor = '#eab308';
            } else {
              fillColor = isTarget ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.15)';
              strokeColor = '#3b82f6';
            }

            return (
              <g key={room.num} transform={`translate(${room.x - 30}, ${room.y - 30})`}>
                <rect
                  width="60"
                  height="60"
                  rx="10"
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={isTarget ? '3' : '1.5'}
                />
                <text x="30" y="35" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                  {room.num}
                </text>
                {isTarget && (
                  <circle cx="30" cy="15" r="5" fill="#10b981" className="animate-ping" />
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 right-3 p-2 bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Emergency (1F)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Urgent (2F)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Priority (3F)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> General (4F)</span>
          </div>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" /> Shortest Route Highlighted
          </span>
        </div>
      </div>
    </div>
  );
};
