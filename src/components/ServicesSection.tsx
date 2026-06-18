import { useRef, useEffect, useState } from 'react';
import FadeIn from './FadeIn';

const CERTIFICATIONS = [
  {  number: '01', title: 'IBM – Getting Started with Node.js', description: 'IBM-certified course covering Node.js fundamentals, server-side JavaScript, asynchronous programming, and building scalable backend applications.', tag: 'Backend', color: '#0f62fe' },
  {  number: '02', title: 'Web Application Development Using React', description: 'Completed hands-on certification covering React fundamentals, component architecture, hooks, and building production-ready web applications.', tag: 'Frontend', color: '#00c8ff' },
  { number: '03', title: 'NPTEL – Problem Solving Through Programming in C', description: 'IIT Kharagpur certified course on algorithmic thinking, structured programming, and solving computational problems using C.', tag: 'IIT Kharagpur', color: '#00ff64' },
  { number: '04', title: 'Blockchain and Ethereum Fundamentals – KBA', description: 'Gained foundational understanding of blockchain technology, decentralised applications, and Ethereum smart contract concepts.', tag: 'Web3', color: '#b46fff' },
  { number: '05', title: 'GenAI Workshop – ACM Student Chapter FISAT', description: 'Explored generative AI fundamentals, large language models, prompt engineering, and practical GenAI application use cases.', tag: 'AI/ML', color: '#ff9d00' },
  { number: '06', title: 'Horizon.Hack() Hackathon & Ideathon – FISAT', description: 'Participated in competitive hackathon and ideathon events at FISAT, pitching and prototyping innovative tech solutions under time pressure.', tag: 'Hackathon', color: '#ff4f7b' },
];

const CertRow = ({ cert, i }: { cert: typeof CERTIFICATIONS[0]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-row items-start gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12 cursor-default transition-all duration-500"
      style={{
        borderTop: `1px solid ${hovered ? cert.color + '40' : 'rgba(12,12,12,0.15)'}`,
        ...(i === CERTIFICATIONS.length - 1 ? { borderBottom: `1px solid ${hovered ? cert.color + '40' : 'rgba(12,12,12,0.15)'}` } : {}),
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-30px)',
        transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s, border-color 0.3s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Number */}
      <div className="shrink-0 font-black leading-none transition-all duration-300"
        style={{ fontSize: 'clamp(3rem, 10vw, 140px)', color: hovered ? cert.color : '#0C0C0C' }}>
        {cert.number}
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-3 md:pt-4 flex-1">
        {/* Tag badge */}
        <span className="inline-flex w-fit rounded-full px-3 py-0.5 text-[10px] font-mono uppercase tracking-widest transition-all duration-300"
          style={{ border: `1px solid ${cert.color}40`, color: cert.color, background: `${cert.color}10` }}>
          {cert.tag}
        </span>

        <h3 className="font-medium uppercase leading-tight relative inline-block w-fit transition-colors duration-300"
          style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)', color: hovered ? cert.color : '#0C0C0C' }}>
          {cert.title}
          <span className="absolute left-0 -bottom-1 h-px transition-all duration-500"
            style={{ width: hovered ? '100%' : '0%', background: cert.color }} />
        </h3>

        <p className="font-light leading-relaxed text-[#0C0C0C]/60 max-w-2xl"
          style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>
          {cert.description}
        </p>
      </div>
    </div>
  );
};

const ServicesSection = () => (
  <section id="certifications" className="relative w-full bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
    <FadeIn y={40}>
      <h2 className="text-center font-black uppercase text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28 leading-none"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
        Certifications
      </h2>
    </FadeIn>
    <div className="mx-auto max-w-5xl">
      {CERTIFICATIONS.map((cert, i) => <CertRow key={cert.number} cert={cert} i={i} />)}
    </div>
  </section>
);

export default ServicesSection;
