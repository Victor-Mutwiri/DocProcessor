const LoadingSpinner = ({ size = 'medium', color = 'blue' }) => {
    const sizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12'
    }

    const colorClasses = {
        blue: 'border-blue-500',
        green: 'border-green-500',
        red: 'border-red-500'
    }

    return (
        <div className="flex justify-center items-center">
            <div
                className={`
                    ${sizeClasses[size]}
                    border-2
                    ${colorClasses[color]}
                    border-t-transparent
                    rounded-full
                    animate-spin
                `}
            />
        </div>
    )
}

export default LoadingSpinner 