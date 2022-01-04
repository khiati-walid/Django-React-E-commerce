
import {

    useParams
} from "react-router-dom";
import { useState } from "react"
import { Document, Page, pdfjs } from 'react-pdf'

const PdfViewer = () => {
    pdfjs.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [numPages, setNumPages] = useState(null);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    let { link } = useParams();
    return (
        <>
            {/* <h1>{decodeURIComponent(link)}</h1>
            


            <embed src={decodeURIComponent(link)} style={{ width: "100%", height: "100vh" }}></embed> */}
            <div className="d-flex justify-content-center">
                <Document
                    file={decodeURIComponent(link)}

                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page scale="2" className="page" size="A4" key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                </Document>
            </div>
        </>
    );
}

export default PdfViewer;