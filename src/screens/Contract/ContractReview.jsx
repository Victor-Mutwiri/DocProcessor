import PropTypes from 'prop-types'
import "./ContractReview.css";
import ContractUpload from '../../components/ContractUpload/ContractUpload';
import ContractList from './ContractList';
import ReviewResult from './ReviewResult';
import { useState } from 'react';
import FeaturesNav from '../../components/FeaturesNav/FeaturesNav';

const ContractReview = ({sessionId, onLogout}) => {
  const [review, setReview] = useState('');
  return (
    <div className="contract-review">
      <h1 className="text-3xl font-bold mb-5 text-center">
        Contract Review
      </h1>
      <FeaturesNav onLogout={onLogout}/>
      <div className='contract-review-container'>
        <section className='contract-files'>
          <ContractUpload sessionId={sessionId} />
          <ContractList sessionId={sessionId} setReview={setReview}/>
        </section>
        <section className='review-section'>
          <ReviewResult review={review}/>
        </section>
      </div>
    </div>
  );
};

ContractReview.propTypes = {
    sessionId: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired
}

export default ContractReview;
