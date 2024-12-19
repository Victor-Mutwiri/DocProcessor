import PropTypes from 'prop-types'
import '../../styles/QueryTemplates.css'

const QueryTemplates = ({ onSelect }) => {
    const templates = [
        {
            id: 'summary',
            icon: '📄',
            label: 'Summary',
            query: 'Please provide a summary of the key points in this document.',
            tooltip: 'Get a concise overview of the document'
        },
        {
            id: 'obligations',
            icon: '✓',
            label: 'Obligations',
            query: 'What are the main obligations and responsibilities in this document?',
            tooltip: 'List all key responsibilities and duties'
        },
        {
            id: 'risks',
            icon: '⚠️',
            label: 'Risks',
            query: 'What are the potential risks and red flags in this document?',
            tooltip: 'Identify potential issues and concerns'
        },
        {
            id: 'dates',
            icon: '📅',
            label: 'Key Dates',
            query: 'What are the important dates and deadlines mentioned in this document?',
            tooltip: 'Find all important timelines and deadlines'
        }
    ]

    return (
        <div className="query-templates">
            {templates.map((template) => (
                <button
                    key={template.id}
                    onClick={() => onSelect(template.query)}
                    className="template-button"
                >
                    <span className="template-icon">{template.icon}</span>
                    <span className="template-label">{template.label}</span>
                    <span className="template-tooltip">
                        {template.tooltip}
                    </span>
                </button>
            ))}
        </div>
    )
}

QueryTemplates.propTypes = {
    onSelect: PropTypes.func.isRequired
}

export default QueryTemplates 