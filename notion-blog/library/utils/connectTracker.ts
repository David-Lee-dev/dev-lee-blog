import mixpanel from 'mixpanel-browser';
import axios from 'axios';

export default async function connectTracker(title: string): Promise<void> {
  let ip = null;
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    ip = response.data.ip;
  } catch (error) {}

  mixpanel.init('5ad120c99d08c2583f87b598ab073cb2', { debug: true, ignore_dnt: true });
  mixpanel.track(`${ip} - ${title}`);
}
