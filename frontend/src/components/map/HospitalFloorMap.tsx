import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, MapPin, Compass, ArrowRight, Layers, Footprints, CheckCircle2, Shield } from 'lucide-react';

interface HospitalFloorMapProps {
  assignedRoomNumber?: string;
  assignedWing?: string;
}

export const HospitalFloorMap: React.FC<HospitalFloorMapProps> = ({
  assignedRoomNumber = '101',
  assignedWing = 'Emergency Wing',
}) => {
  const [selectedFloor, setSelectedFloor] = useState<number>(() => {
    if (assignedRoomNumber.startsWith('2')) return 2;
    if (assignedRoomNumber.startsWith('3')) return 3;
    if (assignedRoomNumber.startsWith('4')) return 4;
    return 1;
  });

  const roomsByFloor: Record<number, Array<{ num: string; name: string; category: string; color: string; x: number; y: number }>> = {
    1: [
      { num: '101', name: 'Trauma & Cardiac Care', category: 'EMERGENCY', color: '#ef4444', x: 120, y: 80 },
      { num: '102', name: 'Emergency Consultation', category: 'EMERGENCY', color: '#ef4444', x: 260, y: 80 },
      { num: '103', name: 'Critical Care Bay', category: 'EMERGENCY', color: '#ef4444', x: 400, y: 80 },
      { num: '104', name: 'Emergency Triage', category: 'EMERGENCY', color: '#ef4444', x: 120, y: 200 },
      { num: '105', name: 'Observation Suite', category: 'EMERGENCY', color: '#ef4444', x: 260, y: 200 },
    ],
    2: [
      { num: '201', name: 'Pediatric Care Unit', category: 'URGENT', color: '#f97316', x: 120, y: 80 },
      { num: '202', name: 'Urgent Assessment', category: 'URGENT', color: '#f97316', x: 260, y: 80 },
      { num: '203', name: 'Fever Clinic', category: 'URGENT', color: '#f97316', x: 400, y: 80 },
      { num: '204', name: 'Minor Procedure Room', category: 'URGENT', color: '#f97316', x: 120, y: 200 },
      { num: '205', name: 'Pediatric Observation', category: 'URGENT', color: '#f97316', x: 260, y: 200 },
    ],
    3: [
      { num: '301', name: 'Orthopedic Specialty', category: 'PRIORITY', color: '#eab308', x: 120, y: 80 },
      { num: '302', name: 'Neurology Consultation', category: 'PRIORITY', color: '#eab308', x: 260, y: 80 },
      { num: '303', name: 'Cardiology Suite', category: 'PRIORITY', color: '#eab308', x: 400, y: 80 },
      { num: '304', name: 'Post-Op Follow-up', category: 'PRIORITY', color: '#eab308', x: 120, y: 200 },
      { num: '305', name: 'Rehabilitation Room', category: 'PRIORITY', color: '#eab308', x: 260, y: 200 },
    ],
    4: [
      { num: '401', name: 'General OPD Room 1', category: 'GENERAL', color: '#0284c7', x: 120, y: 80 },
      { num: '402', name: 'General OPD Room 2', category: 'GENERAL', color: '#0284c7', x: 260, y: 80 },
      { num: '403', name: 'Allergy & Prescription', category: 'GENERAL', color: '#0284c7', x: 400, y: 80 },
      { num: '404', name: 'Psychiatry & Mind Care', category: 'GENERAL', color: '#0284c7', x: 120, y: 200 },
      { num: '405', name: 'General Health Checkup', category: 'GENERAL', color: '#0284c7', x: 260, y: 200 },
    ],
  };

  const currentFloorRooms = roomsByFloor[selectedFloor] || roomsByFloor[1];
  const assignedRoomObj = currentFloorRooms.find((r) => r.num === assignedRoomNumber) || currentFloorRooms[0];
  const entrancePos = { x: 260, y: 330 };

  return (
    <div className="glass-card-pro rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
      
      {/* Map Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
              <Navigation className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-sky-600 dark:text-sky-400 uppercase tracking-widest block">
                INDOOR WAYFINDING SYSTEM
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Hospital Floor & Route Map
              </h3>
            </div>
          </div>
        </div>

        {/* Assigned Room Badge */}
        <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md flex items-center gap-2 self-start sm:self-auto">
          <MapPin className="w-4 h-4" />
          <div className="text-xs">
            <span className="opacity-80 block text-[10px]">Your Destination</span>
            <span className="font-extrabold">Room {assignedRoomNumber} ({assignedWing})</span>
          </div>
        </div>
      </div>

      {/* Floor Selection Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
        {[
          { floor: 1, label: 'Floor 1 (Emergency)' },
          { floor: 2, label: 'Floor 2 (Urgent)' },
          { floor: 3, label: 'Floor 3 (Specialist)' },
          { floor: 4, label: 'Floor 4 (General OPD)' },
        ].map((tab) => {
          const isActive = selectedFloor === tab.floor;
          const isAssignedFloor = assignedRoomNumber.startsWith(tab.floor.toString());
          return (
            <button
              key={tab.floor}
              onClick={() => setSelectedFloor(tab.floor)}
              className={`flex-1 min-w-[120px] py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 scale-102'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
              {isAssignedFloor && <span className="ml-1 text-[10px] bg-white/30 text-white px-1.5 py-0.5 rounded-full font-black">★ Your Floor</span>}
            </button>
          );
        })}
      </div>

      {/* Vector 2D Floor Plan Canvas */}
      <div className="relative w-full h-[380px] bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl">
        <svg className="w-full h-full" viewBox="0 0 540 380">
          
          {/* Grid Background */}
          <defs>
            <pattern id="arch-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="1" />
            </pattern>
            <linearGradient id="route-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-grid)" />

          {/* Central Corridor Pathway */}
          <rect x="220" y="40" width="80" height="260" rx="8" fill="rgba(30, 41, 59, 0.6)" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="260" y="170" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle" transform="rotate(-90 260 170)">
            MAIN CLINICAL CORRIDOR
          </text>

          {/* Main Entrance & Waiting Lounge (Bottom Zone) */}
          <g transform="translate(140, 310)">
            <rect width="240" height="50" rx="12" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2" />
            <circle cx="20" cy="25" r="8" fill="#10b981" className="animate-ping" />
            <circle cx="20" cy="25" r="5" fill="#10b981" />
            <text x="40" y="24" fill="#10b981" fontSize="11" fontWeight="bold">
              START: MAIN ENTRANCE & WAITING LOUNGE
            </text>
            <text x="40" y="38" fill="#a7f3d0" fontSize="9" fontWeight="medium">
              You are here • Reception Kiosk Terminal
            </text>
          </g>

          {/* Route Navigation Path Line */}
          {selectedFloor.toString() === assignedRoomNumber[0] && (
            <g>
              <path
                d={`M ${entrancePos.x} ${entrancePos.y} L ${entrancePos.x} ${assignedRoomObj.y + 30} L ${assignedRoomObj.x + 50} ${assignedRoomObj.y + 30}`}
                fill="none"
                stroke="url(#route-gradient)"
                strokeWidth="4"
                strokeDasharray="8 6"
                className="animate-pulse"
              />
              <circle cx={assignedRoomObj.x + 50} cy={assignedRoomObj.y + 30} r="8" fill="#10b981" className="animate-ping" />
            </g>
          )}

          {/* Rooms Grid */}
          {currentFloorRooms.map((room) => {
            const isDestination = room.num === assignedRoomNumber;

            return (
              <g key={room.num} transform={`translate(${room.x}, ${room.y})`}>
                {/* Room Outer Box */}
                <rect
                  width="100"
                  height="60"
                  rx="12"
                  fill={isDestination ? 'rgba(16, 185, 129, 0.3)' : 'rgba(30, 41, 59, 0.8)'}
                  stroke={isDestination ? '#10b981' : room.color}
                  strokeWidth={isDestination ? '3' : '1.5'}
                />

                {/* Door Indicator */}
                <rect x="40" y="56" width="20" height="4" fill={isDestination ? '#10b981' : '#64748b'} rx="2" />

                {/* Room Number */}
                <text x="50" y="25" fill="#ffffff" fontSize="14" fontWeight="black" textAnchor="middle">
                  ROOM {room.num}
                </text>

                {/* Room Name */}
                <text x="50" y="42" fill={isDestination ? '#a7f3d0' : '#94a3b8'} fontSize="9" fontWeight="bold" textAnchor="middle">
                  {room.name}
                </text>

                {/* Destination Pin */}
                {isDestination && (
                  <g transform="translate(50, -10)">
                    <circle cx="0" cy="0" r="10" fill="#10b981" />
                    <text x="0" y="3" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">★</text>
                  </g>
                )}
              </g>
            );
          })}

        </svg>

        {/* Floating Legend */}
        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 flex items-center gap-3 text-[10px] text-slate-300">
          <span className="flex items-center gap-1 font-bold"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Start Point</span>
          <span className="flex items-center gap-1 font-bold"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" /> Your Destination</span>
          <span className="flex items-center gap-1 text-emerald-400 font-bold"><Footprints className="w-3 h-3" /> Turn-by-Turn Route</span>
        </div>
      </div>

      {/* Step-by-step Turn-by-Turn Directions Box */}
      <div className="p-4 rounded-2xl bg-sky-50 dark:bg-slate-900/80 border border-sky-100 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider">
          <Compass className="w-4 h-4 text-sky-600" />
          <span>Turn-by-Turn Navigation Instructions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">Start at Waiting Lounge</span>
              <span className="text-slate-500 text-[11px]">Ground Floor Entrance Kiosk</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">Take Elevator / Stairs</span>
              <span className="text-slate-500 text-[11px]">Head to {assignedWing} ({selectedFloor}F)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
            <div>
              <span className="font-bold text-emerald-900 dark:text-emerald-300 block">Arrive at Room {assignedRoomNumber}</span>
              <span className="text-emerald-700 dark:text-emerald-400 text-[11px]">Follow glowing green corridor line</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
