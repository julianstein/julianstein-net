import Head from 'next/head';
import Link from 'next/link';
import Nav from '../components/nav';

//const name = 'Julian Stein';
export const siteTitle = 'julian stein';

const Layout = ({ children }) => {
  return (
    <div id="top" className="px-4 sm:px-12 lg:px-20 pt-4 sm:py-8 md:py-16">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header></header>

      <div className=" flex flex-col md:flex-row">
        <Nav navClass="flex flex-col text-3xl text-left px-1.5 w-100 md:w-80 pb-8 " />
        <main className="w-full md:w-3/4 flex-auto flex flex-col">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
