import React from "react";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
              SakanCom
            </h2>
            <p className="text-gray-400">{t("footer.about")}</p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center hover:bg-cyan-700 transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t("footer.quickLinks.title")}</h4>
            <ul className="space-y-2 text-gray-400">
              {t("footer.quickLinks.items", { returnObjects: true }).map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t("footer.services.title")}</h4>
            <ul className="space-y-2 text-gray-400">
              {t("footer.services.items", { returnObjects: true }).map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t("footer.contact.title")}</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin size={20} className="text-cyan-400 flex-shrink-0 mt-1" />
                <span>{t("footer.contact.address")}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={20} className="text-cyan-400" />
                <span>{t("footer.contact.phone")}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={20} className="text-cyan-400" />
                <span>{t("footer.contact.email")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            © 2025 SakanCom. {t("footer.rights")} |{" "}
            <a href="#" className="hover:text-cyan-400 transition-colors">
              {t("footer.legal")}
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-cyan-400 transition-colors">
              {t("footer.privacy")}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
