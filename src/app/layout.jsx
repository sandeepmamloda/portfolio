import Footer from "@/components/common/footer/footer";
import Navbar from "@/components/common/navbar/navbar";
import CustomCursor from "./customcursor"; // ← ADD
import "./globals.css";

export const metadata = {
  title: "Portfolio",
  description: "Contact Me",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor /> {/* ← ADD */}
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}