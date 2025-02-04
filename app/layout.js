import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./(components)/Nav";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ticketing App",
  description: "Generated Dabs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen max-h-screen">
          <Navbar />
          <div className="flex-grow overflow-y-auto bg-gradient-to-br from-indigo-700/80 via-blue-800/70 to-indigo-600/90 text-default-text">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
