//pass a msg into messages
export default function Messages({ currMsg, currDesc }) {
  return (
    <>
      <div className="msgScreen">
        <div className="msg--bubble">
          <h1 className="msg--title">{currMsg}</h1>
          <div className="msg--content">{currDesc}</div>
        </div>
      </div>
    </>
  );
}
