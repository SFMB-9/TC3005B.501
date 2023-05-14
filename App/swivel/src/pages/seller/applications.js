import SellerLayout from "@/components/seller/seller_layout";
import Searchbar from "@/components/general/searchbar";

export default function Applications() {
  return (
    <>
      <SellerLayout>
        <Searchbar
          leftItems={"Solicitudes de clientes"}
          placeholderText="Busca entre tus solicitudes"
          rightItems={"<Button>Ordenar por</Button>"}
        />
        Solicitudes
      </SellerLayout>
    </>
  );
}
