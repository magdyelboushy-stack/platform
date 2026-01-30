/**
 * Get the full URL for an image/file from the API
 */
export function getImageUrl(path: string | null | undefined): string {
    if (!path) return '';

    // Normalize API_URL and remove trailing slash
    const envApiUrl = (import.meta as any).env.VITE_API_URL || 'http://localhost:8000/api';
    const API_URL = envApiUrl.endsWith('/') ? envApiUrl.slice(0, -1) : envApiUrl;
    const BASE_URL = API_URL.replace('/api', '');

    const result = (() => {
        // 1. If it's already a full URL, return it
        if (path.startsWith('http')) return path;

        // 2. Clear any leading slashes for consistency in logic
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;

        // 3. If it's an API path like "api/files/...", prepend BASE_URL
        if (cleanPath.startsWith('api/')) {
            return `${BASE_URL}/${cleanPath}`;
        }

        // 4. If it's a relative storage path (e.g. "avatars/...", "thumbnails/..."), prepend API_URL/files/
        if (cleanPath.startsWith('avatars/') || cleanPath.startsWith('thumbnails/') || cleanPath.startsWith('documents/')) {
            return `${API_URL}/files/${cleanPath}`;
        }

        // 5. Default: prepend API URL if not sure, but ensure /api/ is preserved
        return `${API_URL}/${cleanPath}`;
    })();

    return result;
}

/**
 * Convert standard YouTube/Vimeo links to embeddable formats
 */
export function getEmbedUrl(url: string | null | undefined): string {
    if (!url) return '';

    // YouTube Handle (watch?v= or youtu.be/)
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
        return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }

    // Vimeo Handle
    const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    return url;
}
