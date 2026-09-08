import { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { projects, Project } from '../lib/data';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading 
          title="Selected Projects" 
          subtitle="A collection of recent work focusing on clean design and modern web technologies." 
        />
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                onClick={(p) => setSelectedProject(p as Project)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
              <span className="text-2xl">🚧</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Projects Coming Soon</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-md">
              I'm currently updating my portfolio with my latest work. Check back soon to see new projects!
            </p>
          </div>
        )}
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
