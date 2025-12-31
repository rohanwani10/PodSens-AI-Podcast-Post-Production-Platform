import { inngest } from "../client";

export const helloworld = inngest.createFunction(
    { id: "Hello World Function" },
    { event: "helloworld/event" },
    async ({ event, step }) => {
        await step.sleep("wait a moment", "ls");

        return { message: `Event Data: ${event.data.email}` };
    }
);