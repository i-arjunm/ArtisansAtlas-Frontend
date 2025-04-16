import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-[#FAF9F6] z-50"
    >
      <motion.div
        animate={{
          rotate: 360,
          transition: { duration: 1, repeat: Infinity, ease: "linear" }
        }}
      >
        <ShoppingCart size={48} className="text-[#5C4033]" />
      </motion.div>
    </motion.div>
  );
};

export default Preloader;