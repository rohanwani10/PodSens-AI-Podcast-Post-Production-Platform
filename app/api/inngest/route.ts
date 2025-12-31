import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { helloworld } from "@/inngest/functions/podcast-processor";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        /* your functions will be passed here later! */
        helloworld
    ],
});