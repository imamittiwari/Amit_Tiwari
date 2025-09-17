import { Octokit } from "@octokit/rest";

export async function getUncachableGitHubClient(): Promise<Octokit> {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    throw new Error("GitHub token not provided");
  }

  return new Octokit({
    auth: token,
  });
}