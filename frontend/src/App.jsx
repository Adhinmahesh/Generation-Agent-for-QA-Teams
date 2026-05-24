import React, { useState } from 'react';
import './App.css';

function App() {
  const [sourceCode, setSourceCode] = useState('');
  const [className, setClassName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source_code: sourceCode, class_name: className })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ status: 'failed', logs: 'Connection to backend failed.' });
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>AI QA Automation Agent</h1>
      </header>
      
      <div className="layout">
        <div className="input-panel">
          <input 
            type="text" 
            placeholder="Target Class Name (e.g., UserService)" 
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="class-input"
          />
          <textarea 
            placeholder="Paste Java source code here..." 
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            className="code-editor"
          />
          <button onClick={handleGenerate} disabled={loading || !sourceCode || !className} className="generate-btn">
            {loading ? 'Agent is working...' : 'Generate & Validate Tests'}
          </button>
        </div>

        <div className="output-panel">
          {result && (
            <div className={`status-banner ${result.status}`}>
              Status: {result.status.toUpperCase()} | Attempts: {result.attempts || 0}
            </div>
          )}
          
          <div className="code-output">
            <h3>Generated Test Code</h3>
            <pre>{result ? result.final_code : 'Awaiting generation...'}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
