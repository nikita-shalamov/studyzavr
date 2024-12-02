/* eslint-disable @next/next/no-img-element */
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import ReactPlayer from "react-player";

const FileViewer = ({ fileUrl }: { fileUrl: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const fileType = getFileType(fileUrl);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      {fileType !== "unknown" && (
        <button
          onClick={handleOpen}
          className="text-sm text-primary hover:text-primary-700"
        >
          Открыть
        </button>
      )}
      {isOpen && (
        <div style={overlayStyle}>
          <div className="w-[80%] h-[80%]">
            {fileType === "audio" && (
              <div className="flex justify-center items-center h-full">
                <ReactAudioPlayer src={fileUrl} autoPlay controls />
              </div>
            )}
            {fileType === "image" && (
              <img
                src={fileUrl}
                alt="Large view"
                style={{ width: "80vw", height: "80vh", objectFit: "contain" }}
              />
            )}
            {fileType === "video" && (
              <ReactPlayer
                url={fileUrl}
                playing={false}
                controls={true}
                width="100%"
                height="100%"
              />
            )}
            <Button
              color="danger"
              onClick={handleClose}
              className="absolute top-2 right-2"
            >
              Закрыть
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const getFileType = (fileUrl: string) => {
  const fileExtension = fileUrl.split(".").pop()?.toLowerCase();

  if (["jpg", "jpeg", "png", "gif", "bmp"].includes(fileExtension || "")) {
    return "image";
  }

  if (["mp3", "wav", "flac"].includes(fileExtension || "")) {
    return "audio";
  }

  if (["mp4", "avi", "mkv", "mov", "webm"].includes(fileExtension || "")) {
    return "video";
  }

  return "unknown";
};

export default FileViewer;
