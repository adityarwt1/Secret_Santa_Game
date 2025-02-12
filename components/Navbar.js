import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white text-black py-4 px-6 flex justify-between items-center border-b shadow-sm">
      <div className="text-xl font-semibold">
        <Link href="/">Secret Santa (Acme)</Link>
      </div>
      <ul className="flex space-x-6 text-gray-700">
        <li>
          <Link href="/" className="hover:text-black" aria-disabled>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-black"aria-disabled>
            Participants
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-black"aria-disabled>
            Assignments
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-black"aria-disabled>
            Rules & Guidelines
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-black" aria-disabled>
            My Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
