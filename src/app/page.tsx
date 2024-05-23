const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE;
const API_URL = 'https://www.googleapis.com/youtube/v3/search';
const fetchPopularShorts = () => {
  return fetch(
      `${API_URL}?part=snippet&order=viewCount&maxResults=10&key=${API_KEY}`,
      { next: { revalidate: 43200 } } //12시간에 한번씩 요청
  ).then(async (response) => {
    if (!response.ok) {
      const result = await response.json();
      console.dir(result.error);
      return result.error;
    }

    return response.json();
  });
};

export default async function Home() {

  let onAirData;

  try {
    onAirData = await fetchPopularShorts();
  } catch (error: any) {
    // console.error(error.message);
  }
  return (
      <div>
        {onAirData?.items?.map((item: any, index: number) => (
            <div key={index}>
              <iframe
                  id={`video_${item.id.videoId}`}
                  width="720"
                  height="405"
                  src={`https://www.youtube.com/embed/${item.id.videoId}`}></iframe>
            </div>
        ))}
      </div>
  );
}
