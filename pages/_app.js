import '../styles/index.scss';
import 'nprogress/nprogress.css'; //styles of nprogress

import { AnimatePresence, motion } from 'framer-motion';

import Layout from '../components/layout';

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
