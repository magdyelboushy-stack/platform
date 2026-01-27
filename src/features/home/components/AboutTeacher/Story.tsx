
export function Story() {
    return (
        <div className="space-y-8 text-right">
            <h3 className="text-3xl lg:text-4xl font-black text-[var(--text-primary)] font-display leading-tight">
                رحلة العطاء في <span className="text-[#C5A059]">لغة الضاد</span>
            </h3>
            <div className="relative">
                <span className="absolute -top-10 -right-8 text-9xl text-[#C5A059]/10 font-serif leading-none italic pointer-events-none">"</span>
                <p className="text-xl text-[var(--text-secondary)] leading-loose font-medium italic relative z-10">
                    بدأت رحلتي مع اللغة العربية ليس كمدرس فقط، بل كعاشق لجمالها وأسرارها. هدفي كان دائماً كسر حاجز "التعقيد" اللي بيواجهه الطلاب في النحو والبلاغة.
                </p>
                <p className="text-xl text-[var(--text-secondary)] leading-loose font-medium mt-6 italic relative z-10">
                    على مدار 10 سنوات، طورت منهج "التبسيط المتكامل" اللي بيخلي الطالب مش بس يذاكر، لكن يستمتع بجمال لغته الأم ويضمن الدرجة النهائية بكل ثقة.
                </p>
            </div>

            <div className="pt-6 flex items-center justify-end gap-4">
                <div className="text-right">
                    <p className="text-2xl font-black text-[var(--text-primary)] font-display">أ/ أحمد راضي</p>
                    <p className="text-[#8E6C3D] font-bold">خبير اللغة العربية</p>
                </div>
                <div className="w-16 h-1 bg-[#C5A059] rounded-full" />
            </div>
        </div>
    );
}
