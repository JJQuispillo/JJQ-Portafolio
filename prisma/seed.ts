import { PrismaClient } from '@prisma/client';
import { translations } from '../src/data/translations';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Seed Profile
  const profile = translations.es.hero;
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'John Jairo Quispillo',
      title: 'Desarrollador Full Stack',
      titleEn: 'Full Stack Developer',
      subtitle: 'DevOps & Ingeniero de Sistemas',
      subtitleEn: 'DevOps & Systems Engineer',
      tagline: 'Construyendo el futuro, un commit a la vez',
      taglineEn: 'Building the future, one commit at a time',
      email: 'jjquispillo@gmail.com',
      location: 'Ecuador',
      status: 'available',
    },
  });
  console.log('✓ Profile seeded');

  // Seed Technologies
  const techs = [
    { name: 'React', icon: 'reactjs', category: 'Frontend' },
    { name: 'Next.js', icon: 'reactjs', category: 'Frontend' },
    { name: 'TypeScript', icon: 'typescript-icon', category: 'Frontend' },
    { name: 'Flutter', icon: 'flutter', category: 'Mobile' },
    { name: 'Dart', icon: 'dart', category: 'Mobile' },
    { name: 'Python', icon: 'python', category: 'Backend' },
    { name: 'FastAPI', icon: 'fast-api', category: 'Backend' },
    { name: 'Flask', icon: 'flask-light', category: 'Backend' },
    { name: '.NET', icon: 'dotnet', category: 'Backend' },
    { name: 'SignalR', icon: 'c-sharp', category: 'Backend' },
    { name: 'SQL Server', icon: 'microsoft-sql-server', category: 'Database' },
    { name: 'PostgreSQL', icon: 'postgresql', category: 'Database' },
    { name: 'Docker', icon: 'docker', category: 'DevOps' },
    { name: 'Git', icon: 'git', category: 'DevOps' },
    { name: 'Ubuntu', icon: 'ubuntu', category: 'DevOps' },
    { name: 'Nginx', icon: 'nginx', category: 'DevOps' },
    { name: 'Dokploy', icon: 'docker', category: 'DevOps' },
    { name: 'BLoC', icon: 'flutter', category: 'Backend' },
    // Added from content.ts
    { name: 'AWS', icon: 'docker', category: 'Cloud' },
    { name: 'Astro', icon: 'astro', category: 'Frontend' },
    { name: 'Claude Code', icon: 'claude-code', category: 'DevOps' },
  ];

  for (const tech of techs) {
    await prisma.technology.upsert({
      where: { name: tech.name },
      update: tech,
      create: tech,
    });
  }
  console.log('✓ Technologies seeded');

  // Seed Projects
  const projects = [
    {
      slug: 'modulo-pos-admenterprise',
      name: 'Módulo POS — ERP ADMenterprise',
      nameEn: 'POS Module — ADMenterprise ERP',
      description: 'Punto de venta del ERP ADMenterprise con React, SignalR en tiempo real e integración SRI.',
      descriptionEn: 'ERP point-of-sale module with React, real-time SignalR, and SRI integration.',
      techStack: ['React', '.NET', 'SignalR', 'SQL Server'],
      color: '#00fff5',
      order: 1,
    },
    {
      slug: 'adm-mayordomo-gestion-personal',
      name: 'ADMMAYORDOMO — App de gestión de personal',
      nameEn: 'ADMMAYORDOMO — Staff Management App',
      description: 'App móvil offline-first para soporte y control de personal en campo con Flutter.',
      descriptionEn: 'Offline-first mobile app for field support and personnel management with Flutter.',
      techStack: ['Flutter', 'BLoC', 'SQLite', 'Flask'],
      color: '#ff00aa',
      order: 2,
    },
  ];

  await prisma.project.deleteMany();
  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log('✓ Projects seeded');

  // Seed Experience
  const experiences = [
    {
      company: 'BIROBID S.A.',
      companyEn: 'BIROBID S.A.',
      role: 'Desarrollador Full Stack & DevOps',
      roleEn: 'Full Stack Developer & DevOps',
      period: '2024-03 — 2026-05',
      periodEn: '2024-03 — 2026-05',
      location: 'Ecuador',
      locationEn: 'Ecuador',
      highlights: [
        'Desarrollé y mantuve frontend y backend de múltiples aplicaciones (React, Flutter, .NET, Python) y módulos clave del ERP: facturación electrónica, SRI y lógica contable.',
        'Diseñé e implementé pipelines CI/CD con Dokploy (despliegue por push), reduciendo el despliegue manual de horas a minutos.',
        'Creé Dockerfiles y configuraciones Docker Compose; administré servidores Ubuntu con Nginx/Apache y balanceo de carga para alta disponibilidad.',
        'Diseñé APIs RESTful seguras (JWT, OAuth, API Keys) en .NET y Python, e implementé SignalR para reactividad de stock en tiempo real.',
        'Estandaricé el control de versiones del equipo: GitHub Organizations, protección de ramas, convenciones de commits y code review.',
      ],
      highlightsEn: [
        'Developed and maintained frontend and backend of multiple applications (React, Flutter, .NET, Python) and key ERP modules: electronic invoicing, SRI, and accounting logic.',
        'Designed and implemented CI/CD pipelines with Dokploy (push-to-deploy), reducing manual deployment from hours to minutes.',
        'Created Dockerfiles and Docker Compose configurations; managed Ubuntu servers with Nginx/Apache and load balancing for high availability.',
        'Designed secure RESTful APIs (JWT, OAuth, API Keys) in .NET and Python, and implemented SignalR for real-time stock reactivity.',
        'Standardized team version control: GitHub Organizations, branch protection, commit conventions, and code review.',
      ],
      order: 1,
    },
    {
      company: 'Freelance',
      companyEn: 'Freelance',
      role: 'Desarrollador Web Freelance',
      roleEn: 'Freelance Web Developer',
      period: '2025-01 — 2025-12',
      periodEn: '2025-01 — 2025-12',
      location: 'Ecuador (Remoto)',
      locationEn: 'Ecuador (Remote)',
      highlights: [
        'Desarrollé sitios web modernos con Astro (SSG/SSR), landing pages y blogs optimizados para rendimiento y SEO.',
        'Construí y mantuve sitios web en WordPress con temas personalizados, plugins y optimización de velocidad.',
        'Implementé automatizaciones de procesos usando scripts en Python/JavaScript, integraciones de APIs y flujos de CI/CD.',
        'Entregué proyectos llave en mano: hosting, dominio, despliegue y mantenimiento para clientes locales.',
      ],
      highlightsEn: [
        'Developed modern websites with Astro (SSG/SSR), landing pages and blogs optimized for performance and SEO.',
        'Built and maintained WordPress websites with custom themes, plugins, and speed optimization.',
        'Implemented process automation using Python/JavaScript scripts, API integrations, and CI/CD workflows.',
        'Delivered turnkey projects: hosting, domain, deployment, and maintenance for local clients.',
      ],
      order: 2,
    },
    {
      company: 'Cabana Bay Beach Resort — Universal Orlando',
      companyEn: 'Cabana Bay Beach Resort — Universal Orlando',
      role: 'Food & Beverage Team Member',
      roleEn: 'Food & Beverage Team Member',
      period: '2025-02 — 2025-05',
      periodEn: '2025-02 — 2025-05',
      location: 'Orlando, Florida, EE. UU.',
      locationEn: 'Orlando, Florida, USA',
      highlights: [
        'Trabajé en un entorno 100% en inglés, poniendo en práctica y fortaleciendo mis habilidades de comunicación oral y atención al cliente en inglés.',
        'Me desempeñé en áreas de alto volumen como restaurante, bar y eventos, manejando pedidos y coordinación con cocina bajo presión.',
      ],
      highlightsEn: [
        'Worked in a 100% English-speaking environment, practicing and strengthening oral communication and customer service skills in English.',
        'Performed in high-volume areas such as restaurant, bar, and events, handling orders and kitchen coordination under pressure.',
      ],
      order: 3,
    },
  ];

  await prisma.experience.deleteMany();
  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log('✓ Experience seeded');

  // Seed Education
  await prisma.education.deleteMany();
  await prisma.education.create({
    data: {
      degree: 'Ingeniería de Sistemas Inteligentes',
      degreeEn: 'Intelligent Systems Engineering',
      institution: 'Universidad Ecotec',
      year: '2027 (Estimado)',
      order: 1,
    },
  });
  console.log('✓ Education seeded');

  // Seed Languages
  const languages = [
    { name: 'Español', nameEn: 'Spanish', level: 'Nativo', levelEn: 'Native', note: null, noteEn: null, order: 1 },
    { name: 'Inglés', nameEn: 'English', level: 'B1+', levelEn: 'B1+', note: '3 meses USA', noteEn: '3 months USA', order: 2 },
  ];

  for (const lang of languages) {
    await prisma.language.upsert({
      where: { name: lang.name },
      update: lang,
      create: lang,
    });
  }
  console.log('✓ Languages seeded');

  // Seed Translations (nav, hero, tech, experience, projects, education, contact, photo)
  const translationData = [];

  // Helper to flatten translations
  function addTranslations(lang: string, section: string, data: any) {
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        translationData.push({ lang, section, key, value });
      } else if (Array.isArray(value)) {
        // Skip arrays for now (highlights, tech stack)
      } else if (typeof value === 'object' && value !== null) {
        for (const [subKey, subValue] of Object.entries(value)) {
          if (typeof subValue === 'string') {
            translationData.push({ lang, section: `${section}.${key}`, key: subKey, value: subValue });
          }
        }
      }
    }
  }

  addTranslations('es', 'nav', translations.es.nav);
  addTranslations('en', 'nav', translations.en.nav);
  addTranslations('es', 'hero', translations.es.hero);
  addTranslations('en', 'hero', translations.en.hero);
  addTranslations('es', 'tech', translations.es.tech);
  addTranslations('en', 'tech', translations.en.tech);
  addTranslations('es', 'experience', translations.es.experience);
  addTranslations('en', 'experience', translations.en.experience);
  addTranslations('es', 'projects', translations.es.projects);
  addTranslations('en', 'projects', translations.en.projects);
  addTranslations('es', 'education', translations.es.education);
  addTranslations('en', 'education', translations.en.education);
  addTranslations('es', 'contact', translations.es.contact);
  addTranslations('en', 'contact', translations.en.contact);

  for (const t of translationData) {
    await prisma.translation.upsert({
      where: { lang_section_key: { lang: t.lang, section: t.section, key: t.key } },
      update: { value: t.value },
      create: t,
    });
  }
  console.log(`✓ Translations seeded (${translationData.length} entries)`);

  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });