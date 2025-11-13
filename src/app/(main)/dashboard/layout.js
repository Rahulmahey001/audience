import { Geist, Geist_Mono } from "next/font/google";
import UserProtectedRoute from '../../components/UserProtectedRoute';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "User Dashboard",
  description: "Welcome to the user dashboard.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProtectedRoute>
        {children}
              </UserProtectedRoute>
      </body>
    </html>
  );
}
