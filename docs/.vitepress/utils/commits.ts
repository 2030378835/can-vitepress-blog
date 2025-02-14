import axios from 'axios';

const owner = '2030378835';
const repo = 'can-vitepress-blog';
export const getCommits = async () => {
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    const commits = response.data;
    return commits.map(commit => ({

      url: commit.html_url,
      sha: commit.sha,
      commit_author: commit.commit.author.name,
      date: commit.commit.author.date,
      message: commit.commit.message,
      verification: commit.commit.verification,
      author: commit.author,
      avatar_url: commit.author?.avatar_url,
      parents: commit.parents
    }));
  } catch (error) {
    console.error('Error fetching commits:', error.response ? error.response.data : error.message);
  }
};

