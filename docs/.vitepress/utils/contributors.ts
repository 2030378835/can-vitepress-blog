import axios from 'axios';

const owner = '2030378835';
const repo = 'can-vitepress-blog';

export const getContributors = async () => {
    try {
        const res = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`)
        return res.data;
    }
    catch (error) {
        console.error('Error fetching contributors:', error.response ? error.response.data : error.message);
        return [];
    }
};