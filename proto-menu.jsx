// proto-menu.jsx — the title screen / landing page.
const { C: MC, MONO: MM, DISPLAY: MD, PH: MPH, Bar: MBar, useViewport: useVP2 } = window;

function MainMenu({ onSelect, mobile }) {
  const { RV, QUESTS, HALCYON, FILES, CHAR } = window;
  const items = [
    { id: 'continue', l: 'CONTINUE', s: 'Resume — Project Halcyon (in production)' },
    { id: 'work', l: 'SELECTED WORK', s: '6 shipped titles · 2018–2024' },
    { id: 'newgame', l: 'NEW GAME', s: 'About Frank + how I produce' },
    { id: 'casefiles', l: 'CASE FILES', s: 'Roadmaps · pipelines · postmortems' },
    { id: 'contact', l: 'CONTACT', s: RV.email },
  ];
  const [idx, setIdx] = React.useState(0);
  const [flickId, setFlickId] = React.useState(null);

  const choose = (i) => {
    const it = items[i];
    setFlickId(it.id);
    setTimeout(() => onSelect(it.id), 240);
  };

  React.useEffect(() => {
    const k = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((v) => (v + 1) % items.length); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((v) => (v - 1 + items.length) % items.length); }
      else if (e.key === 'Enter') { e.preventDefault(); choose(idx); }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [idx]);

  const cur = items[idx];

  // contextual preview
  const Preview = () => {
    if (cur.id === 'continue') return (
      <div>
        <PvHead label="Resume" sub="In Production" />
        <div style={{ height: 188, borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
          <MPH label="" hue={280} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(8,9,12,.85), transparent 60%)' }}></div>
          <div style={{ position: 'absolute', left: 16, bottom: 14, right: 16 }}>
            <div style={{ fontFamily: MD, fontSize: 30, lineHeight: .9 }}>PROJECT HALCYON</div>
            <div className="mono" style={{ fontSize: 11, color: MC.faint, marginTop: 4 }}>UNANNOUNCED RPG · [NDA]</div>
          </div>
        </div>
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span className="mono" style={{ fontSize: 11, color: MC.sub, whiteSpace: 'nowrap' }}>VERTICAL SLICE LOCKED</span>
          <span className="mono" style={{ fontSize: 11, color: MC.prod }}>{HALCYON.pct}%</span>
        </div>
        <MBar pct={HALCYON.pct} color={MC.prod} />
        <div style={{ fontSize: 13.5, color: MC.sub, lineHeight: 1.55, marginTop: 14 }}>
          Jump into the live production board — milestones, risk burndown, and what I’m shipping next.
        </div>
      </div>
    );
    if (cur.id === 'work') return (
      <div>
        <PvHead label="Selected Work" sub="6 Shipped" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {QUESTS.map((q) => (
            <div key={q.id} style={{ height: 96, borderRadius: 7, overflow: 'hidden', position: 'relative' }}>
              <MPH hue={q.hue} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(8,9,12,.85), transparent 65%)' }}></div>
              <span style={{ position: 'absolute', left: 10, bottom: 8, fontSize: 13, fontWeight: 600 }}>{q.title}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13.5, color: MC.sub, lineHeight: 1.55, marginTop: 14 }}>
          Browse shipped titles as a quest log — credits, objectives cleared, and the postmortem behind each one.
        </div>
      </div>
    );
    if (cur.id === 'newgame') return (
      <div>
        <PvHead label="New Game" sub="Character Sheet" />
        <div style={{ display: 'flex', gap: 14 }}>
          <div style={{ width: 96, height: 120, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}><MPH label="portrait" hue={30} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: MD, fontSize: 26, lineHeight: .95 }}>{CHAR.class}</div>
            <div className="mono" style={{ fontSize: 11, color: MC.accent, marginTop: 4 }}>SUBCLASS · {CHAR.subclass.toUpperCase()}</div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {CHAR.specializations.slice(0, 2).map((s) => (
                <div key={s.k} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12, lineHeight: 1.4 }}>
                  <span style={{ color: MC.accent, marginTop: 1 }}>◆</span>
                  <span style={{ color: MC.sub }}>{s.proof}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 13.5, color: MC.sub, lineHeight: 1.55, marginTop: 14 }}>
          Who you’re hiring: class, attributes, traits, and the tools I run.
        </div>
      </div>
    );
    if (cur.id === 'casefiles') return (
      <div>
        <PvHead label="Case Files" sub={`${FILES.length} Entries`} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FILES.slice(0, 3).map((f) => (
            <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px',
              border: `1px solid ${MC.line}`, borderRadius: 7, background: MC.panel }}>
              <span className="mono" style={{ fontSize: 10, color: MC.accent, border: `1px solid ${MC.line}`,
                padding: '3px 7px', borderRadius: 4 }}>{f.kind.toUpperCase()}</span>
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>{f.title}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13.5, color: MC.sub, lineHeight: 1.55, marginTop: 14 }}>
          The production-craft files — roadmaps, pipelines, and postmortems you can actually read.
        </div>
      </div>
    );
    return (
      <div>
        <PvHead label="Contact" sub="Establish Comms" />
        <div style={{ border: `1px solid ${MC.line}`, borderRadius: 8, padding: 18, background: MC.panel }}>
          <div className="mono" style={{ fontSize: 11, color: MC.teal, marginBottom: 10 }}>● {RV.availability}</div>
          <div style={{ fontFamily: MD, fontSize: 28, lineHeight: 1 }}>{RV.email}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            {RV.handles.map((h) => (
              <span key={h.l} className="mono" style={{ fontSize: 11, color: MC.sub, border: `1px solid ${MC.line}`, padding: '5px 9px', borderRadius: 100 }}>{h.l}</span>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 13.5, color: MC.sub, lineHeight: 1.55, marginTop: 14 }}>
          Available for junior / associate production roles. Let’s talk.
        </div>
      </div>
    );
  };
  const PvHead = ({ label, sub }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
      <span className="mono" style={{ fontSize: 11, letterSpacing: '.18em', color: MC.faint, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</span>
      <span className="mono" style={{ fontSize: 11, letterSpacing: '.1em', color: MC.accent, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{sub}</span>
    </div>
  );

  return (
    <div style={{ position: 'relative', zIndex: 2, height: '100%', overflow: mobile ? 'auto' : 'hidden' }} className={mobile ? 'scroll' : ''}>
      {/* faint full-bleed art */}
      <div style={{ position: 'absolute', inset: 0, opacity: .5 }}>
        <MPH label="" hue={20} />
        <div style={{ position: 'absolute', inset: 0, background: mobile
          ? 'linear-gradient(0deg, var(--bg0) 4%, rgba(8,9,12,.86) 60%)'
          : 'linear-gradient(90deg, var(--bg0) 18%, rgba(8,9,12,.72) 52%, rgba(8,9,12,.4) 100%)' }}></div>
      </div>

      <div style={{ position: 'relative', height: mobile ? 'auto' : '100%', display: 'flex',
        flexDirection: mobile ? 'column' : 'row', padding: mobile ? '40px 22px 60px' : '0 56px',
        gap: mobile ? 36 : 48, alignItems: mobile ? 'stretch' : 'center' }}>
        {/* left — wordmark + menu */}
        <div style={{ flex: mobile ? 'none' : '1 1 0', minWidth: 0 }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: '.34em', color: MC.accent, textTransform: 'uppercase', marginBottom: 16 }}>
            ▮ A portfolio by
          </div>
          <h1 style={{ fontFamily: MD, fontSize: mobile ? 76 : 116, lineHeight: .82, margin: 0, letterSpacing: '.01em' }}>
            FRANK<br />Jalufka
          </h1>
          <div style={{ fontSize: mobile ? 15 : 17, color: MC.sub, marginTop: 16, letterSpacing: '.02em' }}>{RV.role}</div>

          <div style={{ marginTop: mobile ? 30 : 44, maxWidth: 460 }}>
            {items.map((it, i) => {
              const on = i === idx;
              return (
                <div key={it.id} onMouseEnter={() => setIdx(i)} onClick={() => choose(i)}
                  className={flickId === it.id ? 'flick' : ''}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 6, cursor: 'pointer',
                    marginBottom: 2, background: on ? 'rgba(255,255,255,.06)' : 'transparent',
                    borderLeft: `3px solid ${on ? MC.accent : 'transparent'}`, transition: 'background .14s, border-color .14s' }}>
                  <span style={{ color: MC.accent, fontSize: 13, width: 12, opacity: on ? 1 : 0, transition: 'opacity .14s' }}>▶</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: mobile ? 20 : 23, fontWeight: 600, letterSpacing: '.02em', color: on ? MC.text : 'rgba(238,241,245,.74)' }}>{it.l}</div>
                    <div className="mono" style={{ fontSize: 12, color: MC.faint, marginTop: 1 }}>{it.s}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {!mobile && (
            <div style={{ display: 'flex', gap: 22, marginTop: 34, alignItems: 'center', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
              <span className="mono" style={{ fontSize: 11.5, color: MC.faint, whiteSpace: 'nowrap' }}>v12.0 — 6 titles shipped</span>
              <span className="mono" style={{ fontSize: 11.5, color: MC.faint, display: 'inline-flex', gap: 14, whiteSpace: 'nowrap' }}>
                <span>↑↓ navigate</span><span style={{ color: MC.accent }}>↵ select</span>
                <span style={{ opacity: .7 }}>↑↑↓↓ ?</span>
              </span>
            </div>
          )}
        </div>

        {/* right — contextual preview */}
        {!mobile && (
          <div style={{ flex: '0 0 380px', maxWidth: 380 }}>
            <div key={cur.id} className="scrn" style={{ background: 'rgba(15,17,23,.72)', backdropFilter: 'blur(10px)',
              border: `1px solid ${MC.line}`, borderRadius: 14, padding: 20, boxShadow: '0 24px 60px rgba(0,0,0,.45)' }}>
              <Preview />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { MainMenu });
