import { createClient } from 'next-sanity';

const config = {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  useCdn: true,
  token: process.env.SANITY_READ_TOKEN,
};

export const sanityClient = createClient(config);