import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronRight, Expand, Minimize, NotebookPen, X } from 'lucide-react';

const chapters = ['Introduction', 'History', 'Techniques', 'Equipment', 'Today', 'Conclusion'];
const notes = [
  'Hello everyone! Today I want to tell you about Savate, also called French boxing.',
  'Savate is a traditional martial art from France. It became popular in the 19th century.',
  'Unlike regular boxing, Savate uses both punches and kicks. This makes it different from many other sports.',
  'One interesting fact is that Savate fighters wear special shoes and boxing gloves. The sport requires good balance, speed and control.',
  'Today, people practise Savate in France and other countries. It is an important part of French sporting history.',
  'I chose Savate because it is unusual and interesting. It shows that France is famous for more than just football. Thank you for listening!',
];
const pad = (n: number) => String(n).padStart(2, '0');
function initialSlide() { const n = Number(window.location.hash.slice(1)); return Number.isInteger(n) && n >= 1 && n <= 6 ? n - 1 : 0; }
function Eyebrow({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="eyebrow"><span className="red-dash" />{number}<span className="eyebrow-divider">/</span>{children}</div>;
}
function Tricolor({ className = '' }: { className?: string }) { return <span className={`tricolor ${className}`} aria-label="French flag"><i /><i /><i /></span>; }

function Photo({ name, alt, className = '', priority = false }: { name: string; alt: string; className?: string; priority?: boolean }) {
  return <img className={`photo ${className}`} src={`/assets/savate-${name}-1600.webp`} srcSet={`/assets/savate-${name}-800.webp 800w, /assets/savate-${name}-1600.webp 1600w`} sizes="(max-width: 760px) 100vw, 70vw" alt={alt} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />;
}
function PhotoCredit({ children }: { children: React.ReactNode }) {
  return <figcaption className="photo-caption">{children}<a href="/assets/IMAGE-CREDITS.html" target="_blank" rel="noreferrer">IMAGE CREDITS ↗</a></figcaption>;
}
function Slide({ index, go }: { index: number; go: (n: number) => void }) {
  if (index === 0) return <div className="intro slide-layout">
    <figure className="hero-photo"><Photo name="kick" alt="A Savate athlete delivers a body kick during the 2013 World Championship qualifiers" priority/><PhotoCredit>WORLD CHAMPIONSHIP QUALIFIERS · 2013</PhotoCredit></figure>
    <div className="hero-copy"><Eyebrow number="01">TRADITIONAL FRENCH SPORT</Eyebrow><h1>SAVATE<span className="title-period">.</span></h1><h2>THE ART OF<br/>FRENCH BOXING</h2><p>French elegance. A fighter’s spirit.<br/>A tradition defined by precision, rhythm and movement.</p><button className="begin-button" onClick={() => go(1)}>DISCOVER THE ART <ArrowRight size={19}/></button></div>
    <div className="hero-bottom"><Tricolor/><span>ROOTED IN FRANCE. DEFINED BY MOVEMENT.</span></div>
  </div>;
  if (index === 1) return <div className="history slide-layout editorial-grid">
    <div className="section-copy"><Eyebrow number="02">HISTORY</Eyebrow><h1>BORN IN <br/>FRANCE<span className="title-period">.</span></h1><p>A traditional French martial art.<br/>A story that began with movement.</p><div className="timeline"><div><span>ORIGIN</span><strong>France</strong><p>A French martial art</p></div><div><span>1800s</span><strong>A sport takes shape</strong><p>Savate becomes popular</p></div><div><span>ONWARD</span><strong>A lasting tradition</strong><p>Passed from one generation to the next</p></div></div></div>
    <figure className="editorial-photo archive-photo"><Photo name="archive" alt="Victor Castérès demonstrates a French boxing flank kick before an audience in 1906"/><PhotoCredit>VICTOR CASTÉRÈS · 1906 · AGENCE ROL / BnF</PhotoCredit></figure>
  </div>;
  if (index === 2) return <div className="techniques slide-layout"><Eyebrow number="03">TECHNIQUES</Eyebrow><div className="tech-heading"><h1>PUNCHES <span className="red-text">+</span> KICKS</h1><p>Unlike regular boxing, Savate<br/>combines punches and kicks.</p></div><div className="tech-panels"><figure className="tech-panel"><Photo name="action" alt="A Savate competitor punches towards his opponent’s raised guard"/><div className="panel-copy"><span>01 / HANDS</span><h2>PUNCHES</h2><p>Using the hands</p></div></figure><figure className="tech-panel"><Photo name="kick" alt="A Savate competitor extends a kick towards his opponent’s body"/><div className="panel-copy"><span>02 / FEET</span><h2>KICKS</h2><p>Using the feet</p></div></figure></div><div className="section-foot"><span>TWO FORMS OF MOVEMENT. ONE DISTINCTIVE ART.</span><a href="/assets/IMAGE-CREDITS.html" target="_blank" rel="noreferrer">PHOTOGRAPHY: LYLIADE21 · CC BY-SA 3.0 ↗</a></div></div>;
  if (index === 3) return <div className="equipment slide-layout editorial-grid"><div className="section-copy"><Eyebrow number="04">EQUIPMENT</Eyebrow><h1>THE DIFFERENCE<br/>IS IN THE <br/>DETAILS<span className="title-period">.</span></h1><p>Not your ordinary boxing shoes.<br/>Purpose-built for the art.</p><div className="equipment-list"><div><span>01</span>Special shoes</div><div><span>02</span>Boxing gloves</div><div><span>03</span>Precision and control</div></div><p className="equipment-note">Balance. Speed. Control.</p></div><div className="equipment-panels"><figure className="equipment-panel shoe-panel"><Photo name="shoe" alt="Close-up of a black, lace-up Savate shoe approved for the sport"/><figcaption><span>01</span> SAVATE SHOES</figcaption></figure><figure className="equipment-panel glove-panel"><Photo name="gloves" alt="Close-up of a blue boxing glove worn by a Savate competitor"/><figcaption><span>02</span> BOXING GLOVES <a href="/assets/IMAGE-CREDITS.html" target="_blank" rel="noreferrer">CREDITS ↗</a></figcaption></figure></div></div>;
  if (index === 4) return <div className="today slide-layout editorial-grid"><div className="section-copy"><Eyebrow number="05">SAVATE TODAY</Eyebrow><h1>A LIVING <br/>FRENCH <br/>TRADITION<span className="title-period">.</span></h1><p>Practised in France<br/>and around the world.</p><div className="editorial-note"><Tricolor/><span>FRENCH ROOTS.<br/>WORLDWIDE SPIRIT.</span></div></div><figure className="editorial-photo today-photo"><Photo name="action" alt="International Savate athletes exchange punches in a competition ring"/><PhotoCredit>INTERNATIONAL COMPETITION · WORLD QUALIFIERS, 2013</PhotoCredit></figure></div>;
  return <div className="conclusion slide-layout"><figure className="closing-photo"><Photo name="combat" alt="A focused Savate athlete wearing blue boxing gloves in the competition ring"/><PhotoCredit>WORLD CHAMPIONSHIP · 2013 · LYLIADE21</PhotoCredit></figure><div className="closing-copy"><Eyebrow number="06">A DIFFERENT SIDE OF FRANCE</Eyebrow><h1>THANK<br/>YOU<span className="title-period">.</span></h1><h2>MORE THAN JUST FOOTBALL.</h2><p>Savate is part of France’s sporting heritage.<br/>Unusual. Distinctive. Unmistakably French.</p><button className="restart" onClick={() => go(0)}>BACK TO THE BEGINNING <ArrowRight size={17}/></button></div></div>;
}

export default function App() {
  const [slide, setSlide] = useState(initialSlide);
  const [direction, setDirection] = useState(1);
  const slideRef = useRef(slide);
  const [showNotes, setShowNotes] = useState(false);
  const [fullscreen, setFullscreen] = useState(!!document.fullscreenElement);
  const [notice, setNotice] = useState('');
  const reducedMotion = useReducedMotion();
  const notesButton = useRef<HTMLButtonElement>(null);
  const go = useCallback((next: number) => {
    const bounded = Math.max(0, Math.min(5, next));
    setDirection(bounded >= slideRef.current ? 1 : -1);
    slideRef.current = bounded;
    setSlide(bounded);
    window.history.replaceState(null, '', `#${bounded + 1}`);
  }, []);
  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else setNotice('Fullscreen is unavailable in this browser. Use your browser’s fullscreen control.');
    } catch { setNotice('Fullscreen is unavailable here. Open this page in a browser tab and press F.'); }
  }, []);
  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
      const tag = (event.target as HTMLElement).tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || (event.target as HTMLElement).isContentEditable) return;
      if (event.key === 'ArrowRight' || (event.code === 'Space' && !['BUTTON', 'A'].includes(tag))) { event.preventDefault(); go(slideRef.current + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); go(slideRef.current - 1); }
      if (event.key.toLowerCase() === 'n') { event.preventDefault(); setShowNotes(n => !n); }
      if (event.key.toLowerCase() === 'f') { event.preventDefault(); void toggleFullscreen(); }
      if (event.key === 'Escape') { setShowNotes(false); if (document.fullscreenElement) void document.exitFullscreen(); }
    };
    const syncFullscreen = () => setFullscreen(!!document.fullscreenElement);
    const syncHash = () => go(initialSlide());
    window.addEventListener('keydown', keyboard);
    window.addEventListener('hashchange', syncHash);
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => { window.removeEventListener('keydown', keyboard); window.removeEventListener('hashchange', syncHash); document.removeEventListener('fullscreenchange', syncFullscreen); };
  }, [go, toggleFullscreen]);
  useEffect(() => { if (notice) { const timer = setTimeout(() => setNotice(''), 6000); return () => clearTimeout(timer); } }, [notice]);
  return <div className="presentation">
    <header className="site-header"><a href="#1" className="brand" onClick={e => { e.preventDefault(); go(0); }} aria-label="Savate, return to introduction"><span className="brand-mark">S<span>/</span></span><span>SAVATE<span className="brand-sub">L’ART DE LA BOXE FRANÇAISE</span></span></a><div className="header-center"><span className="header-line"/> SPORT & CULTURE <span className="header-line"/></div><div className="header-right"><Tricolor/><span>FRANCE</span><span className="header-year">ENGLISH PRESENTATION</span></div></header>
    <main id="presentation" aria-label="Savate presentation"><AnimatePresence mode="wait" custom={direction} initial={false}><motion.section className="slide" key={slide} custom={direction} variants={{ enter: (d: number) => ({ opacity: 0, y: reducedMotion ? 0 : d * 18 }), center: { opacity: 1, y: 0 }, exit: (d: number) => ({ opacity: 0, y: reducedMotion ? 0 : d * -12 }) }} initial="enter" animate="center" exit="exit" transition={{ duration: reducedMotion ? 0 : .23, ease: 'easeOut' }} aria-label={`Slide ${slide + 1} of 6: ${chapters[slide]}`}><Slide index={slide} go={go}/></motion.section></AnimatePresence></main>
    <footer className="controls"><div className="control-top"><div className="counter"><strong>{pad(slide + 1)}</strong><span>/ 06</span></div><nav className="chapter-nav" aria-label="Presentation slides">{chapters.map((chapter, i) => <button key={chapter} onClick={() => go(i)} className={i === slide ? 'selected' : ''} aria-current={i === slide ? 'step' : undefined} aria-label={`Slide ${i + 1}: ${chapter}`}><span className="chapter-number">{pad(i + 1)}</span><span className="chapter-name">{chapter}</span></button>)}</nav><div className="utility-controls"><button ref={notesButton} onClick={() => setShowNotes(n => !n)} className={showNotes ? 'utility active' : 'utility'} aria-label="Toggle speaker notes (N)" title="Speaker notes (N)" aria-expanded={showNotes} aria-controls={showNotes ? "speaker-notes" : undefined}><NotebookPen size={18}/></button><button className="utility fullscreen-button" onClick={() => void toggleFullscreen()} aria-label={fullscreen ? 'Exit fullscreen (F)' : 'Enter fullscreen (F)'} title="Fullscreen (F)">{fullscreen ? <Minimize size={18}/> : <Expand size={18}/>}</button><span className="controls-separator"/><button className="arrow-button" onClick={() => go(slide - 1)} disabled={slide === 0} aria-label="Previous slide"><ArrowLeft size={20}/></button><button className="arrow-button next" onClick={() => go(slide + 1)} disabled={slide === 5} aria-label="Next slide"><ArrowRight size={20}/></button></div></div><div className="progress-track" role="progressbar" aria-label="Presentation progress" aria-valuemin={1} aria-valuemax={6} aria-valuenow={slide + 1}><motion.div animate={{ width: `${((slide + 1) / 6) * 100}%` }} transition={{ duration: reducedMotion ? 0 : .3 }}/></div><div className="control-bottom"><span>A FRENCH ORIGINAL.</span><span className="keyboard-hints"><kbd>←</kbd><kbd>→</kbd><kbd className="space-key">SPACE</kbd> NAVIGATE <span className="hint-divider">/</span><kbd>F</kbd> FULLSCREEN <span className="hint-divider">/</span><kbd>N</kbd> NOTES</span><span className="edition">SIX CHAPTERS. ONE ART.</span></div></footer>
    <AnimatePresence>{showNotes && <motion.aside id="speaker-notes" className="speaker-notes" initial={{ opacity: 0, y: reducedMotion ? 0 : 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} aria-label="Speaker notes"><div className="notes-heading"><span><NotebookPen size={15}/> SPEAKER NOTES <b>{pad(slide + 1)} / 06</b></span><button onClick={() => { setShowNotes(false); notesButton.current?.focus(); }} aria-label="Close speaker notes"><X size={18}/></button></div><p>{notes[slide]}</p><div className="notes-footer">FOR THE PRESENTER <span>PRESS N TO HIDE <ChevronRight size={12}/></span></div></motion.aside>}</AnimatePresence>
    <div className="sr-only" aria-live="polite" aria-atomic="true">Slide {slide + 1} of 6: {chapters[slide]}</div>
    {notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss message"><X size={16}/></button></div>}
  </div>;
}
