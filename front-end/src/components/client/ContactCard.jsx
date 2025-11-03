import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MessageCircle } from "lucide-react";
import axios from "axios" ; 
const ContactCard = ({ prix = 0, telephone_contact = '', email_contact = '', nom_contact = '',immobilier }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    immobilier_id: immobilier.id
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-6 sticky top-6">
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-cyan-600 mb-2">
          {Number(prix).toLocaleString('fr-MA')} MAD
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {t('contactCard.negotiablePrice')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder={t('contactCard.fullName')}
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder={t('contactCard.email')}
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
        />
        <input
          type="tel"
          name="phone"
          placeholder={t('contactCard.phone')}
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
        />
        <textarea
          name="message"
          rows="3"
          placeholder={t('contactCard.message')}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-cyan-600 focus:outline-none resize-none"
        />
        <button
          type="submit"
          className="w-full bg-cyan-600 text-white py-4 rounded-lg font-bold hover:bg-cyan-700 transition flex items-center justify-center"
        >
          <Mail className="w-5 h-5 mr-2" />
          {t('contactCard.sendRequest')}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        <a
          href={`tel:${telephone_contact}`}
          className="flex items-center justify-center w-full py-3 border-2 border-cyan-600 text-cyan-600 rounded-lg font-semibold hover:bg-cyan-600 hover:text-white transition"
        >
          <Phone className="w-5 h-5 mr-2" />
          {t('contactCard.call')}
        </a>

        <a
          href={`https://wa.me/${telephone_contact.replace(/\s/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          {t('contactCard.whatsapp')}
        </a>
      </div>

      <div className="mt-6 pt-6 border-t dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {t('contactCard.contactedBy')}
        </p>
        <div className="flex items-center">
          <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {nom_contact
              ? nom_contact.split(' ').map((n) => n[0]).join('')
              : ''}
          </div>
          <div className="ml-3">
            <p className="font-bold text-gray-900 dark:text-white">
              {nom_contact}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('contactCard.realEstateAgent')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
