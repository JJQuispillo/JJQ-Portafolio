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

export async function getProjects(lang: Lang) {
  if (!isDbConfigured) {
    const projects = {
      es: [
        { name: "Sistema POS Web", description: "Migración de aplicación de escritorio legacy a web. React + .NET, integración con impresoras térmicas.", tech: ["React", ".NET", "SignalR", "Nginx"], color: "#00fff5" },
        { name: "App Gestión Agrícola", description: "Flutter offline-first para gestión de labores agrícolas con foto-evidencia.", tech: ["Flutter", "Dart", "BLoC", "PostgreSQL"], color: "#ff00aa" },
        { name: "Módulos ERP", description: "Facturación electrónica, integración SRI, lógica contable.", tech: ["Python", "FastAPI", "SQL Server", "Docker"], color: "#8b00ff" },
        { name: "CI/CD Pipelines", description: "Diseño e implementación de pipelines automatizados con Dokploy.", tech: ["Dokploy", "Docker", "Ubuntu", "Nginx"], color: "#00d4ff" }
      ],
      en: [
        { name: "POS Web System", description: "Migration of legacy desktop app to web. React + .NET, thermal printer integration.", tech: ["React", ".NET", "SignalR", "Nginx"], color: "#00fff5" },
        { name: "Agricultural App", description: "Offline-first Flutter app for farm labor management with photo evidence.", tech: ["Flutter", "Dart", "BLoC", "PostgreSQL"], color: "#ff00aa" },
        { name: "ERP Modules", description: "Electronic invoicing, SRI integration, accounting logic for ERP.", tech: ["Python", "FastAPI", "SQL Server", "Docker"], color: "#8b00ff" },
        { name: "CI/CD Pipelines", description: "Design and implementation of automated pipelines with Dokploy.", tech: ["Dokploy", "Docker", "Ubuntu", "Nginx"], color: "#00d4ff" }
      ]
    };
    return projects[lang];
  }

  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    });
    return projects.map(p => ({
      name: lang === 'es' ? p.name : p.nameEn,
      description: lang === 'es' ? p.description : p.descriptionEn,
      tech: p.techStack || [],
      color: p.color,
    }));
  } catch (error) {
    console.warn('[DB] Projects fallback:', (error as Error).message);
    return [];
  }
}

export async function getExperience(lang: Lang) {
  if (!isDbConfigured) {
    const exp = {
      es: { period: "2022 - Presente", role: "Desarrollador Full Stack & DevOps", company: "Nombre de la Empresa", highlights: [
        "Lideré la migración de un Sistema POS desde escritorio a web con React y .NET",
        "Implementé integración con impresoras térmicas y navegación optimizada",
        "Desarrollé app Flutter offline-first para gestión agrícola con foto-evidencia",
        "Diseñé pipelines CI/CD con Dokploy, reduciendo tiempos de despliegue"
      ]},
      en: { period: "2022 - Present", role: "Full Stack Developer & DevOps", company: "Company Name", highlights: [
        "Led migration of a POS System from desktop to web with React and .NET",
        "Implemented thermal printer integration and optimized keyboard navigation",
        "Developed offline-first Flutter app for agricultural management with photo evidence",
        "Designed CI/CD pipelines with Dokploy, reducing deployment times"
      ]}
    };
    return exp[lang];
  }

  try {
    const exp = await prisma.experience.findFirst({
      orderBy: { order: 'asc' },
    });
    if (!exp) return null;
    return {
      period: lang === 'es' ? exp.period : exp.periodEn,
      role: lang === 'es' ? exp.role : exp.roleEn,
      company: lang === 'es' ? exp.company : exp.companyEn,
      location: lang === 'es' ? exp.location : exp.locationEn,
      highlights: lang === 'es' ? exp.highlights : exp.highlightsEn,
    };
  } catch (error) {
    console.warn('[DB] Experience fallback:', (error as Error).message);
    return null;
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
      linkedin: "linkedin.com/in/usuario",
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