import React, { useEffect, useRef, useState } from "react";
import santa from "./img/santa1.jpg";
const Canvas = () => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    imageRef.current.onload = () => {
      context.drawImage(imageRef.current, 5, 5);
    };
  }, []);

  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    text = text.substr(0, 32);

    let words = [];
    let flag = true;
    let limit = 8;
    let offset = 0;
    while (flag) {
      words.push(text.substr(offset, limit));
      offset += 8;
      if (text.length < offset) {
        flag = false;
      }
    }
    let line = "";
    context.drawImage(imageRef.current, 5, 5);
    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = context.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    var maxWidth = 100;
    var lineHeight = 40;
    var x = 40;
    var y = 320;
    context.font = "40px Courier";
    context.direction = "inherit";
    wrapText(context, text, x, y, maxWidth, lineHeight);
  }, [text]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = canvas.toDataURL();
    link.click();
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col col-sm-12 center">
          <canvas ref={canvasRef} width={530} height={500} />
          <img
            alt="santa"
            ref={imageRef}
            src={santa}
            style={{ display: "none" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col col-11">
          <input
            className="form-control form-control-lg"
            type="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            maxLength="32"
            placeholder="Enter text"
          />
        </div>

        <div className="col col-1">
          <button
            type="button"
            className="btn btn-primary btn-height"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h1 className="text-center">Murderous Santa Meme</h1>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
