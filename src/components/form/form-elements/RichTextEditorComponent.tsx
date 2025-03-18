import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

interface RichTextEditorComponentProps {
  initialData?: string;
  onChange?: (value: string) => void;
}

const RichTextEditorComponent: React.FC<RichTextEditorComponentProps> = ({ initialData = "", onChange }) => {
  const [value, setValue] = useState(initialData);

  // Sync with the initialData prop whenever it changes
  useEffect(() => {
    setValue(initialData);
  }, [initialData]);

  const handleChange = (content: string) => {
    setValue(content);
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <div className="w-full">
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        className="bg-white text-black" // Tailwind styling
      />
    </div>
  );
};

// Quill toolbar options
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],
    ["link", "image"],
    ["clean"], // Remove formatting
  ],
};

// Quill formats
const formats = [
  "header", "font", "list", "bullet", "bold", "italic", "underline", "strike",
  "align", "link", "image",
];

export default RichTextEditorComponent;