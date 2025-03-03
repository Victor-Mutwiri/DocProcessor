import PropTypes from 'prop-types';
import './ReviewResult.css';

const ReviewResult = ({ review }) => {
    return (
        <div className="review-result">
            {/* <h4>Review Results:</h4> */}
            <p>{review}</p>
        </div>
    );
};

ReviewResult.propTypes = {
    review: PropTypes.string.isRequired
};

export default ReviewResult;