export async function getAudioDurationSeconds(
    blob: Blob
): Promise<number | null> {
    try {
        const arrayBuffer = await blob.arrayBuffer();
        const AudioCtx = window.AudioContext;
        if (AudioCtx) {
            const audioCtx = new AudioCtx();
            const decode = audioCtx.decodeAudioData.bind(audioCtx);
            const audioBuffer: AudioBuffer = await decode(arrayBuffer);
            try {
                if (typeof audioCtx.close === "function")
                    await audioCtx.close();
            } catch {}
            return audioBuffer.duration;
        }
    } catch (err) {
        console.warn(
            "AudioContext decode failed, fallback to HTMLAudioElement",
            err
        );
    }

    try {
        return await new Promise<number | null>((resolve) => {
            const url = URL.createObjectURL(blob);
            const audio = document.createElement("audio");
            audio.preload = "metadata";
            audio.src = url;
            const onLoaded = () => {
                const duration = audio.duration;
                cleanup();
                resolve(isFinite(duration) ? duration : null);
            };
            const onError = () => {
                cleanup();
                resolve(null);
            };
            function cleanup() {
                audio.removeEventListener("loadedmetadata", onLoaded);
                audio.removeEventListener("error", onError);
                URL.revokeObjectURL(url);
            }
            audio.addEventListener("loadedmetadata", onLoaded);
            audio.addEventListener("error", onError);
        });
    } catch {
        return null;
    }
}
