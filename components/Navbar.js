import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white text-black py-4 px-6 flex justify-between items-center border-b shadow-sm">
      <div className="text-xl font-semibold">
        <Link href="/" className="text-2xl font-bold">Acme</Link>
      </div>
      <ul className="flex space-x-6 text-gray-700">
      </ul>
    </nav>
  );
};

export default Navbar;
