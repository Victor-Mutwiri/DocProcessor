/* import { API_BASE_URL } from '../../config/config'
import { useState, useEffect } from 'react' */
import PropTypes from 'prop-types'
import './Processing.css'

const Processing = ({ status, showModal}) => {

  return (
    <div className="processing-container">
      {status === 'Idle' ? (
        <p>Document is being processed...</p>
      ) : (
        <p>{status}</p>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Document processed successfully</p>
          </div>
        </div>
      )}
    </div>
  )
}

Processing.propTypes = {
    status: PropTypes.string.isRequired,
    showModal: PropTypes.bool.isRequired,
    }

export default Processing