"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  CircleDashed,
  Layers3,
  Maximize2,
  RotateCcw,
  ScanLine,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import type { Hotspot, Organ } from "../lib/anatomy-data";
import type { AnatomyViewer } from "../lib/three/viewer";
import { SpecimenStage } from "./SpecimenStage";

type Props = {
  organ: Organ;
  autoRotate: boolean;
  onAutoRotate: (enabled: boolean) => void;
  compare: boolean;
  onCompare: () => void;
};

export function OrganViewer({ organ, autoRotate, onAutoRotate, compare, onCompare }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<AnatomyViewer | null>(null);
  const organRef = useRef(organ);
  const autoRotateRef = useRef(autoRotate);
  const [selected, setSelected] = useState<Hotspot | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [slowLoad, setSlowLoad] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  useEffect(() => {
    if (!loading || !organ.hasModel) return;
    const timer = window.setTimeout(() => setSlowLoad(true), 900);
    return () => window.clearTimeout(timer);
  }, [loading, organ.hasModel]);

  useEffect(() => {
    organRef.current = organ;
  }, [organ]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    if (!organ.hasModel) {
      setLoading(false);
      setSlowLoad(false);
      setSelected(null);
      setActiveTool(null);
      if (viewerRef.current) {
        viewerRef.current.dispose();
        viewerRef.current = null;
      }
      return;
    }

    let cancelled = false;
    let viewer: AnatomyViewer | null = null;

    void import("../lib/three/viewer").then(({ AnatomyViewer: Viewer }) => {
      if (cancelled || !mountRef.current) return;
      viewer = new Viewer(mountRef.current, {
        onSelect: setSelected,
        onLoading: (isLoading, value) => {
          setLoading(isLoading);
          setProgress(value);
          if (isLoading) setSlowLoad(false);
        },
      });
      viewerRef.current = viewer;
      viewer.setAutoRotate(autoRotateRef.current);
      const current = organRef.current;
      if (!current.hasModel || !current.model) {
        setLoading(false);
        return;
      }
      viewer.setOrgan(current.model, current.hotspots, current.accent).catch(() => {
        setLoading(false);
        setProgress(0);
      });
    });

    return () => {
      cancelled = true;
      viewerRef.current = null;
      viewer?.dispose();
    };
  }, [organ.hasModel]);

  useEffect(() => {
    if (!organ.hasModel || !organ.model) return;
    viewerRef.current?.setOrgan(organ.model, organ.hotspots, organ.accent).catch(() => {
      setLoading(false);
      setProgress(0);
    });
  }, [organ]);

  useEffect(() => {
    if (!organ.hasModel) return;
    viewerRef.current?.setAutoRotate(autoRotate);
  }, [autoRotate, organ.hasModel]);

  const calloutRef = useCallback((node: HTMLDivElement | null) => {
    viewerRef.current?.attachCallout(node);
  }, []);

  const handleTool = (tool: string) => {
    if (tool === "compare") {
      onCompare();
      return;
    }
    const viewer = viewerRef.current;
    if (!viewer || !organ.hasModel) {
      if (tool === "rotate") onAutoRotate(!autoRotate);
      return;
    }
    if (tool === "rotate") onAutoRotate(!autoRotate);
    if (tool === "zoom") viewer.zoom(-1);
    if (tool === "isolate") setActiveTool(viewer.toggleIsolate() ? tool : null);
    if (tool === "section") setActiveTool(viewer.toggleCrossSection() ? tool : null);
    if (tool === "layers") setActiveTool(viewer.toggleLayers() ? tool : null);
    if (tool === "reset") {
      viewer.reset();
      setActiveTool(null);
    }
  };

  const tools = [
    { id: "rotate", label: "Rotate", icon: RotateCcw },
    { id: "zoom", label: "Zoom", icon: Search },
    { id: "isolate", label: "Isolate", icon: CircleDashed },
    { id: "section", label: "Cross-section", icon: ScanLine },
    { id: "layers", label: "Layers", icon: Layers3 },
    { id: "compare", label: "Compare", icon: Box },
    { id: "reset", label: "Reset", icon: RotateCcw },
  ];

  return (
    <section className="viewer-shell" aria-label={`${organ.name} interactive viewer`}>
      <div className="viewer-glow" style={{ "--organ-accent": organ.accent } as React.CSSProperties} />
      {organ.hasModel ? (
        <div ref={mountRef} className="three-mount" />
      ) : (
        <SpecimenStage organ={organ} />
      )}

      <div className="viewer-tools" aria-label="3D viewer tools">
        {tools.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={`tool-button ${(activeTool === id || (id === "compare" && compare)) ? "active" : ""}`}
            onClick={() => handleTool(id)}
            aria-pressed={activeTool === id || (id === "compare" && compare)}
            title={label}
            disabled={!organ.hasModel && id !== "compare" && id !== "rotate"}
          >
            <Icon size={19} strokeWidth={1.65} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <aside className="tip-note tip-float" aria-label="Viewer instructions">
        <span><Sparkles size={15} /> Tip</span>
        <p>
          {organ.hasModel
            ? <>Drag to rotate<br />Scroll to zoom<br />Tap a hotspot to study it</>
            : <>Explore the study card<br />Open Pathway & Quiz<br />Compare with 3D organs</>}
        </p>
      </aside>

      {selected && organ.hasModel && (
        <div className="hotspot-callout" ref={calloutRef} data-side="right">
          <div className="callout-body" style={{ "--hotspot-color": selected.color } as React.CSSProperties}>
            <button className="callout-close" type="button" onClick={() => viewerRef.current?.clearSelection()} aria-label="Close">
              <X size={13} />
            </button>
            <b>{selected.label}</b>
            <small>{selected.detail}</small>
          </div>
        </div>
      )}

      <ul className="hotspot-index">
        {organ.hotspots.map((hotspot) => (
          <li key={hotspot.id}>{hotspot.label}: {hotspot.detail}</li>
        ))}
      </ul>

      {organ.hasModel && loading && slowLoad && (
        <div className="model-loader" role="status" aria-live="polite">
          <div className="loader-orbit"><Maximize2 size={20} /></div>
          <strong>Preparing the {organ.name.toLowerCase()}</strong>
          <span>{Math.max(8, Math.round(progress * 100))}%</span>
        </div>
      )}

      {organ.hasModel && (
        <button className="auto-rotate" type="button" onClick={() => onAutoRotate(!autoRotate)} aria-pressed={autoRotate}>
          <RotateCcw size={14} /> Auto rotate
          <span className={`switch ${autoRotate ? "on" : ""}`}><i /></span>
        </button>
      )}

      <div className="view-caption">
        <span>{organ.hasModel ? "3D specimen · tap a hotspot" : "Study specimen · original animation"}</span>
        <strong>{organ.scientificName}</strong>
      </div>
    </section>
  );
}
