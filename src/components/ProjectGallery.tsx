import { useState, useEffect } from "react";
import { apiService, Project } from "@/lib/api";
import ProjectCarousel from "./ProjectCarousel";

const ProjectGallery = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  // Add a refresh function that can be called externally
  const refreshProjects = () => {
    loadProjects();
  };

  // Expose refresh function to window for debugging
  useEffect(() => {
    (window as any).refreshProjectGallery = refreshProjects;
    return () => {
      delete (window as any).refreshProjectGallery;
    };
  }, []);

  const loadProjects = async () => {
    try {
      const projectsData = await apiService.getProjects();
      console.log("Projects loaded in ProjectGallery:", projectsData);
      setProjects(projectsData);
    } catch (err) {
      setError("Failed to load projects");
      console.error("Error loading projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", "Medical", "Residential", "Commercial"];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.category === filter);

  console.log("Filter:", filter);
  console.log("Projects:", projects);
  console.log("Filtered Projects:", filteredProjects);

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Project Gallery
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our completed projects showcasing innovation and elegance
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Project Gallery
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our completed projects showcasing innovation and elegance
            </p>
          </div>
          <div className="text-center text-muted-foreground">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Project Gallery
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our completed projects showcasing innovation and elegance
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-card-foreground hover:bg-primary/10 hover:scale-105"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div 
                key={project._id || project.id}
                className="group cursor-pointer h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-xl bg-card shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl h-full flex flex-col">
                  {/* Carousel */}
                  <div className="flex-shrink-0">
                    <ProjectCarousel 
                      images={project.images || (project.image ? [project.image] : [])}
                      title={project.title}
                      autoPlay={true}
                      interval={4000}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Hover indicator */}
                    <div className="mt-4 h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-accent to-accent/60 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">
                {filter === "All" ? "No projects available" : `No projects in ${filter} category`}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;