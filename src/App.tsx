import { motion } from 'framer-motion'
import { Code2, Smartphone, Brain, BarChart3, Server, Workflow, Users, Linkedin, Github, Mail, ChevronLeft, ChevronRight, Database as DbIcon, GitBranch, PenTool, Cpu, Bug, ArrowRight } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, ContactShadows, Environment, Text } from '@react-three/drei'
import * as THREE from 'three'
import { useState, useRef } from 'react'
import './index.css'
import me from '../photos/me.png'
function PhotoCard() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }
  const handleLeave = () => setPos(null)
  return (
    <div className="relative mx-auto md:mx-0 w-fit inline-block" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <div className="absolute -inset-4 rounded-3xl blur-2xl animated-border opacity-60" />
      <div className="relative rounded-3xl p-[2px] animated-border w-fit inline-block">
        <div className="relative rounded-3xl bg-black/60 overflow-hidden">
          {/* Hover-follow glow */}
          {pos && (
            <div
              className="pointer-events-none absolute -inset-px rounded-[22px] opacity-60 transition-opacity duration-200"
              style={{
                background: `radial-gradient(180px 180px at ${pos.x}px ${pos.y}px, rgba(155,92,246,0.35), transparent 60%)`,
              }}
            />
          )}
          <img src={me} alt="Glycel Yvon portrait" className="relative block rounded-3xl border border-white/15 glow-animate w-[320px] md:w-[420px]" />
        </div>
      </div>
    </div>
  )
}

function SocialRail() {
  const linkCls = "size-9 grid place-items-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
  return (
    <div className="hidden md:flex flex-col items-center gap-4 ml-4">
      <div className="text-xs tracking-widest text-neutral-300/70" style={{ writingMode: 'vertical-rl' }}>
        Let's connect
      </div>
      <div className="w-px h-10 bg-white/20" />
      <a className={linkCls} href="https://www.linkedin.com/in/glycel-yvon-virtucio" target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <Linkedin className="size-4" />
      </a>
      <a className={linkCls} href="https://github.com/glycelyvon" target="_blank" rel="noreferrer" aria-label="GitHub">
        <Github className="size-4" />
      </a>
      <a className={linkCls} href="mailto:glycel.virtucio@gmail.com" aria-label="Email">
        <Mail className="size-4" />
        </a>
      </div>
  )
}

function HoverObject() {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ mouse }) => {
    if (!ref.current) return
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mouse.x * 0.8, 0.08)
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -mouse.y * 0.5, 0.08)
  })
  return (
    <group ref={ref}>
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh castShadow>
          <icosahedronGeometry args={[1.1, 0]} />
          <meshPhysicalMaterial color="#9b5cf6" metalness={0.5} roughness={0.2} emissive="#5b21b6" emissiveIntensity={0.2} clearcoat={0.6} />
        </mesh>
      </Float>
    </group>
  )
}

function FloatingWord({ text, position, color, size = 0.18 }: { text: string; position: [number, number, number]; color: string; size?: number }) {
  const ref = useRef<THREE.Object3D>(null)
  const base = useRef<THREE.Vector3>(new THREE.Vector3(...position))
  useFrame(({ mouse, camera }) => {
    if (!ref.current) return
    // Subtle parallax by mouse
    const target = base.current.clone().add(new THREE.Vector3(mouse.x * 0.3, mouse.y * 0.2, 0))
    ref.current.position.lerp(target, 0.08)
    // Always face the camera slightly
    ref.current.lookAt(camera.position)
  })
  return (
    <group ref={ref} position={position}>
      <Float speed={1} rotationIntensity={0.25} floatIntensity={0.25}>
        <Text fontSize={size} color={color} anchorX="center" anchorY="middle">{text}</Text>
      </Float>
    </group>
  )
}

function About3D() {
  return (
    <div className="w-full h-48 md:h-72">
      <Canvas camera={{ position: [0, 0.6, 3.2], fov: 45 }} shadows gl={{ alpha: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 5, 2]} intensity={1} castShadow />
        <HoverObject />
        <FloatingWord text="Front-end Development" position={[-1.7, 0.8, 0]} color="#c7a2ff" size={0.11} />
        <FloatingWord text="Machine learning" position={[1.6, 0.2, -0.2]} color="#9bb7ff" size={0.1} />
        <FloatingWord text="Back-end Development" position={[0, -0.9, 0.3]} color="#b0ffea" size={0.1} />
        <Environment preset="city" />
        <ContactShadows position={[0, -1.2, 0]} opacity={0.35} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  )
}

// 3D hero removed per request; galaxy background remains global

function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10">
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        <a href="#hero" className="font-semibold text-neutral-100">GY</a>
        <div className="hidden md:flex gap-6 text-sm">
          <a className="hover:text-white/90" href="#about">About</a>
          <a className="hover:text-white/90" href="#projects">Projects</a>
          <a className="hover:text-white/90" href="#contact">Contact</a>
        </div>
      </nav>
    </header>
  )
}

function Section({ id, title, children, headingClass }: { id: string; title: string; children: React.ReactNode; headingClass?: string }) {
  return (
    <motion.section
      id={id}
      className="mx-auto max-w-6xl px-4 py-24"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent ${headingClass ?? ''}`}>
        {title}
      </h2>
      <div className="text-neutral-300/90 leading-relaxed">
        {children}
      </div>
    </motion.section>
  )
}

export default function App() {
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgvnvbez'
  const [contactOpen, setContactOpen] = useState(false)
  const [contactSending, setContactSending] = useState(false)
  const [contactError, setContactError] = useState<string | null>(null)

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setContactSending(true)
    setContactError(null)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as any)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to send')
      setContactOpen(true)
      form.reset()
    } catch (err: any) {
      setContactError('Something went wrong. Please try again later.')
    } finally {
      setContactSending(false)
    }
  }
  return (
    <div>
      <Navbar />
      <main>
        <section id="hero" className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(155,92,246,0.25),transparent_60%)] blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_60%)] blur-3xl" />
          </div>
          <div className="mx-auto max-w-6xl px-4 pt-24 pb-16">
            <div className="grid md:grid-cols-2 items-center gap-12 md:gap-30">
              <div className="text-center md:text-left">
                <p className="text-4xl md:text-6xl font-bold leading-tight text-neutral-300/90 mb-1">Hi, I’m Glycel — a</p>
                <motion.h1
                  className="text-4xl md:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                  <span className="sr-only">Developer. Analyst. Innovator.</span>
                  <span aria-hidden className="changing-text" />
                </motion.h1>
                <motion.p
                  className="mt-4 text-neutral-300 max-w-2xl md:mx-0 mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                >
                  Passionate about creating impactful digital solutions. From web systems and mobile apps to machine learning and analytics, I bring ideas to life through technology.
                </motion.p>
                <div className="mt-8 flex gap-4 md:gap-6 md:justify-start justify-center">
                  <a href="#projects" className="focus-ring inline-flex items-center rounded-md bg-[hsl(var(--accent))] px-5 py-2.5 text-sm font-medium text-[hsl(var(--accent-foreground))] transition-shadow duration-300 hover:shadow-[0_0_32px_8px_rgba(199,162,255,0.35)]">View Projects</a>
                  <a href="#contact" className="focus-ring inline-flex items-center rounded-md border border-white/10 px-5 py-2.5 text-sm font-medium text-white/90 hover:bg-white/5 transition-shadow duration-300 hover:shadow-[0_0_28px_6px_rgba(199,162,255,0.25)]">Contact</a>
                </div>
              </div>
              <motion.div className="flex items-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <PhotoCard />
                <SocialRail />
              </motion.div>
            </div>
          </div>
        </section>

        <Section id="about" title="What I do" headingClass="text-center glow-text">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="md:order-1 text-center md:text-left">
              <About3D />
              <div className="mt-6">
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Transforming ideas into impactful digital solutions.</h3>
                <p className="mt-3 text-neutral-300/90 max-w-prose">I create reliable, accessible software — from full-stack applications and data dashboards to AI-powered systems.</p>
                <div className="mt-6">
                  <a href="#skills" className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--accent))] hover:opacity-90">
                    Explore my Skills
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </div>
            </div>
            <ul className="space-y-4 md:order-2">
              <li className="flex items-start gap-3">
                <Code2 className="mt-1 size-5 text-[hsl(var(--accent))]" />
                <div>
                  <p className="font-medium">Full-Stack Development</p>
                  <p className="text-sm text-neutral-400">Design and build responsive, user-friendly, and reliable applications across the stack.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Brain className="mt-1 size-5 text-[hsl(var(--accent))]" />
                <div>
                  <p className="font-medium">Computer Vision & Machine Learning</p>
                  <p className="text-sm text-neutral-400">Develop intelligent models that detect, classify, and process visual and text data for smarter solutions.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BarChart3 className="mt-1 size-5 text-[hsl(var(--accent))]" />
                <div>
                  <p className="font-medium">Data Analytics & Visualization</p>
                  <p className="text-sm text-neutral-400">Transform raw data into clear, actionable insights through reports and dashboards.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Server className="mt-1 size-5 text-[hsl(var(--accent))]" />
                <div>
                  <p className="font-medium">System Design & Integration</p>
                  <p className="text-sm text-neutral-400">Create secure, scalable systems with structured workflows and efficient integrations.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Workflow className="mt-1 size-5 text-[hsl(var(--accent))]" />
                <div>
                  <p className="font-medium">Project Development Lifecycle</p>
                  <p className="text-sm text-neutral-400">Manage projects from planning to deployment using standard methodologies.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Users className="mt-1 size-5 text-[hsl(var(--accent))]" />
                <div>
                  <p className="font-medium">Leadership & Collaboration</p>
                  <p className="text-sm text-neutral-400">Lead teams and coordinate effectively to deliver impactful digital solutions.</p>
                </div>
              </li>
            </ul>
          </div>
        </Section>

        <Section id="experience" title="Experience" headingClass="text-center">
          <p className="text-neutral-400 text-center mb-6">Highlights of my roles, impact, and responsibilities over the years.</p>
          <div className="mx-auto max-w-3xl space-y-6">
            {[
              {
                role: 'Project Leader',
                org: 'Academic Projects',
                period: '2022 – Present',
                bullets: [
                  'Led academic projects, managed teams, and delivered web and system-based solutions on time.'
                ]
              },
              {
                role: 'Associate Project Manager Intern for Product Research & Design',
                org: 'Tech Executive Labs',
                period: 'February 2025 – April 2025',
                bullets: [
                  'Design low/high-fidelity wireframes, prototypes, and user flows using Figma, Adobe XD, or Sketch, ensuring accessible, user-friendly interfaces aligned with brand guidelines.',
                  'Work with developers and stakeholders for seamless design execution, refine user experiences through feedback, and prepare reports, documentation, and presentations to support projects.'
                ]
              },
              {
                role: 'Chief Operations Officer',
                org: 'Tech Innovators Society',
                period: 'August 2024 – June 2025',
                bullets: [
                  'Oversee day-to-day operations and manage both external relations and internal functions, including finance and partnerships.',
                  'Serve as the main liaison for internal and external communications.',
                  'Collaborate with fellow officers to drive organizational success and meet chapter goals.'
                ]
              },
              {
                role: 'Secretary',
                org: 'Junior Philippine Computer Society – Lipa Chapter',
                period: 'August 2023 – March 2024',
                bullets: [
                  'Organize and document chapter meetings, events, and activities.',
                  'Serve as the document keeper for important records and correspondences.',
                  'Communicate effectively with members and stakeholders.',
                  'Collaborate with fellow officers to achieve organizational goals.'
                ]
              },
              {
                role: 'Work Immersion (Remote)',
                org: 'CREOTEC Philippines',
                period: 'February 2022',
                bullets: [
                  'Assisted in creating an Employee Monitoring Board and calculated employee payroll.',
                  'Developed a Payroll Calculator Application, BMI Calculator Application, and Chatbot Application using MIT.'
                ]
              }
            ].map((e, i) => {
              const desc = 'bullets' in e ? (e as any).bullets.join(' ') : ''
              return (
                <motion.div
                  key={`${e.org}-${e.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="sm:grid sm:grid-cols-[180px_1fr] sm:items-start gap-4"
                >
                  {/* Date column aligned with section content left edge */}
                  <div className="text-xs text-neutral-400 leading-6 mb-2 sm:mb-0">{e.period}</div>
                  {/* Timeline column */}
                  <div className="relative border-l border-white/10 pl-6">
                    <span className="absolute -left-[9px] top-2 size-4 rounded-full bg-[hsl(var(--accent))] shadow-[0_0_18px_6px_rgba(199,162,255,0.35)]" />
                    <div className="rounded-md border border-white/10 bg-white/5 p-3">
                      <p className="font-medium">
                        {e.role} · <span className="text-neutral-300/80">{e.org}</span>
                      </p>
                      <p className="mt-2 text-sm text-neutral-300/90">{desc}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Section>

        <Section id="projects" title="Featured Projects" headingClass="text-center">
          <p className="text-neutral-400 text-center mb-10">A showcase of ideas turned into functional and impactful software.</p>
          <FeaturedProjects />
        </Section>

        <Section id="skills" title="Skills" headingClass="text-center">
          <div className="mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-3">
                  <Code2 className="mt-0.5 size-5 text-[hsl(var(--accent))]" />
                  <div>
                    <p className="font-semibold mb-1">Programming & Scripting</p>
                    <p className="text-sm text-neutral-300/90">Python, Java, C/C++, C#, PHP, JavaScript (Node.js, Express.js), SQL</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-3">
                  <Smartphone className="mt-0.5 size-5 text-[hsl(var(--accent))]" />
                  <div>
                    <p className="font-semibold mb-1">Web & Mobile Development</p>
                    <p className="text-sm text-neutral-300/90">HTML5, CSS3, Bootstrap, React.js, Flutter</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-3">
                  <DbIcon className="mt-0.5 size-5 text-[hsl(var(--accent))]" />
                  <div>
                    <p className="font-semibold mb-1">Databases</p>
                    <p className="text-sm text-neutral-300/90">PostgreSQL, MySQL, Firebase, MongoDB</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-3">
                  <Brain className="mt-0.5 size-5 text-[hsl(var(--accent))]" />
                  <div>
                    <p className="font-semibold mb-1">AI & Machine Learning</p>
                    <p className="text-sm text-neutral-300/90">EDA, Feature Engineering, Predictive Modeling, Sentiment Analysis, Classification & Regression, Computer Vision (YOLO v5–v11)</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-3">
                  <Bug className="mt-0.5 size-5 text-[hsl(var(--accent))]" />
                  <div>
                    <p className="font-semibold mb-1">Web Scraping & Automation</p>
                    <p className="text-sm text-neutral-300/90">BeautifulSoup, Selenium, Scrapy</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-3">
                  <BarChart3 className="mt-0.5 size-5 text-[hsl(var(--accent))]" />
                  <div>
                    <p className="font-semibold mb-1">Data Visualization & Analytics</p>
                    <p className="text-sm text-neutral-300/90">Descriptive & Predictive Analytics, Power BI, Tableau</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-3">
                  <GitBranch className="mt-0.5 size-5 text-[hsl(var(--accent))]" />
                  <div>
                    <p className="font-semibold mb-1">Version Control & Collaboration</p>
                    <p className="text-sm text-neutral-300/90">Git, GitHub</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-3">
                  <PenTool className="mt-0.5 size-5 text-[hsl(var(--accent))]" />
                  <div>
                    <p className="font-semibold mb-1">Design & Prototyping</p>
                    <p className="text-sm text-neutral-300/90">Figma, Canva</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-3">
                  <Cpu className="mt-0.5 size-5 text-[hsl(var(--accent))]" />
                  <div>
                    <p className="font-semibold mb-1">Other Tools & Technologies</p>
                    <p className="text-sm text-neutral-300/90">REST APIs, Basic IoT Integration, Agile Project Tools</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="certifications" title="Certifications" headingClass="text-center">
          <div className="mx-auto max-w-5xl">
            {(() => {
              const allCerts = [
                { name: 'Google Data Analytics', issuer: 'Google on Coursera', image: '/photos/cert1.png', link: '#', date: 'September 08, 2025' },
                { name: 'Google UX Design', issuer: 'Google on Coursera', image: '/photos/cert2.png', link: '#', date: 'August 16, 2025' },
                { name: 'Google Project Management', issuer: 'Google on Coursera', image: '/photos/cert3.png', link: '#', date: 'July 24, 2025' },
                { name: 'Introduction to Red Hat OpenShift AI', issuer: 'Red Hat', image: '/photos/cert4.png', link: '#', date: 'July 21, 2025' },
                { name: 'Application Development I: Programming in Java EE', issuer: 'Red Hat', image: '/photos/cert5.png', link: '#', date: 'July 23, 2025' },
                { name: 'Querying Fundamentals with MySQL', issuer: 'Data Analytics Philippines', image: '/photos/cert6.png', link: '#', date: 'October 31, 2024' },
                { name: 'Data Scraping Bootcamp', issuer: 'Virtuals Protocol', image: '/photos/cert7.png', link: '#', date: 'July 29 - August 9, 2024', note: 'Top contributor in Batch 1 out of 200+ participants' },
                { name: 'Fundamentals Statistics with Microsoft Excel', issuer: 'Data Analytics Philippines', image: '/photos/cert8.png', link: '#', date: 'August 5, 2024' },
                { name: 'Business Intelligence with POWERBI Desktop', issuer: 'Data Analytics Philippines', image: '/photos/cert9.png', link: '#', date: 'August 5, 2024' }
              ]
              const [showAllCerts, setShowAllCerts] = useState(false)
              const visible = showAllCerts ? allCerts : allCerts.slice(0, 3)
              return (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visible.map((cert, i) => (
                <motion.a
                  key={cert.name}
                  href={cert.link}
                  className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/8 transition-all"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    {cert.image ? (
                      <img src={cert.image} alt={`${cert.name} certificate`} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      <div className="h-full w-full bg-[linear-gradient(135deg,rgba(199,162,255,0.25),rgba(59,130,246,0.2))] flex items-center justify-center">
                        <span className="text-2xl">📜</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">{cert.name}</p>
                    </div>
                    <p className="text-xs text-neutral-400 mb-1">{cert.issuer}</p>
                    <p className="text-xs text-neutral-500">{cert.date}</p>
                    {cert.note && (
                      <p className="text-xs text-neutral-300 mt-2 italic">{cert.note}</p>
                    )}
                  </div>
                </motion.a>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center">
                    <button onClick={() => setShowAllCerts(!showAllCerts)} className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10">
                      {showAllCerts ? 'Show less' : 'Show more'}
                    </button>
                  </div>
                </>
              )
            })()}
          </div>
        </Section>

        <Section id="contact" title="Contact" headingClass="text-center">
          <p className="text-neutral-400 text-center mb-10">Let's connect and discuss opportunities or collaborations.</p>
          <div className="mx-auto max-w-2xl">
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              <input type="hidden" name="_subject" value="New message from portfolio" />
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={contactSending}
                  className="flex-1 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] focus:ring-offset-2 focus:ring-offset-neutral-900 disabled:opacity-60"
                >
                  {contactSending ? 'Sending…' : 'Send Message'}
                </button>
                {/* Social buttons removed per request */}
              </div>
              {contactError && <p className="text-sm text-red-400 mt-2">{contactError}</p>}
            </form>
            {contactOpen && (
              <div className="fixed inset-0 z-[60] grid place-items-center bg-black/60">
                <div className="rounded-xl border border-white/10 bg-neutral-900 p-6 shadow-xl max-w-sm mx-4 text-center">
                  <p className="text-lg font-semibold">Message sent successfully</p>
                  <p className="text-neutral-300 mt-2">Thanks for reaching out. I will get back to you soon.</p>
                  <button onClick={() => setContactOpen(false)} className="mt-4 inline-flex items-center rounded-md bg-[hsl(var(--accent))] px-4 py-2 text-sm font-medium text-[hsl(var(--accent-foreground))] hover:opacity-90">Close</button>
                </div>
              </div>
            )}
          </div>
        </Section>
      </main>
      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-400">© {new Date().getFullYear()} Glycel Yvon</footer>
    </div>
  )
}

function FeaturedProjects() {
  const items = [
    {
      title: 'ML-Based Public Transport Tracking System',
      year: '2025 - Present',
      category: 'Machine Learning & IoT',
      image: '/photos/project1.png',
      desc: 'IoT-enabled transport tracking system with ML-based passenger detection using YOLOv12, real-time analytics, and mobile app for FCM Transport Corporation.',
      tags: ['Python', 'YOLOv12', 'Flutter/Dart', 'Supabase', 'Node.js', 'Socket.IO', 'Mapbox'],
      live: '#'
    },
    {
      title: 'TechEx Website',
      year: 'March 2025',
      category: 'Web Design',
      image: '/photos/project2.png',
      desc: 'Led website design creating low/high-fidelity wireframes, prototypes, and user flows using Figma. Collaborated with developers for seamless design execution.',
      tags: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research'],
      live: '#'
    },
    {
      title: 'CompaniON: Companion Rentals Platform',
      year: 'September 2024 - December 2024',
      category: 'Web Application',
      image: '/photos/project3.png',
      desc: 'Web-based platform connecting individuals with companions to reduce social anxiety. Features SMS notifications, CAPTCHA security, and analytics dashboard.',
      tags: ['HTML', 'CSS', 'PHP', 'MySQL', 'SMS API', 'Analytics'],
      live: '#'
    },
    {
      title: 'Community Connect: Inquiry Management System',
      year: 'January 2024 - March 2024',
      category: 'Government System',
      image: '/photos/project4.png',
      desc: 'Web-based system for Barangay Maraykit to handle document requests, complaints, and public services. Features role-based authentication and admin dashboard.',
      tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Waterfall SDLC'],
      live: '#'
    },
    {
      title: 'Schedulo: Conference Management System',
      year: 'September 2023 - December 2023',
      category: 'Event Management',
      image: '/photos/project5.png',
      desc: 'Web-based system for conference scheduling, speaker/attendee registration, venue management, and sponsor coordination with automated workflows.',
      tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'CRUD Operations'],
      live: '#'
    }
  ]
  const [index, setIndex] = useState(0)
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)
  const next = () => setIndex((i) => (i + 1) % items.length)
  const active = items[index]

  return (
    <div className="relative">
      <motion.div
        key={active.title}
        className="grid md:grid-cols-2 gap-10 items-center"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.45 }}
      >
        <div>
          <div className="text-xs uppercase tracking-widest text-neutral-400 flex items-center gap-3">
            <span>{active.category}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-500" />
            <span>{active.year}</span>
          </div>
          <h3 className="mt-3 text-4xl md:text-5xl font-extrabold text-white">
            {active.title}
          </h3>
          <p className="mt-4 text-neutral-300/90 leading-relaxed max-w-xl">{active.desc}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {active.tags.map(t => (
              <span key={t} className="text-xs rounded-full border border-white/10 bg-white/5 px-3 py-1 text-neutral-300">{t}</span>
            ))}
          </div>
          {/* Live button removed per request */}
        </div>
        <div className="relative block rounded-3xl overflow-hidden border border-white/10 bg-white/5 aspect-[16/10] ring-1 ring-white/10 hover:shadow-[0_0_80px_12px_rgba(255,165,0,0.15)] transition-all">
          {active.image ? (
            <img src={active.image} alt={`${active.title} preview`} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(135deg,rgba(199,162,255,0.25),rgba(59,130,246,0.2))]" />
          )}
        </div>
      </motion.div>

      {/* Arrow controls */}
      <button
        onClick={prev}
        aria-label="Previous project"
        className="hidden md:flex items-center justify-center absolute -left-12 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next project"
        className="hidden md:flex items-center justify-center absolute -right-12 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Dots */}
      <div className="mt-8 flex items-center justify-center">
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`h-2.5 w-2.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/30'}`} aria-label={`Go to slide ${i+1}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
