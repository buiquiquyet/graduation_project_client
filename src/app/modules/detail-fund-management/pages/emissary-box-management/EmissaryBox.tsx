import { formatCurrency } from "@/shared/user-const";
import { memo } from "react";

export default memo(function EmissaryBox() {
    return (
        <section className="list-user-donate container">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
            <div className="item-user ">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJOl1KjlauWabsSlKom0OK_wqGL6E6WB-c7g&s"
                alt=""
              />
              <span className="name-user">Bạch Võ Thanh Trúc</span>
              <span>{formatCurrency(100000)}</span>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
            <div className="item-user ">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJOl1KjlauWabsSlKom0OK_wqGL6E6WB-c7g&s"
                alt=""
              />
              <span className="name-user">Bạch Võ Thanh Trúc</span>
              <span>{formatCurrency(100000)}</span>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
            <div className="item-user ">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJOl1KjlauWabsSlKom0OK_wqGL6E6WB-c7g&s"
                alt=""
              />
              <span className="name-user">Bạch Võ Thanh Trúc</span>
              <span>{formatCurrency(100000)}</span>
            </div>
          </div>
        </div>
        {/* {dataComments.datas &&
          dataComments.totalRecords > page.perPageOptions[0] && (
            <LibBasePagination
              totalPage={dataComments.totalPages}
              onClick={(event, newPage) => handleChangePage(event, newPage)}
              totalRecords={dataComments.totalRecords}
              pageNumber={page.pageNumber}
              isShowTotalRecord={false}
            />
          )} */}
      </section>
    )
})