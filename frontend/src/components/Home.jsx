import { useState } from "react";
import axios from "axios";

function Home() {
  const [url, seturl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/shorten", {
        originalUrl: url,
      });
      setShortUrl(response.data.shortUrl);
      setError("");
    } catch (err) {
      setError("Error shortening URL");
    }
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={url}
          onChange={(e) => seturl(e.target.value)}
          placeholder="Enter URL to shorten"
          required
        />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <p>
          Shortened URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Home;
