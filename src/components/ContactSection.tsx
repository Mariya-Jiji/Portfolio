import { Mail, MessageCircle, Linkedin, Github, ArrowUpRight, Code } from 'lucide-react';
import FadeIn from './FadeIn';

interface ContactMethod {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mariyajiji19082004@gmail.com',
    href: 'mailto:mariyajiji19082004@gmail.com',
  },
  {
    icon: MessageCircle,
    label: 'Phone',
    value: '+91 88485 84789',
    href: 'tel:+918848584789',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'in/mariya-jiji-8b6939408',
    href: 'https://www.linkedin.com/in/mariya-jiji-8b6939408',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@Mariya-Jiji',
    href: 'https://github.com/Mariya-Jiji',
  },
  {
    icon: Code,
    label: 'LeetCode',
    value: 'Mariya_Jiji',
    href: 'https://leetcode.com/u/Mariya_Jiji/',
  },
  {
    icon: Code,
    label: 'HackerRank',
    value: 'FIT23CSD040',
    href: 'https://www.hackerrank.com/profile/FIT23CSD040',
  },
];

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20"
    >
      {/* Heading */}
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Get in touch
        </h2>
      </FadeIn>


      {/* Contact cards */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {CONTACT_METHODS.map((method, i) => {
          const Icon = method.icon;
          const isExternal = method.href.startsWith('http');

          return (
            <FadeIn key={method.label} delay={i * 0.1} y={30}>
              <a
                href={method.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="group relative flex h-full flex-col justify-between gap-8 sm:gap-10 rounded-[28px] sm:rounded-[32px] border-2 border-[#D7E2EA]/20 bg-[#141418] p-6 sm:p-7 md:p-8 transition-all duration-300 hover:border-[#D7E2EA]/60 hover:bg-[#1a1a20] hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-full border border-[#D7E2EA]/20 p-3 sm:p-3.5 transition-colors duration-300 group-hover:border-[#D7E2EA]/50">
                    <Icon className="text-[#D7E2EA]" size={22} strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight
                    className="text-[#D7E2EA]/40 transition-all duration-300 group-hover:text-[#D7E2EA] group-hover:rotate-12"
                    size={22}
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-3">
                  <span
                    className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
                    style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
                  >
                    {method.label}
                  </span>
                  <span
                    className="font-medium text-[#D7E2EA] break-all"
                    style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)' }}
                  >
                    {method.value}
                  </span>
                </div>
              </a>
            </FadeIn>
          );
        })}
      </div>

      {/* Footer line */}
      <FadeIn delay={0.4} y={20}>
        <div className="mx-auto mt-20 sm:mt-24 md:mt-28 flex max-w-5xl flex-col items-center gap-3 border-t border-[#D7E2EA]/10 pt-8 text-center sm:flex-row sm:justify-between">
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
          >
            © 2026 Mariya Jiji
          </span>
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
          >
            Built with passion · FISAT, Angamaly
          </span>
        </div>
      </FadeIn>
    </section>
  );
};

export default ContactSection;
