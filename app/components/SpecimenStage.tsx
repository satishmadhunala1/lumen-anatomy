"use client";

import { useState } from "react";
import type { Organ } from "../lib/anatomy-data";

/** Study stage for organs that have illustration art but no GLB model. */
export function SpecimenStage({ organ }: { organ: Organ }) {
  const [active, setActive] = useState(0);
  const callouts = organ.diagramCallouts ?? organ.structures.slice(0, 5).map((label, index) => ({
    id: `${organ.id}-${index}`,
    label,
    detail: organ.structuresExtra?.[label] ?? `${label} — key landmark of the ${organ.name.toLowerCase()}.`,
  }));
  const ext = organ.imageExt ?? "jpg";
  const src = `/anatomy/${organ.id}/organ.${ext}`;

  return (
    <div className="specimen-stage" style={{ "--organ-accent": organ.accent } as React.CSSProperties}>
      <div className="specimen-orbit specimen-orbit-a" />
      <div className="specimen-orbit specimen-orbit-b" />
      <div className="specimen-core specimen-core-diagram">
        <div className="specimen-photo-frame">
          <img
            key={src}
            src={src}
            alt={`${organ.name} anatomical study illustration`}
            className="specimen-photo"
            draggable={false}
          />
        </div>
        <div className="specimen-meta">
          <strong>{organ.scientificName}</strong>
          <span>Study specimen illustration</span>
        </div>
      </div>

      <div className="specimen-callouts" aria-label={`${organ.name} landmarks`}>
        {callouts.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`specimen-callout ${active === index ? "active" : ""}`}
            style={{ animationDelay: `${index * 0.08}s` }}
            onClick={() => setActive(index)}
          >
            <b>{index + 1}. {item.label}</b>
            {active === index && <small>{item.detail}</small>}
          </button>
        ))}
      </div>

      {organ.labNotes && (
        <aside className="specimen-lab-note">
          <span>Lab note</span>
          <p>{organ.labNotes}</p>
        </aside>
      )}

      <span className="specimen-particle p1" />
      <span className="specimen-particle p2" />
      <span className="specimen-particle p3" />
      <span className="specimen-particle p4" />
    </div>
  );
}
