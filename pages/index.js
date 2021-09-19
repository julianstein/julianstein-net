import Home from 'components/pages/Home';
import React from 'react';
import { fetchOne } from 'services/contentful';

const HomePage = props => {
    return <Home {...props} />;
};

export async function getStaticProps() {
    const data = await fetchOne('pageHome');

    return {
        props: { ...data },
    };
}

export default HomePage;
