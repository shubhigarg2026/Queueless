import { useState } from "react";
import "./App.css";

const locations = [
  {
    name: "Food Court",
    status: "Busy",
    wait: 18,
    people: 42,
    bestTime: "2:40 PM",
    predicted: 6,
    confidence: 87,
    distance: "650 m",
    walking: "8 min",
    top: "42%",
    left: "58%",
  },
  {
    name: "Library",
    status: "Low",
    wait: 7,
    people: 18,
    bestTime: "4:10 PM",
    predicted: 3,
    confidence: 92,
    distance: "420 m",
    walking: "5 min",
    top: "25%",
    left: "30%",
  },
  {
    name: "Medical Centre",
    status: "Low",
    wait: 3,
    people: 6,
    bestTime: "Now",
    predicted: 3,
    confidence: 95,
    distance: "1.1 km",
    walking: "13 min",
    top: "68%",
    left: "25%",
  },
  {
    name: "Xerox Shop",
    status: "Moderate",
    wait: 11,
    people: 21,
    bestTime: "3:15 PM",
    predicted: 5,
    confidence: 84,
    distance: "300 m",
    walking: "4 min",
    top: "60%",
    left: "72%",
  },
  {
    name: "PRP Building",
    status: "Moderate",
    wait: 13,
    people: 28,
    bestTime: "2:55 PM",
    predicted: 7,
    confidence: 81,
    distance: "550 m",
    walking: "7 min",
    top: "30%",
    left: "70%",
  },
];

function App() {
  const [selected, setSelected] = useState(locations[0]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showTrend, setShowTrend] = useState(false);
  const [showLocationMessage, setShowLocationMessage] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportedStatus, setReportedStatus] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const visibleLocations = locations.filter((location) => {
    const filterMatch =
      filter === "All" || location.status === filter;

    const searchMatch = location.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return filterMatch && searchMatch;
  });

  const handleMyLocation = () => {
    const xerox = locations.find(
      (location) => location.name === "Xerox Shop"
    );

    setSelected(xerox);
    setShowTrend(false);
    setShowReport(false);
    setShowLocationMessage(true);

    setTimeout(() => {
      setShowLocationMessage(false);
    }, 3000);
  };

  const openReport = () => {
    setShowReport(true);
    setShowTrend(false);
    setReportedStatus("");
    setReportSubmitted(false);
  };

  const submitReport = () => {
    if (!reportedStatus) return;

    setReportSubmitted(true);

    setTimeout(() => {
      setShowReport(false);
      setReportSubmitted(false);
      setReportedStatus("");

      setShowLocationMessage(true);

      setTimeout(() => {
        setShowLocationMessage(false);
      }, 2500);
    }, 1200);
  };

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="logo">
          <div className="logo-mark">Q</div>

          <div>
            <h1>QueueLess</h1>
            <p>VIT Vellore</p>
          </div>
        </div>

        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-title">
          QUEUE STATUS
        </div>

        <div className="filters">
          {["All", "Low", "Moderate", "Busy"].map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="sidebar-bottom">
          <span className="live-dot"></span>
          Live campus data
        </div>

      </aside>

      {/* MAIN */}
      <main className="main">

        {/* TOP BAR */}
        <header className="topbar">

          <div>
            <p className="eyebrow">
              SMART CAMPUS
            </p>

            <h2>
              Predict the queue before you join it.
            </h2>
          </div>

          <div className="top-actions">

            <button
              className="report-button"
              onClick={openReport}
            >
              + Report Queue
            </button>

            <button
              className="location-button"
              onClick={handleMyLocation}
            >
              ◉ My Location
            </button>

          </div>

        </header>

        {/* LOCATION MESSAGE */}
        {showLocationMessage && (
          <div className="location-message">
            📍 You are near Xerox Shop
          </div>
        )}

        {/* CAMPUS STATS */}
        <div className="stats-strip">

          <div className="stat-card">
            <span>LOCATIONS MONITORED</span>
            <strong>5</strong>
            <small>Across VIT campus</small>
          </div>

          <div className="stat-card">
            <span>AVG WAIT TIME</span>
            <strong>
              10.4 <em>min</em>
            </strong>
            <small>Current campus average</small>
          </div>

          <div className="stat-card">
            <span>LOW QUEUES</span>
            <strong>2</strong>
            <small>Locations under 8 min</small>
          </div>

          <div className="stat-card highlight">
            <span>PREDICTION CONFIDENCE</span>
            <strong>88%</strong>
            <small>Based on recent observations</small>
          </div>

        </div>

        {/* DASHBOARD */}
        <section className="dashboard">

          {/* MAP */}
          <div className="map-container">

            <div className="map-label">
              <span>VIT VELLORE</span>
              <small>Campus Queue Map</small>
            </div>

            <div className="map">

              <img
                src="/vit-map.webp"
                alt="VIT Vellore campus map"
                className="campus-map-image"
              />

              <div className="map-overlay"></div>

              {/* QUEUE PINS */}
              {visibleLocations.map((location) => (
                <div
                  key={location.name}
                  className="pin-wrapper"
                  style={{
                    top: location.top,
                    left: location.left,
                  }}
                >

                  <button
                    className={`map-pin ${location.status.toLowerCase()}`}
                    onClick={() => {
                      setSelected(location);
                      setShowTrend(false);
                      setShowReport(false);
                    }}
                  >
                    <span></span>
                  </button>

                  <div className="pin-label">
                    {location.name}
                  </div>

                </div>
              ))}

              {/* YOU */}
              <div
                className="map-location"
                style={{
                  top: "64%",
                  left: "67%",
                }}
              >
                <div className="you-dot"></div>
                You
              </div>

              {/* LEGEND */}
              <div className="legend">

                <div>
                  <span className="legend-dot low"></span>
                  Low
                </div>

                <div>
                  <span className="legend-dot moderate"></span>
                  Moderate
                </div>

                <div>
                  <span className="legend-dot busy"></span>
                  Busy
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="info-card">

            {/* MAIN LOCATION PANEL */}
            {!showTrend && !showReport && (

              <>

                <div className="card-header">

                  <div>
                    <p className="card-label">
                      SELECTED LOCATION
                    </p>

                    <h3>
                      {selected.name}
                    </h3>
                  </div>

                  <span
                    className={`status ${selected.status.toLowerCase()}`}
                  >
                    {selected.status}
                  </span>

                </div>

                <div className="wait-section">

                  <div>
                    <p>Estimated wait</p>

                    <strong>
                      {selected.wait}
                    </strong>

                    <span> min</span>
                  </div>

                  <div className="people">

                    <strong>
                      {selected.people}
                    </strong>

                    <span>
                      people now
                    </span>

                  </div>

                </div>

                <div className="prediction">

                  <div className="prediction-icon">
                    ✦
                  </div>

                  <div>

                    <p>
                      BEST TIME TO VISIT
                    </p>

                    <strong>
                      {selected.bestTime}
                    </strong>

                    <span>
                      {" "}→ predicted wait {selected.predicted} min
                    </span>

                  </div>

                </div>

                <div className="prediction-timeline">

                  <div className="timeline-header">
                    <span>Queue prediction</span>
                    <span>Next few hours</span>
                  </div>

                  <div className="timeline">

                    <div className="timeline-point current">

                      <span className="point"></span>

                      <strong>
                        {selected.wait} min
                      </strong>

                      <small>
                        Now
                      </small>

                    </div>

                    <div className="timeline-line"></div>

                    <div className="timeline-point best">

                      <span className="point"></span>

                      <strong>
                        {selected.predicted} min
                      </strong>

                      <small>
                        {selected.bestTime}
                      </small>

                    </div>

                  </div>

                </div>

                <div className="confidence">

                  <div className="confidence-top">

                    <span>
                      Prediction confidence
                    </span>

                    <strong>
                      {selected.confidence}%
                    </strong>

                  </div>

                  <div className="progress">

                    <div
                      style={{
                        width: `${selected.confidence}%`,
                      }}
                    ></div>

                  </div>

                </div>

                <div className="details">

                  <div>
                    <span>Distance</span>

                    <strong>
                      {selected.distance}
                    </strong>
                  </div>

                  <div>
                    <span>Walking time</span>

                    <strong>
                      {selected.walking}
                    </strong>
                  </div>

                </div>

                <div className="updated">
                  ● Updated 42 seconds ago
                </div>

                <button
                  className="queue-button"
                  onClick={() => setShowTrend(true)}
                >
                  View queue trend →
                </button>

              </>

            )}

            {/* REPORT PANEL */}
            {showReport && (

              <div className="report-panel">

                {!reportSubmitted ? (
                  <>
                    <button
                      className="back-button"
                      onClick={() => setShowReport(false)}
                    >
                      ← Back
                    </button>

                    <p className="card-label">
                      COMMUNITY UPDATE
                    </p>

                    <h3>
                      Report current queue
                    </h3>

                    <p className="report-text">
                      Help other students by anonymously reporting what you see.
                    </p>

                    <div className="report-location">

                      <span>
                        Location
                      </span>

                      <strong>
                        {selected.name}
                      </strong>

                    </div>

                    <p className="report-question">
                      How busy is it right now?
                    </p>

                    <div className="report-options">

                      <button
                        className={reportedStatus === "Low" ? "selected" : ""}
                        onClick={() => setReportedStatus("Low")}
                      >
                        🟢 Low
                      </button>

                      <button
                        className={
                          reportedStatus === "Moderate"
                            ? "selected"
                            : ""
                        }
                        onClick={() => setReportedStatus("Moderate")}
                      >
                        🟠 Moderate
                      </button>

                      <button
                        className={reportedStatus === "Busy" ? "selected" : ""}
                        onClick={() => setReportedStatus("Busy")}
                      >
                        🔴 Busy
                      </button>

                    </div>

                    <button
                      className="queue-button"
                      disabled={!reportedStatus}
                      onClick={submitReport}
                    >
                      Submit anonymous update
                    </button>
                  </>
                ) : (
                  <div className="report-success">
                    <div className="success-icon">✓</div>

                    <h3>
                      Update submitted
                    </h3>

                    <p>
                      Thanks. Your anonymous observation helps improve
                      the queue prediction.
                    </p>
                  </div>
                )}

              </div>

            )}

            {/* TREND PANEL */}
            {showTrend && !showReport && (

              <div className="trend-panel">

                <button
                  className="back-button"
                  onClick={() => setShowTrend(false)}
                >
                  ← Back
                </button>

                <p className="card-label">
                  QUEUE TREND
                </p>

                <h3>
                  {selected.name}
                </h3>

                <div className="trend-summary">

                  <div>
                    <span>Now</span>
                    <strong>
                      {selected.wait} min
                    </strong>
                  </div>

                  <div>
                    <span>Best time</span>
                    <strong>
                      {selected.bestTime}
                    </strong>
                  </div>

                  <div>
                    <span>Predicted</span>
                    <strong>
                      {selected.predicted} min
                    </strong>
                  </div>

                </div>

                <div className="fake-chart">

                  <div className="chart-title">
                    Estimated wait time
                  </div>

                  <div className="chart-bars">

                    <div style={{ height: "75%" }}>
                      <span>1 PM</span>
                    </div>

                    <div style={{ height: "90%" }}>
                      <span>2 PM</span>
                    </div>

                    <div style={{ height: "45%" }}>
                      <span>3 PM</span>
                    </div>

                    <div style={{ height: "25%" }}>
                      <span>4 PM</span>
                    </div>

                    <div style={{ height: "35%" }}>
                      <span>5 PM</span>
                    </div>

                  </div>

                </div>

                <div className="trend-message">

                  ↓ Queue is expected to decrease around{" "}

                  <strong>
                    {selected.bestTime}
                  </strong>.

                </div>

              </div>

            )}

          </div>

        </section>

        <div className="prototype-note">
          Prototype data for demonstration • Anonymous campus observations
        </div>

      </main>

    </div>
  );
}

export default App;