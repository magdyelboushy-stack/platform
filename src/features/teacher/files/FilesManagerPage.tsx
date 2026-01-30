// ============================================================
// Teacher Files Manager - Premium Library Redesign
// ============================================================

import { useState } from 'react';
import { FilesHeader } from './components/FilesHeader';
import { FilesStats } from './components/FilesStats';
import { FilesToolbar } from './components/FilesToolbar';
import { FileList } from './components/FileList';
import { FileUploadModal } from './components/FileUploadModal';

// Mock Data
const mockFiles: any[] = [];

export function FilesManagerPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [filesList, setFilesList] = useState(mockFiles);

    const handleUpload = (data: any) => {
        setIsUploading(true);
        console.log('Form Data:', data);
        // Simulate upload process
        setTimeout(() => {
            setIsUploading(false);
            // Logic would go here to update file list with 'data'
        }, 3000);
    };

    const handleDownload = (id: string) => {
        console.log('Downloading file:', id);
    };

    const handleDelete = (id: string) => {
        setFilesList(filesList.filter(f => f.id !== id));
    };

    const filteredFiles = filesList.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        totalSpace: '50 GB',
        usedSpace: '0 GB',
        filesCount: filesList.length,
        totalDownloads: filesList.reduce((acc, f) => acc + f.downloads, 0)
    };

    return (
        <div className="space-y-12 max-w-[1600px] mx-auto py-8 animate-in fade-in duration-700">
            {/* 1. Header Area */}
            <FilesHeader
                onUpload={() => setIsUploadModalOpen(true)}
                isUploading={isUploading}
            />

            {/* 2. Key Statistics */}
            <FilesStats stats={stats} />

            {/* 3. Action Toolbar */}
            <FilesToolbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            {/* 4. Main Library View */}
            <div className="px-2">
                <FileList
                    files={filteredFiles}
                    onDownload={handleDownload}
                    onDelete={handleDelete}
                />
            </div>

            {/* 5. Upload Modal */}
            <FileUploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onSubmit={handleUpload}
            />

            {/* Aesthetics: Decorative Orbs */}
            <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        </div>
    );
}
