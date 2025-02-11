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
      // console.log(commit);
      // console.log(`URL: ${commit.html_url}`);
      // console.log(`SHA: ${commit.sha}`);
      // console.log(`Author: ${commit.commit.author.name}`);
      // console.log(`Date: ${commit.commit.author.date}`);
      // console.log(`Message: ${commit.commit.message}`);
      // console.log('---');
      url: commit.html_url,
      sha: commit.sha,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      message: commit.commit.message,
      verification: commit.commit.verification
    }));
  } catch (error) {
    console.error('Error fetching commits:', error.response ? error.response.data : error.message);
  }
};

