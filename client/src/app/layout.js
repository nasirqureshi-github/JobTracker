import "./globals.css";
import { Toaster } from "sonner";
export const metadata = {
  title: "JobTracker | Organize your job search",
  description: "A focused workspace for your career search",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
