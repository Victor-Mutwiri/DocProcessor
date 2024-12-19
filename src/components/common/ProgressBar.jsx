const ProgressBar = ({ progress, status }) => {
    return (
        <div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 my-4">
                <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <p className="text-sm text-gray-600 text-center">{status}</p>
        </div>
    )
}

export default ProgressBar 