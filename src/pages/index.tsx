import App from "../components/App";
import app from "../firebase";

export default function Home() {
  console.log(app);
  return (
    <App>
      <p>Index Page</p>
    </App>
  );
}
