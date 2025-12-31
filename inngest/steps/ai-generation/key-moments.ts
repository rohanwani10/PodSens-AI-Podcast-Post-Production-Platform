import { formatTimestamp } from "@/lib/format";
import type { TranscriptWithExtras } from "../../types/assemblyai";

type KeyMoment = {
    time: string; // Human-readable timestamp (e.g., "12:34")
    timestamp: number; // Seconds for programmatic use
    text: string; // Chapter headline
    description: string; // Chapter summary/description
};

export async function generateKeyMoments(
    transcript: TranscriptWithExtras
): Promise<KeyMoment[]> {
    console.log("Generating key moments from AssemblyAI chapters");

    const chapters = transcript.chapters || [];

    if (chapters.length === 0) {
        console.log(
            "No chapters detected by AssemblyAI - returning empty key moments"
        );
        return [];
    }

    // Transform each chapter into a key moment with formatted timestamp
    const keyMoments = chapters.map((chapter) => {
        const startSeconds = chapter.start / 1000; // Convert milliseconds to seconds

        return {
            time: formatTimestamp(startSeconds, { padHours: true, forceHours: true }),
            timestamp: startSeconds,
            text: chapter.headline, // Use chapter headline as moment title
            description: chapter.summary, // Use chapter summary as description
        };
    });

    return keyMoments;
}