import "./App.scss";
import Header from "./images/header.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/swiper.scss";
import SwiperCore, { EffectCoverflow, Navigation } from "swiper";
import "swiper/components/navigation/navigation.scss";
import { useEffect, useState } from "react";
import Logo from "./images/logo.png";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import { get, responseValidator } from "./api";
import EmptyPic from "./images/empty.jpg";

function App() {
  
  SwiperCore.use([EffectCoverflow, Navigation]);
  const [categorySelected, setCategorySelected] = useState();
  const [category, setCategory] = useState();
  const [items, setItems] = useState();
  useEffect(() => {
    get("/category/get?partner=hesperso").then((res) => {
      if (responseValidator(res.status) && res.data) {
        setCategory(res.data);
        setCategorySelected(res.data[0].id);
      } else toast.error("خطایی رخ داده است. لطفا دوباره تلاش کنید");
    });
    // setTimeout(() => {
    //   setCategory(tempCategory);
    // }, 2000);
  }, []);

  useEffect(() => {
    if (categorySelected) {
      setItems(undefined);
      get(`/product/get?partner=hesperso&categoryid=${categorySelected}`, {
        categoryid: categorySelected,
      }).then((res) => {
        if (responseValidator(res.status)) {
          setItems(res.data);
        } else toast.error("خطایی رخ داده است. لطفا دوباره تلاش کنید");
      });
    }

    //   setTimeout(() => {
    //     setItems(tempItems);
    //   }, 2000);
  }, [categorySelected]);
  if (!category)
    return (
      <div className="hesperso-loading-page">
        <Loader type="Rings" color="#FF6600" height={200} width={200} />
      </div>
    );
  return (
    <div className="hesperso">
      <img className="header" src={Header} alt="Header" />
      <Swiper
        className="swiper-main"
        spaceBetween={16}
        loop={false}
        pagination={false}
        navigation
        grabCursor={true}
        centeredSlides={false}
        slidesPerView={3}
      >
        {category.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              onClick={() => setCategorySelected(item.id)}
              className={`slider-item ${
                categorySelected === item.id ? "active" : ""
              }`}
            >
              <img src={item.imagePath} alt="hesperso" />
              <p>{item.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="logo-container">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="items-container">
        {items ? (
          items.length !== 0 ? (
            items.map((item) => (
              <div key={item.id} className="itemsbox">
                <img
                  onError={(event) => {
                    event.target.src = EmptyPic;
                  }}
                  src={item.imagePath}
                  alt="Hesperso item"
                />
                <div className="info">
                  <h2>{item.title}</h2>
                  <h4>{item.description}</h4>
                  <span />
                  <div className="price-container">
                    <p>{item.price.toLocaleString()} تومان</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ margin: "20px auto" }}>آیتمی برای نمایش وجود ندارد!</p>
          )
        ) : (
          <div className="loader-container">
            {Array.from(Array(9).keys()).map(() => (
              <div className="items-skeleton">
                <div className="pic hesperso-skeleton" />
                <div className="info">
                  <div
                    style={{
                      width: (16 + Math.random() * 40).toString() + "%",
                    }}
                    className="items hesperso-skeleton"
                  />
                  <div
                    style={{
                      width: (16 + Math.random() * 40).toString() + "%",
                    }}
                    className="items hesperso-skeleton"
                  />
                  <span />
                  <div className="skeleton-items-container">
                    <div
                      style={{
                        width: (16 + Math.random() * 40).toString() + "%",
                      }}
                      className="items hesperso-skeleton"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
