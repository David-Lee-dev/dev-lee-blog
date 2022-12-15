import mixpanel from 'mixpanel-browser';
import axios from 'axios';

export default async function connectTracker(title: string): Promise<void> {
  let ip = null;
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    ip = response.data.ip;
  } catch (error) {}

  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_API_TOKEN as string, {
    debug: false,
    ignore_dnt: true,
  });
  mixpanel.track(`${ip} - ${title}`);
}
