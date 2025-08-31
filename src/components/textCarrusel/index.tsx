
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './txtCarr.css'
import { Typography } from '@mui/material';
import type { TextoConId } from '../../types/Texto';

const TextCarrusel = ({ textos }: { textos: TextoConId[]}) => {
  const delay = import.meta.env.VITE_TIME_DELAY
  return (
    <Swiper
          className="mySwiper mySwiperTxt"
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
        //   className="mySwiper"
        >
          {
            textos.map((txt) => (
              <SwiperSlide key={txt.id}>
                <Typography 
                  variant="h2"
                >
                  {txt.contenido}
                </Typography>
              </SwiperSlide>
            ))
          }
          {/* <SwiperSlide>
            LUCAS GONZALEZ
          </SwiperSlide> */}
      </Swiper>
  )
}

export default TextCarrusel