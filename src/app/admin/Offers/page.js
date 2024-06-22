import dynamic from 'next/dynamic';

const OffersPPage = dynamic(() => import('./OffersPPage'), { ssr: false });

const Offers = () => {
  return (
    <>
      <OffersPPage />
    </>
  );
};

export default Offers;
