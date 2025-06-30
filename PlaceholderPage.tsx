
import React from 'react';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100">
        <div className="mx-auto mb-4 bg-primary-hover/10 text-primary p-4 rounded-full w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-medium">This feature is currently under construction.</p>
        <p className="text-medium">Check back soon for updates!</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
