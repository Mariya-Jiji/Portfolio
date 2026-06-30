import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';

interface ProjectData {
  number: string; category: string; name: string; liveUrl: string;
  col1Image1: string; col1Image2: string; col2Image: string;
  description: string; tech: string[]; accentColor: string;
}

const PROJECTS: ProjectData[] = [
  {
    number: '01', category: 'Full Stack · Team Project', name: 'HomeEase App',
    liveUrl: 'https://client-pearl-nine.vercel.app/',
    col1Image1: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    col1Image2: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    col2Image:  'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
    description: 'A service platform connecting users with verified local service providers like electricians and plumbers, featuring real-time provider tracking, JWT authentication, and intelligent provider sorting.',
    tech: ['JavaScript', 'Node.js', 'MongoDB', 'HTML/CSS', 'JWT'],
    accentColor: '#00ff64',
  },
  {
    number: '02', category: 'Full Stack · Internship Project', name: 'GraphOne',
    liveUrl: 'https://graph-one-livid.vercel.app/',
    col1Image1: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    col1Image2: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    col2Image:  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    description: 'A startup intelligence platform for discovering AI companies, founders, and investors — featuring trending company rankings, growth tracking, funding data, and category-based exploration across 50,000+ companies.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'Supabase'],
    accentColor: '#00c8ff',
  },
  {
    number: '03', category: 'Full Stack · Internship Challenge', name: 'Whereto.edu',
    liveUrl: 'https://whereto-edu.vercel.app/',
    col1Image1: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    col1Image2: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    col2Image:  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80',
    description: 'A college discovery platform helping students search, compare, and shortlist 35+ premier Indian colleges with filters for location, fees, and ratings, plus a side-by-side compare feature.',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth'],
    accentColor: '#b46fff',
  },
];

const ProjectCard = ({ project, index, total }: { project: ProjectData; index: number; total: number; containerRef: React.RefObject<HTMLDivElement> }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'start start'] });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={cardRef} className="sticky w-full" style={{ top: `${96 + index * 28}px`, height: '85vh' }}>
      <motion.article
  style={{
    scale,
    border: `2px solid ${hovered ? project.accentColor + '60' : 'rgba(215,226,234,0.3)'}`,
    background: '#0C0C0C',
    boxShadow: hovered ? `0 0 60px ${project.accentColor}15, inset 0 0 60px ${project.accentColor}05` : 'none',
    transition: 'border-color 0.4s, box-shadow 0.4s',
  }}
  className="origin-top mx-auto h-full w-full flex flex-col gap-4 sm:gap-6 md:gap-8 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-4 sm:p-6 md:p-8 transition-all duration-500"
  onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
  onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
>
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex flex-row items-start gap-3 sm:gap-6 md:gap-10 min-w-0 w-full">
            <div className="shrink-0 font-black leading-none transition-all duration-400"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 140px)', color: hovered ? project.accentColor : '#D7E2EA' }}>
              {project.number}
            </div>
            <div className="flex flex-col gap-1 sm:gap-3 pt-1 sm:pt-3 md:pt-4 min-w-0 flex-1">
              <span className="font-light uppercase tracking-widest text-[#D7E2EA]/60" style={{ fontSize: 'clamp(0.65rem, 1.2vw, 1rem)' }}>
                {project.category}
              </span>
              <h3 className="font-medium uppercase leading-tight transition-colors duration-300"
                style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)', color: hovered ? project.accentColor : '#D7E2EA' }}>
                {project.name}
              </h3>
              <p className="text-[#D7E2EA]/60 font-light leading-relaxed max-w-lg mt-1" style={{ fontSize: 'clamp(0.75rem, 1.3vw, 1rem)' }}>
                {project.description}
              </p>
              {/* Tech tags with neon glow on hover */}
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech.map((t) => (
                  <span key={t} className="rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300"
                    style={{
                      border: `1px solid ${hovered ? project.accentColor + '60' : 'rgba(215,226,234,0.2)'}`,
                      color: hovered ? project.accentColor : 'rgba(215,226,234,0.6)',
                      background: hovered ? `${project.accentColor}10` : 'transparent',
                    }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="shrink-0 self-start sm:self-auto pt-1 sm:pt-2 md:pt-3 w-full sm:w-auto">
            <LiveProjectButton href={project.liveUrl} className="w-full sm:w-auto" />
          </div>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-[40%_60%] gap-3 sm:gap-4 md:gap-5 flex-1 min-h-0">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 min-h-0">
            <div className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-all duration-500"
              style={{ height: 'clamp(130px, 16vw, 230px)', boxShadow: hovered ? `0 8px 30px ${project.accentColor}20` : 'none' }}>
              <img src={project.col1Image1} alt="" className="h-full w-full object-cover transition-transform duration-700" style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }} loading="lazy" draggable={false} />
            </div>
            <div className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-all duration-500"
              style={{ height: 'clamp(160px, 22vw, 340px)', boxShadow: hovered ? `0 8px 30px ${project.accentColor}20` : 'none' }}>
              <img src={project.col1Image2} alt="" className="h-full w-full object-cover transition-transform duration-700" style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }} loading="lazy" draggable={false} />
            </div>
          </div>
          <div className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] min-h-0 transition-all duration-500"
            style={{ boxShadow: hovered ? `0 8px 30px ${project.accentColor}20` : 'none' }}>
            <img src={project.col2Image} alt="" className="h-full w-full object-cover transition-transform duration-700" style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }} loading="lazy" draggable={false} />
          </div>
        </div>
      </motion.article>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <section id="projects" className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24">
      <FadeIn y={40}>
        <h2 className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          Projects
        </h2>
      </FadeIn>
      <div ref={containerRef} className="mx-auto max-w-7xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} total={PROJECTS.length} containerRef={containerRef} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
