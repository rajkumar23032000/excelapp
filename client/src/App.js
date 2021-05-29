import React, { useState } from 'react';
import { API } from './backend';
//import { getData } from './components/helper/apicalls';

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

  const handleOnChange = (event) => {
    //console.log(event.target.files[0]);
    setState({ ...state, selectedFile: event.target.files[0] });
    //console.log(state);
  }

  const onClickHandle = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('excel', state.selectedFile);
    fetch(`${API}/home`, {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: data
    }).then(item => {
      item.json().then(actual => {
        setValues(actual)
        setState({ ...state, uploaded: true })
        setIndex({ ...index, position: 0, display: false })
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

  const handleAnsweButton = (event) => {
    event.preventDefault();
    setIndex({ ...index, displayAnswer: true });
  }


  const uploadForm = () => {
    return (
      <div className="container">
        <form>
          <div className="mb-3">
            <label className="form-label">Upload Excel File</label>
            <input name="excel" onChange={handleOnChange} type="file" className="form-control" encType="multipart/form-data" />
          </div>
          <button onClick={onClickHandle} className="btn btn-secondary">Upload</button>
          {state.uploaded && (
            <h3 className="badge bg-success rounded-pill">File Uploaded Successfully!!</h3>
          )}
        </form>

        <div className="d-grid gap-2 mt-4">
          <button onClick={handleDisplayButton} className="btn btn-success">Display Results</button>
        </div>
      </div>
    )
  }


  return (
    <div className="container mt-4 p-4">
      {uploadForm()}
      {state.uploaded && index.display && (
        <div className="container mt-4">
          <div className="row">
            <div className="col-8">
              <div className="card">
                <div className="card-body">
                  <p className="fw-bold text-muted">{index.position + 1}</p>
                  <p className="card-text">{values[index.position]['Question']}</p>
                  {index.displayAnswer && (
                    <h3 className="text-success fw-bold">Answer : {values[index.position]['Answer']}
                    </h3>
                  )}
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-grid gap-2">
                <button onClick={handleAnsweButton} className="btn btn-outline-dark fw-bold mt-2">Show Answer</button>
                <br />
                <button onClick={handleNextButton} className="btn btn-outline-primary fw-bold">Next</button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
