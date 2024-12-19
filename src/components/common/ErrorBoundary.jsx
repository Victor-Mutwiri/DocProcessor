import { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="text-red-800 font-semibold mb-2">
                        Something went wrong
                    </h3>
                    <p className="text-red-600 text-sm">
                        {this.state.error?.message || 'An error occurred'}
                    </p>
                    <button
                        onClick={() => this.setState({ hasError: false, error: null })}
                        className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                        Try again
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary 