import { motion } from "framer-motion";

export default function AboutSection() {
  const stats = [
    { number: "8+", label: "Anos de Experiência" },
    { number: "1500+", label: "Estudantes Ativos" },
    { number: "30+", label: "Professores Qualificados" },
    { number: "5000+", label: "Graduados" }
  ];

  return (
    <section id="about" className="py-20 bg-neutral relative overflow-hidden">
      {/* Background Parallax Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary rotate-slow"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-primary/30 floating-animation"
        />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-primary/20 pulse-glow"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="scroll-reveal enhanced-parallax"
            initial={{ opacity: 0, x: -60, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Sobre o <span className="text-primary">Narfive</span>
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              O Colégio Narfive é uma instituição de ensino de prestígio em Angola, dedicada a formar cidadãos íntegros e preparados para os desafios do século XXI. Com 10 anos de excelência educacional, somos reconhecidos pela qualidade do nosso ensino e pelo desenvolvimento integral dos nossos estudantes.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Nossa missão é proporcionar uma educação holística que combina rigor acadêmico, valores éticos e desenvolvimento das competências do futuro, preparando nossos alunos para se tornarem líderes em suas comunidades e no mundo.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl shadow-lg interactive-hover immersive-glow gradient-shift section-transition"
                  initial={{ opacity: 0, y: 40, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.12, 
                    rotateY: 5,
                    boxShadow: "0 25px 50px rgba(106, 90, 205, 0.25)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div 
                    className="text-3xl font-bold text-primary mb-2"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-700">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="scroll-reveal enhanced-parallax"
            initial={{ opacity: 0, x: 60, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.img 
                src="/images/instalacoes.jpg" 
                alt="Instalações do Colégio Narfive" 
                className="rounded-2xl shadow-2xl w-full h-auto section-transition object-cover"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 30px 60px rgba(106, 90, 205, 0.2)"
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Floating overlay elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full pulse-glow"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div 
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary/30 rounded-full floating-animation"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
