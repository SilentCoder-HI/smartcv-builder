"use client";

import React from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useSession } from "next-auth/react";
import { Github, Mail, Pencil, Linkedin, User, ArrowUpRight } from "lucide-react";

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const { data: session } = useSession();

  const handleSave = () => {
    console.log("Saving user info...");
    closeModal();
  };

  const fullName = session?.user?.name ?? "Not provided";
  const email = session?.user?.email ?? "Not provided";
  const city = (session?.user as any)?.city ?? "";
  const country = (session?.user as any)?.country ?? "";

  console.log(session?.user?.plan)
  const plan = session?.user?.plan ?? "";
  const hasLinkedIn = (session?.user as any)?.linkedIn ?? true; // assumed always linked
  const hasGithub = session?.user?.provider === "github";
  const hasGoogle = session?.user?.provider === "google";

  const missingLocation = !city || !country;

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 space-y-6 my-4">
      {/* Personal Info */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <Info label="Full Name" value={fullName} />
            <Info label="Email Address" value={email} />
            <Info label="City" value={city || "Not provided"} />
            <Info label="Country" value={country || "Not provided"} />
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <Pencil size={15} strokeWidth={3} />
          Edit
        </button>
      </div>

      {/* Plan Info */}
      <div className="flex items-center justify-between border-t pt-5 dark:border-gray-700">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Current Plan</p>
          <p className="text-sm font-medium text-gray-800 dark:text-white">{plan}</p>
        </div>
        <Button size="sm" variant="outline" className="gap-1">
          <ArrowUpRight size={14} />
          Upgrade
        </Button>
      </div>

      {/* Linked Accounts */}
      <div className="border-t pt-5 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Linked Accounts</p>
        <div className="flex gap-4">
          <LinkedAccount
            icon={<Linkedin size={18} />}
            name="LinkedIn"
            connected={hasLinkedIn}
          />
          <LinkedAccount
            icon={<Github size={18} />}
            name="GitHub"
            connected={hasGithub}
            disabled={hasGoogle}
          />
          <LinkedAccount
            icon={<Mail size={18} />}
            name="Google"
            connected={hasGoogle}
            disabled={hasGithub}
          />
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] mx-auto w-full m-4">
        <div className="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Personal Information
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Update your city and country to complete your profile.
          </p>

          <form className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <Label>Full Name (read-only)</Label>
                <Input
                  type="text"
                  defaultValue={fullName}
                  className="cursor-not-allowed opacity-70"
                />
              </div>
              <div>
                <Label>Email Address (read-only)</Label>
                <Input
                  type="text"
                  defaultValue={email}
                  className="cursor-not-allowed opacity-70"
                />
              </div>
              <div>
                <Label>City</Label>
                <Input type="text" defaultValue={city} />
              </div>
              <div>
                <Label>Country</Label>
                <Input type="text" defaultValue={country} />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button size="sm" variant="outline" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

// Subcomponent for info blocks
const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-sm font-medium text-gray-800 dark:text-white">{value}</p>
  </div>
);

// Subcomponent for Linked Account
const LinkedAccount = ({
  icon,
  name,
  connected,
  disabled = false,
}: {
  icon: React.ReactNode;
  name: string;
  connected: boolean;
  disabled?: boolean;
}) => (
  <div
    className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium ${
      connected
        ? "border-green-400 text-green-600 dark:border-green-500"
        : "border-gray-300 text-gray-500 dark:border-gray-700"
    } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
  >
    {icon}
    <span>{name}</span>
  </div>
);
