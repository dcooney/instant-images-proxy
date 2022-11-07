import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Instant Images Proxy Server</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: 'http://getinstantimages.com'
    }
  };
}
