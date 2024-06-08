import "bootstrap/dist/css/bootstrap.min.css";

function Nav() {
    return (
        <div className="d-flex justify-content-between">
            <nav className="nav justify-content-start">
                <a className="nav-link active text-black fs-3 text-uppercase" href="a">tlu</a>
                <a className="nav-link disabled mt-2" href="a">TRANG CHỦ </a>
                <a className="nav-link disabled mt-2" href="a">QUẢN LÝ NHÂN VIÊN</a>
            </nav>
            <div className="search-btn">
                <form className="form-inline d-flex justify-content-end">
                    <input className="form-control m-2 nav-link border border-2" type="search" placeholder="Nhập nội dung tìm kiếm" />
                    <button className="m-2 btn btn-outline-success" type="submit">Tìm</button>
                </form>
            </div>
        </div>
    );
}

export default Nav;