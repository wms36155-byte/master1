"use client";

import Link from "next/link";
import Container from "./Container";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-white/10 bg-black/30 backdrop-blur-xl mt-20"
    >
      <Container className="py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-black">
              Master<span className="text-green-500">Laser</span>
            </h2>

            <p className="text-white/50 text-sm mt-3 leading-relaxed">
              Zamonaviy texnika ijarasi platformasi.
              Tez, ishonchli va qulay xizmat.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Bo‘limlar
            </h3>

            <div className="flex flex-col gap-2 text-sm text-white/60">

              <Link href="/" className="hover:text-green-400 transition">
                Bosh sahifa
              </Link>

              <Link href="/equipment" className="hover:text-green-400 transition">
                Texnikalar
              </Link>

              <Link href="/dashboard" className="hover:text-green-400 transition">
                Dashboard
              </Link>

              <Link href="/login" className="hover:text-green-400 transition">
                Login
              </Link>

              {/* BONUS: CONTACT SCROLL LINK */}
              <Link href="#contact" className="hover:text-green-400 transition">
                Bog‘lanish
              </Link>

            </div>
          </div>

          {/* CONTACT + SOCIAL */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Aloqa
            </h3>

            <div className="text-sm text-white/60 space-y-2">
              <p>📍 Tashkent, Uzbekistan</p>
              <p>📞 +998 99 501 00 39</p>
              <p>✉️ support@masterlaser.uz</p>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-4 mt-5">

              <a
                href="https://instagram.com/masterlaser_uz"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={20} className="text-pink-400" />
              </a>

              <a
                href="https://t.me/masterlaser"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegramPlane size={20} className="text-blue-400" />
              </a>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40 text-sm">
          © {new Date().getFullYear()} MasterLaser. Barcha huquqlar himoyalangan.
        </div>

      </Container>
    </footer>
  );
}