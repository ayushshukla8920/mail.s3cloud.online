import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
      onFinish();
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-6xl font-extrabold flex space-x-2">
        <span className="splash-letter animate-splash">Postify</span>
      </div>

      {/* Local style tag for animation */}
      <style>
        {`
          @keyframes grayToRed {
            0% {
              color: #9ca3af; /* Tailwind gray-400 */
            }
            100% {
              color: #ef4444; /* Tailwind red-500 */
            }
          }

          .splash-letter {
            color: #9ca3af;
          }

          .animate-splash {
            animation: grayToRed 1s ease-out forwards;
          }

          .delay-300 {
            animation-delay: 0.3s;
          }
        `}
      </style>
    </div>
  );
}
