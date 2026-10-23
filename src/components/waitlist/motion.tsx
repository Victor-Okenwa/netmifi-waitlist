"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { MascotIcon } from "@/assets/svg/mascot-icon";
import { cn } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const mounted = useHasMounted();
  const reduce = useReducedMotion();

  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const mounted = useHasMounted();
  const reduce = useReducedMotion();

  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const mounted = useHasMounted();
  const reduce = useReducedMotion();

  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedMascot({ className }: { className?: string }) {
  const mounted = useHasMounted();
  const reduce = useReducedMotion();
  const animate = mounted && !reduce;

  return (
    <motion.div
      className={cn(className)}
      initial={animate ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: animate ? 0.6 : 0, ease: "easeOut" }}
    >
      <motion.div
        animate={
          animate ? { y: [0, -12, 0], rotate: [0, -2.4, 0, 2.4, 0] } : undefined
        }
        transition={
          animate
            ? { duration: 5.2, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      >
        <MascotIcon className="h-auto w-full drop-shadow-lg" />
      </motion.div>
    </motion.div>
  );
}
