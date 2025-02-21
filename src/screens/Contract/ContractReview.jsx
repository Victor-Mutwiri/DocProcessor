import PropTypes from 'prop-types'
import "./ContractReview.css";
import ContractUpload from '../../components/ContractUpload/ContractUpload';
import ContractList from './ContractList';

const ContractReview = ({sessionId}) => {


  return (
    <div className="contract-review">
      <h2>Contract Review</h2>
      <ContractUpload sessionId={sessionId} />
      <ContractList sessionId={sessionId} />
    </div>
  );
};

ContractReview.propTypes = {
    sessionId: PropTypes.string.isRequired
}

export default ContractReview;
