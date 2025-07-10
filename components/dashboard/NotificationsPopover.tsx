import { useState } from "react";
const notifications = [
  { id: 1, msg: "Your PDF export is ready!", time: "5 min ago" },
];

export function NotificationsPopover({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button onClick={() => setOpen(o => !o)} className="relative">
        {children}
        {notifications.length > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-20 p-4">
          <h4 className="font-bold mb-2">Notifications</h4>
          {notifications.length === 0 ? (
            <p className="text-gray-400">No notifications.</p>
          ) : (
            <ul className="space-y-2">
              {notifications.map(n => (
                <li key={n.id} className="flex justify-between">
                  <span>{n.msg}</span>
                  <span className="text-xs text-gray-400">{n.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}