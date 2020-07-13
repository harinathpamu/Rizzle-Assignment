import React from "react";

import { data } from "./resources";

function App() {
  const [current, setCurrent] = React.useState(0);
  const [isLoading, setLoading] = React.useState(true);
  const [feed, setFeed] = React.useState([]);

  React.useEffect(() => {
    setFeed(data);
    setLoading(false);
  }, []);

  const previousHandler = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };
  const nextHandler = () => {
    if (current < feed.length - 1) {
      setCurrent(current + 1);
    }
  };
  const infoHandler = () => {
    window.$("#infoModal").modal("toggle");
  };

  return (
    <React.Fragment>
      <div className="h-100 d-flex justify-content-center align-items-center">
        {isLoading ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="h-100 w-100 d-flex flex-row">
            <div className="d-flex flex-column align-items-center p-2">
              <div className="flex-fill">
                <div style={{ height: "3em" }}></div>
              </div>
              <div className="flex-fill">
                <Previous onPreviousHandler={previousHandler} />
              </div>
            </div>
            <div className="flex-fill d-flex justify-content-center align-items-center p-3">
              <Video data={feed[current]} />
            </div>
            <div className="d-flex flex-column align-items-center p-2">
              <div className="flex-fill">
                <Info onInfoHandler={infoHandler} />
              </div>
              <div className="flex-fill">
                <Next onNextHandler={nextHandler} />
              </div>
            </div>
            <Modal info={feed[current]} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default App;

function Modal(props) {
  const data = props.info;
  return (
    <div id="infoModal" className="modal fade" role="dialog" key={data.id}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Info</h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => window.$("#infoModal").modal("toggle")}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {data.channel != null ? (
              <p>
                {data.channel.title} by{" "}
                <strong>{data.channel.user.name}</strong>
              </p>
            ) : null}
            <strong>EPISODE :: {data.episodeNum}</strong>
            <br />
            <strong>VIEW COUNT :: {data.meta.viewCount}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function Video(props) {
  const data = props.data;

  return (
    <React.Fragment>
      <video
        key={data.id}
        className="mx-auto h-100 w-100"
        poster={data.video.coverImageUrl}
        controls
        autoPlay
      >
        <source src={data.video.originalUrl} type="video/mp4" />
        <p>This browser does not support the video element.</p>
      </video>
    </React.Fragment>
  );
}

function Info(props) {
  return (
    <svg
      width="3em"
      height="3em"
      viewBox="0 0 16 16"
      className="bi bi-info-circle-fill"
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
      onClick={props.onInfoHandler}
      style={{ cursor: "pointer" }}
    >
      <path
        fillRule="evenodd"
        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
      />
    </svg>
  );
}

function Next(props) {
  return (
    <svg
      width="3em"
      height="3em"
      viewBox="0 0 16 16"
      className="bi bi-arrow-right-circle-fill"
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
      onClick={props.onNextHandler}
      style={{ cursor: "pointer" }}
    >
      <path
        fillRule="evenodd"
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-8.354 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z"
      />
    </svg>
  );
}

function Previous(props) {
  return (
    <svg
      width="3em"
      height="3em"
      viewBox="0 0 16 16"
      className="bi bi-arrow-left-circle-fill"
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
      onClick={props.onPreviousHandler}
      style={{ cursor: "pointer" }}
    >
      <path
        fillRule="evenodd"
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.646 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L6.207 7.5H11a.5.5 0 0 1 0 1H6.207l2.147 2.146z"
      />
    </svg>
  );
}
