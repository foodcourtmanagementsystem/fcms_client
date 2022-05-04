import {useEffect} from 'react';
import './Home.css';
import image1 from '../img/image1.jpg';
import image2 from '../img/image2.png';
import image3 from '../img/image3.jpg';
import image6 from '../img/image6.jpg';
import image7 from '../img/image7.jpg';
import FoodCategory from '../components/FoodCategory';
import {Carousel} from 'bootstrap';



function Home() {
  
  useEffect(() => {
 
    const carousel = document.querySelector('[data-bs-ride="carousel"]');
    if(carousel)
        Carousel.carouselInterface(carousel, Carousel.getInstance(carousel));

  }, []);

  

  const foodCategories = [
    {
      Id: 1,
      Title: "Veg",
      Image: image1,
      CreatedAt: new Date(),
    },
    {
      Id: 2,
      Title: "Non-veg",
      Image: image2,
      CreatedAt: new Date()
    },
    {
      Id: 3,
      Title: "Drinks",
      Image: image6,
      CreatedAt: new Date()
    },
    {
      Id: 4,
      Title: "Deserts",
      Image: image7,
      CreatedAt: new Date()
    },
    {
      Id: 1,
      Title: "Veg",
      Image: image1,
      CreatedAt: new Date(),
    },
    {
      Id: 2,
      Title: "Non-veg",
      Image: image2,
      CreatedAt: new Date()
    },
    {
      Id: 3,
      Title: "Drinks",
      Image: image6,
      CreatedAt: new Date()
    },
    {
      Id: 4,
      Title: "Deserts",
      Image: image7,
      CreatedAt: new Date()
    }
  ];

  return (
    <div className='home'>
        <div id="foodSlide" className='carousel slide' data-bs-ride="carousel">
          <div className='carousel-indicators'>
            <button type="button" data-bs-target="#foodSlide" data-bs-slide-to="0" className='active'></button>
            <button type="button" data-bs-target="#foodSlide" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#foodSlide" data-bs-slide-to="2"></button>
            <button type="button" data-bs-target="#foodSlide" data-bs-slide-to="3"></button>
            <button type="button" data-bs-target="#foodSlide" data-bs-slide-to="4"></button>
          </div>

          <div className='carousel-inner'>
            <div className='carousel-item active'>
              <img src={image1} alt="Food" title='Food' className='carousel-item__image'  />
            </div>
            <div className='carousel-item'>
              <img src={image2} alt="Food" title='Food' className='carousel-item__image'  />
            </div>
            <div className='carousel-item'>
              <img src={image3} alt="Food" title='Food' className='carousel-item__image'  />
            </div>
            <div className='carousel-item'>
              <img src={image6} alt="Food" title='Food' className='carousel-item__image'  />
            </div>
            <div className='carousel-item'>
              <img src={image7} alt="Food" title='Food' className='carousel-item__image'  />
            </div>
          </div>

          <button type="button" className='carousel-control-prev' data-bs-target="#foodSlide" data-bs-slide="prev">
            <span className='carousel-control-prev-icon'></span>
            <span className='visually-hidden'>Previous</span>
          </button>
          <button type="button" className='carousel-control-next' data-bs-target="#foodSlide" data-bs-slide="next">
            <span className='carousel-control-next-icon'></span>
            <span className='visually-hidden'>Next</span>
          </button>
        </div>

        <div className='food-categories'>
          {foodCategories.map((foodCategory, index) => (<FoodCategory key={index} item={foodCategory}  />))}
        </div>
    </div>
  );
}

export default Home;