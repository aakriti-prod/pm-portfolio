import type { 
  Profile, 
  CaseStudy, 
  Skill, 
  Experience, 
  Education, 
  PortfolioData,
  SkillCategory,
  ProficiencyLevel 
} from '../types';

// Validation utility functions
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Date validation (YYYY-MM-DD format)
export const isValidDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;
  
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
};

// Profile validation
export const validateProfile = (profile: Profile): void => {
  if (!profile.id || profile.id.trim() === '') {
    throw new ValidationError('Profile ID is required');
  }
  
  if (!profile.name || profile.name.trim() === '') {
    throw new ValidationError('Profile name is required');
  }
  
  if (!profile.title || profile.title.trim() === '') {
    throw new ValidationError('Profile title is required');
  }
  
  if (!profile.email || !isValidEmail(profile.email)) {
    throw new ValidationError('Valid email is required');
  }
  
  if (!profile.location || profile.location.trim() === '') {
    throw new ValidationError('Profile location is required');
  }
  
  if (!profile.summary || profile.summary.trim() === '') {
    throw new ValidationError('Profile summary is required');
  }
  
  // Validate social links
  profile.socialLinks.forEach((link, index) => {
    if (!link.platform || link.platform.trim() === '') {
      throw new ValidationError(`Social link ${index + 1}: platform is required`);
    }
    if (!link.url || !isValidUrl(link.url)) {
      throw new ValidationError(`Social link ${index + 1}: valid URL is required`);
    }
  });
  
  // Validate resume URL if provided
  if (profile.resumeUrl && !isValidUrl(profile.resumeUrl)) {
    throw new ValidationError('Resume URL must be a valid URL');
  }
};

// Case Study validation
export const validateCaseStudy = (caseStudy: CaseStudy): void => {
  if (!caseStudy.id || caseStudy.id.trim() === '') {
    throw new ValidationError('Case study ID is required');
  }
  
  if (!caseStudy.title || caseStudy.title.trim() === '') {
    throw new ValidationError('Case study title is required');
  }
  
  if (!caseStudy.description || caseStudy.description.trim() === '') {
    throw new ValidationError('Case study description is required');
  }
  
  if (!caseStudy.challenge || caseStudy.challenge.trim() === '') {
    throw new ValidationError('Case study challenge is required');
  }
  
  if (!caseStudy.solution || caseStudy.solution.trim() === '') {
    throw new ValidationError('Case study solution is required');
  }
  
  if (!caseStudy.duration || caseStudy.duration.trim() === '') {
    throw new ValidationError('Case study duration is required');
  }
  
  if (!caseStudy.role || caseStudy.role.trim() === '') {
    throw new ValidationError('Case study role is required');
  }
  
  if (typeof caseStudy.order !== 'number' || caseStudy.order < 0) {
    throw new ValidationError('Case study order must be a non-negative number');
  }
  
  // Validate metrics
  caseStudy.metrics.forEach((metric, index) => {
    if (!metric.label || metric.label.trim() === '') {
      throw new ValidationError(`Case study metric ${index + 1}: label is required`);
    }
    if (!metric.value || metric.value.trim() === '') {
      throw new ValidationError(`Case study metric ${index + 1}: value is required`);
    }
    if (!['percentage', 'number', 'currency', 'time'].includes(metric.type)) {
      throw new ValidationError(`Case study metric ${index + 1}: invalid type`);
    }
  });
};

// Skill validation
export const validateSkill = (skill: Skill): void => {
  if (!skill.id || skill.id.trim() === '') {
    throw new ValidationError('Skill ID is required');
  }
  
  if (!skill.name || skill.name.trim() === '') {
    throw new ValidationError('Skill name is required');
  }
  
  const validCategories: SkillCategory[] = ['technical', 'analytics', 'leadership', 'tools'];
  if (!validCategories.includes(skill.category)) {
    throw new ValidationError('Skill category must be one of: technical, analytics, leadership, tools');
  }
  
  const validProficiencies: ProficiencyLevel[] = ['beginner', 'intermediate', 'advanced', 'expert'];
  if (!validProficiencies.includes(skill.proficiency)) {
    throw new ValidationError('Skill proficiency must be one of: beginner, intermediate, advanced, expert');
  }
  
  if (skill.yearsOfExperience !== undefined && skill.yearsOfExperience < 0) {
    throw new ValidationError('Years of experience must be non-negative');
  }
  
  // Validate certifications if provided
  if (skill.certifications) {
    skill.certifications.forEach((cert, index) => {
      if (!cert.name || cert.name.trim() === '') {
        throw new ValidationError(`Skill certification ${index + 1}: name is required`);
      }
      if (!cert.issuer || cert.issuer.trim() === '') {
        throw new ValidationError(`Skill certification ${index + 1}: issuer is required`);
      }
      if (!cert.dateObtained || !isValidDate(cert.dateObtained)) {
        throw new ValidationError(`Skill certification ${index + 1}: valid date obtained is required`);
      }
      if (cert.expiryDate && !isValidDate(cert.expiryDate)) {
        throw new ValidationError(`Skill certification ${index + 1}: expiry date must be valid`);
      }
      if (cert.credentialUrl && !isValidUrl(cert.credentialUrl)) {
        throw new ValidationError(`Skill certification ${index + 1}: credential URL must be valid`);
      }
    });
  }
};

// Experience validation
export const validateExperience = (experience: Experience): void => {
  if (!experience.id || experience.id.trim() === '') {
    throw new ValidationError('Experience ID is required');
  }
  
  if (!experience.company || experience.company.trim() === '') {
    throw new ValidationError('Experience company is required');
  }
  
  if (!experience.position || experience.position.trim() === '') {
    throw new ValidationError('Experience position is required');
  }
  
  if (!experience.startDate || !isValidDate(experience.startDate)) {
    throw new ValidationError('Experience start date is required and must be valid');
  }
  
  if (experience.endDate && !isValidDate(experience.endDate)) {
    throw new ValidationError('Experience end date must be valid');
  }
  
  if (!experience.location || experience.location.trim() === '') {
    throw new ValidationError('Experience location is required');
  }
  
  if (!experience.description || experience.description.trim() === '') {
    throw new ValidationError('Experience description is required');
  }
  
  if (!['work', 'education', 'volunteer'].includes(experience.type)) {
    throw new ValidationError('Experience type must be one of: work, education, volunteer');
  }
  
  // Validate date order if both start and end dates are provided
  if (experience.endDate) {
    const startDate = new Date(experience.startDate);
    const endDate = new Date(experience.endDate);
    if (endDate < startDate) {
      throw new ValidationError('Experience end date must be after start date');
    }
  }
};

// Education validation
export const validateEducation = (education: Education): void => {
  if (!education.id || education.id.trim() === '') {
    throw new ValidationError('Education ID is required');
  }
  
  if (!education.institution || education.institution.trim() === '') {
    throw new ValidationError('Education institution is required');
  }
  
  if (!education.degree || education.degree.trim() === '') {
    throw new ValidationError('Education degree is required');
  }
  
  if (!education.field || education.field.trim() === '') {
    throw new ValidationError('Education field is required');
  }
  
  if (!education.startDate || !isValidDate(education.startDate)) {
    throw new ValidationError('Education start date is required and must be valid');
  }
  
  if (!education.endDate || !isValidDate(education.endDate)) {
    throw new ValidationError('Education end date is required and must be valid');
  }
  
  // Validate date order
  const startDate = new Date(education.startDate);
  const endDate = new Date(education.endDate);
  if (endDate < startDate) {
    throw new ValidationError('Education end date must be after start date');
  }
};

// Portfolio data validation
export const validatePortfolioData = (data: PortfolioData): void => {
  validateProfile(data.profile);
  
  data.caseStudies.forEach((caseStudy, index) => {
    try {
      validateCaseStudy(caseStudy);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new ValidationError(`Case study ${index + 1}: ${message}`);
    }
  });
  
  data.skills.forEach((skill, index) => {
    try {
      validateSkill(skill);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new ValidationError(`Skill ${index + 1}: ${message}`);
    }
  });
  
  data.experience.forEach((exp, index) => {
    try {
      validateExperience(exp);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new ValidationError(`Experience ${index + 1}: ${message}`);
    }
  });
  
  data.education.forEach((edu, index) => {
    try {
      validateEducation(edu);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new ValidationError(`Education ${index + 1}: ${message}`);
    }
  });
};