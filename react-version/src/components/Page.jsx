import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Page.css";

import React from 'react'

function Page() {
  return (
    <div className="p-3 d-flex justify-content-between">
        <div className="info fw-light">
            <p>Hiển thị <b>5/25</b> bản ghi</p>
        </div>
        <div className="page d-flex justify-content-between">
            <a href="a" className="p-2 page-link">Trước</a>
            <a href="a" className="p-2 page-link">1</a>
            <a href="a" className="p-2 page-link">2</a>
            <a href="a" className="p-2 page-link">3</a>
            <a href="a" className="p-2 page-link">4</a>
            <a href="a" className="p-2 page-link">5</a>
            <a href="a" className="p-2 page-link">Sau</a>
        </div>
    </div>
  )
}

export default Page