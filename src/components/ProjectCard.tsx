import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { TiltCard } from './TiltCard';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  url: string;
}

interface ProjectCardProps {
  key?: string;
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
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <TiltCard className="group relative flex flex-col h-full overflow-hidden rounded-3xl neu-card neu-card-hover p-4 sm:p-6 cursor-pointer">
        <div onClick={() => onClick(project)} className="flex flex-col flex-grow">
          {/* Recessed Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl neu-inset p-2 mb-6">
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <img
                src={project.image}
                alt={`Preview of ${project.title}`}
                className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/5 dark:bg-black/20 transition-opacity duration-300 group-hover:opacity-0" />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow px-2 pb-2">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-full neu-circle-btn text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                aria-label={`View live preview of ${project.title}`}
              >
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow font-light leading-relaxed">
              {project.description}
            </p>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-semibold rounded-full neu-badge text-slate-700 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
