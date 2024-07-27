import "swiper/css";
import "./globals.css";
import Header from "./components/header/Header";
import NavBar from "./components/navbar/NavBar";
import ReduxProvider from "./Redux/ReduxProvider";
import Footer from "./components/footer/Footer";
import ButtomNav from "./components/buttom nav/ButtomNav";


export const metadata = {
  title: {
    default: "Tepo Shopping",
    template: "Tepo : %s",
  },
  description: `Tepo Shopping Is Your Way To find What You Searching For We Will Help You And We Will Make You Happy And Satisfied , mobile electronic , Clothes ,ETC...
    تيبو للتسوق الالكتروني هذا الموقع في خدمه بيع البضائع عن طريق الانترنت وسوف تصلك اليك اينما كنت 
  `,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body >
        <ReduxProvider>
          <Header />
          <NavBar />
          <main>{children}</main>
          <ButtomNav />
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
