import PropTypes from 'prop-types'
import "./ContractReview.css";
import ContractUpload from '../../components/ContractUpload/ContractUpload';
import ContractList from './ContractList';

const ContractReview = ({sessionId}) => {


  return (
    <div className="contract-review">
      <h2>Contract Review</h2>
      <div className='contract-review-container'>
        <section className='contract-files'>
          <ContractUpload sessionId={sessionId} />
          <ContractList sessionId={sessionId} />
        </section>
        <section className='review-section'>
          <h3>Review comes here</h3>
        </section>
      </div>
    </div>
  );
};

ContractReview.propTypes = {
    sessionId: PropTypes.string.isRequired
}

export default ContractReview;
