import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  url: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(project)}
      className="group relative flex flex-col overflow-hidden rounded-3xl glass-card transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl dark:hover:border-white/20 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-white/20">
        <img
          src={project.image}
          alt={`Preview of ${project.title}`}
          className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/5 dark:bg-black/20 transition-opacity duration-500 ease-out group-hover:opacity-0" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            {project.title}
          </h3>
          
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex flex-shrink-0 items-center justify-center p-2 rounded-full glass hover:bg-white/60 transition-colors group/btn"
            aria-label={`View live preview of ${project.title}`}
          >
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow font-light">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full glass text-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
