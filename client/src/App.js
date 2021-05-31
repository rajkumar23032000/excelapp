import React, { useState } from 'react';
import { API } from './backend';
import InstructionsOffCanvas from './components/InstructionsOffCanvas';
import Navbar from './components/Navbar';

const App = () => {

  const [state, setState] = useState({
    selectedFile: null,
    uploaded: false
  });

  const [values, setValues] = useState({});

  const [index, setIndex] = useState({
    position: 0,
    display: false,
    displayAnswer: false
  });

  const [noOfQuestions, setNoOfQuestions] = useState([0]);



  const handleOnChange = (event) => {
    //console.log(event.target.files[0]);
    setState({ ...state, selectedFile: event.target.files[0] });
    //console.log(state);
  }

  const onClickHandle = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('excel', state.selectedFile);
    fetch(`/home`, {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: data
    }).then(item => {
      item.json().then(actual => {
        let shuffledArray = actual.sort((a, b) => 0.5 - Math.random());
        setValues(shuffledArray)
        setState({ ...state, uploaded: true })
        setIndex({ ...index, position: 0, display: false })

        let actual_length = 0
        actual.map((d, i) => {
          actual_length = actual_length + 1
        })
        //console.log(actual_length)
        setNoOfQuestions(actual_length)

      }).catch(err => { console.log(err) })

    }).catch(err => console.log(err))
  }

  const handleDisplayButton = (event) => {
    event.preventDefault();
    setIndex({ ...index, display: true });
  }

  const handleNextButton = (event) => {
    event.preventDefault();
    setIndex({ ...index, position: index.position + 1, displayAnswer: false });
  }

  const handleAnswerButton = (event) => {
    event.preventDefault();
    setIndex({ ...index, displayAnswer: true });
  }

  const handlePreviousButton = (event) => {
    event.preventDefault();
    setIndex({ ...index, position: index.position - 1, displayAnswer: false });
  }


  const uploadForm = () => {
    return (
      <div className="container">
        <form>
          <div className="mb-3">
            <label className="form-label fst-italic text-light">Upload Excel File</label>
            <input name="excel" onChange={handleOnChange} type="file" className="form-control" encType="multipart/form-data" />
          </div>
          <button onClick={onClickHandle} className="btn btn-outline-info fw-bold">Upload</button>
          {state.uploaded && (
            <h3 className="badge bg-success rounded-pill">File Uploaded Successfully!!</h3>
          )}
        </form>

        <div className="d-grid gap-2 mt-4">
          <button style={{ visibility: state.uploaded ? "" : "hidden" }} onClick={handleDisplayButton} className="btn btn-outline-info fw-bold">Show Questions</button>
        </div>
      </div>
    )
  }




  return (
    <div>
      <Navbar />
      <div className="container mt-4 p-4">
        {!index.display && InstructionsOffCanvas()}
        {uploadForm()}
        {state.uploaded && index.display && (
          <div className="container mt-4">
            <div className="row">
              <div className="col-lg-8 col-md-6 col-sm-12 col-12">
                <div className="card">
                  <div className="card-body">
                    <p className="fw-bold text-muted">{index.position + 1} / {noOfQuestions}</p>
                    <p className="card-text">{values[index.position]['Question']}</p>
                  </div>
                </div>

                {!index.displayAnswer && (
                  <button onClick={handleAnswerButton} className="container mt-4 btn btn-outline-success fw-bold">
                    Answer
                  </button>
                )}
                {index.displayAnswer && (
                  <div className="container mt-4 bg-light fw-bold answer-div">
                    <p className="fw-bold text-success lh-lg">{values[index.position]['Answer']}</p>
                  </div>
                )}

              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="d-grid">
                  <br />
                  <button style={{ visibility: index.position + 1 === 1 ? "hidden" : "" }} onClick={handlePreviousButton} className="btn btn-outline-warning fw-bold">Previous</button>
                  <br />
                  <button style={{ visibility: index.position + 1 <= noOfQuestions - 1 ? "" : "hidden" }} onClick={handleNextButton} className="btn btn-outline-primary fw-bold">Next</button>
                </div>

              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
