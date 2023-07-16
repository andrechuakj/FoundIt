import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'qsstu8',
  e2e: {
    baseUrl: 'https://main--foundit-nus.netlify.app/',
  },
});
