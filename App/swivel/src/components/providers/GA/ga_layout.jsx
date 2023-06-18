import GANavbar from "./navbar";

export default function GALayout({ children }) {
  return (
    <>
      <GANavbar/>
      <div className="min-vh-100">
        {children}
      </div>
    </>
  );
}