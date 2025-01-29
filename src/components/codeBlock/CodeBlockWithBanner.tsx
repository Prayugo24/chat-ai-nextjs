import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockWithBannerProps {
  code: string;
  language: string;
  bannerText?: string;
  bannerColor?: string;
}

const CodeBlockWithBanner = ({
  code,
  language,
  bannerText = "Code",
  bannerColor = "bg-gray-700",
}: CodeBlockWithBannerProps) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      {/* Banner */}
      <div className={`${bannerColor} px-2 py-1 text-white font-medium`}>
        {bannerText}
      </div>

      {/* Blok Kode */}
      <SyntaxHighlighter
        language={language}
        style={okaidia}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          padding: '10px',
          fontSize:'12px'
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlockWithBanner;