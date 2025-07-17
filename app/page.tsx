import React from 'react';

export const dynamic = 'force-dynamic';

// --- Helper Icon Component ---
// Using an inline SVG for the icon to keep everything in one file.
const CodeBracketIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
    />
  </svg>
);

// --- Helper Table Component ---
const EnvTable = ({ entries, title, description, total }: { entries: [string, string | undefined][], title: string, description: string, total: number }) => (
    <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="border border-gray-200 rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                <tr>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                        Variable Name
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {entries.length > 0 ? (
                    entries.map(([key, value], index) => (
                        <tr key={key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 break-all">
                                {key}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <code
                                    className="bg-gray-200 text-gray-800 rounded px-2 py-1 break-all">{String(value)}</code>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">
                            No environment variables found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
        <div className="bg-gray-50 px-6 py-4 text-right">
             <p className="text-xs text-gray-500">
                Total Variables: {total}
             </p>
        </div>
    </div>
);


// --- Main Page Component ---
// This component receives the environment variables as props and renders them.
const EnvironmentPage = () => {
    const allVars = process.env || {};
    const allVarEntries = Object.entries(allVars);

    const publicVarEntries = allVarEntries.filter(([key]) => key.startsWith('NEXT_PUBLIC_'));

  return (
    <>
      {/* The 'next/head' import which was causing a build error has been removed.
        The necessary style and script tags are placed here directly as a workaround.
        This preserves the page's appearance in an environment where Next.js modules can't be resolved.
      */}
      <title>Environment Variables</title>
      <meta name="description" content="A Next.js page to display environment variables." />
      <link rel="icon" href="/favicon.ico" />
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="https://cdn.tailwindcss.com"></script>

      {/* --- Main Content --- */}
      <main className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* --- Header --- */}
          <div className="bg-gray-800 p-6">
            <div className="flex items-center">
              <CodeBracketIcon className="h-8 w-8 text-cyan-400 mr-4" />
              <div>
                <h1 className="text-2xl font-bold text-white">Environment Variables</h1>
                <p className="text-gray-300 mt-1">
                  A complete list of environment variables accessible on the server.
                </p>
              </div>
            </div>
          </div>

          {/* --- Tables Container --- */}
           <EnvTable
                title="Server-side Runtime Environment Variables"
                description="The following variables are available on the server at runtime. Because this page is dynamically rendered, these are read on every request. Only variables prefixed with 'NEXT_PUBLIC_' are exposed to the client."
                entries={allVarEntries}
                total={allVarEntries.length}
            />

            <div className="border-t border-gray-200"></div>

            <EnvTable
                title="Client-side Public Environment Variables"
                description="The following variables are prefixed with 'NEXT_PUBLIC_' and are exposed to the browser. Do not expose sensitive information here."
                entries={publicVarEntries}
                total={publicVarEntries.length}
            />
        </div>
      </main>
    </>
  );
};

export default EnvironmentPage;
