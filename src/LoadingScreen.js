import { useProgress } from "@react-three/drei";

export default function LoadingScreen({ started, onStarted }) {
  const { progress } = useProgress();

  return (
    <>
      <div
        className={`loadingScreen ${started ? "loadingScreen--started" : ""}`}
      >
        <div className="loadingScreen--progress">
          <div
            className="loadingScreen--progress--value"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
        <div className="loadingScreen--board">
          {progress == 100 ? <div className="header">in development</div> : ""}
          <h1 className="loadingScreen--title">welcome to smaalworld!</h1>
          <button
            className="loadingScreen--button"
            disabled={progress < 100}
            onClick={onStarted}
          >
            look
          </button>
        </div>
      </div>
    </>
  );
}
