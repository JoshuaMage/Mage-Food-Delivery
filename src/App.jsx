import Header from "./component/header/Header";
import { CartProvider } from "./component/store/CartContext";
import MiddleContainer from "./component/container/MiddleContainer";
import Footer from "./component/footer/Footer";

function App() {
  return (
    <div id="apps">
      <CartProvider>
        <Header />
        <MiddleContainer id="container" />
      </CartProvider> 
      <Footer />
    </div>
  );
}

export default App;
