import { motion } from 'framer-motion';

const logos = [
  // Add your logo image sources here
  '/path/to/logo1.png',
  '/path/to/logo2.png',
  '/path/to/logo3.png',
  '/path/to/logo4.png',
];

const LogoCarousel = () => {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex space-x-4"
        animate={{ x: '-100%' }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
      >
        {logos.map((logo, index) => (
          <motion.img
            key={index}
            src={logo}
            alt={`Logo ${index + 1}`}
            className="h-16 object-contain"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LogoCarousel;