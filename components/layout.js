import Head from 'next/head';
import Link from 'next/link';
import Nav from '../components/nav';
import Projects from '../components/projects';
//const name = 'Julian Stein';
export const siteTitle = 'julian stein';

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header></header>

      <div className=" flex flex-col md:flex-row">
        <Nav />
        <main className="md:w-2/6 w-100 sm:mx-8 mx-5 flex-auto flex flex-col">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
