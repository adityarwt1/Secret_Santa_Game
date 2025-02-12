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
          <Link href="/dashboard" className="hover:text-black">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/participants" className="hover:text-black">
            Participants
          </Link>
        </li>
        <li>
          <Link href="/assignments" className="hover:text-black">
            Assignments
          </Link>
        </li>
        <li>
          <Link href="/rules" className="hover:text-black">
            Rules & Guidelines
          </Link>
        </li>
        <li>
          <Link href="/profile" className="hover:text-black">
            My Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
