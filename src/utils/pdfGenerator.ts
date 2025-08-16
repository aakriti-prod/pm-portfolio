import type { Profile, Experience, Education, Skill } from '../types';

export interface ResumeData {
  profile: Profile;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

/**
 * Generates a PDF resume using the browser's print functionality
 * This creates a formatted HTML version that can be printed to PDF
 */
export const generateResumePDF = (data: ResumeData): void => {
  const resumeHTML = createResumeHTML(data);
  
  // Create a new window for the resume
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download the resume');
    return;
  }

  printWindow.document.write(resumeHTML);
  printWindow.document.close();
  
  // Wait for content to load, then trigger print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };
};

/**
 * Creates formatted HTML for the resume
 */
const createResumeHTML = (data: ResumeData): string => {
  const { profile, experience, education, skills } = data;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${profile.name} - Resume</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 8.5in;
          margin: 0 auto;
          padding: 0.5in;
          background: white;
        }
        
        @media print {
          body {
            margin: 0;
            padding: 0.5in;
          }
          
          .page-break {
            page-break-before: always;
          }
        }
        
        .header {
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #2563eb;
        }
        
        .name {
          font-size: 2.5rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }
        
        .title {
          font-size: 1.25rem;
          color: #2563eb;
          margin-bottom: 1rem;
        }
        
        .contact-info {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          font-size: 0.9rem;
          color: #6b7280;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .section {
          margin-bottom: 2rem;
        }
        
        .section-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .summary {
          font-size: 1rem;
          line-height: 1.7;
          color: #4b5563;
          text-align: justify;
        }
        
        .experience-item, .education-item {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f3f4f6;
        }
        
        .experience-item:last-child, .education-item:last-child {
          border-bottom: none;
        }
        
        .job-header, .edu-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }
        
        .job-title, .degree {
          font-size: 1.1rem;
          font-weight: bold;
          color: #1f2937;
        }
        
        .company, .institution {
          font-size: 1rem;
          color: #2563eb;
          margin-bottom: 0.25rem;
        }
        
        .date-location {
          text-align: right;
          font-size: 0.9rem;
          color: #6b7280;
        }
        
        .description {
          margin-bottom: 0.75rem;
          color: #4b5563;
        }
        
        .achievements {
          list-style: none;
          padding-left: 0;
        }
        
        .achievements li {
          position: relative;
          padding-left: 1rem;
          margin-bottom: 0.25rem;
          color: #4b5563;
        }
        
        .achievements li:before {
          content: "•";
          color: #2563eb;
          font-weight: bold;
          position: absolute;
          left: 0;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .skill-category {
          margin-bottom: 1rem;
        }
        
        .category-title {
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 0.5rem;
          text-transform: capitalize;
        }
        
        .skill-list {
          list-style: none;
          padding-left: 0;
        }
        
        .skill-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.25rem 0;
          color: #4b5563;
        }
        
        .skill-name {
          font-weight: 500;
        }
        
        .skill-level {
          font-size: 0.8rem;
          color: #6b7280;
          text-transform: capitalize;
        }
        
        @media print {
          .contact-info {
            gap: 1rem;
          }
          
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="name">${profile.name}</h1>
        <p class="title">${profile.title}</p>
        <div class="contact-info">
          <div class="contact-item">📧 ${profile.email}</div>
          ${profile.phone ? `<div class="contact-item">📞 ${profile.phone}</div>` : ''}
          <div class="contact-item">📍 ${profile.location}</div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Professional Summary</h2>
        <p class="summary">${profile.summary}</p>
      </div>

      <div class="section">
        <h2 class="section-title">Professional Experience</h2>
        ${experience.filter(exp => exp.type === 'work').map(exp => `
          <div class="experience-item">
            <div class="job-header">
              <div>
                <div class="job-title">${exp.position}</div>
                <div class="company">${exp.company}</div>
              </div>
              <div class="date-location">
                <div>${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}</div>
                <div>${exp.location}</div>
              </div>
            </div>
            <p class="description">${exp.description}</p>
            <ul class="achievements">
              ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h2 class="section-title">Education</h2>
        ${education.map(edu => `
          <div class="education-item">
            <div class="edu-header">
              <div>
                <div class="degree">${edu.degree} in ${edu.field}</div>
                <div class="institution">${edu.institution}</div>
              </div>
              <div class="date-location">
                <div>${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</div>
                ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ''}
              </div>
            </div>
            ${edu.honors && edu.honors.length > 0 ? `
              <ul class="achievements">
                ${edu.honors.map(honor => `<li>${honor}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h2 class="section-title">Skills</h2>
        <div class="skills-grid">
          ${getSkillsByCategory(skills).map(category => `
            <div class="skill-category">
              <h3 class="category-title">${category.name}</h3>
              <ul class="skill-list">
                ${category.skills.map(skill => `
                  <li class="skill-item">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-level">${skill.proficiency}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Formats a date string for display
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  });
};

/**
 * Groups skills by category
 */
const getSkillsByCategory = (skills: Skill[]) => {
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return Object.entries(categories).map(([category, categorySkills]) => ({
    name: category,
    skills: categorySkills.sort((a, b) => {
      const proficiencyOrder = { expert: 4, advanced: 3, intermediate: 2, beginner: 1 };
      return proficiencyOrder[b.proficiency] - proficiencyOrder[a.proficiency];
    })
  }));
};

/**
 * Alternative method: Download as HTML file that can be converted to PDF
 */
export const downloadResumeHTML = (data: ResumeData): void => {
  const resumeHTML = createResumeHTML(data);
  const blob = new Blob([resumeHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.profile.name.replace(/\s+/g, '-').toLowerCase()}-resume.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};