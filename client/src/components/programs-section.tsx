import { motion } from "framer-motion";

export default function ProgramsSection() {
  const programs = [
    {
      icon: "fas fa-graduation-cap",
      title: "Ensino Primário",
      description: "Fundamental sólida com foco no desenvolvimento da literacia, numeracia e pensamento crítico através de metodologias inovadoras.",
      features: ["Currículo Bilingue", "Tecnologia Educacional", "Desenvolvimento Socioemocional"]
    },
    {
      icon: "fas fa-book-open",
      title: "Ensino Secundário",
      description: "Preparação robusta para o ensino superior com ênfase em ciências, humanidades e desenvolvimento de competências do século XXI.",
      features: ["Atividades Técnicas", "Programa Internacional", "Orientação Vocacional"]
    },
    {
      icon: "fas fa-laptop-code",
      title: "Programas STEM",
      description: "Iniciativas especializadas em Ciência, Tecnologia, Engenharia e Matemática para preparar os inovadores do futuro.",
      features: ["Programação", "Competições Nacionais"]
    },
    {
      icon: "fas fa-palette",
      title: "Artes e Cultura",
      description: "Desenvolvimento da criatividade e expressão cultural através de programas integrados de artes visuais, música e teatro.",
      features: ["Grupos Artísticos", "Orquestra Escolar", "Teatro e Drama"]
    },
    {
      icon: "fas fa-running",
      title: "Desporto e Saúde",
      description: "Programa abrangente de educação física e desporto para promover saúde, disciplina e trabalho em equipa.",
      features: ["Complexo Desportivo", "Equipas Competitivas", "Educação Nutricional"]
    },
    {
      icon: "fas fa-globe-africa",
      title: "Línguas e Culturas",
      description: "Programas multilíngues que celebram a diversidade cultural angolana e preparam cidadãos globais.",
      features: ["Português Nativo", "Inglês", "Acampamentos Inter-Províncias"]
    }
  ];

  return (
    <section id="programs" className="py-20 bg-white relative overflow-hidden">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 opacity-3">
        <motion.div 
          className="absolute top-20 right-10 w-20 h-20 bg-primary/10 rounded-full floating-animation"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-16 h-16 bg-primary/20 rounded-full rotate-slow"
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-12 h-12 bg-primary/15 rounded-full pulse-glow"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16 scroll-reveal"
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Nossos <span className="text-primary">Programas</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Oferecemos uma ampla gama de programas educacionais desenhados para desenvolver o potencial máximo de cada estudante em todas as fases da sua jornada acadêmica.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              className="group bg-gradient-to-br from-primary/5 to-primary/15 rounded-2xl p-8 interactive-hover immersive-glow magnetic-hover depth-shadow-lg scroll-reveal section-transition gradient-shift"
              initial={{ opacity: 0, y: 80, scale: 0.8, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{ 
                duration: 1,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.1,
                rotateY: 8,
                rotateX: 3,
                boxShadow: "0 30px 60px rgba(106, 90, 205, 0.3)",
                transition: { duration: 0.4 }
              }}
            >
              <motion.div 
                className="text-4xl text-primary mb-4 relative"
                whileHover={{ scale: 1.2, rotate: 10 }}
                animate={{
                  scale: [1, 1.05, 1],
                  rotateY: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut"
                }}
              >
                <i className={program.icon}></i>
                <motion.div 
                  className="absolute -inset-2 bg-primary/20 rounded-full blur-md"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-secondary mb-4">{program.title}</h3>
              
              <p className="text-gray-700 mb-6">
                {program.description}
              </p>
              
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                {program.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <i className="fas fa-check text-success mr-2"></i> 
                    {feature}
                  </li>
                ))}
              </ul>
              
              <motion.button 
                className="text-primary font-semibold hover:text-primary/80 transition-colors duration-300 group-hover:translate-x-2 transform transition-transform"
                whileHover={{ x: 8 }}
              >
                Saber Mais <i className="fas fa-arrow-right ml-2"></i>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
