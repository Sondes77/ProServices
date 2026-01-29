import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-black py-6 mt-10">
      <div className="text-center">
        &copy; {new Date().getFullYear()} TrouvePro. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
