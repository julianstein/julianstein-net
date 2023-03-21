import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { Provider } from 'react-redux';

import Layout from '../components/layout';
import * as gtag from '../lib/gtag';
import { saveState } from '../lib/sessionStorage';
import store from '../store';
import 'styles/index.scss';

store.subscribe(() => {
    saveState(store.getState());
});

const App = ({ Component, pageProps, router }) => {
    useEffect(() => {
        const handleRouteChange = url => {
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
                <AnimatePresence mode="wait">
                    <motion.div
                        key={router.asPath}
                        initial="pageInitial"
                        animate="pageAnimate"
                        exit="pageExit"
                        transition={{ duration: 0.25 }}
                        variants={{
                            pageInitial: {
                                opacity: 0,
                            },
                            pageAnimate: {
                                opacity: 1,
                            },
                            pageExit: {
                                opacity: 0,
                            },
                        }}
                    >
                        <Component {...pageProps} />
                    </motion.div>
                </AnimatePresence>
            </Layout>
        </Provider>
    );
};

App.propTypes = {
    Component: PropTypes.any,
    pageProps: PropTypes.any,
    router: PropTypes.shape({
        asPath: PropTypes.any,
        events: PropTypes.shape({
            off: PropTypes.func,
            on: PropTypes.func,
        }),
    }),
};

export default App;
