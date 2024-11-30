import Image from "next/image";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface CopyTextProps {
  text: string;
  link: string;
}

const CopyText = ({ text, link }: CopyTextProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <>
      <CopyToClipboard text={link} onCopy={onCopyText}>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="flex justify-start items-center gap-1 text-sm text-start text-primary"
        >
          {text}
          <Image
            className="mt-0.5"
            src="/icons/copy.svg"
            alt={"copy icon"}
            width={14}
            height={14}
          />
        </button>
      </CopyToClipboard>
      {isCopied ? (
        <span className="text-sm text-green-700">Скопировано!</span>
      ) : null}
    </>
  );
};

export default CopyText;
