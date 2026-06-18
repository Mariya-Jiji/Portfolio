import { useRef, useEffect, useState } from 'react';
import FadeIn from './FadeIn';
import ContactButton from './ContactButton';

const ABOUT_TEXT =
  "I'm a B.Tech Computer Science student at Federal Institute of Science And Technology (FISAT) Angamaly,graduating in 2027.I am passionate about full-stack development and building solutions that make a real impact. I work with Java, Python, C, React, Node.js, and SQL — from designing secure REST APIs to crafting responsive frontends. I love tackling complex problems and turning rough ideas into polished, user-friendly products.";

const SKILL_GROUPS = [
  { label: 'Languages',    color: '#00ff64', items: ['Java', 'Python', 'C'] },
  { label: 'Frontend',     color: '#00c8ff', items: ['React', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'] },
  { label: 'Backend',      color: '#ff4f7b', items: ['Node.js'] },
  { label: 'Database',     color: '#ffd700', items: ['MongoDB', 'SQL'] },
  { label: 'Tools & Platforms', color: '#b46fff', items: ['Git', 'GitHub', 'Vercel'] },
  { label: 'Fundamentals', color: '#ff9d00', items: ['DSA', 'OOP', 'Problem Solving', 'REST APIs'] },
];

const EDUCATION = [
  { year: 'Present', title: 'B.Tech — Computer Science Engineering', place: 'Federal Institute of Science and Technology (FISAT)' },
  { year: '2023', title: 'Higher Secondary Education', place: 'Naipunnya Public School, Edakunnu, Angamaly' },
  { year: '2021', title: 'Secondary Education', place: 'Naipunnya Public School, Edakunnu, Angamaly' },
];

// Animated word-by-word text reveal
const AnimatedParagraph = ({ text }: { text: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(' ');
  return (
    <p ref={ref} className="font-medium leading-relaxed text-[#D7E2EA] max-w-[560px]" style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>
      {words.map((word, i) => (
        <span key={i} style={{
          display: 'inline-block',
          marginRight: '0.28em',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: `opacity 0.4s ease ${i * 0.025}s, transform 0.4s ease ${i * 0.025}s`,
        }}>{word}</span>
      ))}
    </p>
  );
};

const SkillTag = ({ label, color }: { label: string; color: string }) => (
  <span className="rounded-full px-4 py-1.5 text-sm font-medium cursor-default select-none transition-all duration-300"
    style={{ border: `1.5px solid ${color}40`, background: `${color}0d`, color: `${color}cc` }}
    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor=`${color}`; el.style.color=color; el.style.background=`${color}20`; el.style.boxShadow=`0 0 16px ${color}40`; el.style.transform='scale(1.1)'; }}
    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor=`${color}40`; el.style.color=`${color}cc`; el.style.background=`${color}0d`; el.style.boxShadow='none'; el.style.transform='scale(1)'; }}
  >{label}</span>
);

// Animated counter
const Counter = ({ value, label, color }: { value: string; label: string; color: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const target = parseInt(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = Math.ceil(target / 40);
      const interval = setInterval(() => {
        start += step;
        if (start >= target) { setCount(target); clearInterval(interval); }
        else setCount(start);
      }, 35);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="font-black tabular-nums" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color }}>
        {count}+
      </span>
      <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40">{label}</span>
    </div>
  );
};

const AboutSection = () => (
  <section id="about" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-20">
    {/* Corner 3D images */}
    <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="pointer-events-none absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[60px] sm:w-[160px] md:w-[210px]">
      <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="" className="w-full h-auto" loading="lazy" draggable={false} />
    </FadeIn>
    <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="pointer-events-none absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[55px] sm:w-[140px] md:w-[180px]">
      <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="" className="w-full h-auto" loading="lazy" draggable={false} />
    </FadeIn>
    <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="pointer-events-none absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[60px] sm:w-[160px] md:w-[210px]">
      <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="" className="w-full h-auto" loading="lazy" draggable={false} />
    </FadeIn>
    <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="pointer-events-none absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[65px] sm:w-[170px] md:w-[220px]">
      <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="" className="w-full h-auto" loading="lazy" draggable={false} />
    </FadeIn>

    <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 text-center">
      <FadeIn delay={0} y={40}>
        <h2 className="hero-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          About me
        </h2>
      </FadeIn>

      <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-20">
        <AnimatedParagraph text={ABOUT_TEXT} />

        {/* Stats counters */}
        <FadeIn delay={0.1} className="w-full max-w-2xl">
          <div className="flex justify-center gap-10 sm:gap-16 md:gap-20 py-6 rounded-2xl"
            style={{ border: '1px solid rgba(215,226,234,0.07)', background: 'rgba(215,226,234,0.02)' }}>
            <Counter value="3" label="Years Study"  color="#00ff64" />
            <Counter value="5" label="Certifications" color="#00c8ff" />
            <Counter value="1" label="Live Project"  color="#b46fff" />
          </div>
        </FadeIn>
{/* Skills — emphasized as its own clear block */}
        <FadeIn delay={0.15} className="w-full max-w-3xl">
          <div className="flex flex-col gap-8 rounded-3xl p-6 sm:p-8 md:p-10"
            style={{ border: '1px solid rgba(0,255,150,0.15)', background: 'rgba(0,255,150,0.03)' }}>

            {/* Section label */}
            <div className="flex items-center gap-3">
              <span className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,150,0.4))' }} />
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wide text-[#D7E2EA]">
                Skills
              </h3>
              <span className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(0,255,150,0.4), transparent)' }} />
            </div>

            <div className="flex flex-col gap-6">
              {SKILL_GROUPS.map((group) => (
                <div key={group.label} className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6">
                  <span
                    className="text-xs sm:text-sm font-bold uppercase tracking-widest sm:w-44 sm:shrink-0 sm:text-right px-3 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0 self-start"
                    style={{ color: group.color, background: `${group.color}15` }}
                  >
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => <SkillTag key={item} label={item} color={group.color} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Education timeline */}
        <FadeIn delay={0.18} className="w-full max-w-2xl">
          <div className="flex flex-col gap-0">
            {EDUCATION.map((edu, i) => (
              <div key={edu.title} className="flex gap-5 sm:gap-7 text-left py-5"
                style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(215,226,234,0.08)' }}>
                <span className="shrink-0 w-16 sm:w-20 text-xs sm:text-sm font-mono pt-1" style={{ color: '#00ff6480' }}>
                  {edu.year}
                </span>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm sm:text-base font-medium text-[#D7E2EA]">{edu.title}</h4>
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/50">{edu.place}</p>
                  
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.25}><ContactButton /></FadeIn>
      </div>
    </div>
  </section>
);

export default AboutSection;
