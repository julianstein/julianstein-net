const contentfulConfig = {
    accessToken: process.env.CONTENTFUL_TOKEN,
    environment: process.env.CONTENTFUL_ENV,
    host: process.env.CONTENTFUL_HOST,
    space: process.env.CONTENTFUL_SPACE_ID,
};

export { contentfulConfig };
