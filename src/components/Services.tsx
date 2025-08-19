import { Building2, Wrench, DoorOpen, Home } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "MRI Room Interior Design",
    description: "Ergonomic, RF-shielded designs to support medical safety and aesthetic tranquility.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Wrench,
    title: "MRI Room Maintenance",
    description: "Complete care for MRI rooms — including preventive checks and emergency fixes.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: DoorOpen,
    title: "MRI Door Air-Tight Fittings",
    description: "Specialized sealing and magnetic door solutions to maintain safe MRI environments.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Home,
    title: "Residential & Commercial Interiors",
    description: "We design warm and elegant interiors that elevate your lifestyle and workspace.",
    color: "from-orange-500 to-orange-600"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            What We Do
          </h2>
          <div className="divider-animated"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive range of services combines medical precision with aesthetic excellence
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card scroll-reveal group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="service-icon">
                <service.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Decorative gradient line */}
              <div className="mt-4 h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-accent to-accent/60 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;