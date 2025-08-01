import React, { useState } from 'react';

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      if (!res.ok) throw new Error('Failed to summarize');
      const data = await res.json();
      setSummary(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-zinc-900 dark:to-zinc-800 transition-colors">
      <header className="w-full px-4 py-6 flex items-center justify-between shadow-sm bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">📚 ReadCore</h1>
        {/* Dark mode toggle will go here */}
      </header>
      <main className="max-w-2xl mx-auto py-12 px-4">
        <div className="text-center text-gray-700 dark:text-gray-200">
          <h2 className="text-3xl font-semibold mb-2">Book Summaries, Reimagined</h2>
          <p className="mb-8">Get deep, detailed, or ultra-fast summaries of any book. Upload, select your mode, and get insights in seconds.</p>
        </div>
        <form className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Book Name</label>
            <input type="text" className="w-full rounded border px-3 py-2 bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400" value={bookName} onChange={e => setBookName(e.target.value)} placeholder="e.g. Sapiens, Harry Potter..." />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Paste Book Text (optional)</label>
            <textarea className="w-full rounded border px-3 py-2 bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4} value={text} onChange={e => setText(e.target.value)} placeholder="Paste book or chapter text here..." />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Or Upload Book File (txt or PDF)</label>
            <input type="file" accept=".txt,.pdf" onChange={handleFileChange} className="block w-full text-gray-700 dark:text-gray-200" />
            {file && <span className="text-xs text-gray-500 dark:text-gray-400">Selected: {file.name}</span>}
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
          <button type="submit" className="w-full py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50" disabled={loading}>{loading ? 'Summarizing...' : 'Summarize Book'}</button>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        </form>
        {summary && (
          <div className="mt-8 bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Summary Result</h3>
            <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">{JSON.stringify(summary, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
