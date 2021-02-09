import '../styles/index.scss';

import { AnimatePresence, motion } from 'framer-motion';
import { Provider } from 'react-redux';
import Head from 'next/head';
import Layout from '../components/layout';
import store from '../store';

const App = ({ Component, pageProps, router }) => {
  return (
    <>
      <Head>
        <script src="https://unpkg.com/smoothscroll-polyfill/dist/smoothscroll.min.js"></script>
        <script src="https://unpkg.com/smoothscroll-anchor-polyfill"></script>
      </Head>
      <Provider store={store}>
        <Layout>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={router.asPath}
              initial="pageInitial"
              animate="pageAnimate"
              exit="pageExit"
              transition={{ duration: 0.25 }}
              variants={{
                pageInitial: {
                  opacity: 0
                },
                pageAnimate: {
                  opacity: 1
                },
                pageExit: {
                  opacity: 0
                }
              }}>
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      </Provider>
    </>
  );
};

export default App;
