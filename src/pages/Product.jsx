import { useDispatch, useSelector } from "react-redux";
import ProducCard from "../components/ProductCard";
import Modal  from "../components/Modal";
import Button from "../components/Button";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { createDataFunc, updateDataFunc } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const { modal } = useSelector((state) => state.modal);
  const { data, keyword } = useSelector((state) => state.data) || { data: [] };
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    url: "",
  });

  const onChangeFunc = (e, type) => {
    if (type === "url") {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0]
          ? URL.createObjectURL(e.target.files[0])
          : "",
      }));
    } else {
      setProductInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  let loc = location?.search.split("=")[1];

  useEffect(() => {
    if (loc && data.length > 0) {
      const foundProduct = data.find((dt) => dt.id == loc);
      console.log("Bulunan Ürün:", foundProduct);

      if (foundProduct) {
        setProductInfo(foundProduct);
      } else {
        setProductInfo({ name: "", price: "", url: "" });
      }
    }
  }, [loc, data]);

  const buttonFunc = () => {
    dispatch(createDataFunc({ ...productInfo, id: data.length + 1 }));
    dispatch(modalFunc());
    setProductInfo({ name: "", price: "", url: "" });
  };
  const buttonUpdateFunc = () => {
    dispatch(updateDataFunc({ ...productInfo, id: loc }));
    dispatch(modalFunc());
    navigate("/");
  };

  const contentModal = (
    <>
      <Input
        value={productInfo.name}
        type="text"
        placeholder="Ürün ekle"
        name="name"
        id="name"
        onChange={(e) => onChangeFunc(e, "name")}
      />

      <Input
        value={productInfo.price}
        type="text"
        placeholder="Fiyat ekle"
        name="price"
        id="price"
        onChange={(e) => onChangeFunc(e, "price")}
      />

      <Input
        type="file"
        id="url"
        name="url"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={(e) => onChangeFunc(e, "url")}
      />
      <Button
        btnText={loc ? "Güncelle" : "Oluştur"}
        onClick={loc ? buttonUpdateFunc : buttonFunc}
      />
    </>
  );
  const filtredItems = data.filter((dt) =>
    dt.name.toLowerCase().includes(keyword)
  );

  return (
    <div>
      <div className="flex items-center flex-wrap">
        {filtredItems?.map((dt, i) => (
          <ProducCard key={i} dt={dt} />
        
        ))}
      </div>

      {modal && (
        <Modal content={contentModal} title={loc ? "Güncelle" : "Oluştur"} />
      )}
    </div>
  );
};

export default Product;