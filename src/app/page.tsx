'use client';

import { useState, useEffect } from 'react';
import { PortfolioContent, defaultContent } from '@/lib/content';

const iconStyles = [
  { bg: 'bg-amber-600/10', text: 'text-amber-400' },
  { bg: 'bg-violet-600/10', text: 'text-orange-400' },
  { bg: 'bg-cyan-600/10', text: 'text-rose-400' },
  { bg: 'bg-emerald-600/10', text: 'text-violet-400' },
  { bg: 'bg-amber-600/10', text: 'text-amber-400' },
  { bg: 'bg-rose-600/10', text: 'text-rose-400' },
];

const navColors = [
  { active: 'text-amber-400', hover: 'hover:text-amber-400', underline: 'bg-amber-500' },
  { active: 'text-orange-400', hover: 'hover:text-orange-400', underline: 'bg-orange-500' },
  { active: 'text-rose-400', hover: 'hover:text-rose-400', underline: 'bg-rose-500' },
  { active: 'text-violet-400', hover: 'hover:text-violet-400', underline: 'bg-violet-500' },
  { active: 'text-amber-400', hover: 'hover:text-amber-400', underline: 'bg-amber-500' },
];

const statStyles = [
  { bg: 'bg-amber-500/15', text: 'text-amber-400', icon: 'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-13v5l3 3' },
  { bg: 'bg-orange-500/15', text: 'text-orange-400', icon: 'M16 18l6-6-6-6M8 6l-6 6 6 6' },
  { bg: 'bg-rose-500/15', text: 'text-rose-400', icon: 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { bg: 'bg-violet-500/15', text: 'text-violet-400', icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' },
];

function StatIcon({ d, colorClass = 'text-amber-400' }: { d: string; colorClass?: string }) {
  return (
    <svg viewBox={'0 0 24 24'} fill={'none'} stroke={'currentColor'} strokeWidth={'1.8'} strokeLinecap={'round'} strokeLinejoin={'round'} className={'w-5 h-5 ' + colorClass}>
      <path d={d} />
    </svg>
  );
}

function SkillIcon({ colorClass = 'text-amber-400' }: { colorClass?: string }) {
  return (
    <svg viewBox={'0 0 24 24'} fill={'none'} stroke={'currentColor'} strokeWidth={'1.5'} strokeLinecap={'round'} strokeLinejoin={'round'} className={'w-6 h-6 ' + colorClass}>
      <path d={'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'} />
    </svg>
  );
}

export default function Home() {
  const [content, setContent] = useState<PortfolioContent>(defaultContent);
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [logoOpen, setLogoOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: PortfolioContent) => {
        if (data?.hero) setContent(data);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    const listeners: { el: Element; handler: (e: Event) => void }[] = [];
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      const handler = (e: Event) => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          const target = document.getElementById(href.slice(1));
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };
      anchor.addEventListener('click', handler);
      listeners.push({ el: anchor, handler });
    });

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('in'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        const best = intersecting.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
        setActiveSection(best.target.id);
      },
      { threshold: 0, rootMargin: '-45% 0px -45% 0px' }
    );
    document.querySelectorAll('section[id]').forEach((el) => sectionObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      listeners.forEach(({ el, handler }) => el.removeEventListener('click', handler));
    };
  }, [loaded]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      if (res.ok) {
        setContactStatus('sent');
        setContactForm({ name: '', email: '', message: '' });
      } else {
        setContactStatus('error');
      }
    } catch {
      setContactStatus('error');
    }
  };

  const { hero, about, skills, experience, projects, contact } = content;
  const settings = content.settings || {};
  const showHero = settings.showHero !== false;
  const showSkills = settings.showSkills !== false;
  const showExperience = settings.showExperience !== false;
  const showProjects = settings.showProjects !== false;
  const showContact = settings.showContact !== false;
  const nameParts = hero.name.split(' ').filter(Boolean);
  const displayName = hero.name;
  const initials = nameParts.length > 1 ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}` : 'AS';
  const paragraphs = about.content.split('\n\n');
  const navItems = [
    { id: 'about', label: 'About', show: showHero },
    { id: 'skills', label: 'Skills', show: showSkills },
    { id: 'experience', label: 'Experience', show: showExperience },
    { id: 'projects', label: 'Projects', show: showProjects },
    { id: 'contact', label: 'Contact', show: showContact },
  ].filter((item) => item.show);

  const heroSettings = settings.hero || {};
  const showName = heroSettings.showName !== false;
  const showHeadline = heroSettings.showHeadline !== false;
  const showTitle = heroSettings.showTitle !== false;
  const showContentBox = heroSettings.showContent !== false;
  const showStatistics = heroSettings.showStatistics !== false;
  const showHeroLogo = heroSettings.showLogo !== false;
  const showHeroButtons = heroSettings.showButtons !== false;
  const showCategories = settings.skills?.showCategories || skills.categories.map(() => true);
  const showProjectItems = settings.projects?.showItems || projects.map(() => true);
  const experienceList = Array.isArray(experience) ? experience : [experience];
  const showExpItems = settings.experience?.showItems || experienceList.map(() => true);
  const contactSettings = settings.contact || {};
  const showEmail = contactSettings.showEmail !== false;
  const showLocation = contactSettings.showLocation !== false;
  const showGithub = contactSettings.showGithub !== false;
  const showLinkedin = contactSettings.showLinkedin !== false;

  return (
    <main className={'min-h-screen bg-transparent text-slate-50'}>
      <header className={'fixed top-0 inset-x-0 z-50 bg-[#12090C]/85 backdrop-blur-sm border-b border-white/10 shadow-lg shadow-black/30'}>
        <div className={'absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500'} />
        <div className={'container-p relative'}>
          <nav className={'flex items-center justify-between h-20'}>
            <a
              href={hero.logo && showHeroLogo ? hero.logo : '#'}
              onClick={(e) => { if (hero.logo && showHeroLogo) { e.preventDefault(); setLogoOpen(true); } }}
              className={'flex items-center gap-2.5 group'}
            >
              {showHeroLogo && (
                hero.logo ? (
                  <img src={hero.logo} alt={displayName} className={'h-12 w-12 rounded-full object-cover ring-2 ring-amber-500/40 group-hover:scale-105 transition-transform'} />
                ) : (
                  <span className={'flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white font-bold text-base group-hover:scale-105 transition-transform shadow-lg shadow-amber-500/20'}>{initials}</span>
                )
              )}
              {showName && (
                <span className={'font-bold text-xl tracking-tight text-gradient-primary'}>{displayName}</span>
              )}
            </a>
            <div className={'hidden md:flex items-center gap-8'}>
              <ul className={'flex items-center gap-8 text-sm font-medium'}>
                {navItems.map((item, idx) => {
                  const accent = navColors[idx];
                  return (
                    <li key={item.id}>
                      <a href={'#' + item.id} className={'group relative py-1 transition-colors ' + (activeSection === item.id ? accent.active : 'text-slate-400 ' + accent.hover)}>
                        {item.label}
                        <span className={'absolute -bottom-1 left-0 right-0 h-0.5 ' + accent.underline + ' rounded-full origin-left transition-transform duration-300 ' + (activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100')} />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <a href={'/admin/login'} target={'_blank'} rel={'noopener noreferrer'} className={'btn-shine px-4 py-1.5 rounded-full btn-gradient text-sm font-medium text-white hover:brightness-110 transition'}>Admin</a>
            </div>
            <div className={'flex md:hidden items-center gap-3'}>
              <a href={'/admin/login'} target={'_blank'} rel={'noopener noreferrer'} className={'btn-shine px-4 py-1.5 rounded-full btn-gradient text-sm font-medium text-white hover:brightness-110 transition'}>Admin</a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={'text-slate-200 text-2xl leading-none'}
                aria-label="Menu"
              >
                {mobileMenuOpen ? '×' : '≡'}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className={'md:hidden fixed top-20 inset-x-0 z-40 bg-[#12090C]/90 backdrop-blur-sm border-b border-white/10 p-4'}>
          <ul className={'flex flex-col gap-4 text-sm font-medium'}>
            {navItems.map((item, idx) => {
              const accent = navColors[idx];
              return (
                <li key={item.id}>
                  <a href={'#' + item.id} onClick={() => setMobileMenuOpen(false)} className={'block transition-colors ' + (activeSection === item.id ? accent.active : 'text-slate-400 ' + accent.hover)}>
                    {item.label}
                    {activeSection === item.id && <span className={'inline-block w-6 h-0.5 ' + accent.underline + ' rounded-full ml-2 align-middle'} />}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {logoOpen && hero.logo && (
        <div
          className={'fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6'}
          onClick={() => setLogoOpen(false)}
        >
          <img
            src={hero.logo}
            alt={displayName}
            className={'max-w-[90vw] max-h-[90vh] rounded-lg'}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLogoOpen(false)}
            className={'absolute top-6 right-6 text-white text-2xl font-bold hover:text-amber-400 transition'}
          >
            ×
          </button>
        </div>
      )}

      {showHero && (
      <section id={'about'} className={'pt-28 pb-20 md:pt-40 md:pb-32 hero-glow'}>
        <div className={'container-p'}>
          <div className={'reveal'}>
            {hero.headline && showHeadline && (
              <h1 className={'heading-accent text-3xl md:text-3xl font-extrabold leading-tight mb-5 text-gradient-primary'}>
                {hero.headline}
              </h1>
            )}
            {showTitle && (
              <p className={'inline-block max-w-full break-words px-4 py-2 rounded-lg bg-[#16233A]/80 border border-slate-700 text-sm font-semibold text-amber-300 mb-6'}>{hero.title}</p>
            )}
            <div className={'flex flex-col lg:flex-row gap-6 mb-8'}>
              {showContentBox && (
                <div className={'flex-1 rounded-2xl p-[1px] bg-gradient-to-br from-amber-500/50 via-orange-500/30 to-rose-500/50 shadow-lg shadow-amber-500/10'}>
                  <div className={'rounded-2xl p-6 pr-3 bg-[#0D1526]/95 backdrop-blur-sm h-full'}>
                    <div className={'space-y-4 text-lg text-slate-300 leading-relaxed max-h-[26rem] overflow-y-auto pr-2 thin-scrollbar'}>
                      {paragraphs.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {showStatistics && (
                <div className={'lg:w-72 grid grid-cols-1 gap-3 w-full'}>
                  {[
                    { label: 'Experience', value: about.statistics.years },
                    { label: 'Projects shipped', value: about.statistics.projects },
                    { label: 'Stack surface area', value: about.statistics.technologies },
                    { label: 'Client satisfaction', value: about.statistics.satisfaction },
                  ].map((stat, idx) => {
                    const accent = statStyles[idx % statStyles.length];
                    return (
                      <div key={idx} className={'card-shine bg-[#111B2E] border border-slate-800 rounded-xl p-4 flex items-center gap-4 min-h-[60px] hover:bg-[#16233A] hover:border-slate-600 transition'}>
                        <div className={'w-11 h-11 rounded-lg ' + accent.bg + ' flex items-center justify-center shrink-0'}>
                          <StatIcon d={accent.icon} colorClass={accent.text} />
                        </div>
                        <div>
                          <p className={'text-sm text-slate-400'}>{stat.label}</p>
                          <p className={'text-2xl font-bold text-gradient-primary'}>{stat.label === 'Experience' ? `${stat.value} Years` : stat.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {showHeroButtons && (
              <div className={'flex flex-wrap gap-4 mb-10'}>
                <a href={'#projects'} className={'btn-shine inline-flex items-center px-6 py-3 rounded-lg btn-gradient text-white font-medium hover:brightness-110 transition'}>View projects</a>
                <a href={'#contact'} className={'btn-shine inline-flex items-center px-6 py-3 rounded-lg border border-orange-500/50 text-violet-300 font-medium hover:border-orange-400 hover:text-white transition'}>Get in touch</a>
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {showSkills && (
      <section id={'skills'} className={'py-20 md:py-28 border-t border-slate-800'}>
        <div className={'container-p'}>
          <div className={'max-w-2xl mb-12 reveal'}>
            <h2 className={'heading-accent text-3xl md:text-4xl font-bold mb-8'}>TECHNICAL SKILLS</h2>
            <p className={'text-lg text-slate-300 font-medium leading-relaxed'}>Technologies I use to build reliable, scalable solutions.</p>
          </div>
          <div className={'grid md:grid-cols-2 lg:grid-cols-3 border border-slate-800 rounded-2xl overflow-hidden reveal'}>
            {skills.categories
              .map((category, idx) => ({ category, idx, show: showCategories[idx] !== false }))
              .filter((item) => item.show)
              .map(({ category, idx }) => {
                const iconStyle = iconStyles[idx % iconStyles.length];
                return (
                <div key={idx} className={'card-accent card-shine group bg-[#111B2E] p-6 border-b border-r border-slate-800 last:border-r-0 hover:bg-[#16233A] hover:border-amber-500/30 transition-all duration-300'}>
                  <div className={'flex items-center gap-3 mb-4'}>
                    <div className={'w-12 h-12 rounded-xl ' + iconStyle.bg + ' flex items-center justify-center'}>
                      <SkillIcon colorClass={iconStyle.text} />
                    </div>
                    <h3 className={'text-lg font-semibold group-hover:text-amber-300 transition-colors'}>{category.title}</h3>
                  </div>
                  <div className={'flex flex-wrap gap-2'}>
                    {category.skills.map((skill, sIdx) => (
                      <span key={sIdx} className={'text-xs px-3 py-1.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 group-hover:border-amber-500/40 group-hover:text-amber-300 transition-colors'}>{skill}</span>
                    ))}
                  </div>
                </div>
                );
              })}
          </div>
        </div>
      </section>
      )}

      {showExperience && (
      <section id={'experience'} className={'py-20 md:py-28 border-t border-slate-800'}>
        <div className={'container-p'}>
          <h2 className={'heading-accent text-3xl md:text-4xl font-bold mb-8 reveal'}>Where I&apos;ve worked</h2>
          <div className={'relative reveal'}>
            <div className={'absolute left-5 top-2 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/60 via-orange-500/40 to-slate-800'} />
            <div className={'space-y-10'}>
              {experienceList
                .map((job, idx) => ({ job, idx, show: showExpItems[idx] !== false }))
                .filter((item) => item.show)
                .map(({ job, idx }) => (
                  <div key={idx} className={'relative pl-14'}>
                    <span className={'absolute left-0 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center ring-4 ring-[#12090C] shadow-lg shadow-amber-500/30'}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={'w-5 h-5 text-white'}>
                        <rect x="2" y="7" width="20" height="14" rx="2" />
                        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                      </svg>
                    </span>
                    <div className={'flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4'}>
                      <div>
                        <h3 className={'text-xl font-semibold'}>{job.position}, {job.company}</h3>
                        <p className={'text-amber-400 text-sm mt-1'}>{job.project}</p>
                      </div>
                      <span className={'text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-violet-500/15 text-emerald-300 border border-violet-500/30 shrink-0'}>{job.period || 'Present'}</span>
                    </div>
                    {job.description.filter(line => line.trim()).length > 0 && (
                      <ul className={'space-y-3 mb-6'}>
                        {job.description.filter(line => line.trim()).map((item, i) => (
                          <li key={i} className={'flex items-start gap-3 text-slate-400'}>
                            <span className={'text-amber-500 mt-1'}>{'>'}</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {job.technologies.filter(t => t.trim()).length > 0 && (
                      <div className={'flex flex-wrap gap-2'}>
                        {job.technologies.filter(t => t.trim()).map((tech, i) => (
                          <span key={i} className={'text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700'}>{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {showProjects && (
      <section id={'projects'} className={'py-20 md:py-28 border-t border-slate-800'}>
        <div className={'container-p'}>
          <h2 className={'heading-accent text-3xl md:text-4xl font-bold mb-8 reveal'}>Featured Projects</h2>
          <div className={'grid md:grid-cols-2 gap-6 reveal'}>
            {projects
              .map((project, idx) => ({ project, idx, show: showProjectItems[idx] !== false }))
              .filter((item) => item.show)
              .map(({ project, idx }) => (
              <div key={idx} className={'card-accent card-shine group bg-[#111B2E] border border-amber-500/30 shadow-[0_0_18px_-6px_rgba(249,115,22,0.18)] rounded-2xl p-6 hover:border-amber-500/70 hover:shadow-[0_0_35px_-3px_rgba(249,115,22,0.35)] hover:-translate-y-1 transition-all duration-300'}>
                <h3 className={'text-xl font-semibold mb-3 group-hover:text-amber-300 transition-colors'}>{project.title}</h3>
                <p className={'text-base text-slate-300 mb-5 leading-relaxed group-hover:text-slate-200 transition-colors'}>{project.description}</p>
                <ul className={'space-y-3 mb-6'}>
                  {project.features.filter(line => line.trim()).map((feature, i) => (
                    <li key={i} className={'flex items-start gap-3 text-sm text-slate-300 group-hover:text-slate-200 transition-colors'}>
                      <span className={'text-amber-400 mt-0.5 group-hover:text-amber-300 transition-colors'}>{'›'}</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className={'flex flex-wrap gap-2'}>
                  {project.technologies.map((tech, i) => (
                    <span key={i} className={'text-xs px-3 py-1.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 group-hover:border-amber-500/40 group-hover:text-amber-300 transition-colors'}>{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {showContact && (
      <section id={'contact'} className={'py-20 md:py-28 border-t border-slate-800'}>
        <div className={'container-p'}>
          <div className={'max-w-2xl mb-12 reveal'}>
            <h2 className={'heading-accent text-3xl md:text-4xl font-bold mb-8'}>Get In Touch</h2>
          </div>
          <div className={'grid lg:grid-cols-2 gap-10 items-start'}>
            <div className={'grid gap-4 reveal'}>
              <div className={'flex flex-wrap gap-3'}>
                {showGithub && (
                  <a href={contact.github} target={'_blank'} rel={'noopener noreferrer'} aria-label={'GitHub'} className={'card-shine inline-flex items-center justify-center px-8 py-3 rounded-xl bg-[#111B2E]/80 border border-orange-500/30 text-orange-300 font-medium hover:border-orange-500/60 hover:text-orange-200 hover:bg-[#16233A] transition-all duration-300'}>GitHub</a>
                )}
                {showLinkedin && (
                  <a href={contact.linkedin} target={'_blank'} rel={'noopener noreferrer'} aria-label={'LinkedIn'} className={'card-shine inline-flex items-center justify-center px-8 py-3 rounded-xl bg-[#111B2E]/80 border border-rose-500/30 text-rose-300 font-medium hover:border-rose-500/60 hover:text-rose-200 hover:bg-[#16233A] transition-all duration-300'}>LinkedIn</a>
                )}
              </div>
              {showLocation && (
                <div className={'card-accent card-shine bg-[#111B2E] border border-slate-800 rounded-xl p-5'}>
                  <p className={'text-xs uppercase tracking-wide text-violet-400 mb-1'}>Location</p>
                  <p className={'text-sm font-medium text-slate-200 truncate'}>{contact.location}</p>
                </div>
              )}
            </div>
            <div className={'w-full reveal'}>
              <form onSubmit={handleContactSubmit} className={'card-accent card-shine bg-gradient-to-b from-[#1A1015] to-[#111B2E] border border-amber-500/20 rounded-2xl p-6 md:p-8 space-y-5 shadow-[0_0_30px_-10px_rgba(249,115,22,0.25)]'}>
                <div>
                  <h3 className={'text-xl font-semibold text-gradient-primary'}>Send a message to</h3>
                  {showEmail && <p className={'text-sm text-amber-400/80 mt-1'}>{contact.email}</p>}
                </div>
                <div className={'grid sm:grid-cols-2 gap-5'}>
                  <div>
                    <label className={'block text-sm font-medium text-amber-300/90 mb-2'}>Your Name</label>
                    <input
                      type={'text'}
                      required
                      placeholder={'Your Name'}
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className={'w-full px-4 py-3 bg-[#0D1526]/60 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/30 outline-none transition'}
                    />
                  </div>
                  <div>
                    <label className={'block text-sm font-medium text-amber-300/90 mb-2'}>Your Email</label>
                    <input
                      type={'email'}
                      required
                      placeholder={'Your Email'}
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className={'w-full px-4 py-3 bg-[#0D1526]/60 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/30 outline-none transition'}
                    />
                  </div>
                </div>
                <div>
                  <label className={'block text-sm font-medium text-amber-300/90 mb-2'}>Your Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder={'Your Message'}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className={'w-full px-4 py-3 bg-[#0D1526]/60 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/30 outline-none transition'}
                  />
                </div>
                <button
                  type={'submit'}
                  disabled={contactStatus === 'sending'}
                  className={'w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-semibold hover:shadow-[0_0_25px_-5px_rgba(249,115,22,0.5)] disabled:opacity-60 transition-all duration-300'}
                >
                  {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                {contactStatus === 'sent' && <p className={'text-sm text-emerald-400'}>Message sent successfully!</p>}
                {contactStatus === 'error' && <p className={'text-sm text-red-400'}>Failed to send. Please try again.</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
      )}

      <footer className={'py-8 border-t border-slate-800'}>
        <div className={'container-p flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500'}>
          <p>© {new Date().getFullYear()} {hero.name}. All rights reserved.</p>
          <p>Let&apos;s build something great</p>
        </div>
      </footer>
    </main>
  );
}
