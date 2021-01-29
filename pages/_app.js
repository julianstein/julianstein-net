import '../styles/index.scss';
import 'nprogress/nprogress.css'; //styles of nprogress
import FadeInSection from '../components/FadeInSection';
import Link from 'next/link';

import * as Icon from 'react-feather';

import { AnimatePresence, motion } from 'framer-motion';

import Layout from '../components/layout';

const App = ({ Component, pageProps, router }) => {
  return (
    <Layout path={router.asPath}>
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
              opacity: 0
            }
          }}>
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      <FadeInSection name="back-to-top">
        <p className="text-right -mt-8 mb-8 ">
          <Link href={router.asPath + '#top'} as={router.asPath}>
            <a href="#top">
              <Icon.ChevronUp className=" w-12 h-12 inline" />
            </a>
          </Link>
        </p>
      </FadeInSection>
    </Layout>
  );
};

export default App;
