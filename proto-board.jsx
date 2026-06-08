// proto-board.jsx — CONTINUE → live production board (dark Gantt).
const { C: BC, MONO: BM, DISPLAY: BD, ScreenFrame: BFrame, Bar: BBar, Chip: BChip, PH: BPH, AccentBtn: BAccent } = window;

function ProductionBoard({ onBack, onOpenQuest, onOpenFile, mobile }) {
  const { RV, BOARD, HALCYON } = window;
  const years = ['18', '19', '20', '21', '22', '23', '24', '25', '26'];
  const [hover, setHover] = React.useState(null);
  const statusColor = (s) => (s === 'Shipped' ? BC.shipped : BC.prod);
  const al = (c, a) => c.replace(')', ` / ${a})`);

  return (
    <BFrame title="Production Board" tag="Shipping roadmap · 2018 → 2026" onBack={onBack} mobile={mobile}
      hints={[
        { keys: ['Click'], label: 'open a title' },
        { keys: ['Esc'], label: 'back to menu' },
      ]}>
      <div style={{ padding: mobile ? '22px 18px 48px' : '30px 40px 56px', display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: mobile ? 22 : 28 }}>
        {/* left: stats + gantt */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 10, marginBottom: 22 }}>
            {RV.stats.map((s) => (
              <div key={s.l} style={{ background: BC.panel, border: `1px solid ${BC.line}`, borderRadius: 11, padding: '15px 16px' }}>
                <div style={{ fontFamily: BD, fontSize: 34, lineHeight: .9, color: BC.text }}>{s.k}</div>
                <div className="mono" style={{ fontSize: 11, color: BC.sub, marginTop: 5, letterSpacing: '.02em' }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{ background: BC.panel, border: `1px solid ${BC.line}`, borderRadius: 14, padding: mobile ? '16px 16px 22px' : '20px 24px 26px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
              <span className="mono" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: BC.sub }}>Timeline</span>
              <div style={{ display: 'flex', gap: 12 }}>
                <BChip color={BC.shipped}>Shipped</BChip>
                <BChip color={BC.prod}>In production</BChip>
              </div>
            </div>

            {/* year axis */}
            <div style={{ position: 'relative', marginLeft: mobile ? 96 : 150, height: 18, borderBottom: `1px solid ${BC.line}` }}>
              {years.map((y, i) => (
                <span key={y} className="mono" style={{ position: 'absolute', left: `${(i / (years.length - 1)) * 100}%`,
                  transform: 'translateX(-50%)', fontSize: 11, color: BC.faint }}>'{y}</span>
              ))}
            </div>

            {BOARD.map((b) => {
              const col = statusColor(b.status);
              const on = hover === b.id;
              return (
                <div key={b.id} onMouseEnter={() => setHover(b.id)} onMouseLeave={() => setHover(null)}
                  onClick={() => (b.nda ? onOpenFile('halcyon-plan') : onOpenQuest(b.id))}
                  style={{ display: 'flex', alignItems: 'center', height: 56, cursor: 'pointer',
                    borderBottom: `1px solid ${BC.lineSoft}`, background: on ? 'rgba(255,255,255,.03)' : 'transparent', borderRadius: 6 }}>
                  <div style={{ width: mobile ? 96 : 150, paddingRight: 12, paddingLeft: 6, flexShrink: 0 }}>
                    <div style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 600, color: on ? BC.text : 'rgba(238,241,245,.82)',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.t}</div>
                    {b.nda && <div className="mono" style={{ fontSize: 9.5, color: BC.prod, letterSpacing: '.08em' }}>[NDA]</div>}
                  </div>
                  <div style={{ position: 'relative', flex: 1, height: '100%' }}>
                    <div style={{ position: 'absolute', top: '50%', transform: `translateY(-50%) ${on ? 'scaleY(1.12)' : ''}`,
                      left: `${b.left}%`, width: `${b.w}%`, height: 28, borderRadius: 7,
                      background: al(col, .14), border: `1px solid ${al(col, .45)}`,
                      overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '0 10px', transition: 'transform .12s' }}>
                      <div style={{ position: 'absolute', inset: 0, width: `${b.pct}%`, background: al(col, .26) }}></div>
                      <span className="mono" style={{ position: 'relative', fontSize: 11, fontWeight: 700, color: col, whiteSpace: 'nowrap' }}>
                        {b.pct < 100 ? `${b.pct}%` : '✓'}</span>
                    </div>
                    <div style={{ position: 'absolute', top: '50%', left: `${b.left + b.w}%`, width: 9, height: 9,
                      transform: 'translate(-50%,-50%) rotate(45deg)', background: col, borderRadius: 2 }}></div>
                    {on && !mobile && (
                      <div className="mono" style={{ position: 'absolute', top: -2, left: `calc(${b.left + b.w}% + 14px)`,
                        fontSize: 11, color: BC.sub, whiteSpace: 'nowrap' }}>open ▸</div>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="mono" style={{ fontSize: 12, color: BC.prod, marginTop: 16, lineHeight: 1.5 }}>
              ▸ Currently producing Project Halcyon — vertical slice locked, on track for cert {HALCYON.cert}.
            </div>
          </div>
        </div>

        {/* right: now producing */}
        <div style={{ flex: mobile ? 'none' : '0 0 330px', maxWidth: mobile ? 'none' : 330 }}>
          <div style={{ background: BC.panel, border: `1px solid ${al(BC.prod, .35)}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ height: 130, position: 'relative' }}>
              <BPH label="" hue={280} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, var(--bg1), transparent 70%)' }}></div>
              <span className="mono" style={{ position: 'absolute', top: 12, left: 14, fontSize: 10, color: BC.prod,
                background: 'rgba(0,0,0,.5)', padding: '4px 8px', borderRadius: 100, letterSpacing: '.1em', whiteSpace: 'nowrap' }}>● IN PRODUCTION</span>
            </div>
            <div style={{ padding: '4px 20px 22px' }}>
              <div style={{ fontFamily: BD, fontSize: 30, lineHeight: .95, marginTop: -10, position: 'relative' }}>PROJECT HALCYON</div>
              <div className="mono" style={{ fontSize: 11, color: BC.faint, marginTop: 4 }}>{HALCYON.tag}</div>

              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '18px 0 7px' }}>
                <span className="mono" style={{ fontSize: 11, color: BC.sub, whiteSpace: 'nowrap' }}>{HALCYON.phase.toUpperCase()}</span>
                <span className="mono" style={{ fontSize: 11, color: BC.prod }}>{HALCYON.pct}%</span>
              </div>
              <BBar pct={HALCYON.pct} color={BC.prod} />

              <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.14em', color: BC.faint, textTransform: 'uppercase', margin: '20px 0 10px' }}>Milestones</div>
              {HALCYON.milestones.map((m) => (
                <div key={m.l} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 13.5,
                  color: m.done ? BC.text : BC.faint }}>
                  <span style={{ color: m.done ? BC.teal : BC.faint }}>{m.done ? '◆' : '◇'}</span>{m.l}
                </div>
              ))}

              <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.14em', color: BC.faint, textTransform: 'uppercase', margin: '18px 0 10px' }}>Risk burndown</div>
              {HALCYON.risks.map((r) => (
                <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', fontSize: 13 }}>
                  <span style={{ color: BC.sub }}>{r.l}</span>
                  <span className="mono" style={{ fontSize: 10, color: r.level === 'med' ? BC.prod : BC.teal,
                    border: `1px solid ${BC.line}`, padding: '2px 7px', borderRadius: 100, textTransform: 'uppercase' }}>{r.level}</span>
                </div>
              ))}

              <div style={{ marginTop: 20 }}>
                <BAccent full onClick={() => onOpenFile('recovery')}>Read a postmortem ▸</BAccent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BFrame>
  );
}

Object.assign(window, { ProductionBoard });
