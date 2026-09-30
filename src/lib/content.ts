import fs from 'fs';
import path from 'path';

export interface Job {
  slug: string;
  title: string;
  sector: string;
  location: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

export interface Course {
  slug: string;
  title: string;
  category: string;
  duration: string;
  eligibility: string;
  fee: string;
  description: string;
  modules: string[];
  image: string;
}

export interface News {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

const contentDir = path.join(process.cwd(), 'content');

// Generic function to read all JSON files from a directory
function getJsonFiles<T>(dirName: string): T[] {
  const dirPath = path.join(contentDir, dirName);
  
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(dirPath);
  
  return fileNames
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => {
      const fullPath = path.join(dirPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const data = JSON.parse(fileContents);
      
      // Automatically generate a slug from the filename if not provided
      return {
        slug: fileName.replace(/\.json$/, ''),
        ...data,
      } as T;
    });
}

// Get single item by slug
function getItemBySlug<T>(dirName: string, slug: string): T | null {
  try {
    const fullPath = path.join(contentDir, dirName, `${slug}.json`);
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return {
      slug,
      ...data,
    } as T;
  } catch (e) {
    return null;
  }
}

export const getAllJobs = () => getJsonFiles<Job>('jobs').sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
export const getJobBySlug = (slug: string) => getItemBySlug<Job>('jobs', slug);

export const getAllCourses = () => getJsonFiles<Course>('courses');
export const getCourseBySlug = (slug: string) => getItemBySlug<Course>('courses', slug);

export const getAllNews = () => getJsonFiles<News>('news').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
export const getNewsBySlug = (slug: string) => getItemBySlug<News>('news', slug);
