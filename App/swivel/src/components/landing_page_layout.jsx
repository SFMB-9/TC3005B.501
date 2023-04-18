import Navbar from './navbar';
import Footer from './footer';

export default function LandingPageLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}