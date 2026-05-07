import Navbar from "@/components/common/navbar/navbar";
import Footer from "@/components/common/footer/footer";
import "./globals.css";

export const metadata = {
  title: "Portfolio",
  description: "Contact Me",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}