import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/sakanComImage.png";

export default function ClientAuthLayout({
  title,
  subtitle,
  eyebrow,
  logoAlt,
  footerText,
  footerLinkText,
  footerLinkTo,
  children,
}) {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50">
      <div className="container mx-auto grid min-h-[calc(100vh-80px)] grid-cols-1 items-center gap-10 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="hidden lg:block">
          <div className="max-w-md">
            <img
              src={Logo}
              alt={logoAlt}
              className="mb-6 h-24 w-24 object-contain"
            />
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
              {eyebrow}
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900">
              {title}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {subtitle}
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
          <div className="mb-7 text-center lg:hidden">
            <img
              src={Logo}
              alt={logoAlt}
              className="mx-auto mb-4 h-20 w-20 object-contain"
            />
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-600">
              {eyebrow}
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">{title}</h1>
            <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
          </div>

          {children}

          <p className="mt-6 text-center text-sm text-slate-500">
            {footerText}{" "}
            <Link
              to={footerLinkTo}
              className="font-semibold text-cyan-700 transition-colors hover:text-cyan-800"
            >
              {footerLinkText}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
