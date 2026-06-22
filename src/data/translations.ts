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
          name: "Módulo POS — ERP ADMenterprise",
          description: "Punto de venta del ERP ADMenterprise con React, SignalR en tiempo real e integración SRI.",
          tech: ["React", ".NET", "SignalR", "SQL Server"]
        },
        {
          name: "ADMMAYORDOMO — App de gestión de personal",
          description: "App móvil offline-first para soporte y control de personal en campo con Flutter.",
          tech: ["Flutter", "BLoC", "SQLite", "Flask"]
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
          name: "POS Module — ADMenterprise ERP",
          description: "ERP point-of-sale module with React, real-time SignalR, and SRI integration.",
          tech: ["React", ".NET", "SignalR", "SQL Server"]
        },
        {
          name: "ADMMAYORDOMO — Staff Management App",
          description: "Offline-first mobile app for field support and personnel management with Flutter.",
          tech: ["Flutter", "BLoC", "SQLite", "Flask"]
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