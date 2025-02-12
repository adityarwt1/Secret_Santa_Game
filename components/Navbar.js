import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-red-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">
        <Link href="/">Acme Secret Santa</Link>
      </div>
      <ul className="flex space-x-6">
        <li>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/participants" className="hover:underline">
            Participants
          </Link>
        </li>
        <li>
          <Link href="/assignments" className="hover:underline">
            Assignments
          </Link>
        </li>
        <li>
          <Link href="/rules" className="hover:underline">
            Rules & Guidelines
          </Link>
        </li>
        <li>
          <Link href="/profile" className="hover:underline">
            My Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;