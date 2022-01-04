import { Link } from "react-router-dom";
import "../styles.css"

import axios from "axios";
import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf'
class Catalog extends Component {
  api = "http://localhost:8000/catalogs"

  state = {
    catalogs: {
      loading: false,
      data: null,
      error: false
    }

  }
  componentDidMount() {

    axios.get(this.api).then(res => {
      this.setState({
        catalogs: {
          loading: false,
          data: res.data,
          error: false
        }
      }
      )
    }
    ).catch(() => {
      this.setState({
        catalogs: {
          loading: false,
          data: null,
          error: true
        }
      })

    })
  }
  render() {

    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    let content = ""
    if (this.state.catalogs.error) content = <p> there no catalogs in data base</p>
    if (this.state.catalogs.loading) content = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border  text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>)
    return (
      <>
        <div className="container">
          <div className="text-center mt-5"><h2>Catalogs and guides</h2>{content}</div>
          <div className="d-flex justify-content-center">
            <div className="row">
              {this.state.catalogs.data && this.state.catalogs.data.results.slice(0, 3).map((catalog, index) => (
                <div className=" col-sm-12 col-md-4 mt-4 " key={index}>
                  <div className="catalog shadow-sm">
                    <Document
                      file={catalog.catalog}
                    >
                      <Page
                        className="image"
                        loading={<img src="../../public/dist/img/download.png" />}
                        scale={0.5}

                        pageNumber={1} />
                    </Document>

                    <div className="title">
                      <i className="fa fa-file-pdf text-danger"></i>  {catalog.titre_fr}
                    </div>
                    <div className="actions">
                      <div><a href={catalog.catalog} download ><i className="fa fa-download"></i></a></div>
                      <div><Link to={"/view/" + encodeURIComponent(catalog.catalog)} ><i className="fa  fa-eye"></i></Link></div>
                    </div>
                  </div>
                  {/* <a href="http://localhost:8000/media/media/business-model-canvas.pdf" >pdf</a>
              <embed src="http://localhost:8000/media/media/business-model-canvas.pdf" width="700" height="800" type="application/pdf"></embed> */}
                </div>
              ))}
            </div>
          </div >
        </div >
      </>

    );
  }
}
export default Catalog