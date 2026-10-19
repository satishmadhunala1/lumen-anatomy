"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Bookmark,
  BrainCircuit,
  ChevronDown,
  CircleHelp,
  Compass,
  FileText,
  GitBranch,
  Heart,
  Layers,
  LibraryBig,
  Lightbulb,
  Microscope,
  NotebookPen,
  Play,
  Route,
  Search,
  Share2,
  Sparkles,
  Stethoscope,
  Timer,
  X,
} from "lucide-react";
import { OrganViewer } from "./OrganViewer";
import { hasCustomDiagram, OrganDiagram } from "./OrganDiagram";
import {
  bodySystems,
  glossary,
  lumenManifesto,
  organById,
  organs,
  type Organ,
  type OrganId,
} from "../lib/anatomy-data";

type Modal = "lesson" | "quiz" | "animation" | "system" | "flashcards" | "notes" | "glossary" | "systems" | "pathway" | "timeline" | "myths" | null;
type NavId = "explore" | "systems" | "lessons" | "flashcards" | "notes" | "glossary";

const FAV_KEY = "lumen-favorites";
const NOTES_KEY = "lumen-notes";
const STUDIED_KEY = "lumen-studied";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Renders an organ illustration, or its accent glyph for organs that ship as a
 * 3D model without the painted asset set. Keeps every image slot filled instead
 * of leaving a broken `<img>` behind.
 */
function OrganArt({
  organ,
  asset,
  alt,
  size,
}: {
  organ: Organ;
  asset: "thumb" | "organ" | "microscopic" | "compare" | "location";
  alt: string;
  size?: number;
}) {
  if (!organ.illustrated) {
    if (hasCustomDiagram(organ.id)) {
      const variant = asset === "thumb" ? "thumb" : asset === "organ" ? "panel" : "card";
      return (
        <span className="diagram-wrap" role={alt ? "img" : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true}>
          <OrganDiagram id={organ.id} accent={organ.accent} variant={variant} />
        </span>
      );
    }
    const labelling = alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true };
    return (
      <span className="art-fallback" style={{ "--art-accent": organ.accent } as React.CSSProperties} {...labelling}>
        {organ.icon}
      </span>
    );
  }
  const ext = organ.imageExt ?? "webp";
  return (
    <img
      key={`${organ.id}-${asset}-${ext}`}
      src={`/anatomy/${organ.id}/${asset}.${ext}`}
      alt={alt}
      width={size}
      height={size}
      loading={asset === "thumb" ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
        <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function AnatomyApp() {
  const [organId, setOrganId] = useState<OrganId>("heart");
  const [autoRotate, setAutoRotate] = useState(true);
  const [compare, setCompare] = useState(false);
  const [compareId, setCompareId] = useState<OrganId>("brain");
  const [modal, setModal] = useState<Modal>(null);
  const [nav, setNav] = useState<NavId>("explore");
  const [query, setQuery] = useState("");
  const [systemFilter, setSystemFilter] = useState<string | null>(null);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [mobileLibrary, setMobileLibrary] = useState(false);
  const [favorites, setFavorites] = useState<OrganId[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [studied, setStudied] = useState<OrganId[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefetched = useRef(new Set<OrganId>());
  const organ = organById[organId];
  const reference = organById[compareId === organId ? (organId === "heart" ? "brain" : "heart") : compareId];

  useEffect(() => {
    setFavorites(readJson<OrganId[]>(FAV_KEY, []));
    setNotes(readJson<Record<string, string>>(NOTES_KEY, {}));
    setStudied(readJson<OrganId[]>(STUDIED_KEY, []));
  }, []);

  const filteredOrgans = useMemo(() => {
    const q = query.toLowerCase();
    return organs.filter((item) => {
      const matchesQuery = `${item.name} ${item.system} ${item.structures.join(" ")} ${item.overview} ${item.function}`.toLowerCase().includes(q);
      const matchesSystem = !systemFilter || item.system === systemFilter;
      const matchesFav = !favoritesOnly || favorites.includes(item.id);
      return matchesQuery && matchesSystem && matchesFav;
    });
  }, [query, systemFilter, favoritesOnly, favorites]);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current.querySelectorAll("[data-reveal]"),
      { opacity: 0, y: 12, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55, stagger: 0.04, ease: "power3.out", overwrite: true },
    );
    gsap.fromTo(
      ".learning-cards article",
      { opacity: 0, y: 18, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: "power2.out", overwrite: true },
    );
  }, [organId]);

  const persistFavorites = (next: OrganId[]) => {
    setFavorites(next);
    localStorage.setItem(FAV_KEY, JSON.stringify(next));
  };

  const toggleFavorite = (id: OrganId) => {
    const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
    persistFavorites(next);
  };

  const markStudied = (id: OrganId) => {
    if (studied.includes(id)) return;
    const next = [...studied, id];
    setStudied(next);
    localStorage.setItem(STUDIED_KEY, JSON.stringify(next));
  };

  const saveNote = (value: string) => {
    const next = { ...notes, [organId]: value };
    setNotes(next);
    localStorage.setItem(NOTES_KEY, JSON.stringify(next));
  };

  const selectOrgan = (id: OrganId) => {
    const next = organById[id];
    if (next.illustrated) {
      const ext = next.imageExt ?? "webp";
      ["organ", "microscopic", "compare", "location"].forEach((asset) => {
        const image = new Image();
        image.src = `/anatomy/${id}/${asset}.${ext}`;
      });
    }
    setOrganId(id);
    setMobileLibrary(false);
    setCompare(false);
    setNav("explore");
    markStudied(id);
  };

  const prefetchOrgan = (id: OrganId) => {
    if (id === organId || prefetched.current.has(id)) return;
    prefetched.current.add(id);
    const next = organById[id];
    if (!next.hasModel || !next.model) return;
    void fetch(next.model, { priority: "low" } as RequestInit).catch(() => {});
  };

  const handleNav = (id: NavId) => {
    setNav(id);
    if (id === "explore") {
      setSystemFilter(null);
      setFavoritesOnly(false);
      return;
    }
    if (id === "systems") setModal("systems");
    if (id === "lessons") setModal("lesson");
    if (id === "flashcards") setModal("flashcards");
    if (id === "notes") setModal("notes");
    if (id === "glossary") setModal("glossary");
  };

  const progressPct = Math.round((studied.length / organs.length) * 100);

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" type="button" onClick={() => selectOrgan("heart")} aria-label="Lumen home">
          <BrandMark />
          <span>
            <strong>Lum<span>en</span></strong>
            <em>See inside the body</em>
          </span>
        </button>
        <nav className="main-nav" aria-label="Primary navigation">
          <button type="button" className={nav === "explore" ? "active" : ""} onClick={() => handleNav("explore")}>
            <Compass size={16} /> <span>Explore</span>
          </button>
          <button type="button" className={nav === "systems" ? "active" : ""} onClick={() => handleNav("systems")}>
            <Layers size={16} /> <span>Systems</span>
          </button>
          <button type="button" className={nav === "lessons" ? "active" : ""} onClick={() => handleNav("lessons")}>
            <BookOpen size={16} /> <span>Lessons</span>
          </button>
          <button type="button" className={nav === "flashcards" ? "active" : ""} onClick={() => handleNav("flashcards")}>
            <BrainCircuit size={16} /> <span>Cards</span>
          </button>
          <button type="button" className={nav === "notes" ? "active" : ""} onClick={() => handleNav("notes")}>
            <NotebookPen size={16} /> <span>Notes</span>
          </button>
          <button type="button" className={nav === "glossary" ? "active" : ""} onClick={() => handleNav("glossary")}>
            <LibraryBig size={16} /> <span>Glossary</span>
          </button>
        </nav>
        <label className="search-box">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search organs, structures…" />
        </label>
        <button className="profile" type="button" aria-label="Study progress">
          <span>{progressPct}%</span>
          <ChevronDown size={15} />
        </button>
        <button className="mobile-library-trigger" type="button" onClick={() => setMobileLibrary(true)} aria-label="Open organ library">
          <LibraryBig size={20} />
        </button>
      </header>

      <div className="workspace">
        <aside className={`organ-library ${mobileLibrary ? "open" : ""}`}>
          <div className="panel-heading">
            <span>Specimen library</span>
            <button aria-label="Close library" className="mobile-close" type="button" onClick={() => setMobileLibrary(false)}>
              <X size={17} />
            </button>
            <button
              type="button"
              aria-label="Show saved organs"
              aria-pressed={favoritesOnly}
              className={favoritesOnly ? "active" : ""}
              onClick={() => setFavoritesOnly((value) => !value)}
            >
              <Bookmark size={16} />
            </button>
          </div>
          <div className="system-chips" aria-label="Filter by system">
            <button type="button" className={!systemFilter ? "active" : ""} onClick={() => setSystemFilter(null)}>
              All
            </button>
            {bodySystems.slice(0, 4).map((system) => (
              <button
                key={system}
                type="button"
                className={systemFilter === system ? "active" : ""}
                onClick={() => setSystemFilter(systemFilter === system ? null : system)}
              >
                {system.replace(" System", "")}
              </button>
            ))}
          </div>
          <div className="organ-list">
            {filteredOrgans.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`organ-item ${organId === item.id ? "active" : ""}`}
                onClick={() => selectOrgan(item.id)}
                onPointerEnter={() => prefetchOrgan(item.id)}
                onFocus={() => prefetchOrgan(item.id)}
                style={{ "--item-accent": item.accent } as React.CSSProperties}
              >
                <span className="organ-glyph">
                  <OrganArt organ={item} asset="thumb" alt={`${item.name} thumbnail`} size={47} />
                </span>
                <span>
                  <b>{item.name}</b>
                  <small>{item.system}</small>
                </span>
                {favorites.includes(item.id) ? (
                  <Heart className="favorite" size={14} fill="currentColor" />
                ) : organId === item.id ? (
                  <Heart className="favorite" size={14} />
                ) : null}
              </button>
            ))}
            {filteredOrgans.length === 0 && (
              <p style={{ padding: "18px 10px", color: "var(--muted)", fontSize: 12 }}>No organs match this filter.</p>
            )}
          </div>
          <button className="view-all" type="button" onClick={() => { setQuery(""); setSystemFilter(null); setFavoritesOnly(false); }}>
            View all organs <ArrowRight size={14} />
          </button>
        </aside>

        <OrganViewer
          organ={organ}
          autoRotate={autoRotate}
          onAutoRotate={setAutoRotate}
          compare={compare}
          onCompare={() => setCompare(!compare)}
        />

        <aside className="info-panel" ref={contentRef}>
          <div className="info-kicker" data-reveal>
            <Heart size={13} fill="currentColor" /> {organ.system}
          </div>
          <div className="info-title-row" data-reveal>
            <div>
              <h1>{organ.name}</h1>
              <em>{organ.poetic}</em>
            </div>
            <span className="specimen-stamp">
              <OrganArt organ={organ} asset="organ" alt={`${organ.name} anatomical illustration`} size={92} />
            </span>
          </div>
          <p className="description" data-reveal>{organ.description}</p>
          <p className="overview" data-reveal>{organ.overview}</p>
          <div className="vital-grid" data-reveal>
            {organ.vitals.map((vital) => (
              <div key={vital.label} className="vital-chip">
                <Activity size={12} />
                <span>{vital.label}</span>
                <strong>{vital.value}{vital.unit ? ` ${vital.unit}` : ""}</strong>
              </div>
            ))}
          </div>
          <div className="rule" />
          <h2 data-reveal>Key facts</h2>
          <dl className="key-facts">
            <div data-reveal><dt><span>◇</span> Size</dt><dd>{organ.size}</dd></div>
            <div data-reveal><dt><span>◈</span> Weight</dt><dd>{organ.weight}</dd></div>
            <div data-reveal><dt><span>⌁</span> Daily</dt><dd>{organ.dailyFact}</dd></div>
            <div data-reveal><dt><span>⌖</span> Location</dt><dd>{organ.location}</dd></div>
            <div data-reveal><dt><span>❋</span> Supply</dt><dd>{organ.bloodSupply}</dd></div>
            <div data-reveal><dt><span>○</span> Nerves</dt><dd>{organ.innervation}</dd></div>
            <div data-reveal><dt><span>△</span> Lymph</dt><dd>{organ.lymphatics}</dd></div>
            <div data-reveal><dt><span>✦</span> Function</dt><dd>{organ.function}</dd></div>
          </dl>
          <h2 data-reveal>Key structures</h2>
          <div className="structure-tags" data-reveal>
            {organ.structures.map((structure) => (
              <span key={structure}>{structure}</span>
            ))}
          </div>
          <div className="mnemonic-note" data-reveal>
            <Lightbulb size={15} />
            <p><b>Memory hook</b>{organ.mnemonic}</p>
          </div>
          <div className="medical-note" data-reveal>
            <Stethoscope size={16} />
            <p><b>Clinical pearl</b>{organ.clinicalPearl}</p>
          </div>
          <div className="fun-note" data-reveal>
            <Sparkles size={15} />
            <p><b>Did you know</b>{organ.funFact}</p>
          </div>
          <div className="embryology-note" data-reveal>
            <Timer size={15} />
            <p><b>Development</b>{organ.embryology}</p>
          </div>
          {organ.quickFacts && (
            <>
              <h2 data-reveal>Extra facts</h2>
              <ul className="extra-facts" data-reveal>
                {organ.quickFacts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </>
          )}
          {organ.relations && (
            <>
              <h2 data-reveal>Anatomic neighbors</h2>
              <div className="structure-tags" data-reveal>
                {organ.relations.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </>
          )}
          {organ.labNotes && (
            <div className="lab-note-panel" data-reveal>
              <Microscope size={15} />
              <p><b>Diagram guide</b>{organ.labNotes}</p>
            </div>
          )}
          <button className="lesson-button" type="button" data-reveal onClick={() => setModal("lesson")}>
            Open deep lesson <ArrowRight size={16} />
          </button>
          <div className="action-grid" data-reveal>
            <button type="button" onClick={() => setModal("pathway")}><Route size={15} /> Pathway</button>
            <button type="button" onClick={() => setModal("quiz")}><CircleHelp size={15} /> Quiz</button>
            <button type="button" onClick={() => setModal("flashcards")}><BrainCircuit size={15} /> Cards</button>
            <button type="button" onClick={() => setModal("timeline")}><GitBranch size={15} /> Timeline</button>
            <button type="button" onClick={() => setModal("myths")}><Lightbulb size={15} /> Myths</button>
            <button type="button" onClick={() => setModal("notes")}><NotebookPen size={15} /> Notes</button>
            <button
              type="button"
              onClick={() => toggleFavorite(organId)}
              className={favorites.includes(organId) ? "active" : ""}
            >
              <Bookmark size={15} /> {favorites.includes(organId) ? "Saved" : "Save"}
            </button>
            <button type="button" onClick={() => setCompare(!compare)} className={compare ? "active" : ""}>
              <Share2 size={15} /> Compare
            </button>
          </div>
        </aside>
      </div>

      {compare && (
        <section className="compare-strip" aria-label="Organ comparison">
          <div className="compare-organ">
            <OrganArt organ={organ} asset="thumb" alt="" />
            <span>Comparing</span>
            <strong>{organ.name}</strong>
            <small>{organ.system}</small>
          </div>
          <b>vs.</b>
          <div className="compare-organ">
            <OrganArt organ={reference} asset="thumb" alt="" />
            <span>Reference</span>
            <strong>{reference.name}</strong>
            <small>{reference.system}</small>
            <div className="compare-pick">
              {organs.filter((item) => item.id !== organId).slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={compareId === item.id ? "active" : ""}
                  onClick={() => setCompareId(item.id)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <dl>
            <div><dt>Primary role</dt><dd>{organ.function}</dd></div>
            <div><dt>Scale</dt><dd>{organ.size}</dd></div>
            <div><dt>Vs role</dt><dd>{reference.function}</dd></div>
          </dl>
          <button type="button" onClick={() => setCompare(false)} aria-label="Close comparison"><X size={16} /></button>
        </section>
      )}

      <p className="manifesto-strip" data-reveal>{lumenManifesto}</p>

      <section className="learning-cards learning-cards-wide" aria-label={`${organ.name} learning resources`}>
        <article className="curiosity-card">
          <span className="curiosity-pulse">◈</span>
          <p>Curiosity is<br />the best teacher.</p>
          <em>{studied.length}/{organs.length} specimens explored</em>
        </article>
        <article>
          <header>
            <div><em>Microscopic view</em><h3>{organ.tissue}</h3></div>
            <Microscope size={17} />
          </header>
          <div className="microscope-visual organ-card-image">
            <OrganArt organ={organ} asset="microscopic" alt={`${organ.name} microscopic tissue view`} />
          </div>
          <button type="button" onClick={() => setModal("lesson")}>Explore tissue <ArrowRight size={14} /></button>
        </article>
        <article>
          <header>
            <div><em>Flow pathway</em><h3>{organ.pathway[0]?.title ?? "Pathway"}</h3></div>
            <Route size={17} />
          </header>
          <ol className="mini-pathway">
            {organ.pathway.map((step, index) => (
              <li key={step.title} style={{ animationDelay: `${index * 0.12}s` }}>
                <b>{index + 1}</b> {step.title}
              </li>
            ))}
          </ol>
          <button type="button" onClick={() => setModal("pathway")}>Animate pathway <ArrowRight size={14} /></button>
        </article>
        <article>
          <header>
            <div><em>Function animation</em><h3>{organ.function}</h3></div>
            <Play size={17} />
          </header>
          <button
            type="button"
            className="function-visual organ-card-image"
            onClick={() => setModal("animation")}
            aria-label={`Play the ${organ.name.toLowerCase()} function animation`}
          >
            <OrganArt organ={organ} asset="organ" alt="" />
            <i className="function-pulse" />
            <span className="play-badge"><Play size={18} fill="currentColor" /></span>
          </button>
          <button type="button" onClick={() => setModal("animation")}>Play animation <ArrowRight size={14} /></button>
        </article>
        <article>
          <header>
            <div><em>Clinical notes</em><h3>Common conditions</h3></div>
            <FileText size={17} />
          </header>
          <ul>{organ.conditions.slice(0, 5).map((condition) => <li key={condition}>{condition}</li>)}</ul>
          <button type="button" onClick={() => setModal("myths")}>Myth vs fact <ArrowRight size={14} /></button>
        </article>
        <article>
          <header>
            <div><em>Development</em><h3>{organ.timeline[0]?.stage ?? "Timeline"}</h3></div>
            <Timer size={17} />
          </header>
          <ul className="mini-timeline">
            {organ.timeline.map((event) => (
              <li key={event.stage}><b>{event.stage}</b> {event.detail}</li>
            ))}
          </ul>
          <button type="button" onClick={() => setModal("timeline")}>Full timeline <ArrowRight size={14} /></button>
        </article>
        <article className="system-card">
          <header>
            <div><em>Where it works</em><h3>{organ.system}</h3></div>
            <BrainCircuit size={17} />
          </header>
          <button
            type="button"
            className="system-visual organ-card-image"
            onClick={() => setModal("system")}
            aria-label={`See where the ${organ.name.toLowerCase()} sits in the body`}
          >
            <OrganArt organ={organ} asset="location" alt="" />
          </button>
          <button type="button" onClick={() => setModal("system")}>See the system <ArrowRight size={14} /></button>
        </article>
        <article>
          <header>
            <div><em>Compare organs</em><h3>{organ.comparison}</h3></div>
            <Share2 size={17} />
          </header>
          <div className="comparison-visual organ-card-image">
            <OrganArt organ={organ} asset="compare" alt={`${organ.comparison} anatomical comparison`} />
          </div>
          <button type="button" onClick={() => setCompare(true)}>Open comparison <ArrowRight size={14} /></button>
        </article>
      </section>

      {modal && (
        <LearningModal
          type={modal}
          organ={organ}
          note={notes[organId] ?? ""}
          onNoteChange={saveNote}
          onClose={() => { setModal(null); setNav("explore"); }}
          onPickSystem={(system) => {
            setSystemFilter(system);
            setModal(null);
            setNav("explore");
            setMobileLibrary(true);
          }}
          onQuizComplete={() => markStudied(organId)}
        />
      )}
      {mobileLibrary && (
        <button className="drawer-backdrop" type="button" aria-label="Close library" onClick={() => setMobileLibrary(false)} />
      )}
    </main>
  );
}

const MODAL_ICON: Record<Exclude<Modal, null>, string> = {
  quiz: "?",
  animation: "▶",
  system: "⌖",
  lesson: "✦",
  flashcards: "▣",
  notes: "✎",
  glossary: "Aa",
  systems: "◎",
  pathway: "⇢",
  timeline: "⌛",
  myths: "!",
};

function LearningModal({
  type,
  organ,
  note,
  onNoteChange,
  onClose,
  onPickSystem,
  onQuizComplete,
}: {
  type: Exclude<Modal, null>;
  organ: Organ;
  note: string;
  onNoteChange: (value: string) => void;
  onClose: () => void;
  onPickSystem: (system: string) => void;
  onQuizComplete: () => void;
}) {
  const [quizIndex, setQuizIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [flashIndex, setFlashIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [pathwayStep, setPathwayStep] = useState(0);
  const organName = organ.name;
  const question = organ.quiz[quizIndex];
  const card = organ.flashcards[flashIndex];

  useEffect(() => {
    setQuizIndex(0);
    setPicked(null);
    setScore(0);
    setFlashIndex(0);
    setFlipped(false);
    setPathwayStep(0);
  }, [type, organ.id]);

  useEffect(() => {
    if (type !== "pathway") return;
    const timer = window.setInterval(() => {
      setPathwayStep((value) => (value + 1) % organ.pathway.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [type, organ.pathway.length]);

  const title =
    type === "quiz" ? `${organName} quiz`
    : type === "animation" ? `${organName} in motion`
    : type === "system" ? `${organName} in the body`
    : type === "flashcards" ? `${organName} flashcards`
    : type === "notes" ? `Study notes`
    : type === "glossary" ? `Anatomy glossary`
    : type === "systems" ? `Body systems`
    : type === "pathway" ? `${organName} pathway`
    : type === "timeline" ? `${organName} development`
    : type === "myths" ? `Myths about the ${organName.toLowerCase()}`
    : `Inside the ${organName.toLowerCase()}`;

  const answerQuiz = (choice: number) => {
    if (picked !== null || !question) return;
    setPicked(choice);
    if (choice === question.answer) setScore((value) => value + 1);
  };

  const nextQuiz = () => {
    if (quizIndex + 1 >= organ.quiz.length) {
      onQuizComplete();
      onClose();
      return;
    }
    setQuizIndex((value) => value + 1);
    setPicked(null);
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className={`learning-modal ${type === "system" || type === "systems" || type === "glossary" || type === "pathway" || type === "timeline" || type === "myths" || type === "lesson" ? "wide" : ""} ${type === "notes" ? "notes-modal" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <span className="modal-icon">{MODAL_ICON[type]}</span>
        <em className="modal-kicker">Guided discovery</em>
        <h2 id="modal-title">{title}</h2>

        {type === "quiz" && question && (
          <div className="quiz-options">
            <div className="quiz-meta">
              <span>Question {quizIndex + 1} of {organ.quiz.length}</span>
              <span>Score {score}</span>
            </div>
            <p>{question.prompt}</p>
            {question.choices.map((choice, index) => {
              let className = "";
              if (picked !== null) {
                if (index === question.answer) className = "correct";
                else if (index === picked) className = "wrong";
              }
              return (
                <button
                  key={choice}
                  type="button"
                  className={className}
                  disabled={picked !== null}
                  onClick={() => answerQuiz(index)}
                >
                  {choice}
                </button>
              );
            })}
            {picked !== null && (
              <>
                <p className="quiz-explain">{question.explain}</p>
                <button className="lesson-button" type="button" onClick={nextQuiz}>
                  {quizIndex + 1 >= organ.quiz.length ? `Finish · ${score}/${organ.quiz.length}` : "Next question"}
                  <ArrowRight size={16} />
                </button>
              </>
            )}
          </div>
        )}

        {type === "flashcards" && card && (
          <>
            <button type="button" className="flash-card" onClick={() => setFlipped((value) => !value)}>
              <div>
                <strong>{flipped ? card.back : card.front}</strong>
                <small>{flipped ? "Tap to see term" : "Tap to reveal"} · {flashIndex + 1}/{organ.flashcards.length}</small>
              </div>
            </button>
            <div className="flash-nav">
              <button
                type="button"
                disabled={flashIndex === 0}
                onClick={() => { setFlashIndex((value) => value - 1); setFlipped(false); }}
              >
                Previous
              </button>
              <button
                type="button"
                disabled={flashIndex >= organ.flashcards.length - 1}
                onClick={() => { setFlashIndex((value) => value + 1); setFlipped(false); }}
              >
                Next
              </button>
            </div>
          </>
        )}

        {type === "notes" && (
          <>
            <p>Jot what you notice about the {organName.toLowerCase()}. Notes stay on this device.</p>
            <textarea
              className="notes-area"
              value={note}
              onChange={(event) => onNoteChange(event.target.value)}
              placeholder={`e.g. Left ventricle walls are thicker because…`}
            />
            <button className="lesson-button" type="button" onClick={onClose}>
              Save & close <ArrowRight size={16} />
            </button>
          </>
        )}

        {type === "glossary" && (
          <div className="glossary-list">
            {[...glossary].sort((a, b) => {
              const aRelated = a.organId === organ.id ? 0 : 1;
              const bRelated = b.organId === organ.id ? 0 : 1;
              return aRelated - bRelated || a.term.localeCompare(b.term);
            }).map((entry) => (
              <details key={entry.term} open={entry.organId === organ.id}>
                <summary>{entry.term}</summary>
                <p>{entry.definition}</p>
              </details>
            ))}
          </div>
        )}

        {type === "systems" && (
          <>
            <p>Browse specimens by the body system they belong to.</p>
            <div className="systems-grid">
              {bodySystems.map((system) => {
                const count = organs.filter((item) => item.system === system).length;
                return (
                  <button key={system} type="button" onClick={() => onPickSystem(system)}>
                    <strong>{system}</strong>
                    <small>{count} specimen{count === 1 ? "" : "s"}</small>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {type === "system" && (
          <>
            <p>{organ.location}. Trace how the {organName.toLowerCase()} connects to the rest of the body.</p>
            <figure className="modal-figure">
              <OrganArt organ={organ} asset="location" alt={`${organName} shown in place within the ${organ.system.toLowerCase()}`} />
            </figure>
            <dl className="modal-facts">
              <div><dt>System</dt><dd>{organ.system}</dd></div>
              <div><dt>Primary role</dt><dd>{organ.function}</dd></div>
              <div><dt>Blood supply</dt><dd>{organ.bloodSupply}</dd></div>
            </dl>
            <button className="lesson-button" type="button" onClick={onClose}>Continue exploring <ArrowRight size={16} /></button>
          </>
        )}

        {type === "pathway" && (
          <>
            <p>Follow how the {organName.toLowerCase()} works step by step.</p>
            <ol className="pathway-steps">
              {organ.pathway.map((step, index) => (
                <li key={step.title} className={index === pathwayStep ? "active" : index < pathwayStep ? "done" : ""}>
                  <span>{index + 1}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <button className="lesson-button" type="button" onClick={onClose}>Continue exploring <ArrowRight size={16} /></button>
          </>
        )}

        {type === "timeline" && (
          <>
            <p>How the {organName.toLowerCase()} forms and matures.</p>
            <ol className="timeline-track">
              {organ.timeline.map((event) => (
                <li key={event.stage}>
                  <strong>{event.stage}</strong>
                  <p>{event.detail}</p>
                </li>
              ))}
            </ol>
            <p className="quiz-explain"><b>Embryology note · </b>{organ.embryology}</p>
            <button className="lesson-button" type="button" onClick={onClose}>Continue exploring <ArrowRight size={16} /></button>
          </>
        )}

        {type === "myths" && (
          <>
            <p>Separate common myths from clinical reality.</p>
            <div className="myth-list">
              {organ.myths.map((item) => (
                <article key={item.myth}>
                  <div className="myth-bad"><b>Myth</b><p>{item.myth}</p></div>
                  <div className="myth-good"><b>Fact</b><p>{item.fact}</p></div>
                </article>
              ))}
            </div>
            <button className="lesson-button" type="button" onClick={onClose}>Continue exploring <ArrowRight size={16} /></button>
          </>
        )}

        {(type === "lesson" || type === "animation") && (
          <>
            <p>
              {type === "animation"
                ? `Watch how the ${organName.toLowerCase()} supports ${organ.function.toLowerCase()}. Connect form with function, then try the pathway.`
                : organ.overview}
            </p>
            <div className={`modal-demo ${type === "animation" ? "moving organ-breathe" : "organ-breathe"}`}>
              <OrganArt organ={organ} asset="organ" alt={`${organName} illustration`} />
            </div>
            <dl className="modal-facts">
              <div><dt>Tissue</dt><dd>{organ.tissue}</dd></div>
              <div><dt>Daily</dt><dd>{organ.dailyFact}</dd></div>
              <div><dt>Latin</dt><dd>{organ.scientificName}</dd></div>
            </dl>
            <p className="quiz-explain"><b>Clinical pearl · </b>{organ.clinicalPearl}</p>
            <p className="quiz-explain"><b>Memory hook · </b>{organ.mnemonic}</p>
            <button className="lesson-button" type="button" onClick={onClose}>Continue exploring <ArrowRight size={16} /></button>
          </>
        )}
      </section>
    </div>
  );
}
