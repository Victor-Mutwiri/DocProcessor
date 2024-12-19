import { useState } from 'react'
import {API_BASE_URL} from '../config/config'

const DocumentSummary = () => {
    const [summary, setSummary] = useState('Select a document to view its summary')

    const updateSummary = async (filename) => {
        if (!filename) return
        
        setSummary('Loading summary...')
        try {
            const response = await fetch(`${API_BASE_URL}/api/document-summary/${filename}`)
            const data = await response.json()
            
            if (data.error) {
                throw new Error(data.error)
            }
            
            setSummary(data.summary || 'No summary available')
        } catch (error) {
            setSummary(`Error: ${error.message || 'Failed to load summary'}`)
        }
    }

    return (
        <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Document Summary</h3>
            <div className="text-sm space-y-2">
                <p className="text-gray-500">{summary}</p>
            </div>
        </div>
    )
}

export default DocumentSummary 