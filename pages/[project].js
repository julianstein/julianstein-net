import Project from 'components/pages/Project';
import React from 'react';
import { fetchAll, fetchOne } from 'services/contentful';

const ProjectPage = props => {
    return <Project {...props} />;
};

export async function getStaticPaths() {
    const projectPages = await fetchAll('entityProject');

    const paths = projectPages
        .filter(projects => {
            if (typeof projects.slug !== 'undefined') {
                return projects;
            }
        })
        .map(({ slug }) => {
            return {
                params: { project: slug },
            };
        });

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const data = await fetchOne('entityProject', {
        'fields.slug': params.project,
    });

    return {
        props: { ...data },
    };
}

export default ProjectPage;
