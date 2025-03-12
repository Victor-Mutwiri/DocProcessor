import PropTypes from 'prop-types';
import './ReviewResult.css';

const ReviewResult = ({ review }) => {
    const formatReview = (text) => {
        return text
            .replace(/\n/g, '<br/>')
            .replace(/(Source: [^\n]+)/g, '<strong>$1</strong>')
            .replace(/(1\.|2\.|3\.|4\.|5\.)/g, '<strong>$1</strong>') // Bold the numbered points
            .replace(/(Summary of Key Terms and Obligations|Identification of any overly binding or unfavorable clauses:|Potential hidden pitfalls or liabilities:|Areas with ambiguous or unclear language:|Recommendation:)/g, '<strong>$1</strong>'); // Bold the section headers
    }
    return (
        <div className="review-result">
            {/* <h4>Review Results:</h4> */}
            <p dangerouslySetInnerHTML={{ __html: formatReview(review) }} />
        </div>
    );
};

ReviewResult.propTypes = {
    review: PropTypes.string.isRequired
};

export default ReviewResult;