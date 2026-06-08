// proto-quest.jsx — SELECTED WORK → quest log (shipped titles).
const { C: QC, MONO: QM, DISPLAY: QD, SERIF: QS, ScreenFrame: QFrame, Stars: QStars, PH: QPH, AccentBtn: QAccent, GhostBtn: QGhost, Chip: QChip } = window;

function QuestLog({ onBack, onOpenFile, startId, mobile }) {
  const { QUESTS } = window;
  const [sel, setSel] = React.useState(startId && QUESTS.find((q) => q.id === startId) ? startId : QUESTS[0].id);
  const q = QUESTS.find((x) => x.id === sel);
  const i = QUESTS.findIndex((x) => x.id === sel);

  React.useEffect(() => {
    const k = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSel(QUESTS[(i + 1) % QUESTS.length].id); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(QUESTS[(i - 1 + QUESTS.length) % QUESTS.length].id); }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [i]);

  return (
    <QFrame title="Quest Log" tag="Completed campaigns · 6 shipped" onBack={onBack} mobile={mobile}
      hints={[{ keys: ['↑', '↓'], label: 'browse titles' }, { keys: ['Esc'], label: 'back to menu' }]}>
      <div style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', minHeight: '100%' }}>
        {/* list */}
        <div style={{ flex: mobile ? 'none' : '0 0 380px', borderRight: mobile ? 'none' : `1px solid ${QC.line}`,
          borderBottom: mobile ? `1px solid ${QC.line}` : 'none', padding: mobile ? '16px 16px' : '22px 18px' }}>
          <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.16em', color: QC.faint, textTransform: 'uppercase', padding: '0 8px 12px' }}>Completed Campaigns</div>
          {QUESTS.map((it) => {
            const on = it.id === sel;
            return (
              <div key={it.id} onClick={() => setSel(it.id)}
                style={{ display: 'flex', gap: 13, padding: '14px 14px', borderRadius: 10, marginBottom: 4, cursor: 'pointer',
                  background: on ? 'rgba(255,255,255,.06)' : 'transparent',
                  boxShadow: on ? `inset 2px 0 0 ${QC.accent}` : 'none', transition: 'background .14s' }}>
                <div style={{ width: 46, height: 46, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}><QPH hue={it.hue} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: 18, fontWeight: 600, color: on ? QC.text : 'rgba(238,241,245,.82)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.title}</span>
                    <span className="mono" style={{ fontSize: 10, color: QC.teal, letterSpacing: '.04em', whiteSpace: 'nowrap', flexShrink: 0 }}>✓ SHIPPED</span>
                  </div>
                  <div className="mono" style={{ fontSize: 11.5, color: QC.faint, marginTop: 3 }}>{it.tag} · {it.year}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* detail */}
        <div key={q.id} className="scrn" style={{ flex: 1, minWidth: 0, padding: mobile ? '24px 18px 44px' : '32px 40px 44px' }}>
          <div style={{ height: mobile ? 150 : 200, borderRadius: 12, overflow: 'hidden', marginBottom: 24, position: 'relative' }}>
            <QPH label={`${q.title} — quest splash`} hue={q.hue} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(8,9,12,.6), transparent 60%)' }}></div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
            <QChip color={QC.gold}>{q.kind}</QChip>
            <span className="mono" style={{ fontSize: 11, color: QC.teal, letterSpacing: '.06em', whiteSpace: 'nowrap' }}>✓ COMPLETED · {q.year}</span>
          </div>
          <h1 style={{ fontFamily: QD, fontSize: mobile ? 44 : 56, lineHeight: .9, margin: 0, letterSpacing: '.01em' }}>{q.title}</h1>
          <p style={{ fontFamily: QS, fontStyle: 'italic', fontSize: mobile ? 18 : 21, lineHeight: 1.55, color: 'rgba(238,241,245,.78)', maxWidth: 620, marginTop: 14 }}>
            “{q.blurb}”
          </p>

          {/* meta row */}
          <div style={{ display: 'flex', gap: mobile ? 18 : 34, flexWrap: 'wrap', margin: '22px 0 8px', paddingTop: 18, borderTop: `1px solid ${QC.line}` }}>
            {[['Role', q.role], ['Studio', q.studio], ['Team', q.team], ['Duration', q.duration], ['Platforms', q.platforms], ['Result', q.reward]].map(([k, v]) => (
              <div key={k}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: '.12em', color: QC.faint, textTransform: 'uppercase' }}>{k}</div>
                <div style={{ fontSize: 14, color: QC.text, marginTop: 4, maxWidth: 220 }}>{v}</div>
              </div>
            ))}
          </div>

          <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.14em', color: QC.faint, textTransform: 'uppercase', margin: '26px 0 12px' }}>Objectives Cleared</div>
          {q.objectives.map((o) => (
            <div key={o} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '8px 0', fontSize: 15.5, color: QC.text }}>
              <span style={{ color: QC.teal, marginTop: 1 }}>☑</span>{o}
            </div>
          ))}

          <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
            {q.caseFile && <QAccent onClick={() => onOpenFile(q.caseFile)}>▸ Read postmortem</QAccent>}
            <QGhost onClick={() => {}}>View full credits</QGhost>
          </div>
        </div>
      </div>
    </QFrame>
  );
}

Object.assign(window, { QuestLog });
