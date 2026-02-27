import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl px-8 py-12 text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          🔥 Workflow Builder
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          No-Code Generative Building Workflows
        </p>
        <p className="text-lg text-gray-600 mb-12">
          Turn text prompts into 3D building concepts with AI. No code. No complexity.
        </p>
        
        <Link 
          href="/canvas"
          className="inline-block px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
        >
          Open Workflow Canvas →
        </Link>

        <div className="mt-16 grid grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="font-bold mb-2">Input</h3>
            <p className="text-sm text-gray-600">Text prompts, PDFs, images</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="font-bold mb-2">AI Process</h3>
            <p className="text-sm text-gray-600">GPT + DALL-E generation</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">🏗️</div>
            <h3 className="font-bold mb-2">3D Output</h3>
            <p className="text-sm text-gray-600">Buildings & concept images</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 text-sm text-gray-500">
        Day 1 Sprint • Built by Rutik & Chhawa 🔥
      </div>
    </div>
  );
}
