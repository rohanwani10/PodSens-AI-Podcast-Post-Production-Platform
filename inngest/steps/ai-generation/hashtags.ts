import type { step as InngestStep } from "inngest";
import { geminiModel } from "../../lib/ai-client";
import { SchemaType } from "@google/generative-ai";
import { type Hashtags, hashtagsSchema } from "../../schemas/ai-outputs";
import type { TranscriptWithExtras } from "../../types/assemblyai";


// System prompt establishes GPT's knowledge of hashtag strategies
const HASHTAGS_SYSTEM_PROMPT =
    "You are a social media growth expert who understands platform algorithms and trending hashtag strategies. You create hashtag sets that maximize reach and engagement.";

/**
 * Builds prompt with episode topics and platform-specific guidelines
 *
 * Context Provided:
 * - Chapter headlines (topic extraction)
 * - Platform-specific hashtag counts and strategies
 * - Best practices for each platform's algorithm
 *
 * Prompt Engineering:
 * - Exact counts specified (5 for most, 6-8 for Instagram)
 * - Platform algorithm considerations explained
 * - Mix of trending, niche, and broad tags
 */
function buildHashtagsPrompt(transcript: TranscriptWithExtras): string {
    return `Create platform-optimized hashtag strategies for this podcast.

TOPICS COVERED:
${transcript.chapters
            ?.map((ch, idx) => `${idx + 1}. ${ch.headline}`)
            .join("\n") || "General discussion"
        }

Generate hashtags for each platform following their best practices:

1. YOUTUBE (exactly 5 hashtags):
   - Broad reach, discovery-focused
   - Mix of general and niche
   - Trending in podcast/content space
   - Good for recommendations algorithm

2. INSTAGRAM (6-8 hashtags):
   - Mix of highly popular (100k+ posts) and niche (10k-50k posts)
   - Community-building tags
   - Content discovery tags
   - Trending but relevant

3. TIKTOK (5-6 hashtags):
   - Currently trending tags
   - Gen Z relevant
   - FYP optimization
   - Mix viral and niche

4. LINKEDIN (exactly 5 hashtags):
   - Professional, B2B focused
   - Industry-relevant
   - Thought leadership tags
   - Career/business oriented

5. TWITTER (exactly 5 hashtags):
   - Concise, trending
   - Topic-specific
   - Conversation-starting
   - Mix broad and niche

All hashtags should include the # symbol and be relevant to the actual content discussed.`;
}

export async function generateHashtags(
    step: typeof InngestStep,
    transcript: TranscriptWithExtras
): Promise<Hashtags> {
    console.log("Generating hashtags with GPT");

    try {
        // Bind Gemini method to preserve `this` context for step.ai.wrap
        const geminiResponse = await step.run(
            "generate-hashtags-with-gemini",
            async () => {
                const result = await geminiModel.generateContent({
                    contents: [{
                        role: "user",
                        parts: [{
                            text: `${HASHTAGS_SYSTEM_PROMPT}\n\n${buildHashtagsPrompt(transcript)}`
                        }]
                    }],
                    generationConfig: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: SchemaType.OBJECT,
                            properties: {
                                youtube: {
                                    type: SchemaType.ARRAY,
                                    items: { type: SchemaType.STRING },
                                    description: "Exactly 5 YouTube hashtags with # symbol",
                                    minItems: 5,
                                    maxItems: 5
                                },
                                instagram: {
                                    type: SchemaType.ARRAY,
                                    items: { type: SchemaType.STRING },
                                    description: "6-8 Instagram hashtags with # symbol",
                                    minItems: 6,
                                    maxItems: 8
                                },
                                tiktok: {
                                    type: SchemaType.ARRAY,
                                    items: { type: SchemaType.STRING },
                                    description: "5-6 TikTok hashtags with # symbol",
                                    minItems: 5,
                                    maxItems: 6
                                },
                                linkedin: {
                                    type: SchemaType.ARRAY,
                                    items: { type: SchemaType.STRING },
                                    description: "Exactly 5 LinkedIn hashtags with # symbol",
                                    minItems: 5,
                                    maxItems: 5
                                },
                                twitter: {
                                    type: SchemaType.ARRAY,
                                    items: { type: SchemaType.STRING },
                                    description: "Exactly 5 Twitter hashtags with # symbol",
                                    minItems: 5,
                                    maxItems: 5
                                }
                            },
                            required: ["youtube", "instagram", "tiktok", "linkedin", "twitter"]
                        }
                    }
                });

                return result.response.text();
            }
        );

        const content = geminiResponse;

        // Parse and validate against schema
        const hashtags = content
            ? hashtagsSchema.parse(JSON.parse(content))
            : {
                // Fallback hashtags if parsing fails
                youtube: ["#Podcast"],
                instagram: ["#Podcast", "#Content"],
                tiktok: ["#Podcast"],
                linkedin: ["#Podcast"],
                twitter: ["#Podcast"],
            };

        return hashtags;
    } catch (error) {
        console.error("GPT hashtags error:", error);

        // Graceful degradation: Return error indicators
        return {
            youtube: ["⚠️ Hashtag generation failed"],
            instagram: ["⚠️ Hashtag generation failed"],
            tiktok: ["⚠️ Hashtag generation failed"],
            linkedin: ["⚠️ Hashtag generation failed"],
            twitter: ["⚠️ Hashtag generation failed"],
        };
    }
}