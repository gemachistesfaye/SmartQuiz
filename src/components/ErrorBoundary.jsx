import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="glass-card max-w-md w-full p-10 text-center">
            <div className="bg-red-500/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="text-red-500" size={40} />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>
            <p className="text-gray-400 mb-8 leading-relaxed">
              An unexpected error occurred. Try reloading the page.
            </p>
            <button
              onClick={this.handleReload}
              className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} /> Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
