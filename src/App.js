import { useState } from "react";
import { fetchWeather } from "./apis/fetchWeather";
import "./App.css";

function App() {
	const [query, setQuery] = useState("");
	const [weather, setWeather] = useState({});
	// const deferredPrompt = useRef(null);

	const search = async e => {
		if (e.key === "Enter") {
			try {
				const data = await fetchWeather(query);
				setWeather(data);
				setQuery("");
			} catch (error) {
				console.log(error);
			}
		}
	};

	// useEffect(() => {
	// 	const ins = e => {
	// 		deferredPrompt.current = e;
	// 	};
	// 	window.addEventListener("beforeinstallprompt", ins);
	// 	return () => window.addEventListener("beforeinstallprompt", ins);
	// }, []);

	// const handleInstall = async () => {
	// 	if (deferredPrompt.current !== null) {
	// 		deferredPrompt.current.prompt();
	// 		const { outcome } = await deferredPrompt.userChoice;
	// 		if (outcome === "accepted") {
	// 			deferredPrompt.current = null;
	// 		}
	// 	}
	// };

	return (
		<div className="main">
			{/* <div style={{ textAlign: "right" }}>
				<button type="button" className="install" onClick={handleInstall}>
					Install
				</button>
			</div> */}
			<div className="main-container">
				<input
					type="text"
					className="search"
					placeholder="Search..."
					value={query}
					onChange={e => setQuery(e.target.value)}
					onKeyUp={search}
				/>
				{weather.main && (
					<div className="city">
						<h2 className="city-name">
							<span>{weather.name}</span>
							<sup>{weather.sys.country}</sup>
						</h2>
						<div className="city-temp">
							{weather.main.temp} <sup>℃</sup>
						</div>
						<div className="info">
							<img
								src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
								alt={weather.weather[0].description}
								className="city-icon"
							/>
							<p>{weather.weather[0].description}</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
