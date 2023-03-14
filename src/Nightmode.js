export default function Nightmode({ mode, switchMode }) {
  return (
    <>
      <div className="nightModeScreen">
        <div className="nightMode--button" onClick={switchMode}>
          {mode == false ? "day" : "night"}
        </div>
      </div>
    </>
  );
}
