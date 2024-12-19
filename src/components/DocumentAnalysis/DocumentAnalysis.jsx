import DocumentSummary from './DocumentSummary'
import RiskAnalysis from './RiskAnalysis'
import '../../styles/DocumentAnalysis.css'

const DocumentAnalysis = () => {
    return (
        <div className="analysis-container">
            <div className="analysis-grid">
                <DocumentSummary />
                <RiskAnalysis />
            </div>
        </div>
    )
}

export default DocumentAnalysis 