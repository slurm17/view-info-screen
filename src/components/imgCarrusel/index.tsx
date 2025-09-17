import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './imgCarr.css'
import type { Imagen } from '../../types/Imagen';

const ImgCarusell = ({ imagenes, segundos }: { imagenes: Imagen[], segundos: number}) => {
  // const delay = import.meta.env.VITE_TIME_DELAY
  
  return (
    <>
      <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: segundos,
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
              <SwiperSlide style={{backgroundColor: '#000'}} key={img.id}>
                <img style={{objectFit: 'contain'}} src={img.url} alt={img.titulo || `Imagen ${img.id}`} />
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