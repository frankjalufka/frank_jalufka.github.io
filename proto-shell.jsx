// proto-shell.jsx — shared tokens, hooks, atoms, and the screen frame.
const C = {
  bg0: '#08090c', bg1: '#0f1117', panel: 'rgba(255,255,255,.04)', panel2: 'rgba(255,255,255,.06)',
  line: 'rgba(255,255,255,.10)', lineSoft: 'rgba(255,255,255,.06)',
  text: '#eef1f5', sub: 'rgba(238,241,245,.55)', faint: 'rgba(238,241,245,.32)',
  accent: 'oklch(0.71 0.17 41)', accentDim: 'oklch(0.71 0.17 41 / .15)', accentText: '#1c0f06',
  gold: 'oklch(0.81 0.12 85)', teal: 'oklch(0.74 0.09 195)',
  shipped: 'oklch(0.70 0.10 232)', prod: 'oklch(0.80 0.13 72)',
};
const MONO = '"IBM Plex Mono", monospace';
const DISPLAY = '"Bebas Neue", sans-serif';
const SERIF = '"Newsreader", serif';

// viewport hook → responsive layout switching
function useViewport() {
  const [w, setW] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  React.useEffect(() => {
    const r = () => setW(window.innerWidth);
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  return { w, mobile: w < 760, narrow: w < 1040 };
}

// striped image placeholder (dark)
function PH({ label = '', hue = 220, style = {}, radius = 0 }) {
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%', borderRadius: radius, overflow: 'hidden',
      background: `repeating-linear-gradient(45deg, oklch(0.24 0.04 ${hue}), oklch(0.24 0.04 ${hue}) 12px, oklch(0.20 0.03 ${hue}) 12px, oklch(0.20 0.03 ${hue}) 24px)`,
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', ...style,
    }}>
      {label && <span style={{ font: `600 10px/1 ${MONO}`, letterSpacing: '.14em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,.5)', background: 'rgba(0,0,0,.4)', padding: '5px 9px', borderRadius: 3 }}>{label}</span>}
    </div>
  );
}

// difficulty stars
function Stars({ n, color = C.gold }) {
  return (
    <span className="mono" style={{ fontSize: 11, color, letterSpacing: '1px' }}>
      {'★'.repeat(n)}<span style={{ color: 'rgba(255,255,255,.16)' }}>{'★'.repeat(5 - n)}</span>
    </span>
  );
}

// progress bar
function Bar({ pct, color = C.accent, h = 6, track = 'rgba(255,255,255,.08)' }) {
  return (
    <div style={{ height: h, borderRadius: h, background: track, overflow: 'hidden', width: '100%' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: h,
        transition: 'width .8s cubic-bezier(.2,.7,.3,1)' }}></div>
    </div>
  );
}

// status chip
function Chip({ children, color = C.sub, solid = false }) {
  return (
    <span className="mono" style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
      letterSpacing: '.04em', textTransform: 'uppercase', padding: '4px 9px', borderRadius: 100,
      color: solid ? C.accentText : color,
      background: solid ? color : 'transparent',
      border: solid ? 'none' : `1px solid ${C.line}`,
    }}>{children}</span>
  );
}

// buttons
function AccentBtn({ children, onClick, full }) {
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: full ? '100%' : 'auto',
        background: C.accent, color: C.accentText, border: 'none', cursor: 'pointer',
        font: `700 14px ${MONO}`, letterSpacing: '.08em', textTransform: 'uppercase', padding: '14px 24px', whiteSpace: 'nowrap',
        borderRadius: 6, transition: 'transform .12s, box-shadow .12s', boxShadow: h ? `0 8px 26px oklch(0.71 0.17 41 / .4)` : 'none',
        transform: h ? 'translateY(-1px)' : 'none' }}>{children}</button>
  );
}
function GhostBtn({ children, onClick, active }) {
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'transparent', cursor: 'pointer',
        color: (h || active) ? C.text : C.sub, border: `1px solid ${(h || active) ? C.line : C.lineSoft}`,
        font: `600 13px ${MONO}`, letterSpacing: '.06em', textTransform: 'uppercase', padding: '12px 20px', whiteSpace: 'nowrap',
        borderRadius: 6, transition: 'color .12s, border-color .12s' }}>{children}</button>
  );
}

// key hint glyph
function Key({ children }) {
  return <span className="mono" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    minWidth: 20, height: 20, padding: '0 5px', fontSize: 11, color: C.text, background: 'rgba(255,255,255,.07)',
    border: `1px solid ${C.line}`, borderRadius: 4 }}>{children}</span>;
}

// ── ScreenFrame — top HUD + scrollable content + bottom hint bar ──
function ScreenFrame({ title, tag, onBack, hints = [], children, mobile }) {
  return (
    <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* top HUD */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 16, padding: mobile ? '16px 18px' : '20px 40px',
        borderBottom: `1px solid ${C.line}`, background: 'rgba(8,9,12,.6)', backdropFilter: 'blur(8px)' }}>
        <button onClick={onBack} className="mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'transparent', border: `1px solid ${C.line}`, color: C.sub, cursor: 'pointer',
          fontSize: 11.5, letterSpacing: '.08em', textTransform: 'uppercase', padding: '8px 12px', borderRadius: 5, whiteSpace: 'nowrap' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = C.text; e.currentTarget.style.borderColor = C.accent; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = C.sub; e.currentTarget.style.borderColor = C.line; }}>
          {mobile ? '◂ Esc' : '◂ Esc — Main Menu'}
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="mono" style={{ fontSize: mobile ? 15 : 18, fontWeight: 600, letterSpacing: '.18em',
            textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
          {tag && !mobile && <div style={{ fontSize: 12, color: C.faint, marginTop: 2 }}>{tag}</div>}
        </div>
        {!mobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <span style={{ width: 7, height: 7, borderRadius: 4, background: C.teal }}></span>
            <span className="mono" style={{ fontSize: 12, color: C.sub }}>FRANK JALUFKA · LV.1</span>
          </div>
        )}
      </div>

      {/* content */}
      <div className="scroll" style={{ flex: 1, position: 'relative' }}>{children}</div>

      {/* bottom hint bar */}
      {!mobile && hints.length > 0 && (
        <div style={{ flexShrink: 0, display: 'flex', gap: 22, alignItems: 'center', padding: '12px 40px',
          borderTop: `1px solid ${C.line}`, background: 'rgba(8,9,12,.6)' }}>
          {hints.map((h, i) => (
            <span key={i} className="mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: C.faint, whiteSpace: 'nowrap' }}>
              <span style={{ display: 'inline-flex', gap: 4 }}>{h.keys.map((k, j) => <Key key={j}>{k}</Key>)}</span>
              {h.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { C, MONO, DISPLAY, SERIF, useViewport, PH, Stars, Bar, Chip, AccentBtn, GhostBtn, Key, ScreenFrame });
