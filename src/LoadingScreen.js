import { useProgress } from "@react-three/drei";

export default function LoadingScreen({ started, onStarted }) {
  const { progress } = useProgress();

  return (
    <>
      <div
        className={`loadingScreen ${started ? "loadingScreen--started" : "h"}`}
      >
        <div className="loadingScreen__progress">
          <div
            className="loadingScreen__progress__value"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
        <div className="loadingScreen__board">
          <h1 className="loadingScreen__title">welcome to smaalworld!</h1>
          <button
            className="loadingScreen__button"
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
