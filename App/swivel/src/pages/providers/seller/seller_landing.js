
export default function SellerLandingPage({ children }) {
  return (
    <>
      {/* <nav style={{backgroundColor: 'grey', padding: '20px'}}>
        <a href="#" style={{ padding: '1250px'}}>Profile</a>
      </nav> */}
      <div style={{ padding: '200px'}}>
        <button type="button" style={{ padding: '50px', margin: '50px'}}>Solicitudes de Compra</button>
        <button type="button" style={{ padding: '50px', margin: '50px'}}>Solicitudes de Prueba de Manejo</button>
      </div>
    </>
  );
}
