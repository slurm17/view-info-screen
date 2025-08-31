import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './imgCarr.css'
import type { Imagen } from '../../types/Imagen';


const ImgCarusell = ({ imagenes }: { imagenes: Imagen[]}) => {
  const delay = import.meta.env.VITE_TIME_DELAY
  const urlImages = import.meta.env.VITE_URL_IMAGES
  
  return (
    <>
      <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: delay,
            // disableOnInteraction: true,
          }}
          // pagination={{
          //   clickable: true,
          // }}
          // navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {
            imagenes.map((img) => (
              <SwiperSlide key={img.id}>
                <img src={`${urlImages}${img.url}`} alt={img.titulo || `Imagen ${img.id}`} />
              </SwiperSlide>
            ))
          }
          {/* <SwiperSlide>
            <img src='https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg'/>
          </SwiperSlide> */}
      </Swiper>
    </>
  )
}

export default ImgCarusell