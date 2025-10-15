import { useEffect, useRef, useState } from "react";
import ImgCarusell from "../../components/imgCarrusel"
import TextCarrusel from "../../components/textCarrusel"
import io from "socket.io-client";
import InfoSocio from "../../components/infoSocio";
import { getImagenes } from "../../api/imagen.api";
import { getTextos } from "../../api/texto.api";
import type { Imagen } from "../../types/Imagen";
import type { TextoConId } from "../../types/Texto";
import escudoClub from "../../assets/escudo-club.png"
import { getConfig } from "../../api/config.api";

// type Socio = {
//   dni: string;
//   nombre?: string;
//   apellido?: string;
// };
// type ResultadoSocio = {
//   dni: string;
//   socio?: Socio;
//   estado: string;
// };
// interface SocioResponse {
//   status: "ok" | "error"; // si solo puede ser "ok", dejalo como "ok"
//   data: {
//     num_socio: string;
//     nombre: string;
//     estado_socio: string; // si en realidad es numérico, usar number
//     fecha_estado: string; // podés usar Date si lo parseás
//   };
// }

const Main = () => {
  const socketUrl = import.meta.env.VITE_SOCKET_URL
  const [viewInfoSocio, setViewInfoSocio] = useState(false)
  const urlImageSocio = import.meta.env.VITE_URL_IMAGES
  const [datos, setDatos] = useState({
    // dni: "39256873",
    // nombre: "LUCAS ALEJANDRO FERNANDEZ",
    // nroSocio: "33545",
    // mensaje: 'BIENVENIDO AL CLUB'
    dni: "",
    nombre: "",
    nroSocio: "",
    mensaje: ''
  });
  const [imagenes, setImagenes] = useState<Imagen[]>([])
  const [textos, setTextos] = useState<TextoConId[]>([])
  const [segundos, setSegundos] = useState(0)
  const [src, setSrc] = useState<string | null>(null);
  const activeTimeouts = useRef<number>(0);

  useEffect(() => {
    const fechData = async () => {
      try {
        const data = await getConfig()
        setSegundos(data.duracion_img_seg * 1000)
        console.log("🚀 ~ fechData ~ data:", data)
      } catch (error) {
        console.log("🚀 ~ fechData ~ error:", error)
      }
    }
    fechData()
  }, [datos])
  
  useEffect(() => {
    const fechData = async () => {
      try {
        const data = await getTextos()
        if (data?.length > 0) {
          setTextos(data)
        }else{
          setTextos([{
            id: 0,
            contenido: 'BIENVENIDO',
            orden: '0',
            activo: true
          }])
        }
        console.log("🚀 ~ fechData ~ data:", data)
        // setTextos(data)
      } catch (error) {
        setTextos([{
            id: 0,
            contenido: '¡BIENVENIDO!',
            orden: '0',
            activo: true
          }])
        console.log("🚀 ~ ImgCarusell ~ error:", error)
      }
    }
    fechData()
  }, [datos])

  useEffect(() => {
    const fechData = async () => {
    const urlImages = import.meta.env.VITE_URL_IMAGES
    try {
      const data = await getImagenes();
      if (data?.length > 0) {
        const imagenesConUrl = data.map((img: Imagen) => ({
          ...img,
          url: `${urlImages}${img.url}`,  // <- concateno acá
        }));
        setImagenes(imagenesConUrl);
      } else {
        setImagenes([{
          id: 0,
          url: escudoClub,
          titulo: "Echague",
          descripcion: "Logo del club Echague",
          activa: true,
          orden: 0,
        }]);
      }
      } catch (error) {
        setImagenes([{
          id: 0,
          url: escudoClub,
          titulo: "Echague",
          descripcion: "Logo del club Echague",
          activa: true,
          orden: 0,
        }]);
        console.log("🚀 ~ fechData ~ error:", error)
      }
    };
    fechData()
  }, [datos])

  useEffect(() => {
    const socket = io(socketUrl, {
    transports: ["websocket"] // opcional, para evitar polling
  });
    socket.on("scanner-entrada", ({ mensaje, datos_socio }) => {
      setDatos({
        dni: datos_socio?.dni,
        nombre: datos_socio?.nombre,
        nroSocio: datos_socio?.num_socio,
        mensaje : mensaje
      })
      fetch(`${urlImageSocio}/fotos-socios/${datos_socio?.dni}.jpg`)
      .then((res) => {
        if (!res.ok) {
          setSrc(null);
          throw new Error("No existe imagen");
        }
        setSrc(res.url);
      })
      .catch((error) => console.error(error));
      setViewInfoSocio(true);
      activeTimeouts.current += 1; // contador de mensajes activos
      const timeout = setTimeout(() => {
        activeTimeouts.current -= 1;
        if (activeTimeouts.current === 0) {
          setViewInfoSocio(false); // solo ocultar si no hay mensajes activos
        }
      }, 3500);
      return () => {
        clearTimeout(timeout)
      };
    });

    // socket.on("scanner-salida", (data: ResultadoSocio) => {
    //   console.log("🚀 ~ ControlAcceso2 ~ data:", data)
    //   const { dni, socio, estado: estadoMsg } = data;
    //   console.log("🚀 ~ Main ~ dni:", dni)
    //   // setEstado(`${estadoMsg} (${dni}) SALIDA`);
    //   setViewInfoSocio(true);
    //   if (socio && socio.dni === dni) {
    //     setFotoVisible(true);
    //   } else {
    //     setFotoVisible(false);
    //   }
    //   activeTimeouts.current += 1; // contador de mensajes activos
    //   const timeout = setTimeout(() => {
    //     activeTimeouts.current -= 1;
    //     if (activeTimeouts.current === 0) {
    //       setViewInfoSocio(false); // solo ocultar si no hay mensajes activos
    //     }
    //   }, 3000);
    //   return () => clearTimeout(timeout);
    // });

  return () => {
    socket.disconnect();
    // clearTimeout(timeout)
  };
}, [socketUrl]);

  return (
    <>
        { !viewInfoSocio &&
          <>
            <ImgCarusell segundos={segundos} imagenes={imagenes}/>
            <TextCarrusel segundos={segundos} textos={textos} />
          </>
        }
        { viewInfoSocio &&
          <InfoSocio
            datos={datos} 
            foto={src}
          />
        } 
    </>
  )
}

export default Main