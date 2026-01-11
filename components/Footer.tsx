import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
                <div className="w-6 h-6 bg-gray-900 rounded-md flex items-center justify-center text-white font-bold text-xs">
                I
                </div>
                <span className="font-semibold text-gray-900">InsightFlow</span>
            </div>
            <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">About</a>
                <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">Terms</a>
                <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">Contact</a>
            </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-8 text-center">
            <p className="text-xs text-gray-400">
                &copy; {new Date().getFullYear()} InsightFlow AI. All rights reserved. 
                <br className="sm:hidden" /> Generated content is for informational purposes only.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
