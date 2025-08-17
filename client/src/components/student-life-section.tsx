import { motion } from "framer-motion";

export default function StudentLifeSection() {
  const activities = [
    { icon: "fas fa-microscope", label: "Jornadas Científicas" },
    { icon: "fas fa-music", label: "Orquestra Escolar" },
    { icon: "fas fa-chess", label: "Acampamentos Inter-Províncias" },
    { icon: "fas fa-theater-masks", label: "Grupo de Teatro" },
    { icon: "fas fa-robot", label: "Tribunal Simulado" },
    { icon: "fas fa-newspaper", label: "Jornal Escolar" }
  ];

  const facilities = [
    {
      icon: "fas fa-book",
      title: "Portal do Aluno",
      description: "Brevemente estará disponível Para visualização de notas,faltas,desempenho escolares.Com acesso para encarregados,alunos e professores"
    },
    {
      icon: "fas fa-flask",
      title: "Atividades Científicas",
      description: "Atividades modernas para física, química e biologia"
    },
    {
      icon: "fas fa-dumbbell",
      title: "Complexo Desportivo",
      description: "Ginásio, campos de futebol, basquetebol e piscina"
    }
  ];

  const eventImages = [
    {
      src: "/images/solida.jpg",
      alt: "Ação Solidária"
    },
    {
      src: "/images/tv.jpg",
      alt: "Entrevista na TV"
    },
    {
      src: "/images/acampamento2.jpg",
      alt: "Acampamento Escolar"
    }
  ];

  return (
    <section id="life" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16 scroll-reveal"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Vida <span className="text-primary">Estudantil</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Uma experiência educacional rica e diversificada que vai além da sala de aula, promovendo crescimento pessoal, liderança e cidadania ativa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div 
            className="scroll-reveal"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.img 
              src="/images/jornada1.jpg" 
              alt="Jornada Científica" 
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          
          <motion.div 
            className="scroll-reveal"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-secondary mb-6">Atividades Extracurriculares</h3>
            <p className="text-lg text-gray-700 mb-6">
              Oferecemos mais de 30 clubes e atividades extracurriculares que permitem aos estudantes explorar seus interesses, desenvolver talentos e construir amizades duradouras.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <i className={`${activity.icon} text-primary text-xl`}></i>
                  <span className="text-gray-800">{activity.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div 
            className="scroll-reveal lg:order-2"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.img 
              src="/images/desporto2.jpg" 
              alt="Complexo Desportivo" 
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          
          <motion.div 
            className="scroll-reveal lg:order-1"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-secondary mb-6">Instalações Modernas</h3>
            <p className="text-lg text-gray-700 mb-6">
              Nosso campus oferece instalações de última geração projetadas para apoiar todos os aspectos da experiência educacional e promover um ambiente de aprendizagem inspirador.
            </p>
            <div className="space-y-4">
              {facilities.map((facility, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                >
                  <div className="bg-primary/10 p-3 rounded-full">
                    <i className={`${facility.icon} text-primary`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary">{facility.title}</h4>
                    <p className="text-gray-700">{facility.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Events Gallery */}
        <motion.div 
          className="scroll-reveal"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-secondary text-center mb-12">Eventos e Tradições</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eventImages.map((image, index) => (
              <motion.img
                key={index}
                src={image.src}
                alt={image.alt}
                className="rounded-xl shadow-lg w-full h-64 object-cover transform hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
