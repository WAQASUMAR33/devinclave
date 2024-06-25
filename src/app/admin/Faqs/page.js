import dynamic from 'next/dynamic';

const FaqPage = dynamic(() => import('./FaqPage'), { ssr: false });


const Offers = () => {
  return (
    <>
      <FaqPage />
    </>
  );
};

export default Offers;
