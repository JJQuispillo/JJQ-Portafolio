-- Initialize Database Script for Portfolio
-- Run this in Supabase SQL Editor to populate translations

-- Create translations table
CREATE TABLE IF NOT EXISTS translations (
  id SERIAL PRIMARY KEY,
  lang VARCHAR(2) NOT NULL,
  section VARCHAR(50) NOT NULL,
  key VARCHAR(100) NOT NULL,
  value TEXT NOT NULL
);

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS translations_lang_section_idx 
ON translations(lang, section);

-- Insert Spanish translations
INSERT INTO translations (lang, section, key, value) VALUES
-- Nav
('es', 'nav', 'skills', 'Skills'),
('es', 'nav', 'experience', 'Experiencia'),
('es', 'nav', 'projects', 'Proyectos'),
('es', 'nav', 'education', 'Educación'),
('es', 'nav', 'contact', 'Contacto'),
-- Hero
('es', 'hero', 'badge', 'DISPONIBLE'),
('es', 'hero', 'title', 'Desarrollador Full Stack'),
('es', 'hero', 'subtitle', 'DevOps & Ingeniero de Sistemas'),
('es', 'hero', 'tagline', 'Construyendo el futuro, un commit a la vez'),
('es', 'hero', 'ctaProjects', 'Ver Proyectos'),
('es', 'hero', 'ctaContact', 'Contáctame'),
('es', 'hero', 'scroll', 'SCROLL'),
-- Tech
('es', 'tech', 'label', '// HERRAMIENTAS QUE USO'),
('es', 'tech', 'title', 'TECH STACK'),
('es', 'tech', 'all', 'TODOS'),
('es', 'tech', 'frontend', 'FRONTEND'),
('es', 'tech', 'mobile', 'MOBILE'),
('es', 'tech', 'backend', 'BACKEND'),
('es', 'tech', 'database', 'DATABASE'),
('es', 'tech', 'devops', 'DEVOPS'),
('es', 'tech', 'cloud', 'CLOUD'),
-- Experience
('es', 'experience', 'label', '// DÓNDE HE TRABAJADO'),
('es', 'experience', 'title', 'EXPERIENCIA'),
('es', 'experience', 'period', '2022 - Presente'),
('es', 'experience', 'location', 'Ecuador'),
('es', 'experience', 'highlights', 'Lideré la migración de un Sistema POS desde escritorio a web con React y .NET'),
-- Projects
('es', 'projects', 'label', '// QUÉ HE CONSTRUIDO'),
('es', 'projects', 'title', 'PROYECTOS'),
-- Education
('es', 'education', 'label', '// JOURNEY DE APRENDIZAJE'),
('es', 'education', 'title', 'EDUCACIÓN'),
('es', 'education', 'degree', 'Ingeniería de Sistemas Inteligentes'),
('es', 'education', 'institution', 'Universidad Ecotec'),
('es', 'education', 'year', '2027 (Estimado)'),
('es', 'education', 'languages', 'IDIOMAS'),
('es', 'education', 'spanish', 'Español'),
('es', 'education', 'spanishLevel', 'Nativo'),
('es', 'education', 'english', 'Inglés'),
('es', 'education', 'englishLevel', 'B1+'),
('es', 'education', 'englishNote', '3 meses USA'),
-- Contact
('es', 'contact', 'label', '// HABLEMOS'),
('es', 'contact', 'title', 'CONTÁCTAME'),
('es', 'contact', 'intro', 'Siempre abierto a discutir nuevos proyectos, ideas creativas o oportunidades para ser parte de tus visiones.'),
('es', 'contact', 'sayHello', 'DI HOLA'),
('es', 'contact', 'getInTouch', 'Contáctame'),
('es', 'contact', 'footer', 'Diseñado y construido por John Jairo Quispillo'),
('es', 'contact', 'astropy', 'Astro'),
('es', 'photo', 'value', 'TU FOTO')
ON CONFLICT DO NOTHING;

-- Insert English translations
INSERT INTO translations (lang, section, key, value) VALUES
-- Nav
('en', 'nav', 'skills', 'Skills'),
('en', 'nav', 'experience', 'Experience'),
('en', 'nav', 'projects', 'Projects'),
('en', 'nav', 'education', 'Education'),
('en', 'nav', 'contact', 'Contact'),
-- Hero
('en', 'hero', 'badge', 'OPEN TO WORK'),
('en', 'hero', 'title', 'Full Stack Developer'),
('en', 'hero', 'subtitle', 'DevOps & Systems Engineer'),
('en', 'hero', 'tagline', 'Building the future, one commit at a time'),
('en', 'hero', 'ctaProjects', 'View Projects'),
('en', 'hero', 'ctaContact', 'Get In Touch'),
('en', 'hero', 'scroll', 'SCROLL'),
-- Tech
('en', 'tech', 'label', '// TOOLS I USE'),
('en', 'tech', 'title', 'TECH STACK'),
('en', 'tech', 'all', 'ALL'),
('en', 'tech', 'frontend', 'FRONTEND'),
('en', 'tech', 'mobile', 'MOBILE'),
('en', 'tech', 'backend', 'BACKEND'),
('en', 'tech', 'database', 'DATABASE'),
('en', 'tech', 'devops', 'DEVOPS'),
('en', 'tech', 'cloud', 'CLOUD'),
-- Experience
('en', 'experience', 'label', '// WHERE I''VE WORKED'),
('en', 'experience', 'title', 'EXPERIENCE'),
('en', 'experience', 'period', '2022 - Present'),
('en', 'experience', 'location', 'Ecuador'),
('en', 'experience', 'highlights', 'Led migration of a POS System from desktop to web with React and .NET'),
-- Projects
('en', 'projects', 'label', '// WHAT I''VE BUILT'),
('en', 'projects', 'title', 'PROJECTS'),
-- Education
('en', 'education', 'label', '// LEARNING JOURNEY'),
('en', 'education', 'title', 'EDUCATION'),
('en', 'education', 'degree', 'Intelligent Systems Engineering'),
('en', 'education', 'institution', 'Universidad Ecotec'),
('en', 'education', 'year', '2027 (Estimated)'),
('en', 'education', 'languages', 'LANGUAGES'),
('en', 'education', 'spanish', 'Spanish'),
('en', 'education', 'spanishLevel', 'Native'),
('en', 'education', 'english', 'English'),
('en', 'education', 'englishLevel', 'B1+'),
('en', 'education', 'englishNote', '3 months USA'),
-- Contact
('en', 'contact', 'label', '// LET''S TALK'),
('en', 'contact', 'title', 'GET IN TOUCH'),
('en', 'contact', 'intro', 'Always open to discussing new projects, creative ideas, or opportunities to be part of your visions.'),
('en', 'contact', 'sayHello', 'SAY HELLO'),
('en', 'contact', 'getInTouch', 'Get In Touch'),
('en', 'contact', 'footer', 'Designed & Built by John Jairo Quispillo'),
('en', 'contact', 'astropy', 'Astro'),
('en', 'photo', 'value', 'YOUR PHOTO')
ON CONFLICT DO NOTHING;

-- Verify data
SELECT lang, section, COUNT(*) as count FROM translations GROUP BY lang, section ORDER BY lang, section;