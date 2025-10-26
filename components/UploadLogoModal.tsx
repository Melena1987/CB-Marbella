import React, { useState, useCallback, useMemo } from 'react';

interface UploadLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
}

const UploadLogoModal: React.FC<UploadLogoModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        // FIX: The `file` parameter needs to be typed to access its `type` property.
        const newFiles = Array.from(e.dataTransfer.files).filter((file: any) => file.type.startsWith('image/'));
        setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        // FIX: The `file` parameter needs to be typed to access its `type` property.
        const newFiles = Array.from(e.target.files).filter((file: any) => file.type.startsWith('image/'));
        setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const removeFile = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName));
  };
  
  const handleUpload = () => {
    if (files.length > 0) {
        onUpload(files);
        setFiles([]);
        onClose();
    }
  };

  const filePreviews = useMemo(() => files.map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1), // size in KB
      url: URL.createObjectURL(file)
  })), [files]);

  // Cleanup object URLs on unmount or when files change
  React.useEffect(() => {
    return () => {
      filePreviews.forEach(file => URL.revokeObjectURL(file.url));
    };
  }, [filePreviews]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#061121] rounded-lg shadow-2xl p-8 max-w-2xl w-full relative border border-slate-700" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h2 className="text-3xl font-bold text-white font-['Teko'] mb-6 text-center">Subir Logos de Patrocinador</h2>

        <div 
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 ${isDragging ? 'border-[#003782] bg-[#0a192f]' : 'border-slate-700'}`}
        >
            <input type="file" id="file-upload" multiple accept="image/*" className="hidden" onChange={handleFileSelect} />
            <label htmlFor="file-upload" className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                <p className="mt-2 text-slate-400">Arrastra los archivos aquí o <span className="font-semibold text-[#003782]">haz clic</span> para seleccionar</p>
                <p className="text-xs text-slate-500 mt-1">PNG, JPG, SVG</p>
            </label>
        </div>
        
        {files.length > 0 && (
            <div className="mt-6 max-h-60 overflow-y-auto pr-2 space-y-3">
                {filePreviews.map((file) => (
                    <div key={file.name} className="flex items-center justify-between bg-[#0a192f] p-3 rounded-md">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <img src={file.url} alt={file.name} className="w-10 h-10 object-contain rounded-sm flex-shrink-0" />
                            <div className="truncate">
                                <p className="text-sm text-slate-200 truncate">{file.name}</p>
                                <p className="text-xs text-slate-500">{file.size} KB</p>
                            </div>
                        </div>
                        <button onClick={() => removeFile(file.name)} className="text-slate-500 hover:text-red-500 transition-colors p-1 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                ))}
            </div>
        )}

        <button
            onClick={handleUpload}
            disabled={files.length === 0}
            className="w-full mt-8 bg-gradient-to-r from-[#003782] to-[#002966] hover:from-[#002966] hover:to-[#003782] text-white font-bold py-3 px-4 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Subir {files.length > 0 ? `${files.length} logo${files.length > 1 ? 's' : ''}` : 'Logos'}
        </button>
      </div>
    </div>
  );
};

export default UploadLogoModal;
