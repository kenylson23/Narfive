import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Maximize2, X } from "lucide-react";

export default function VirtualTourSection() {
  const [currentLocation, setCurrentLocation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const locations = [
    {
      id: 1,
      name: "Entrada Principal",
      description: "Portão principal do Colégio Narfive com vista para a recepção",
      image: "/images/instalacoes.jpg",
      hotspots: [
        { x: 30, y: 40, label: "Recepção", target: 1 },
        { x: 70, y: 60, label: "Pátio Central", target: 2 }
      ]
    },
    {
      id: 2,
      name: "Refeitório",
      description: "Espaço amplo e acolhedor para refeições dos alunos e funcionários",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      hotspots: [
        { x: 30, y: 40, label: "Área de Servir", target: 3 },
        { x: 70, y: 60, label: "Mesas Coletivas", target: 4 }
      ]
    },
    {
      id: 3,
      name: "Secretaria",
      description: "Setor administrativo para atendimento aos alunos e responsáveis",
      image: "https://images.unsplash.com/photo-1586281380118-2f9cb9d7a1b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      hotspots: [
        { x: 30, y: 40, label: "Atendimento", target: 1 },
        { x: 70, y: 60, label: "Sala de Reuniões", target: 2 }
      ]
    },
    {
      id: 4,
      name: "Salas de Aula",
      description: "Ambientes modernos e climatizados para o aprendizado dos alunos",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      hotspots: [
        { x: 30, y: 40, label: "Quadro Digital", target: 0 },
        { x: 70, y: 60, label: "Área de Estudo", target: 1 }
      ]
    },
    {
      id: 5,
      name: "Complexo Desportivo",
      description: "Estrutura completa para práticas esportivas e atividades físicas",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195c86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      hotspots: [
        { x: 30, y: 40, label: "Quadra Poliesportiva", target: 3 },
        { x: 70, y: 60, label: "Piscina Semiolímpica", target: 4 }
      ]
    }
  ];

  const nextLocation = () => {
    setCurrentLocation((prev) => (prev + 1) % locations.length);
  };

  const prevLocation = () => {
    setCurrentLocation((prev) => (prev === 0 ? locations.length - 1 : prev - 1));
  };

  const goToLocation = (index: number) => {
    setCurrentLocation(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="virtual-tour" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-20 right-10 w-28 h-28 bg-primary rounded-full pulse-glow"
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-20 h-20 bg-primary/30 rounded-full floating-animation"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Tour <span className="text-primary">Virtual</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Explore nosso campus virtualmente e conheça todas as instalações do Colégio Narfive através desta experiência interativa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Location List */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-secondary mb-6">Locais do Tour</h3>
            <div className="space-y-3">
              {locations.map((location, index) => (
                <motion.button
                  key={location.id}
                  onClick={() => goToLocation(index)}
                  className={`w-full text-left p-3 sm:p-4 rounded-lg transition-all duration-300 ${
                    currentLocation === index
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="font-semibold">{location.name}</div>
                  <div className="text-sm opacity-80 mt-1">{location.description}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Main Tour Viewer */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              {/* Tour Controls */}
              <div className="bg-black/20 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={toggleAutoplay}
                    className="flex items-center space-x-2 bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    <span>{isPlaying ? 'Pausar' : 'Auto Tour'}</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={prevLocation}
                    className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw size={20} />
                  </motion.button>
                </div>

                <div className="text-white">
                  <span className="font-semibold">{locations[currentLocation].name}</span>
                  <span className="text-gray-400 ml-2">({currentLocation + 1}/{locations.length})</span>
                </div>

                <motion.button
                  onClick={toggleFullscreen}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Maximize2 size={20} />
                </motion.button>
              </div>

              {/* Tour Image with Hotspots */}
              <div className="relative h-96 lg:h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentLocation}
                    src={locations[currentLocation].image}
                    alt={locations[currentLocation].name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6 }}
                  />
                </AnimatePresence>

                {/* Hotspots */}
                {locations[currentLocation].hotspots.map((hotspot, index) => (
                  <motion.button
                    key={index}
                    className="absolute w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg cursor-pointer"
                    style={{
                      left: `${hotspot.x}%`,
                      top: `${hotspot.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(106, 90, 205, 0.7)",
                        "0 0 0 10px rgba(106, 90, 205, 0)",
                        "0 0 0 0 rgba(106, 90, 205, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    onClick={() => goToLocation(hotspot.target)}
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                      {hotspot.label}
                    </div>
                  </motion.button>
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={prevLocation}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextLocation}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Location Description */}
              <div className="p-6 bg-gray-800 text-white">
                <h3 className="text-xl font-bold mb-2">{locations[currentLocation].name}</h3>
                <p className="text-gray-300">{locations[currentLocation].description}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress Indicators */}
        <motion.div 
          className="flex justify-center mt-8 space-x-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {locations.map((_, index) => (
            <button
              key={index}
              onClick={() => goToLocation(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentLocation === index ? 'bg-primary w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              <img
                src={locations[currentLocation].image}
                alt={locations[currentLocation].name}
                className="w-full h-full object-cover"
              />
              
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{locations[currentLocation].name}</h3>
                <p className="text-gray-300">{locations[currentLocation].description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}