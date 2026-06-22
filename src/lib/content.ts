import prisma from './prisma';
import { translations as staticData, type Lang, type Translations } from '../data/translations';

const isDbConfigured = process.env.USE_DATABASE === 'true';

export async function getTranslations(lang: Lang): Promise<Translations> {
  if (!isDbConfigured) {
    return staticData[lang];
  }

  try {
    const dbTranslations = await prisma.translation.findMany({
      where: { lang },
    });

    if (dbTranslations.length === 0) {
      return staticData[lang];
    }

    const result: Record<string, Record<string, string>> = {};
    
    for (const t of dbTranslations) {
      if (!result[t.section]) {
        result[t.section] = {};
      }
      result[t.section][t.key] = t.value;
    }

    return result as Translations;
  } catch (error) {
    console.warn('[DB] Using static fallback:', (error as Error).message);
    return staticData[lang];
  }
}

export async function getTechnologies() {
  if (!isDbConfigured) {
    return [
      { name: "React", icon: "reactjs", category: "Frontend" },
      { name: "Next.js", icon: "reactjs", category: "Frontend" },
      { name: "TypeScript", icon: "typescript-icon", category: "Frontend" },
      { name: "Flutter", icon: "flutter", category: "Mobile" },
      { name: "Python", icon: "python", category: "Backend" },
      { name: "FastAPI", icon: "fast-api", category: "Backend" },
      { name: "Flask", icon: "flask-light", category: "Backend" },
      { name: ".NET", icon: "dotnet", category: "Backend" },
      { name: "SQL Server", icon: "microsoft-sql-server", category: "Database" },
      { name: "PostgreSQL", icon: "postgresql", category: "Database" },
      { name: "Docker", icon: "docker", category: "DevOps" },
      { name: "Git", icon: "git", category: "DevOps" },
      { name: "AWS", icon: "docker", category: "Cloud" },
      { name: "Ubuntu", icon: "ubuntu", category: "DevOps" },
      { name: "Nginx", icon: "nginx", category: "DevOps" },
      { name: "Astro", icon: "astro", category: "Frontend" },
      { name: "Dart", icon: "dart", category: "Mobile" },
      { name: "Claude Code", icon: "claude-code", category: "DevOps" },
    ];
  }

  try {
    const techs = await prisma.technology.findMany({
      orderBy: { name: 'asc' },
    });
    return techs.map(t => ({ name: t.name, icon: t.icon, category: t.category }));
  } catch (error) {
    console.warn('[DB] Technologies fallback:', (error as Error).message);
    return [];
  }
}

const staticProjects = {
  es: [
    { slug: "modulo-pos-admenterprise", name: "Módulo POS — ERP ADMenterprise", description: "Punto de venta del ERP ADMenterprise con React, SignalR en tiempo real e integración SRI.", details: "", repoUrl: null, screenshots: [], tech: ["React", ".NET", "SignalR", "SQL Server"], color: "#00fff5" },
    { slug: "adm-mayordomo-gestion-personal", name: "ADMMAYORDOMO — App de gestión de personal", description: "App móvil offline-first para soporte y control de personal en campo con Flutter.", details: "", repoUrl: null, screenshots: [], tech: ["Flutter", "BLoC", "SQLite", "Flask"], color: "#ff00aa" },
  ],
  en: [
    { slug: "modulo-pos-admenterprise", name: "POS Module — ADMenterprise ERP", description: "ERP point-of-sale module with React, real-time SignalR, and SRI integration.", details: "", repoUrl: null, screenshots: [], tech: ["React", ".NET", "SignalR", "SQL Server"], color: "#00fff5" },
    { slug: "adm-mayordomo-gestion-personal", name: "ADMMAYORDOMO — Staff Management App", description: "Offline-first mobile app for field support and personnel management with Flutter.", details: "", repoUrl: null, screenshots: [], tech: ["Flutter", "BLoC", "SQLite", "Flask"], color: "#ff00aa" },
  ]
};

export async function getProjects(lang: Lang) {
  if (!isDbConfigured) {
    return staticProjects[lang];
  }

  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    });
    const mapped = projects.map(p => ({
      slug: p.slug,
      name: lang === 'es' ? p.name : p.nameEn,
      description: lang === 'es' ? p.description : p.descriptionEn,
      details: lang === 'es' ? p.details : p.detailsEn,
      repoUrl: p.repoUrl,
      screenshots: p.screenshots,
      tech: p.techStack || [],
      color: p.color,
    }));
    if (mapped.length === 0 || mapped.some(p => !p.slug)) {
      return staticProjects[lang];
    }
    return mapped;
  } catch (error) {
    console.warn('[DB] Projects fallback:', (error as Error).message);
    return staticProjects[lang];
  }
}

export async function getProjectBySlug(slug: string, lang: Lang) {
  const projects = await getProjects(lang);
  return projects.find(p => p.slug === slug) || null;
}

export async function getExperience(lang: Lang) {
  if (!isDbConfigured) {
    const experiences = {
      es: [
        {
          period: "2024-03 — 2026-05",
          role: "Desarrollador Full Stack & DevOps",
          company: "BIROBID S.A.",
          location: "Ecuador",
          highlights: [
            "Desarrollé y mantuve frontend y backend de múltiples aplicaciones (React, Flutter, .NET, Python) y módulos clave del ERP: facturación electrónica, SRI y lógica contable.",
            "Diseñé e implementé pipelines CI/CD con Dokploy (despliegue por push), reduciendo el despliegue manual de horas a minutos.",
            "Creé Dockerfiles y configuraciones Docker Compose; administré servidores Ubuntu con Nginx/Apache y balanceo de carga para alta disponibilidad.",
            "Diseñé APIs RESTful seguras (JWT, OAuth, API Keys) en .NET y Python, e implementé SignalR para reactividad de stock en tiempo real.",
            "Estandaricé el control de versiones del equipo: GitHub Organizations, protección de ramas, convenciones de commits y code review.",
          ],
        },
        {
          period: "2025-01 — 2025-12",
          role: "Desarrollador Web Freelance",
          company: "Freelance",
          location: "Ecuador (Remoto)",
          highlights: [
            "Desarrollé sitios web modernos con Astro (SSG/SSR), landing pages y blogs optimizados para rendimiento y SEO.",
            "Construí y mantuve sitios web en WordPress con temas personalizados, plugins y optimización de velocidad.",
            "Implementé automatizaciones de procesos usando scripts en Python/JavaScript, integraciones de APIs y flujos de CI/CD.",
            "Entregué proyectos llave en mano: hosting, dominio, despliegue y mantenimiento para clientes locales.",
          ],
        },
        {
          period: "2025-02 — 2025-05",
          role: "Food & Beverage Team Member",
          company: "Cabana Bay Beach Resort — Universal Orlando",
          location: "Orlando, Florida, EE. UU.",
          highlights: [
            "Trabajé en un entorno 100% en inglés, poniendo en práctica y fortaleciendo mis habilidades de comunicación oral y atención al cliente en inglés.",
            "Me desempeñé en áreas de alto volumen como restaurante, bar y eventos, manejando pedidos y coordinación con cocina bajo presión.",
          ],
        },
      ],
      en: [
        {
          period: "2024-03 — 2026-05",
          role: "Full Stack Developer & DevOps",
          company: "BIROBID S.A.",
          location: "Ecuador",
          highlights: [
            "Developed and maintained frontend and backend of multiple applications (React, Flutter, .NET, Python) and key ERP modules: electronic invoicing, SRI, and accounting logic.",
            "Designed and implemented CI/CD pipelines with Dokploy (push-to-deploy), reducing manual deployment from hours to minutes.",
            "Created Dockerfiles and Docker Compose configurations; managed Ubuntu servers with Nginx/Apache and load balancing for high availability.",
            "Designed secure RESTful APIs (JWT, OAuth, API Keys) in .NET and Python, and implemented SignalR for real-time stock reactivity.",
            "Standardized team version control: GitHub Organizations, branch protection, commit conventions, and code review.",
          ],
        },
        {
          period: "2025-01 — 2025-12",
          role: "Freelance Web Developer",
          company: "Freelance",
          location: "Ecuador (Remote)",
          highlights: [
            "Developed modern websites with Astro (SSG/SSR), landing pages and blogs optimized for performance and SEO.",
            "Built and maintained WordPress websites with custom themes, plugins, and speed optimization.",
            "Implemented process automation using Python/JavaScript scripts, API integrations, and CI/CD workflows.",
            "Delivered turnkey projects: hosting, domain, deployment, and maintenance for local clients.",
          ],
        },
        {
          period: "2025-02 — 2025-05",
          role: "Food & Beverage Team Member",
          company: "Cabana Bay Beach Resort — Universal Orlando",
          location: "Orlando, Florida, USA",
          highlights: [
            "Worked in a 100% English-speaking environment, practicing and strengthening oral communication and customer service skills in English.",
            "Performed in high-volume areas such as restaurant, bar, and events, handling orders and kitchen coordination under pressure.",
          ],
        },
      ],
    };
    return experiences[lang];
  }

  try {
    const exp = await prisma.experience.findMany({
      orderBy: { order: 'asc' },
    });
    return exp.map(e => ({
      period: lang === 'es' ? e.period : e.periodEn,
      role: lang === 'es' ? e.role : e.roleEn,
      company: lang === 'es' ? e.company : e.companyEn,
      location: lang === 'es' ? e.location : e.locationEn,
      highlights: lang === 'es' ? e.highlights : e.highlightsEn,
    }));
  } catch (error) {
    console.warn('[DB] Experience fallback:', (error as Error).message);
    return [];
  }
}

export async function getEducation(lang: Lang) {
  if (!isDbConfigured) {
    const edu = {
      es: { degree: "Ingeniería de Sistemas Inteligentes", institution: "Universidad Ecotec", year: "2027 (Estimado)" },
      en: { degree: "Intelligent Systems Engineering", institution: "Universidad Ecotec", year: "2027 (Estimated)" }
    };
    return edu[lang];
  }

  try {
    const edu = await prisma.education.findFirst({
      orderBy: { order: 'asc' },
    });
    if (!edu) return { degree: "", institution: "", year: "" };
    return {
      degree: lang === 'es' ? edu.degree : edu.degreeEn,
      institution: edu.institution,
      year: edu.year,
    };
  } catch (error) {
    console.warn('[DB] Education fallback:', (error as Error).message);
    return { degree: "", institution: "", year: "" };
  }
}

export async function getLanguages() {
  if (!isDbConfigured) {
    return [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "B1+", note: "3 meses USA" }
    ];
  }

  try {
    const langs = await prisma.language.findMany({
      orderBy: { order: 'asc' },
    });
    return langs.map(l => ({
      name: l.name,
      level: l.level,
      note: l.note || undefined,
    }));
  } catch (error) {
    console.warn('[DB] Languages fallback:', (error as Error).message);
    return [];
  }
}

export async function getProfile() {
  if (!isDbConfigured) {
    return {
      name: "John Jairo Quispillo",
      title: "Full Stack Developer",
      tagline: "Building the future, one commit at a time",
      email: "jjquispillo@gmail.com",
      github: "JJQUISPILLO",
      linkedin: "johnjairoquispillodev",
    };
  }

  try {
    const profile = await prisma.profile.findFirst();
    if (!profile) return null;
    return {
      name: profile.name,
      title: profile.title,
      tagline: profile.tagline,
      email: profile.email,
      github: profile.github,
      linkedin: profile.linkedin,
      location: profile.location,
      status: profile.status,
    };
  } catch (error) {
    console.warn('[DB] Profile fallback:', (error as Error).message);
    return null;
  }
}

export type { Lang, Translations };