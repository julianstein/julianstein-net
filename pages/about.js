import About from 'components/pages/About';
import React from 'react';
import { fetchOne } from 'services/contentful';

const HomePage = props => {
    return <About {...props} />;
};

export async function getStaticProps() {
    const data = await fetchOne('pageAbout');

    return {
        props: { ...data },
    };
}

export default HomePage;
