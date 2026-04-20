import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'VOIDHAUS™ | Wear The Silence',
  description: 'Gen Z Dark-Luxury Streetwear Brand. Engineered for the metropolitan void.',
  keywords: 'streetwear, dark luxury, voidhaus, brutalist fashion, techwear, luxury',
};

export default Meta;
