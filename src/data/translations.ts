export const translations = {
  es: {
    nav: {
      skills: "Skills",
      experience: "Experiencia",
      projects: "Proyectos",
      education: "Educación",
      contact: "Contacto"
    },
    hero: {
      badge: "DISPONIBLE",
      title: "Desarrollador Full Stack",
      subtitle: "DevOps & Ingeniero de Sistemas",
      tagline: "Construyendo el futuro, un commit a la vez",
      ctaProjects: "Ver Proyectos",
      ctaContact: "Contáctame",
      scroll: "SCROLL"
    },
    tech: {
      label: "// HERRAMIENTAS QUE USO",
      title: "TECH STACK",
      all: "TODOS",
      frontend: "FRONTEND",
      mobile: "MOBILE",
      backend: "BACKEND",
      database: "DATABASE",
      devops: "DEVOPS",
      cloud: "CLOUD"
    },
    experience: {
      label: "// DÓNDE HE TRABAJADO",
      title: "EXPERIENCIA",
      period: "2022 - Presente",
      location: "Ecuador",
      highlights: [
        "Lideré la migración de un Sistema POS desde escritorio a web con React y .NET",
        "Implementé integración con impresoras térmicas y navegación optimizada",
        "Desarrollé app Flutter offline-first para gestión agrícola con foto-evidencia",
        "Diseñé pipelines CI/CD con Dokploy, reduciendo tiempos de despliegue"
      ]
    },
    projects: {
      label: "// QUÉ HE CONSTRUIDO",
      title: "PROYECTOS",
      list: [
        {
          name: "Sistema POS Web",
          description: "Migración de aplicación de escritorio legacy a web. React + .NET, integración con impresoras térmicas.",
          tech: ["React", ".NET", "SignalR", "Nginx"]
        },
        {
          name: "App Gestión Agrícola",
          description: "Flutter offline-first para gestión de labores agrícolas con foto-evidencia y sincronización.",
          tech: ["Flutter", "Dart", "BLoC", "PostgreSQL"]
        },
        {
          name: "Módulos ERP",
          description: "Facturación electrónica, integración SRI, lógica contable para sistema ERP empresarial.",
          tech: ["Python", "FastAPI", "SQL Server", "Docker"]
        },
        {
          name: "CI/CD Pipelines",
          description: "Diseño e implementación de pipelines automatizados con Dokploy.",
          tech: ["Dokploy", "Docker", "Ubuntu", "Nginx"]
        }
      ]
    },
    education: {
      label: "// JOURNEY DE APRENDIZAJE",
      title: "EDUCACIÓN",
      degree: "Ingeniería de Sistemas Inteligentes",
      institution: "Universidad Ecotec",
      year: "2027 (Estimado)",
      languages: "IDIOMAS",
      spanish: "Español",
      spanishLevel: "Nativo",
      english: "Inglés",
      englishLevel: "B1+",
      englishNote: "3 meses USA"
    },
    contact: {
      label: "// HABLEMOS",
      title: "CONTÁCTAME",
      intro: "Siempre abierto a discutir nuevos proyectos, ideas creativas o oportunidades para ser parte de tus visiones.",
      sayHello: "DI HOLA",
      getInTouch: "Contáctame",
      footer: "Diseñado y construido por John Jairo Quispillo",
      astropy: "Astro"
    },
    photo: "TU FOTO"
  },
  en: {
    nav: {
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      contact: "Contact"
    },
    hero: {
      badge: "OPEN TO WORK",
      title: "Full Stack Developer",
      subtitle: "DevOps & Systems Engineer",
      tagline: "Building the future, one commit at a time",
      ctaProjects: "View Projects",
      ctaContact: "Get In Touch",
      scroll: "SCROLL"
    },
    tech: {
      label: "// TOOLS I USE",
      title: "TECH STACK",
      all: "ALL",
      frontend: "FRONTEND",
      mobile: "MOBILE",
      backend: "BACKEND",
      database: "DATABASE",
      devops: "DEVOPS",
      cloud: "CLOUD"
    },
    experience: {
      label: "// WHERE I'VE WORKED",
      title: "EXPERIENCE",
      period: "2022 - Present",
      location: "ecuador",
      highlights: [
        "Led migration of a POS System from desktop to web with React and .NET",
        "Implemented thermal printer integration and optimized keyboard navigation",
        "Developed offline-first Flutter app for agricultural management with photo evidence",
        "Designed CI/CD pipelines with Dokploy, reducing deployment times"
      ]
    },
    projects: {
      label: "// WHAT I'VE BUILT",
      title: "PROJECTS",
      list: [
        {
          name: "POS Web System",
          description: "Migration of legacy desktop app to web. React + .NET, thermal printer integration.",
          tech: ["React", ".NET", "SignalR", "Nginx"]
        },
        {
          name: "Agricultural App",
          description: "Offline-first Flutter app for farm labor management with photo evidence.",
          tech: ["Flutter", "Dart", "BLoC", "PostgreSQL"]
        },
        {
          name: "ERP Modules",
          description: "Electronic invoicing, SRI integration, accounting logic for ERP.",
          tech: ["Python", "FastAPI", "SQL Server", "Docker"]
        },
        {
          name: "CI/CD Pipelines",
          description: "Design and implementation of automated pipelines with Dokploy.",
          tech: ["Dokploy", "Docker", "Ubuntu", "Nginx"]
        }
      ]
    },
    education: {
      label: "// LEARNING JOURNEY",
      title: "EDUCATION",
      degree: "Intelligent Systems Engineering",
      institution: "Universidad Ecotec",
      year: "2027 (Estimated)",
      languages: "LANGUAGES",
      spanish: "Spanish",
      spanishLevel: "Native",
      english: "English",
      englishLevel: "B1+",
      englishNote: "3 months USA"
    },
    contact: {
      label: "// LET'S TALK",
      title: "GET IN TOUCH",
      intro: "Always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
      sayHello: "SAY HELLO",
      getInTouch: "Get In Touch",
      footer: "Designed & Built by John Jairo Quispillo",
      astropy: "Astro"
    },
    photo: "YOUR PHOTO"
  }
};

export type Lang = 'es' | 'en';
export type Translations = typeof translations.es;