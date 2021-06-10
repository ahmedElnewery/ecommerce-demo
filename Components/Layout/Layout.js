import { Container } from "react-bootstrap"
import Header from './Header/Header'
import Footer from './Footer/Footer'
const Layout = (props) => {
  return < >
      <Header/>
      <Container>
          <main>
      {props.children}
          </main>
      </Container>
      <Footer/>
      
  </>;
};

export default Layout;
