import React, { useState, useEffect } from 'react';

const MODES = [
  { value: 'standard', label: 'Standard Summary (Deep, Chapter-by-Chapter)' },
  { value: 'asap', label: 'ASAP Summary (Compression Level)' },
];
const COMPRESSION_LEVELS = [
  { value: 15, label: '15% (ASAP) — 2–3 min read' },
  { value: 20, label: '20% (Hours) — 5–7 min read' },
  { value: 30, label: '30% (1 Day) — 10–15 min read' },
  { value: 50, label: '50% (Some Days) — 30 min read' },
  { value: 70, label: '70% (Near Full Read) — 60 min read' },
];

function App() {
  const [bookName, setBookName] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState('standard');
  const [compression, setCompression] = useState(15);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null); // Clear error when file is selected
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'text/plain' || file.type === 'application/pdf') {
        setFile(file);
        setError(null);
      } else {
        setError('Please upload only TXT or PDF files');
      }
    }
  };

  const handleInputChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter(e.target.value);
    setError(null); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!bookName.trim()) {
      setError('Please enter a book name');
      return;
    }
    
    if (!text.trim() && !file) {
      setError('Please provide either book text or upload a file');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSummary(null);
    try {
      const formData = new FormData();
      formData.append('bookName', bookName);
      formData.append('mode', mode);
      if (mode === 'asap') formData.append('compression', String(compression));
      if (text) formData.append('text', text);
      if (file) formData.append('file', file);
      const res = await fetch('http://localhost:3000/summarize', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to summarize');
      }
      const data = await res.json();
      setSummary(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (summary) {
      try {
        await navigator.clipboard.writeText(summary.summary);
        alert('Summary copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const downloadSummary = () => {
    if (summary) {
      const blob = new Blob([summary.summary], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${summary.bookName}_summary.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const clearForm = () => {
    setBookName('');
    setText('');
    setFile(null);
    setMode('standard');
    setCompression(15);
    setSummary(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-zinc-900 dark:to-zinc-800 transition-colors">
      <header className="w-full px-4 py-6 flex items-center justify-between shadow-sm bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">📚 ReadCore</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>
      <main className="max-w-2xl mx-auto py-12 px-4">
        <div className="text-center text-gray-700 dark:text-gray-200">
          <h2 className="text-3xl font-semibold mb-2">Book Summaries, Reimagined</h2>
          <p className="mb-8">Get deep, detailed, or ultra-fast summaries of any book. Upload, select your mode, and get insights in seconds.</p>
        </div>
        <form className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Book Name</label>
            <input 
              type="text" 
              className="w-full rounded border px-3 py-2 bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400" 
              value={bookName} 
              onChange={handleInputChange(setBookName)} 
              placeholder="e.g. Sapiens, Harry Potter..." 
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Paste Book Text (optional)</label>
            <textarea 
              className="w-full rounded border px-3 py-2 bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400" 
              rows={4} 
              value={text} 
              onChange={handleInputChange(setText)} 
              placeholder="Paste book or chapter text here..." 
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Or Upload Book File (txt or PDF)</label>
            <div 
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                accept=".txt,.pdf" 
                onChange={handleFileChange} 
                className="hidden" 
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-gray-600 dark:text-gray-400">
                  {file ? (
                    <span className="text-green-600 dark:text-green-400">✓ {file.name}</span>
                  ) : (
                    <>
                      <div className="text-2xl mb-2">📁</div>
                      <div>Click to upload or drag and drop</div>
                      <div className="text-sm mt-1">TXT, PDF up to 10MB</div>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Summarization Mode</label>
            <select className="w-full rounded border px-3 py-2 bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700" value={mode} onChange={e => setMode(e.target.value)}>
              {MODES.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </div>
          {mode === 'asap' && (
            <div>
              <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Compression Level</label>
              <select className="w-full rounded border px-3 py-2 bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700" value={compression} onChange={e => setCompression(Number(e.target.value))}>
                {COMPRESSION_LEVELS.map(lvl => <option key={lvl.value} value={lvl.value}>{lvl.label}</option>)}
              </select>
            </div>
          )}
          <div className="flex gap-3">
            <button type="submit" className="flex-1 py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" disabled={loading}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Summarizing...
                </>
              ) : (
                '📚 Summarize Book'
              )}
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              🗑️ Clear
            </button>
          </div>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-300 text-sm">
              ⚠️ {error}
            </div>
          )}
        </form>
        {summary && (
          <div className="mt-8 bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Summary: {summary.bookName}</h3>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {summary.mode === 'asap' ? `${summary.compression}% compression` : 'Standard summary'}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  📋 Copy
                </button>
                <button
                  onClick={downloadSummary}
                  className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                >
                  💾 Download
                </button>
              </div>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {summary.summary.split('\n').map((line: string, index: number) => {
                if (line.trim() === '') return <br key={index} />;
                if (line.startsWith('1. 📘') || line.startsWith('2. 🧠') || line.startsWith('3. 👤') || line.startsWith('4. 💬') || line.startsWith('5. ⚙️')) {
                  return <h4 key={index} className="text-lg font-semibold mt-8 mb-4 text-blue-600 dark:text-blue-400 border-b border-gray-200 dark:border-gray-700 pb-2">{line}</h4>;
                }
                if (line.match(/^\d+\./)) {
                  return <h5 key={index} className="text-md font-medium mt-6 mb-3 text-gray-800 dark:text-gray-200">{line}</h5>;
                }
                return <p key={index} className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">{line}</p>;
              })}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Processed {summary.textLength} characters in {summary.chunksProcessed} chunks
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
