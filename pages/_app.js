import '../styles/index.scss';
import FadeInSection from '../components/FadeInSection';
import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';

import Layout from '../components/layout';

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
  );
};

export default App;
