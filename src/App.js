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
  // const tempCategory = [
  //   {
  //     id: 1,
  //     imagePath:
  //       "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg",
  //     title: "قهوه سرد",
  //     partner: "hesperso",
  //   },
  //   {
  //     id: 2,
  //     imagePath:
  //       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Homemade_Dalgona_Coffee.jpg/1200px-Homemade_Dalgona_Coffee.jpg",
  //     title: "قهوه تلخ",
  //     partner: "hesperso",
  //   },
  //   {
  //     id: 3,
  //     imagePath:
  //       "https://media.gettyimages.com/photos/closeup-of-coffee-in-cup-picture-id1032751904?s=612x612",
  //     title: "اسپرسو",
  //     partner: "hesperso",
  //   },
  //   {
  //     id: 4,
  //     imagePath:
  //       "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco/k%2FPhoto%2FRecipes%2F2020-07-how-to-make-a-milkshake-at-home%2F2020-06-08_AT-K19388",
  //     title: "انواع شیک",
  //     partner: "hesperso",
  //   },
  //   {
  //     id: 5,
  //     imagePath:
  //       "https://veenaazmanov.com/wp-content/uploads/2017/03/Chocolate-Milkshake-Recipe2.jpg",
  //     title: "اسموتی",
  //     partner: "hesperso",
  //   },
  //   {
  //     id: 6,
  //     imagePath:
  //       "https://sugarspunrun.com/wp-content/uploads/2019/01/Best-Cheesecake-Recipe-2-1-of-1-4.jpg",
  //     title: "کیک",
  //     partner: "hesperso",
  //   },
  // ];
  // const tempItems = [
  //   {
  //     id: 1,
  //     title: "فهوه دمی",
  //     description: "قهوه دمی یک نوشدنی علی با بهترین گیفیت است نوشدنی ع است",
  //     categoryId: 2,
  //     partner: "hesperso",
  //     imagePath:
  //       "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg",
  //     enable: true,
  //     price: "1000 تومان",
  //   },
  //   {
  //     id: 2,
  //     title: "فهوه ترک",
  //     description: "قهوه دمی یک نوشدنی عالی با بهترین گیفیت است",
  //     categoryId: 2,
  //     partner: "hesperso",
  //     imagePath:
  //       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Homemade_Dalgona_Coffee.jpg/1200px-Homemade_Dalgona_Coffee.jpg",
  //     enable: true,
  //     price: "1000 تومان",
  //   },
  //   {
  //     id: 3,
  //     title: "فهوه اسپرسو",
  //     description: "قهوه دمی یک نوشدنی علی با بهترین گیفیت است",
  //     categoryId: 2,
  //     partner: "hesperso",
  //     imagePath:
  //       "https://media.gettyimages.com/photos/closeup-of-coffee-in-cup-picture-id1032751904?s=612x612",
  //     enable: true,
  //     price: "1000 تومان",
  //   },
  //   {
  //     id: 4,
  //     title: "شیک موز",
  //     description: "قهوه دمی یک نوشدنی علی با بهترین گیفیت است",
  //     categoryId: 2,
  //     partner: "hesperso",
  //     imagePath:
  //       "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco/k%2FPhoto%2FRecipes%2F2020-07-how-to-make-a-milkshake-at-home%2F2020-06-08_AT-K19388",
  //     enable: true,
  //     price: "1000 تومان",
  //   },
  //   {
  //     id: 1,
  //     title: "فهوه دمی",
  //     description:
  //       "قهوه دمی یک نوشدنی علی با بهترین گیفیت است نوشدنی علی با بهترین گیفیت است نوشدنی علی با بهترین گیفیت است",
  //     categoryId: 2,
  //     partner: "hesperso",
  //     imagePath:
  //       "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg",
  //     enable: true,
  //     price: "1000 تومان",
  //   },
  //   {
  //     id: 2,
  //     title: "فهوه ترک",
  //     description: "قهوه دمی یک نوشدنی علی با بهترین گیفیت است",
  //     categoryId: 2,
  //     partner: "hesperso",
  //     imagePath:
  //       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Homemade_Dalgona_Coffee.jpg/1200px-Homemade_Dalgona_Coffee.jpg",
  //     enable: true,
  //     price: "1000 تومان",
  //   },
  //   {
  //     id: 3,
  //     title: "فهوه اسپرسو",
  //     description: "قهوه دمی یک نوشدنی علی با بهترین گیفیت است",
  //     categoryId: 2,
  //     partner: "hesperso",
  //     imagePath:
  //       "https://media.gettyimages.com/photos/closeup-of-coffee-in-cup-picture-id1032751904?s=612x612",
  //     enable: true,
  //     price: "1000 تومان",
  //   },
  //   {
  //     id: 4,
  //     title: "شیک موز",
  //     description: "قهوه دمی یک نوشدنی علی با بهترین گیفیت است",
  //     categoryId: 2,
  //     partner: "hesperso",
  //     imagePath:
  //       "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco/k%2FPhoto%2FRecipes%2F2020-07-how-to-make-a-milkshake-at-home%2F2020-06-08_AT-K19388",
  //     enable: true,
  //     price: "1000 تومان",
  //   },
  //   {
  //     id: 1,
  //     title: "فهوه دمی",
  //     description:
  //       "قهوه دمی یک نوشدنی علی با بهترین گیفیت است نوشدنی علی با بهترین گیفیت است نوشدنی علی با بهترین گیفیت است",
  //     categoryId: 2,
  //     partner: "hesperso",
  //     imagePath:
  //       "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg",
  //     enable: true,
  //     price: "1000 تومان",
  //   },
  //   {
  //     id: 2,
  //     title: "فهوه ترک",
  //     description: "قهوه دمی یک نوشدنی علی با بهترین گیفیت است",
  //     categoryId: 2,
  //     partner: "hesperso",
  //     imagePath:
  //       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Homemade_Dalgona_Coffee.jpg/1200px-Homemade_Dalgona_Coffee.jpg",
  //     enable: true,
  //     price: "1000 تومان",
  //   },
  //   {
  //     id: 3,
  //     title: "فهوه اسپرسو",
  //     description: "قهوه دمی یک نوشدنی علی با بهترین گیفیت است",
  //     categoryId: 2,
  //     partner: "hesperso",
  //     imagePath:
  //       "https://media.gettyimages.com/photos/closeup-of-coffee-in-cup-picture-id1032751904?s=612x612",
  //     enable: true,
  //     price: "1000 تومان",
  //   },
  //   {
  //     id: 4,
  //     title: "شیک موز",
  //     description: "قهوه دمی یک نوشدنی علی با بهترین گیفیت است",
  //     categoryId: 2,
  //     partner: "hesperso",
  //     imagePath:
  //       "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco/k%2FPhoto%2FRecipes%2F2020-07-how-to-make-a-milkshake-at-home%2F2020-06-08_AT-K19388",
  //     enable: true,
  //     price: "1000 تومان",
  //   },
  // ];
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
              <div key={item.id} className="items">
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
                    <p>{item.price}تومان</p>
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
