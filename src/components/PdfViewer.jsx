import React, { useState, useEffect } from 'react';
import { 
    ZoomIn, ZoomOut, RotateCw, Printer,
    AlertCircle
} from 'lucide-react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const WORKER_URL = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

// Fonction pour convertir l'URL Google Drive
const getGoogleDriveDirectUrl = (url) => {
    // Extrait l'ID du document depuis l'URL Google Drive
    const match = url.match(/[-\w]{25,}/);
    if (!match) return null;
    const fileId = match[0];
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

const PDFViewer = ({ url }) => {
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const [directUrl, setDirectUrl] = useState(null);

    useEffect(() => {
        if (url && url.includes('drive.google.com')) {
            const direct = getGoogleDriveDirectUrl(url);
            setDirectUrl(direct);
        } else {
            setDirectUrl(url);
        }
    }, [url]);

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
    const handleRotate = () => setRotation(prev => (prev + 90) % 360);

    const handlePrint = () => {
        if (directUrl) {
            const printWindow = window.open(directUrl);
            printWindow.onload = () => {
                printWindow.print();
            };
        }
    };

    const ErrorMessage = () => (
        <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-8">
            <div className="bg-white rounded-lg p-6 shadow-sm max-w-md text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Impossible de charger le PDF
                </h3>
                <p className="text-gray-600 mb-4">
                    Pour les fichiers Google Drive, assurez-vous que :
                </p>
                <ul className="text-left text-sm text-gray-600 mb-4 space-y-2">
                    <li>• Le fichier est partagé publiquement</li>
                    <li>• L'option "Tous les utilisateurs avec le lien" est activée</li>
                    <li>• Le lien de partage est valide</li>
                </ul>
                <div className="text-sm text-gray-500">
                    {error && <p>Erreur: {error.message}</p>}
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-100 rounded-lg overflow-hidden">
            <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-600">
                            Page {currentPage} sur {totalPages}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleZoomOut}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Zoom arrière"
                        >
                            <ZoomOut size={20} />
                        </button>
                        <span className="text-sm text-gray-600 min-w-[3rem] text-center">
                            {Math.round(scale * 100)}%
                        </span>
                        <button
                            onClick={handleZoomIn}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Zoom avant"
                        >
                            <ZoomIn size={20} />
                        </button>
                        <div className="w-px h-6 bg-gray-200 mx-2" />
                        <button
                            onClick={handleRotate}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Pivoter"
                        >
                            <RotateCw size={20} />
                        </button>
                        <button
                            onClick={handlePrint}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Imprimer"
                        >
                            <Printer size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full h-[calc(100vh-12rem)] bg-gray-100">
                {directUrl ? (
                    <Worker workerUrl={WORKER_URL}>
                        <Viewer
                            fileUrl={directUrl}
                            defaultScale={scale}
                            rotate={rotation}
                            onDocumentLoad={(doc) => {
                                setTotalPages(doc.numPages);
                                setError(null);
                            }}
                            onPageChange={(page) => {
                                setCurrentPage(page.currentPage);
                            }}
                            onError={(error) => {
                                console.error('PDF Error:', error);
                                setError(error);
                            }}
                            renderError={ErrorMessage}
                        />
                    </Worker>
                ) : (
                    <ErrorMessage />
                )}
            </div>
        </div>
    );
};

export default PDFViewer;