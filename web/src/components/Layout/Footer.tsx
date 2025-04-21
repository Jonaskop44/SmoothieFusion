import Link from "next/link";
import { Icon } from "@iconify/react";

const FooterLayout = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Icon
                icon="solar:bowl-spoon-bold"
                className="h-6 w-6 text-emerald-400"
              />
              <span className="text-xl font-bold text-emerald-400">
                SmoothieFusion
              </span>
            </div>
            <p className="text-gray-400">
              Deine Plattform für köstliche und gesunde Smoothie-Rezepte.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Startseite
                </Link>
              </li>
              <li>
                <Link
                  href="/rezepte"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Rezepte
                </Link>
              </li>
              <li>
                <Link
                  href="/erstellen"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Erstellen
                </Link>
              </li>
              <li>
                <Link
                  href="/ueber-uns"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Über uns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/datenschutz"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  href="/agb"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  AGB
                </Link>
              </li>
              <li>
                <Link
                  href="/impressum"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Impressum
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} SmoothieFusion. Alle Rechte
            vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;
