import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white px-6 py-4">
      <div className="text-sm mt-2">
        &copy; {new Date().getFullYear()} TaskSchedulingApp™
      </div>
    </footer>
  );
};

export default Footer;
