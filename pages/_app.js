import Layout from "../Components/Layout/Layout";
import wrapper from "../store";
import "./../sass/_custom.scss";

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default wrapper.withRedux(App);
