function Nav(){
    return(
        <div className="d-flex justify-content-between">
            <nav className="nav justify-content-start">
                <a className="nav-link active text-black fs-3 text-uppercase" href="a">tlu</a>
                <a className="nav-link disabled mt-2" href="a">Trang chủ </a>
                <a className="nav-link disabled mt-2" href="a">Quản lý học viên</a>
            </nav>
            <div className="search-btn">
                <form className="form-inline d-flex justify-content-end">
                    <input className="form-control w-100 m-2 nav-link border border-2" type="search" placeholder="Nhập nội dung" />
                    <button className="m-2 w-50 btn btn-outline-success" type="submit">Tìm kiếm</button>
                </form>
            </div>
        </div>
    );
}

export default Nav;