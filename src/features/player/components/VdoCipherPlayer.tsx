import { useState, useEffect } from 'react';
import { apiClient } from '@/core/api/client';

interface VdoCipherPlayerProps {
    videoId: string;
    onVideoEnd?: () => void;
    onTimeUpdate?: (seconds: number) => void;
    initialTime?: number;
}

export function VdoCipherPlayer({ videoId, onVideoEnd, onTimeUpdate, initialTime = 0 }: VdoCipherPlayerProps) {
    const [playbackInfo, setPlaybackInfo] = useState<{ otp: string; playbackInfo: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Listen for VdoCipher Events via Message Channels
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Check origin to ensure security (optional but recommended)
            if (!event.origin.includes('vdocipher.com')) return;

            try {
                const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

                // VdoCipher sends "ended" when video finishes
                if (data.event === 'ended' && onVideoEnd) {
                    onVideoEnd();
                }

                // Handle timeupdate if emitted
                if (data.event === 'timeupdate' && onTimeUpdate) {
                    onTimeUpdate(data.currentTime);
                }
            } catch (e) {
                // Ignore non-json messages
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onVideoEnd, onTimeUpdate]);

    useEffect(() => {
        const fetchOTP = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch OTP and PlaybackInfo from our backend proxy
                const response = await apiClient.post(`/videos/${videoId}/otp`, {});
                setPlaybackInfo(response.data);
            } catch (err: any) {
                console.error('VdoCipher OTP Fetch Error:', err);
                setError(err.response?.data?.error || 'فشل تحميل بيانات الفيديو');
            } finally {
                setLoading(false);
            }
        };

        if (videoId) {
            fetchOTP();
        }
    }, [videoId]);

    if (loading) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm gap-4">
                <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                <p className="text-cyan-500 font-black text-sm animate-pulse">جاري تأمين الحماية وتجهيز المشغل...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-black gap-4 p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 className="text-xl font-black text-red-500">{error}</h3>
                <p className="text-gray-400 font-bold max-w-sm">
                    حدث خطأ أثناء محاولة الحصول على تصريح تشغيل الفيديو. يرجى التأكد من اتصالك بالإنترنت أو مراجعة إدارة المنصة.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg font-black hover:bg-red-600 transition-all mt-4"
                >
                    إعادة المحاولة
                </button>
            </div>
        );
    }

    if (!playbackInfo) return null;

    const playerId = (import.meta as any).env.VITE_VDOCIPHER_PLAYER_ID;
    // Append start time if provided (> 0)
    let iframeSrc = `https://player.vdocipher.com/v2/?otp=${playbackInfo.otp}&playbackInfo=${playbackInfo.playbackInfo}${playerId ? `&player=${playerId}` : ''}`;

    if (initialTime > 0) {
        iframeSrc += `&s=${initialTime}`;
    }

    return (
        <div
            className="relative w-full h-full bg-black overflow-hidden group"
            onContextMenu={(e) => e.preventDefault()}
        >
            <iframe
                src={iframeSrc}
                className="absolute inset-0 w-full h-full border-0 select-none"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
            />

            {/* Watermark/Protection Label */}
            <div className="absolute top-4 right-4 pointer-events-none opacity-20 bg-black/50 px-3 py-1 rounded-lg text-[10px] text-white font-black z-20 border border-white/10 uppercase tracking-widest">
                BACALORIA SECURE STREAM
            </div>
        </div>
    );
}
