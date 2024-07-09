import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "rakkh5xd",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-05-30",
});
