export interface ProfileSettingsData {
  id?: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  facebook?: string;
  twitter?: string;
  instagram: string;
  githubInContact?: boolean;
  linkedinInContact?: boolean;
  facebookInContact?: boolean;
  twitterInContact?: boolean;
  instagramInContact?: boolean;
  githubInProfilesCard?: boolean;
  linkedinInProfilesCard?: boolean;
  facebookInProfilesCard?: boolean;
  twitterInProfilesCard?: boolean;
  instagramInProfilesCard?: boolean;
  googleAnalyticsId?: string;
  metaPixelId?: string;
  profileImage: string;
  profileImageAlt?: string;
  aboutImage: string;
  aboutImageAlt?: string;
  resumeUrl?: string;
  enabledSkills?: string;
  typewriterText: string;
  aboutBio: string;
  experienceMonths: number;
  clientsWorldwide: number;
  experiences?: string;
  educations?: string;
}

export interface ExperienceItem {
  id: string;
  year: string;
  title: string;
  role: string;
}

export interface EducationItem {
  id: string;
  year: string;
  title: string;
  institution: string;
}
