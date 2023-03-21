//pass a msg into messages
export default function Messages({ currMsg, currDesc, currLink, setAutoFwd }) {
  return (
    <>
      <div className="msgScreen">
        <div className="msg--bubble">
          <h1 className="msg--title">{currMsg}</h1>
          <div className="flex-container">
            <div className="flex-child">{currDesc}</div>
            {currLink == "" ? (
              false
            ) : (
              <div
                className="flex-child--link"
                onClick={() => {
                  setAutoFwd();
                }}
              >
                {currLink}
                <i className="fa-solid fa-circle-right"></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
