import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Github, Linkedin, Mail, Code2, FileDown } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Achievements', href: '#certifications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const TAGLINES = [
  'Full Stack Developer',
  'CSD @ FISAT',
  'Problem Solver',
  'Java · React · Node.js',
];

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/Mariya-Jiji', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/mariya-jiji-8b6939408', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:mariyajiji19082004@gmail.com', label: 'Email' },
  
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [muted, setMuted] = useState(false);
  const [stopAfterRound, setStopAfterRound] = useState(false);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        video.muted = true;
        setMuted(true);
        video.play().catch(() => {});
      });
    }
  }, []);

  // Particle network canvas — kept subtle, drawn only at the edges so it never dims the video
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.3 + 0.4,
        a: Math.random() * 0.5 + 0.15,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,150,${p.a * 0.45})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,255,150,${0.05 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  // Typewriter tagline
  useEffect(() => {
    const target = TAGLINES[taglineIndex];
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
        return () => clearTimeout(t);
      } else {
        setTaglineIndex((i) => (i + 1) % TAGLINES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, taglineIndex]);

  // Snap-scroll on first scroll/key
  useEffect(() => {
    let fired = false;
    const goToAbout = () => { if (fired) return; fired = true; setStopAfterRound(true); document.getElementById('about')?.scrollIntoView({ behavior: 'auto', block: 'start' }); };
    const onWheel = (e: WheelEvent) => { if (fired || e.deltaY <= 0 || window.scrollY > 50) return; e.preventDefault(); goToAbout(); };
    const onKey = (e: KeyboardEvent) => { if (fired || window.scrollY > 50) return; if (['ArrowDown','PageDown',' '].includes(e.key)) { e.preventDefault(); goToAbout(); } };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onKey); };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onEnded = () => {
      if (stopAfterRound) {
        video.pause();
        video.currentTime = Math.min(0.4, video.duration);
      }
    };

    video.addEventListener('ended', onEnded);
    return () => video.removeEventListener('ended', onEnded);
  }, [stopAfterRound]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setStopAfterRound(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#060810]">
      {/* Background video — full native brightness/contrast, no dark overlay on top of it */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* Subtle particle network — transparent canvas, doesn't darken the video */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Content layer — all text rendered at full opacity immediately, no fade/delay animation */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Nav */}
        <div className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
          <ul className="flex items-center gap-4 sm:gap-6 md:gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}
                  className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white transition hover:text-[#00ff96]"
                  style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.9)' }}
                >{link.label}</a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a href="/Mariya_Jiji.pdf" download
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:scale-[1.03]"
              style={{ borderColor: 'rgba(0,255,150,0.4)', background: 'rgba(0,255,150,0.12)' }}
            >
              <FileDown size={14} /> Resume
            </a>
            <a href="mailto:mariyajiji19082004@gmail.com"
              className="inline-flex items-center rounded-full border px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:scale-[1.03]"
              style={{ borderColor: 'rgba(0,255,150,0.4)', background: 'rgba(0,255,150,0.12)' }}
            >Email me</a>
          </div>
        </div>

        {/* Name + Tagline */}
        <div className="flex flex-1 items-center">
          <div className="w-full max-w-7xl px-6 md:px-10">
            <p className="mb-3 inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em]"
              style={{ color: '#00ff96', textShadow: '0 1px 10px rgba(0,0,0,0.95)' }}>
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: '#00ff96', boxShadow: '0 0 8px #00ff96', animation: 'pulse 1.6s ease-in-out infinite' }} />
              Open to opportunities · 2026
            </p>

            <h1 className="font-black uppercase leading-[0.88] tracking-tight"
              style={{
                fontSize: 'clamp(3rem, 12vw, 10.5rem)',
                color: 'white',
                textShadow: '0 2px 30px rgba(0,0,0,0.95), 0 0 4px rgba(0,0,0,0.9), 0 0 60px rgba(0,255,150,0.2)',
              }}>
              Mariya<br />Jiji
            </h1>

            <div className="mt-4 md:mt-6 flex items-center gap-2">
              <span className="text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.3em]"
                style={{ color: '#00ff96', textShadow: '0 1px 10px rgba(0,0,0,0.95)' }}>
                {displayed}
              </span>
              <span className="inline-block w-[2px] h-4 sm:h-5" style={{ background: '#00ff96', animation: 'blink 0.7s step-end infinite' }} />
            </div>

            {/* Social row */}
            <div className="mt-7 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md transition-all duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.35)', background: 'rgba(0,0,0,0.35)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#00ff96'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px rgba(0,255,150,0.4)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  <Icon size={17} color="white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-end justify-between px-6 md:px-10 pb-7 sm:pb-10 md:pb-12">
          <a href="#about" className="group flex flex-col items-center gap-3">
            <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-white transition group-hover:text-[#00ff96]"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}>Scroll</span>
            <div className="relative h-12 w-px overflow-hidden" style={{ background: 'rgba(255,255,255,0.3)' }}>
              <span className="absolute inset-x-0 top-0 h-1/2 w-full" style={{ background: '#00ff96', animation: 'scrollLine 1.8s ease-in-out infinite' }} />
            </div>
          </a>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/80" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}>
            FISAT · CSE · 2027
          </span>
        </div>
      </div>

      {/* Mute / unmute toggle */}
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="absolute bottom-6 right-6 z-20 flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-md transition-all duration-300"
        style={{ border: '1px solid rgba(255,255,255,0.35)', background: 'rgba(0,0,0,0.4)' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#00ff96'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px rgba(0,255,150,0.4)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
      >
        {muted ? <VolumeX size={18} color="white" /> : <Volume2 size={18} color="white" />}
      </button>

      <style>{`
        @keyframes scrollLine { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </section>
  );
};

export default HeroSection;
