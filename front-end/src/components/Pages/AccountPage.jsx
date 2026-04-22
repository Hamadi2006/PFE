import React from "react";
import { useTranslation } from "react-i18next";

export default function AccountPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50">
      <section className="container mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-900">
          {t("clientAccount.title")}
        </h1>
      </section>
    </main>
  );
}
