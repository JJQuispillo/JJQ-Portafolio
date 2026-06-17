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
      name: 'Sistema POS Web',
      nameEn: 'POS Web System',
      description: 'Migración de aplicación de escritorio legacy a web. React + .NET, integración con impresoras térmicas.',
      descriptionEn: 'Migration of legacy desktop app to web. React + .NET, thermal printer integration.',
      techStack: ['React', '.NET', 'SignalR', 'Nginx'],
      color: '#00fff5',
      order: 1,
    },
    {
      name: 'App Gestión Agrícola',
      nameEn: 'Agricultural App',
      description: 'Flutter offline-first para gestión de labores agrícolas con foto-evidencia.',
      descriptionEn: 'Offline-first Flutter app for farm labor management with photo evidence.',
      techStack: ['Flutter', 'Dart', 'BLoC', 'PostgreSQL'],
      color: '#ff00aa',
      order: 2,
    },
    {
      name: 'Módulos ERP',
      nameEn: 'ERP Modules',
      description: 'Facturación electrónica, integración SRI, lógica contable para sistema ERP empresarial.',
      descriptionEn: 'Electronic invoicing, SRI integration, accounting logic for ERP.',
      techStack: ['Python', 'FastAPI', 'SQL Server', 'Docker'],
      color: '#8b00ff',
      order: 3,
    },
    {
      name: 'CI/CD Pipelines',
      nameEn: 'CI/CD Pipelines',
      description: 'Diseño e implementación de pipelines automatizados con Dokploy.',
      descriptionEn: 'Design and implementation of automated pipelines with Dokploy.',
      techStack: ['Dokploy', 'Docker', 'Ubuntu', 'Nginx'],
      color: '#00d4ff',
      order: 4,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log('✓ Projects seeded');

  // Seed Experience
  await prisma.experience.create({
    data: {
      company: 'Nombre de la Empresa',
      companyEn: 'Company Name',
      role: 'Desarrollador Full Stack & DevOps',
      roleEn: 'Full Stack Developer & DevOps',
      period: '2022 - Presente',
      periodEn: '2022 - Present',
      location: 'Ecuador',
      locationEn: 'Ecuador',
      highlights: [
        'Lideré la migración de un Sistema POS desde escritorio a web con React y .NET',
        'Implementé integración con impresoras térmicas y navegación optimizada',
        'Desarrollé app Flutter offline-first para gestión agrícola con foto-evidencia',
        'Diseñé pipelines CI/CD con Dokploy, reduciendo tiempos de despliegue',
      ],
      highlightsEn: [
        'Led migration of a POS System from desktop to web with React and .NET',
        'Implemented thermal printer integration and optimized keyboard navigation',
        'Developed offline-first Flutter app for agricultural management with photo evidence',
        'Designed CI/CD pipelines with Dokploy, reducing deployment times',
      ],
      order: 1,
    },
  });
  console.log('✓ Experience seeded');

  // Seed Education
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
    await prisma.language.create({ data: lang });
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