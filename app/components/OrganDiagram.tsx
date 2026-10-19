"use client";

import type { OrganId } from "../lib/anatomy-data";

type Props = {
  id: OrganId;
  accent: string;
  /** thumb | panel | stage | card */
  variant?: "thumb" | "panel" | "stage" | "card";
  className?: string;
};

/**
 * Original educational SVG diagrams for organs without shipped raster/3D assets.
 * Hand-authored for Lumen — not copied from third-party illustration packs.
 */
export function OrganDiagram({ id, accent, variant = "panel", className = "" }: Props) {
  const showLabels = variant === "stage" || variant === "panel" || variant === "card";
  const compact = variant === "thumb";

  return (
    <svg
      viewBox="0 0 240 240"
      className={`organ-diagram organ-diagram-${variant} ${className}`}
      role="img"
      aria-hidden={compact ? true : undefined}
      style={{ "--diagram-accent": accent } as React.CSSProperties}
    >
      <defs>
        <linearGradient id={`fill-${id}`} x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="45%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.22" />
        </linearGradient>
        <filter id={`soft-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={accent} floodOpacity="0.25" />
        </filter>
      </defs>

      {id === "stomach" && <StomachDiagram accent={accent} labels={showLabels} compact={compact} />}
      {id === "spleen" && <SpleenDiagram accent={accent} labels={showLabels} compact={compact} />}
      {id === "thyroid" && <ThyroidDiagram accent={accent} labels={showLabels} compact={compact} />}
      {id === "bladder" && <BladderDiagram accent={accent} labels={showLabels} compact={compact} />}
      {id === "gallbladder" && <GallbladderDiagram accent={accent} labels={showLabels} compact={compact} />}
      {id === "ear" && <EarDiagram accent={accent} labels={showLabels} compact={compact} />}
    </svg>
  );
}

function Label({ x, y, text, side = "right" }: { x: number; y: number; text: string; side?: "left" | "right" }) {
  const anchor = side === "left" ? "end" : "start";
  const lineX2 = side === "left" ? x - 14 : x + 14;
  return (
    <g className="diagram-label">
      <line x1={x} y1={y} x2={lineX2} y2={y} stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <circle cx={x} cy={y} r="2.5" fill="var(--diagram-accent)" />
      <text x={side === "left" ? x - 18 : x + 18} y={y + 3} textAnchor={anchor} className="diagram-label-text">
        {text}
      </text>
    </g>
  );
}

function StomachDiagram({ accent, labels, compact }: { accent: string; labels: boolean; compact: boolean }) {
  return (
    <g filter={compact ? undefined : `url(#soft-stomach)`}>
      <ellipse cx="118" cy="78" rx="42" ry="28" fill={`url(#fill-stomach)`} stroke={accent} strokeWidth="2" className="diagram-part" />
      <path
        d="M78 90 C58 110, 55 150, 78 175 C95 195, 130 200, 155 185 C175 172, 182 145, 170 120 C160 100, 145 95, 130 92"
        fill={`url(#fill-stomach)`}
        stroke={accent}
        strokeWidth="2.2"
        className="diagram-part"
      />
      <path d="M95 115 Q120 125 145 118 Q155 145 140 165 Q115 175 95 160 Q85 140 95 115" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.45" className="diagram-rugae" />
      <path d="M155 185 Q175 200 195 205" fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M100 52 Q118 40 135 52" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
      {!compact && labels && (
        <>
          <Label x={135} y={58} text="Fundus" />
          <Label x={168} y={120} text="Body" />
          <Label x={175} y={190} text="Pylorus" />
          <Label x={78} y={100} text="Lesser curve" side="left" />
          <Label x={70} y={160} text="Greater curve" side="left" />
        </>
      )}
    </g>
  );
}

function SpleenDiagram({ accent, labels, compact }: { accent: string; labels: boolean; compact: boolean }) {
  return (
    <g filter={compact ? undefined : `url(#soft-spleen)`}>
      <path
        d="M70 70 C95 45, 150 40, 175 70 C195 95, 190 150, 160 175 C130 195, 85 190, 65 155 C50 125, 50 95, 70 70Z"
        fill={`url(#fill-spleen)`}
        stroke={accent}
        strokeWidth="2.2"
        className="diagram-part"
      />
      <ellipse cx="95" cy="110" rx="18" ry="28" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.2" />
      <circle cx="95" cy="100" r="5" fill={accent} fillOpacity="0.35" />
      <circle cx="95" cy="118" r="4" fill={accent} fillOpacity="0.28" />
      <path d="M55 120 L78 118 M55 130 L80 128 M55 140 L76 138" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      {!compact && labels && (
        <>
          <Label x={175} y={85} text="Capsule" />
          <Label x={95} y={95} text="White pulp" side="left" />
          <Label x={150} y={155} text="Red pulp" />
          <Label x={55} y={125} text="Hilum" side="left" />
        </>
      )}
    </g>
  );
}

function ThyroidDiagram({ accent, labels, compact }: { accent: string; labels: boolean; compact: boolean }) {
  return (
    <g filter={compact ? undefined : `url(#soft-thyroid)`}>
      <path d="M110 40 L120 95 L130 40" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      <ellipse cx="85" cy="130" rx="32" ry="48" fill={`url(#fill-thyroid)`} stroke={accent} strokeWidth="2.2" className="diagram-part" />
      <ellipse cx="155" cy="130" rx="32" ry="48" fill={`url(#fill-thyroid)`} stroke={accent} strokeWidth="2.2" className="diagram-part" />
      <rect x="105" y="118" width="30" height="22" rx="8" fill={`url(#fill-thyroid)`} stroke={accent} strokeWidth="2" />
      <path d="M120 95 L120 118" stroke={accent} strokeWidth="1.5" opacity="0.5" />
      <circle cx="85" cy="120" r="6" fill={accent} fillOpacity="0.2" />
      <circle cx="155" cy="135" r="6" fill={accent} fillOpacity="0.2" />
      {!compact && labels && (
        <>
          <Label x={85} y={95} text="Left lobe" side="left" />
          <Label x={155} y={95} text="Right lobe" />
          <Label x={135} y={128} text="Isthmus" />
          <Label x={120} y={55} text="Trachea" />
        </>
      )}
    </g>
  );
}

function BladderDiagram({ accent, labels, compact }: { accent: string; labels: boolean; compact: boolean }) {
  return (
    <g filter={compact ? undefined : `url(#soft-bladder)`}>
      <path
        d="M70 90 C70 55, 170 55, 170 90 C175 130, 160 175, 120 190 C80 175, 65 130, 70 90Z"
        fill={`url(#fill-bladder)`}
        stroke={accent}
        strokeWidth="2.2"
        className="diagram-part"
      />
      <path d="M85 100 Q120 115 155 100" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.4" />
      <path d="M90 125 Q120 138 150 125" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.35" />
      <path d="M95 55 L100 85 M145 55 L140 85" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      <path d="M112 190 L112 215 M128 190 L128 215" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
      <polygon points="100,145 120,160 140,145" fill="none" stroke={accent} strokeWidth="1.4" opacity="0.55" />
      {!compact && labels && (
        <>
          <Label x={100} y={70} text="Ureter" side="left" />
          <Label x={155} y={110} text="Detrusor" />
          <Label x={120} y={155} text="Trigone" />
          <Label x={128} y={205} text="Urethra" />
        </>
      )}
    </g>
  );
}

function GallbladderDiagram({ accent, labels, compact }: { accent: string; labels: boolean; compact: boolean }) {
  return (
    <g filter={compact ? undefined : `url(#soft-gallbladder)`}>
      <path
        d="M95 55 C125 45, 155 70, 150 110 C145 145, 125 175, 105 185 C85 175, 75 140, 80 105 C84 75, 85 60, 95 55Z"
        fill={`url(#fill-gallbladder)`}
        stroke={accent}
        strokeWidth="2.2"
        className="diagram-part"
      />
      <path d="M100 70 Q115 90 110 120 Q105 150 115 170" fill="none" stroke={accent} strokeWidth="1.1" opacity="0.35" />
      <path d="M115 185 Q140 200 165 195 Q185 190 195 170" fill="none" stroke={accent} strokeWidth="2.3" strokeLinecap="round" />
      <ellipse cx="175" cy="95" rx="28" ry="18" fill="none" stroke={accent} strokeWidth="1.4" opacity="0.35" strokeDasharray="3 3" />
      {!compact && labels && (
        <>
          <Label x={150} y={70} text="Fundus" />
          <Label x={150} y={120} text="Body" />
          <Label x={115} y={175} text="Neck" side="left" />
          <Label x={165} y={195} text="Cystic duct" />
          <Label x={175} y={85} text="Liver bed" />
        </>
      )}
    </g>
  );
}

function EarDiagram({ accent, labels, compact }: { accent: string; labels: boolean; compact: boolean }) {
  return (
    <g filter={compact ? undefined : `url(#soft-ear)`}>
      <path
        d="M70 60 C95 35, 140 40, 155 75 C165 100, 150 125, 130 130 C145 145, 150 170, 130 185 C105 200, 75 185, 70 155 C65 120, 55 90, 70 60Z"
        fill={`url(#fill-ear)`}
        stroke={accent}
        strokeWidth="2.2"
        className="diagram-part"
      />
      <path d="M95 85 C110 70, 130 80, 125 100 C120 115, 105 118, 98 105" fill="none" stroke={accent} strokeWidth="1.6" />
      <ellipse cx="175" cy="120" rx="22" ry="16" fill={`url(#fill-ear)`} stroke={accent} strokeWidth="1.6" />
      <path d="M130 125 L155 120" stroke={accent} strokeWidth="2" />
      <path d="M190 120 Q210 100 215 80 Q220 110 210 140 Q200 155 185 145" fill="none" stroke={accent} strokeWidth="1.8" className="diagram-cochlea" />
      <path d="M185 145 L195 165 M178 150 L188 172 M170 152 L175 175" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      {!compact && labels && (
        <>
          <Label x={95} y={70} text="Auricle" side="left" />
          <Label x={125} y={110} text="Canal" side="left" />
          <Label x={175} y={105} text="Drum" />
          <Label x={210} y={95} text="Cochlea" />
          <Label x={188} y={165} text="Canals" />
        </>
      )}
    </g>
  );
}

export const DIAGRAM_ORGAN_IDS: OrganId[] = ["stomach", "spleen", "thyroid", "bladder", "gallbladder", "ear"];

export function hasCustomDiagram(id: OrganId) {
  return DIAGRAM_ORGAN_IDS.includes(id);
}
