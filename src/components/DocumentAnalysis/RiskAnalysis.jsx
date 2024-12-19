import { useState } from 'react'
import { API_BASE_URL } from '../config/config'


const RiskAnalysis = () => {
    const [risks, setRisks] = useState('Select a document to view risk analysis')

    const updateRisks = async (filename) => {
        if (!filename) return
        
        setRisks('Loading risks...')
        try {
            const response = await fetch(`${API_BASE_URL}/api/document-summary/${filename}`)
            const data = await response.json()
            
            if (data.error) {
                throw new Error(data.error)
            }
            
            setRisks(data.risks || 'No risks identified')
        } catch (error) {
            setRisks('Error loading risks')
        }
    }

    return (
        <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Risk Analysis</h3>
            <div className="text-sm space-y-2">
                <p className="text-gray-500">{risks}</p>
            </div>
        </div>
    )
}

export default RiskAnalysis 