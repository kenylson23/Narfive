import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
    layoutEffect: false
  });

  // Parallax transforms for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const floatingY1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const floatingY2 = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const floatingY3 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
          onError={(e) => {
            // Fallback to image if video fails to load
            const target = e.target as HTMLVideoElement;
            target.style.display = 'none';
            const fallbackDiv = target.nextElementSibling as HTMLElement;
            if (fallbackDiv) fallbackDiv.style.display = 'block';
          }}
        >
          <source src="https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/5198157/5198157-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
            display: 'none'
          }}
        />
      </motion.div>
      
      {/* Video Loading Overlay */}
      <motion.div 
        className="absolute inset-0 video-overlay"
        initial={{ opacity: isVideoLoaded ? 0 : 1 }}
        animate={{ opacity: isVideoLoaded ? 0 : 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Secondary Background Layer */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: floatingY1
        }}
      />
      
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Parallax Floating Elements - Different Layers */}
      <motion.div 
        className="absolute top-20 left-20 w-20 h-20 bg-primary opacity-30 rounded-full immersive-glow"
        style={{ y: floatingY2 }}
        animate={{ 
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.5, opacity: 0.8 }}
      />
      
      <motion.div 
        className="absolute top-40 right-32 w-16 h-16 bg-white opacity-25 rounded-full"
        style={{ y: floatingY1 }}
        animate={{ 
          x: [0, 20, 0],
          rotate: [0, -180, -360],
          boxShadow: [
            "0 0 20px rgba(255, 255, 255, 0.3)",
            "0 0 40px rgba(255, 255, 255, 0.6)",
            "0 0 20px rgba(255, 255, 255, 0.3)"
          ]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.6, opacity: 0.8 }}
      />
      
      <motion.div 
        className="absolute bottom-40 left-32 w-24 h-24 bg-primary opacity-25 rounded-full immersive-glow"
        style={{ y: floatingY3 }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.5, 0.25],
          rotate: [0, 45, 90, 45, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.4, opacity: 0.7 }}
      />
      
      {/* Additional Parallax Elements */}
      <motion.div 
        className="absolute top-1/3 left-1/4 w-12 h-12 bg-white opacity-10 rounded-full"
        style={{ y: floatingY2 }}
        animate={{ 
          y: [0, -25, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-14 h-14 bg-primary opacity-12 rounded-full"
        style={{ y: floatingY1 }}
        animate={{ 
          x: [0, -15, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-2/3 right-16 w-8 h-8 bg-white opacity-20 rounded-full"
        style={{ y: floatingY3 }}
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 90, 180]
        }}
        transition={{ 
          duration: 9, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        style={{ y: textY }}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 text-glow"
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        >
          Colégio <span className="text-primary text-glow">Narfive</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-white mb-8 drop-shadow-lg px-4"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          A QUALIDADE DE ENSINO QUE O TEU FILHO MERECE, VOCÊ ENCONTRA AQUI!
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <motion.button 
            className="bg-primary hover:bg-primary/80 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold interactive-hover immersive-glow section-transition relative overflow-hidden"
            onClick={() => scrollToSection('programs')}
            whileHover={{ 
              scale: 1.1,
              rotateY: 5,
              boxShadow: "0 0 40px rgba(106, 90, 205, 0.8)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/30 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Explore Nossos Programas</span>
          </motion.button>
          
          <motion.button 
            className="border-2 border-white text-white hover:bg-white hover:text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold interactive-hover section-transition relative overflow-hidden"
            whileHover={{ 
              scale: 1.1,
              rotateY: -5,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              boxShadow: "0 0 40px rgba(255, 255, 255, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => {
              const tourSection = document.getElementById('virtual-tour');
              if (tourSection) {
                tourSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Tour Virtual</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Video Controls */}
      {isVideoLoaded && (
        <motion.button
          className="absolute top-8 right-8 z-20 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          onClick={toggleVideo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isVideoPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </motion.button>
      )}

      {/* Enhanced Particle System */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            background: i % 3 === 0 ? 'rgba(106, 90, 205, 0.6)' : 'rgba(255, 255, 255, 0.5)',
          }}
          animate={{
            y: [0, -100 - Math.random() * 50, 0],
            x: [0, Math.sin(i) * 30, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 2.5, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Floating Geometric Shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`geo-${i}`}
          className="absolute opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${20 + Math.random() * 15}px`,
            height: `${20 + Math.random() * 15}px`,
            background: 'rgba(106, 90, 205, 0.3)',
            borderRadius: i % 2 === 0 ? '50%' : '0%',
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.cos(i) * 25, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Sparkle Effect */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="text-white text-sm mb-2 opacity-80"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Descubra mais
        </motion.div>
        
        <motion.div
          className="flex flex-col items-center cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          whileHover={{ scale: 1.2 }}
          onClick={() => scrollToSection('about')}
        >
          <motion.div 
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center relative overflow-hidden"
            whileHover={{ boxShadow: "0 0 20px rgba(255, 255, 255, 0.6)" }}
          >
            <motion.div
              className="w-1 h-2 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
