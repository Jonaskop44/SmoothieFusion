"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ErrorPage = () => {
  const previousPage = document.referrer || "/";

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-emerald-800">
      <motion.h1
        className="text-8xl font-bold"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        404
      </motion.h1>

      <motion.p
        className="mt-4 text-xl text-emerald-600"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Die Seite, die Sie suchen, existiert nicht.
      </motion.p>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            href={previousPage}
            className="rounded-lg bg-emerald-800 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-emerald-700"
          >
            Zurück zur vorherigen Seite
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
