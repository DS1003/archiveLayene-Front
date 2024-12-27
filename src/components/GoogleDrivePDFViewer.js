import React, { useEffect, useState } from 'react';
import { 
    AlertCircle,
    ExternalLink
} from 'lucide-react';

const GoogleDrivePDFViewer = ({ url }) => {
    const [previewUrl, setPreviewUrl] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            // Extraire l'ID du document de l'URL Google Drive
            const match = url.match(/[-\w]{25,}/);
            if (!match) {
                setError('URL Google Drive invalide');
                return;
            }
            const fileId = match[0];
            // Créer l'URL de prévisualisation Google
            const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
            setPreviewUrl(embedUrl);
        } catch (err) {
            setError(err.message);
        }
    }, [url]);

    const ErrorMessage = () => (
        <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-8">
            <div className="bg-white rounded-lg p-6 shadow-sm max-w-md text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Impossible de charger le PDF
                </h3>
                <p className="text-gray-600 mb-4">
                    Une erreur s'est produite lors du chargement du fichier.
                </p>
                <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#006C5F] hover:underline"
                >
                    Ouvrir dans Google Drive
                    <ExternalLink size={16} />
                </a>
            </div>
        </div>
    );

    if (error) {
        return <ErrorMessage />;
    }

    return (
        <div className="w-full h-[calc(100vh-12rem)] bg-gray-100 rounded-lg overflow-hidden">
            {previewUrl && (
                <iframe
                    src={previewUrl}
                    className="w-full h-full border-0"
                    allow="autoplay"
                    allowFullScreen={true}
                    loading="lazy"
                ></iframe>
            )}
        </div>
    );
};

export default GoogleDrivePDFViewer;