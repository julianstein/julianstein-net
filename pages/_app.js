import '../styles/index.scss';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/layout';

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
//Binding events.

const App = ({ Component, pageProps, router }) => {
  return (
    <Layout>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.asPath}
          initial="pageInitial"
          animate="pageAnimate"
          exit="pageExit"
          transition={{ duration: 0.25, type: 'tween' }}
          variants={{
            pageInitial: {
              opacity: 0
            },
            pageAnimate: {
              opacity: 1
            },
            pageExit: {
              opacity: 0,
              backgroundColor: 'white'
            }
          }}>
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default App;
