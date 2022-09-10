const FrameComponent = () => {
  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
      }}>
      <p
        style={{
          margin: "0",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "80vh",
          width: "90vw",
          borderRadius: "50px",
          background: "linear-gradient(145deg, #cccbdd, #f3f1ff)",
          boxShadow: "5px 5px 12px #5b5a62, -5px -5px 12px #ffffff",
        }}></p>
    </div>
  );
};

export default FrameComponent;
