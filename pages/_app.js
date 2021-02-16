import '../styles/index.scss';

import { useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Provider } from 'react-redux';

import Layout from '../components/layout';
import * as gtag from '../lib/gtag';
import store from '../store';

import { loadState, saveState } from '../lib/sessionStorage';

store.subscribe(() => {
  saveState(store.getState());
});

const App = ({ Component, pageProps, router }) => {
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
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
  );
};

export default App;
