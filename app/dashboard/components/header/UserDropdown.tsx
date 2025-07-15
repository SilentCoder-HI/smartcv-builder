"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  FaChevronDown,
  FaUserEdit,
  FaCog,
  FaLifeRing,
  FaSignOutAlt,
} from "react-icons/fa";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { HugeiconsIcon } from '@hugeicons/react';
import { UserIcon } from '@hugeicons/core-free-icons';



export default function UserDropdown() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const user = {
    name: session?.user?.name || "User Name",
    email: session?.user?.email || "user@example.com",
    image: session?.user?.image,
    profileImageWidth: 44,
    profileImageHeight: 44,
    profileImageAlt: "User",
  };

  const dropdownItems = [
    {
      label: "Edit profile",
      href: "/dashboard?view=settings&sub=account",
      icon: <FaUserEdit className="text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300" size={24} />,
    },
    {
      label: "Account settings",
      href: "/profile",
      icon: <FaCog className="text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300" size={24} />,
    },
    {
      label: "Support",
      href: "/profile",
      icon: <FaLifeRing className="text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300" size={24} />,
    },
  ];

  const signOutItem = {
    label: "Sign out",
    onClick: () => signOut(),
    icon: <FaSignOutAlt className="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" size={24} />,
  };

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dark:text-gray-400"
      >
        <span className="mr-3 flex items-center justify-center h-11 w-11 rounded-full bg-blue-500 shadow-md ring-2 ring-blue-300 dark:ring-gray-700 transition-all duration-200 hover:scale-105 hover:ring-4">
          {session?.user?.image ? (
            <Image
              width={user.profileImageWidth}
              height={user.profileImageHeight}
              src={user.image as string}
              alt={user.profileImageAlt}
              className="object-cover rounded-full h-11 w-11 border-2 border-white dark:border-gray-800"
            />
          ) : (
            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-white/80 dark:bg-gray-800/80">
              <HugeiconsIcon
                icon={UserIcon}
                size={28}
                color="#6366f1"
                strokeWidth={2}
              />
            </span>
          )}
        </span>
        <FaChevronDown
          className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
          size={18}
        />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {user.name}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user.email}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          {dropdownItems.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                onClick={closeDropdown}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={signOutItem.onClick}
          className="w-full text-left flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          {signOutItem.icon}
          {signOutItem.label}
        </button>

      </Dropdown>
    </div>
  );
}
