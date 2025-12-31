import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { convex } from "@/lib/convex-client";
import type {
    Hashtags,
    SocialPosts,
    Summary,
    Titles,
} from "../../schemas/ai-outputs";

type KeyMoment = {
    time: string; // Human-readable timestamp
    timestamp: number; // Seconds
    text: string; // Moment title
    description: string; // Moment description
};

type YouTubeTimestamp = {
    timestamp: string; // Format: "MM:SS" or "HH:MM:SS"
    description: string; // Chapter title
};

/**
 * Aggregated results from all parallel AI generation steps
 * All fields are optional since individual steps can fail without blocking others
 */
type GeneratedContent = {
    keyMoments?: KeyMoment[];
    summary?: Summary;
    socialPosts?: SocialPosts;
    titles?: Titles;
    hashtags?: Hashtags;
    youtubeTimestamps?: YouTubeTimestamp[];
};

export async function saveResultsToConvex(
    projectId: Id<"projects">,
    results: GeneratedContent
): Promise<void> {
    // Save all AI-generated content in one atomic operation
    // This mutation updates the project document with all new fields
    await convex.mutation(api.projects.saveGeneratedContent, {
        projectId,
        keyMoments: results.keyMoments,
        summary: results.summary,
        socialPosts: results.socialPosts,
        titles: results.titles,
        hashtags: results.hashtags,
        youtubeTimestamps: results.youtubeTimestamps,
    });

    // Mark project as completed
    // This triggers UI state change: "Processing..." -> "Completed"
    await convex.mutation(api.projects.updateProjectStatus, {
        projectId,
        status: "completed",
    });

    console.log("Podcast processing completed for project:", projectId);
}