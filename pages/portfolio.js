import Portfolio from 'components/pages/Portfolio';
import React from 'react';
import { fetchOne } from 'services/contentful';

const HomePage = props => {
    return <Portfolio {...props} />;
};

export async function getStaticProps() {
    const data = await fetchOne('pagePortfolio');

    return {
        props: { ...data },
    };
}

export default HomePage;
