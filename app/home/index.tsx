import HeroSection from "./HeroSection";

const techStack = [
  { icon: "code", label: "Next.js" },
  { icon: "integration_instructions", label: "TypeScript" },
  { icon: "dns", label: "NestJS" },
  { icon: "database", label: "PostgreSQL" },
];

const projects = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCkac1W32-2mz8_OOFbQh0SZWzuvpIT6c-cUiXgOl2OLe6BdGTj4pLbTurdtB6_DYrdKlgBGVWjqsq-PSqzLSJp5cIW2VsSEkWkAbCt4F8qeXRd3HnomUFZf1HcwwpC5CGMQhkTjP_rHQ-iO8FAWYmtxvNDj6nSf1zUxUUuERLpof08xUWEBFWPS_wqasVvWITO7Prt3V7IUmhE1ti9YxZqzq5Cw7YwVSCQcoVhK8BjdZXRpCEgdZc",
    tags: ["Next.js", "PostgreSQL"],
    title: "Fintech Analytics Dashboard",
    description:
      "A high-performance data visualization platform processing real-time market metrics with WebSocket integrations.",
    linkLabel: "View Case Study",
    linkIcon: "open_in_new",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAdx3ome3DpudC1p87DV2IZMyCA4MwL8nQ4_o6ZcPTplHRJibrCfMJnljF8UDwl7d1wEssUeRL5LrK5mBguNUIn2JmPw0C_RBsUD5W5v-JziPATmNPNCwgUKsCfdO5uE6hPjFoLXlsjxNymUBTlrQbJqFRM4EQcPpfAQLHyBFdzHAz3qEiLurcefcYL7OLHuqw1mmCXZV32g1l-nSZq92XZgT-GElSOu2hfQtKO0M5kipGXM0A2bY45",
    tags: ["React", "NestJS"],
    title: "Boutique Commerce Engine",
    description:
      "A headless e-commerce solution with custom inventory management and a globally distributed edge architecture.",
    linkLabel: "View Case Study",
    linkIcon: "open_in_new",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBljtQbk_2MNcSrR4yM1gDAfa1oyBKtJaTkf5DnDVXae5Quisg8-3nzk1fNCEJ6NCEJVqvK5vK9c0LNfQDLgzcazvWkKn8prLfnoN7uVXQ4KUrz-033o8rpqpTuKdUfDwHeUhb4EOYLJiQDxeY_9L4MrOEliEc6eCnmJT2g_5pXdkclAbUY24zHvHPrDzIlYdvbCwOg1r45UZTbV_O12gqmtz_7gN5kLGnYFjM8F31lxBnmFcmObCcZ",
    tags: ["Node.js", "Redis"],
    title: "Microservices Architecture",
    description:
      "A scalable backend system handling millions of requests daily, utilizing message queues and caching strategies.",
    linkLabel: "View Repository",
    linkIcon: "code",
  },
];

const experience = [
  {
    role: "Senior Full-Stack Engineer",
    period: "2021 — Present",
    company: "TechNova Solutions",
    description:
      "Leading architectural decisions for a SaaS platform. Mentoring junior developers and migrating legacy monolith to a microservices architecture using NestJS.",
    active: true,
  },
  {
    role: "Software Developer",
    period: "2018 — 2021",
    company: "Digital Frontier",
    description:
      "Developed and maintained client-facing web applications. Optimized database queries improving response times by 40%. Implemented CI/CD pipelines.",
    active: false,
  },
];

export default function Home() {
  return (
    <>
      {/* Top Nav Bar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl border-b border-white/10 shadow-sm transition-all duration-300 ease-in-out">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-20">
          <div className="font-headline-md text-headline-md font-bold text-on-surface">
            DevPortfolio
          </div>
          <div className="hidden md:flex gap-8">
            <a className="text-primary font-bold border-b-2 border-primary pb-1" href="#work">
              Work
            </a>
            <a
              className="text-on-surface-variant hover:text-on-surface transition-colors hover:bg-white/5 px-3 py-1 rounded"
              href="#experience"
            >
              Experience
            </a>
            <a
              className="text-on-surface-variant hover:text-on-surface transition-colors hover:bg-white/5 px-3 py-1 rounded"
              href="#skills"
            >
              Skills
            </a>
            <a
              className="text-on-surface-variant hover:text-on-surface transition-colors hover:bg-white/5 px-3 py-1 rounded"
              href="#contact"
            >
              Contact
            </a>
          </div>
          <button className="bg-[#6366F1] hover:bg-[#4f51d8] text-white px-6 py-2 rounded-full font-label-mono text-label-mono transition-colors">
            Hire Me
          </button>
        </div>
      </nav>

      <main className="pt-20">
        <HeroSection />

        {/* Tech Stack */}
        <section
          className="py-32 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest"
          id="skills"
        >
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
                Core Technologies
              </h2>
              <p className="text-on-surface-variant">The foundation of my digital craftsmanship.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {techStack.map((tech) => (
                <div
                  key={tech.label}
                  className="glass-card p-8 rounded-xl flex flex-col items-center justify-center gap-4 group cursor-default text-center"
                >
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary transition-colors">
                    {tech.icon}
                  </span>
                  <h3 className="font-label-mono text-label-mono text-on-surface">{tech.label}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-32 px-margin-mobile md:px-margin-desktop" id="work">
          <div className="max-w-container-max mx-auto">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
                  Selected Work
                </h2>
                <p className="text-on-surface-variant">
                  Recent projects highlighting technical depth and user experience.
                </p>
              </div>
              <a
                className="text-primary hover:text-primary-fixed inline-flex items-center gap-1 font-label-mono text-label-mono group"
                href="#"
              >
                View Archive
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="glass-card rounded-xl overflow-hidden group flex flex-col"
                >
                  <div className="h-64 relative overflow-hidden bg-surface-container-low">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url('${project.image}')` }}
                    />
                    <div className="absolute inset-0 bg-background/20 group-hover:bg-background/40 transition-colors" />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-label-mono text-label-mono text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-body-lg text-body-lg font-bold text-on-surface mb-2">
                      {project.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm mb-6 flex-grow">
                      {project.description}
                    </p>
                    <a
                      className="inline-flex items-center gap-2 text-primary hover:text-primary-fixed font-label-mono text-label-mono mt-auto"
                      href="#"
                    >
                      {project.linkLabel}
                      <span className="material-symbols-outlined text-sm">{project.linkIcon}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section
          className="py-32 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest"
          id="experience"
        >
          <div className="max-w-container-max mx-auto max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Experience</h2>
              <p className="text-on-surface-variant">My professional journey in software engineering.</p>
            </div>
            <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-0 space-y-12">
              {experience.map((item) => (
                <div key={item.role} className="relative pl-8 md:pl-12">
                  <div
                    className={
                      item.active
                        ? "absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5 shadow-[0_0_10px_rgba(192,193,255,0.5)]"
                        : "absolute w-3 h-3 bg-surface-variant border border-white/20 rounded-full -left-[6.5px] top-1.5"
                    }
                  />
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                    <h3 className="font-body-lg text-body-lg font-bold text-on-surface">
                      {item.role}
                    </h3>
                    <span
                      className={
                        item.active
                          ? "font-label-mono text-label-mono text-primary mt-1 md:mt-0"
                          : "font-label-mono text-label-mono text-on-surface-variant mt-1 md:mt-0"
                      }
                    >
                      {item.period}
                    </span>
                  </div>
                  <p className="text-on-surface-variant mb-4 font-body-md">{item.company}</p>
                  <p className="text-sm text-on-surface-variant/80">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-margin-mobile md:px-margin-desktop text-center" id="contact">
          <div className="max-w-container-max mx-auto max-w-2xl glass-card p-12 md:p-20 rounded-2xl">
            <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-headline-md md:text-headline-md text-on-surface mb-6">
              Let&apos;s build something beautiful.
            </h2>
            <p className="text-on-surface-variant mb-10 font-body-lg">
              Currently accepting freelance projects and open to new full-time opportunities. Let&apos;s
              discuss your next big idea.
            </p>
            <a
              className="bg-[#6366F1] hover:bg-[#4f51d8] text-white px-8 py-4 rounded-lg font-body-md text-body-md transition-colors inline-block"
              href="mailto:hello@example.com"
            >
              Start a Conversation
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface w-full py-16 border-t border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-headline-md text-headline-md text-on-surface">DevPortfolio</div>
          <div className="flex gap-6">
            <a
              className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md hover:opacity-80 transition-opacity duration-200"
              href="#"
            >
              Github
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md hover:opacity-80 transition-opacity duration-200"
              href="#"
            >
              LinkedIn
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md hover:opacity-80 transition-opacity duration-200"
              href="#"
            >
              Resume
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md hover:opacity-80 transition-opacity duration-200"
              href="#"
            >
              Privacy
            </a>
          </div>
          <div className="text-on-surface-variant text-sm font-label-mono">
            © {new Date().getFullYear()} Developer Portfolio. Built with Precision.
          </div>
        </div>
      </footer>
    </>
  );
}