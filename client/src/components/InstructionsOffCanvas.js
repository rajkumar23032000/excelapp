import React from 'react'
import sampleExcelImage from "../images/sampleExcelScreenshot.PNG";

const InstructionsOffCanvas = () => {
    return (
        <div className="container mt-4 mb-4">
            <button className="btn btn-outline-info fw-bold" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">Instructions</button>

            <div className="offcanvas offcanvas-end inst-off-canvas text-light" tabIndex="-1" id="offcanvasRight">
                <div className="offcanvas-header">
                    <h5 id="offcanvasTopLabel">Instructions</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="alert-light fst-italic fw-bold">
                        <li>Upload an excel sheet</li>
                        <li>The uploaded excel sheet should be in the following format : </li>
                        <ol>
                            <li>First Column should have a header named "Question" containing the question</li>
                            <li>Second Column should have a header named "Answer" containing the answer for the question</li>
                        </ol>
                    </ul>


                    {/* modal */}
                    <div className="d-grid gap-2">
                        <button type="button" className="btn btn-outline-info fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            View Sample Excel Format
                        </button>
                    </div>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title fw-bold" id="exampleModalLabel">Sample Excel Screenshot</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <img className="img-fluid" src={sampleExcelImage} alt="Sample excel screenshot" />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructionsOffCanvas;