
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Textfit } from "react-textfit";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './txtCarr.css'
import type { TextoConId } from '../../types/Texto';

const TextCarrusel = ({ textos, segundos }: { textos: TextoConId[], segundos: number}) => {

  // const delay = import.meta.env.VITE_TIME_DELAY
  return (
    <Swiper
          className="mySwiper mySwiperTxt"
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
        //   className="mySwiper"
        >
          {textos.map((txt) => (
              <SwiperSlide 
                style={{
                  backgroundColor: '#fff', 
                  textAlign: 'center',
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }} 
                key={txt.id}
              >
                <Textfit 
                  mode="multi" 
                  style={{ width: "100%", height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  forceSingleModeWidth={false}
                >
                  {txt.contenido}
                </Textfit>
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