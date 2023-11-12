import { getJestProjects } from '@nx/jest';

export default {
  projects: getJestProjects(),
  global: {
    branches: 90,
    functions: 90,
    lines: 90,
    statements: 90,
  },
};
