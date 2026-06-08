// proto-extra.jsx — NEW GAME (character sheet), CASE FILES (codex), CONTACT.
const { C: EC, MONO: EM, DISPLAY: ED, SERIF: ES, ScreenFrame: EFrame, Bar: EBar, PH: EPH, AccentBtn: EAccent, GhostBtn: EGhost, Chip: EChip, Stars: EStars } = window;

// ── NEW GAME → Character Sheet ──
function CharacterSheet({ onBack, onGoto, mobile }) {
  const { CHAR, RV } = window;

  return (
    <EFrame title="New Game" tag="Character sheet · who you're hiring" onBack={onBack} mobile={mobile}
      hints={[{ keys: ['Esc'], label: 'back to menu' }]}>
      <div style={{ padding: mobile ? '24px 18px 48px' : '34px 40px 56px', display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: mobile ? 28 : 40 }}>
        {/* left column */}
        <div style={{ flex: mobile ? 'none' : '0 0 320px' }}>
          <div style={{ width: '100%', aspectRatio: '4/5', borderRadius: 14, overflow: 'hidden', position: 'relative', maxWidth: mobile ? 240 : 'none' }}>
            <EPH label="character portrait" hue={30} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(8,9,12,.8), transparent 55%)' }}></div>
            <div style={{ position: 'absolute', left: 18, bottom: 16, right: 18 }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '.14em', color: EC.accent, textTransform: 'uppercase' }}>Class</div>
              <div style={{ fontFamily: ED, fontSize: 38, lineHeight: .88, marginTop: 4 }}>{CHAR.class}</div>
              <div className="mono" style={{ fontSize: 12, color: EC.sub, marginTop: 6 }}>SUBCLASS · {CHAR.subclass}</div>
            </div>
          </div>

          <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.14em', color: EC.faint, textTransform: 'uppercase', margin: '24px 0 12px' }}>Tools Equipped</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CHAR.tools.map((t) => (
              <span key={t} className="mono" style={{ fontSize: 12, color: EC.sub, border: `1px solid ${EC.line}`, padding: '6px 11px', borderRadius: 100 }}>{t}</span>
            ))}
          </div>

          <div style={{ marginTop: 26 }}>
            <EAccent full onClick={() => onGoto('contact')}>Begin → Contact</EAccent>
          </div>
        </div>

        {/* right column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.14em', color: EC.faint, textTransform: 'uppercase', marginBottom: 14 }}>Specializations</div>
          <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CHAR.specializations.map((s) => (
              <div key={s.k} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: EC.panel,
                border: `1px solid ${EC.line}`, borderRadius: 11, padding: '15px 18px' }}>
                <span style={{ color: EC.accent, fontSize: 13, marginTop: 3 }}>◆</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15.5, fontWeight: 600 }}>{s.k}</div>
                  <div style={{ fontSize: 13.5, color: EC.sub, marginTop: 4, lineHeight: 1.5 }}>{s.proof}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.14em', color: EC.faint, textTransform: 'uppercase', margin: '30px 0 14px' }}>Working Style</div>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 12 }}>
            {CHAR.traits.map((t) => (
              <div key={t.t} style={{ background: EC.panel, border: `1px solid ${EC.line}`, borderRadius: 11, padding: '15px 17px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ color: EC.gold }}>◆</span>
                  <span style={{ fontSize: 15.5, fontWeight: 600, whiteSpace: 'nowrap' }}>{t.t}</span>
                </div>
                <div style={{ fontSize: 13.5, color: EC.sub, marginTop: 7, lineHeight: 1.5 }}>{t.d}</div>
              </div>
            ))}
          </div>

          <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.14em', color: EC.faint, textTransform: 'uppercase', margin: '30px 0 12px' }}>Backstory</div>
          {CHAR.bio.map((p, i) => (
            <p key={i} style={{ fontFamily: ES, fontSize: mobile ? 16 : 18, lineHeight: 1.6, color: 'rgba(238,241,245,.82)', maxWidth: 640, margin: '0 0 14px' }}>{p}</p>
          ))}
        </div>
      </div>
    </EFrame>
  );
}

// ── CASE FILES → codex ──
function CaseFiles({ onBack, startId, mobile }) {
  const { FILES } = window;
  const [sel, setSel] = React.useState(startId && FILES.find((f) => f.id === startId) ? startId : FILES[0].id);
  const f = FILES.find((x) => x.id === sel);
  const i = FILES.findIndex((x) => x.id === sel);
  React.useEffect(() => {
    const k = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSel(FILES[(i + 1) % FILES.length].id); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(FILES[(i - 1 + FILES.length) % FILES.length].id); }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [i]);

  return (
    <EFrame title="Case Files" tag="Roadmaps · pipelines · postmortems" onBack={onBack} mobile={mobile}
      hints={[{ keys: ['↑', '↓'], label: 'browse files' }, { keys: ['Esc'], label: 'back to menu' }]}>
      <div style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', minHeight: '100%' }}>
        {/* list */}
        <div style={{ flex: mobile ? 'none' : '0 0 360px', borderRight: mobile ? 'none' : `1px solid ${EC.line}`,
          borderBottom: mobile ? `1px solid ${EC.line}` : 'none', padding: mobile ? '16px' : '22px 18px' }}>
          <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.16em', color: EC.faint, textTransform: 'uppercase', padding: '0 8px 12px' }}>Archive — {FILES.length} entries</div>
          {FILES.map((it) => {
            const on = it.id === sel;
            return (
              <div key={it.id} onClick={() => setSel(it.id)}
                style={{ padding: '14px 14px', borderRadius: 10, marginBottom: 4, cursor: 'pointer',
                  background: on ? 'rgba(255,255,255,.06)' : 'transparent', boxShadow: on ? `inset 2px 0 0 ${EC.accent}` : 'none',
                  opacity: it.locked ? .72 : 1, transition: 'background .14s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 7 }}>
                  <span className="mono" style={{ fontSize: 10, color: it.locked ? EC.faint : EC.accent, border: `1px solid ${EC.line}`, padding: '3px 7px', borderRadius: 4, letterSpacing: '.06em' }}>{it.kind.toUpperCase()}</span>
                  <span className="mono" style={{ fontSize: 10, color: it.locked ? EC.prod : EC.teal, letterSpacing: '.06em', whiteSpace: 'nowrap' }}>{it.locked ? '🔒 ' : ''}{it.status.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: 16.5, fontWeight: 600, color: on ? EC.text : 'rgba(238,241,245,.82)' }}>{it.title}</div>
                <div className="mono" style={{ fontSize: 11.5, color: EC.faint, marginTop: 4 }}>{it.quest} · {it.read}</div>
              </div>
            );
          })}
        </div>

        {/* detail */}
        <div key={f.id} className="scrn" style={{ flex: 1, minWidth: 0, padding: mobile ? '24px 18px 44px' : '32px 44px 48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
            <EChip color={f.locked ? EC.prod : EC.accent} solid={!f.locked}>{f.kind}</EChip>
            <span className="mono" style={{ fontSize: 11, color: f.locked ? EC.prod : EC.teal, letterSpacing: '.06em', whiteSpace: 'nowrap' }}>{f.locked ? '🔒 RESTRICTED' : '✓ DECLASSIFIED'}</span>
            <span className="mono" style={{ fontSize: 11, color: EC.faint, whiteSpace: 'nowrap' }}>{f.quest}</span>
          </div>
          <h1 style={{ fontFamily: ED, fontSize: mobile ? 42 : 54, lineHeight: .92, margin: 0, letterSpacing: '.01em' }}>{f.title}</h1>
          <p style={{ fontFamily: ES, fontSize: mobile ? 17 : 19, lineHeight: 1.55, color: 'rgba(238,241,245,.8)', maxWidth: 640, marginTop: 14 }}>{f.summary}</p>

          {/* artifact placeholder */}
          <div style={{ height: mobile ? 150 : 190, borderRadius: 12, overflow: 'hidden', margin: '24px 0 6px', position: 'relative' }}>
            <EPH label={f.artifact} hue={f.locked ? 0 : 210} />
            {f.locked && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(8,9,12,.55)' }}><span className="mono" style={{ fontSize: 13, color: EC.prod, letterSpacing: '.2em' }}>[ REDACTED ]</span></div>}
          </div>

          <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.14em', color: EC.faint, textTransform: 'uppercase', margin: '24px 0 12px' }}>{f.locked ? 'Notes' : 'Key Moves'}</div>
          {f.points.map((p) => (
            <div key={p} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '8px 0', fontSize: 15.5, color: f.locked ? EC.sub : EC.text }}>
              <span style={{ color: f.locked ? EC.faint : EC.accent, marginTop: 2 }}>{f.locked ? '·' : '▸'}</span>{p}
            </div>
          ))}

          {f.locked && (
            <div style={{ marginTop: 22, fontFamily: ES, fontStyle: 'italic', fontSize: 16, color: EC.sub }}>
              Happy to walk through the live plan in an interview.
            </div>
          )}
        </div>
      </div>
    </EFrame>
  );
}

// ── CONTACT → establish comms ──
function Contact({ onBack, mobile }) {
  const { RV } = window;
  return (
    <EFrame title="Establish Comms" tag="Contact" onBack={onBack} mobile={mobile}
      hints={[{ keys: ['Esc'], label: 'back to menu' }]}>
      <div style={{ minHeight: '100%', display: 'flex', alignItems: mobile ? 'flex-start' : 'center', justifyContent: 'center', padding: mobile ? '32px 18px 48px' : '40px' }}>
        <div style={{ width: '100%', maxWidth: 720 }}>
          <div className="mono" style={{ fontSize: 12, color: EC.teal, letterSpacing: '.06em', marginBottom: 18 }}>
            ● {RV.availability}<span className="blink" style={{ marginLeft: 4 }}>▌</span>
          </div>
          <h1 style={{ fontFamily: ED, fontSize: mobile ? 56 : 88, lineHeight: .86, margin: 0, letterSpacing: '.01em' }}>
            LET’S SHIP<br />SOMETHING.
          </h1>
          <p style={{ fontSize: mobile ? 17 : 20, color: EC.sub, lineHeight: 1.55, marginTop: 20, maxWidth: 520 }}>
            A new producer who can also carry the narrative — Open to remote and relocation · Texas, US and open to talk.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 12, marginTop: 32 }}>
            <a href={`mailto:${RV.email}`} style={{ textDecoration: 'none', gridColumn: mobile ? 'auto' : '1 / -1' }}>
              <div style={{ background: EC.accent, color: EC.accentText, borderRadius: 10, padding: '20px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="mono" style={{ fontSize: 11, letterSpacing: '.1em', opacity: .7 }}>EMAIL</div>
                  <div style={{ fontFamily: ED, fontSize: 28, lineHeight: 1, marginTop: 4 }}>{RV.email}</div>
                </div>
                <span style={{ fontSize: 22 }}>▸</span>
              </div>
            </a>
            {RV.handles.map((h) => (
              <div key={h.l} style={{ background: EC.panel, border: `1px solid ${EC.line}`, borderRadius: 10, padding: '16px 20px' }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '.1em', color: EC.faint }}>{h.l.toUpperCase()}</div>
                <div style={{ fontSize: 16, color: EC.text, marginTop: 5 }}>{h.v}</div>
              </div>
            ))}
          </div>

          <div className="mono" style={{ fontSize: 12, color: EC.faint, marginTop: 28, lineHeight: 1.7 }}>
            <div>RÉSUMÉ ……… available on request</div>
            <div>REFERENCES … shipped-with leads &amp; directors</div>
          </div>
        </div>
      </div>
    </EFrame>
  );
}

Object.assign(window, { CharacterSheet, CaseFiles, Contact });
