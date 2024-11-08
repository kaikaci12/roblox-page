import Image from "next/image";
const Box3 = () => {
  return (
    <div className="box3">
      <div className="container">
        <div className="row">
          <div className="price">$0.00</div>
          <div className="details">
            <div className="robux_total">
              <div className="pic">
                <Image src="/images/robux-removebg-preview.png" alt="Robux" />
              </div>
              <span>800</span>
            </div>
          </div>
        </div>
        {/* Repeat similar structure for other rows */}
      </div>
    </div>
  );
};

export default Box3;
