import { useEffect, useRef, useState } from "react";
import ImgCarusell from "../../components/imgCarrusel"
import TextCarrusel from "../../components/textCarrusel"
import io from "socket.io-client";
import InfoSocio from "../../components/infoSocio";
import { getImagenes } from "../../api/imagen.api";
import { getTextos } from "../../api/texto.api";
import type { Imagen } from "../../types/Imagen";
import type { TextoConId } from "../../types/Texto";

type Socio = {
  dni: string;
  nombre?: string;
  apellido?: string;
};

type ResultadoSocio = {
  dni: string;
  socio?: Socio;
  estado: string;
};

interface SocioResponse {
  status: "ok" | "error"; // si solo puede ser "ok", dejalo como "ok"
  data: {
    num_socio: string;
    nombre: string;
    estado_socio: string; // si en realidad es numérico, usar number
    fecha_estado: string; // podés usar Date si lo parseás
  };
}


const Main = () => {
  const socketUrl = import.meta.env.VITE_SOCKET_URL
  const [viewInfoSocio, setViewInfoSocio] = useState(false)
  const [estado, setEstado] = useState("Esperando...");
  const [fotoVisible, setFotoVisible] = useState(false);
  const [imagenes, setImagenes] = useState<Imagen[]>([])
  const [textos, setTextos] = useState<TextoConId[]>([])
  const [socio, setSocio] = useState<SocioResponse>(null);
  const activeTimeouts = useRef<number>(0);

   useEffect(() => {
      const fechData = async () => {
        try {
          const data = await getTextos()
          setTextos(data)
          console.log("🚀 ~ ImgCarusell ~ data:", data)
        } catch (error) {
          console.log("🚀 ~ ImgCarusell ~ error:", error)
        }
      }
      fechData()
    }, [])

  useEffect(() => {
    const fechData = async () => {
      try {
        const data = await getImagenes()
        setImagenes(data)
        console.log("🚀 ~ ImgCarusell ~ data:", data)
      } catch (error) {
        console.log("🚀 ~ ImgCarusell ~ error:", error)
      }
    }

    fechData()
  }, [])

  useEffect(() => {
    const socket = io(socketUrl, {
    transports: ["websocket"] // opcional, para evitar polling
  });
    socket.on("scanner-entrada", (data: ResultadoSocio) => {
      console.log("🚀 ~ ControlAcceso2 ~ data:", data)
      const { dni, socio, estado: estadoMsg } = data;
      console.log("🚀 ~ Main ~ dni:", dni)
      setEstado(`${estadoMsg} (${dni}) ENTRADA`);
      setViewInfoSocio(true);
      if (socio && socio.dni === dni) {
        setFotoVisible(true);
      } else {
        setFotoVisible(false);
      }
      activeTimeouts.current += 1; // contador de mensajes activos
      const timeout = setTimeout(() => {
        activeTimeouts.current -= 1;
        if (activeTimeouts.current === 0) {
          setViewInfoSocio(false); // solo ocultar si no hay mensajes activos
        }
      }, 3000);
      return () => clearTimeout(timeout);
    });

    socket.on("scanner-salida", (data: ResultadoSocio) => {
      console.log("🚀 ~ ControlAcceso2 ~ data:", data)
      const { dni, socio, estado: estadoMsg } = data;
      console.log("🚀 ~ Main ~ dni:", dni)
      setEstado(`${estadoMsg} (${dni}) SALIDA`);
      setViewInfoSocio(true);
      if (socio && socio.dni === dni) {
        setFotoVisible(true);
      } else {
        setFotoVisible(false);
      }
      activeTimeouts.current += 1; // contador de mensajes activos
      const timeout = setTimeout(() => {
        activeTimeouts.current -= 1;
        if (activeTimeouts.current === 0) {
          setViewInfoSocio(false); // solo ocultar si no hay mensajes activos
        }
      }, 3000);
      return () => clearTimeout(timeout);
    });

  return () => {
    socket.disconnect();
    // clearTimeout(timeout)
  };
}, [socketUrl]);

  return (
    <>
        { !viewInfoSocio &&
          <>
          <ImgCarusell imagenes={imagenes}/>
          { textos.length > 0 && <TextCarrusel textos={textos} />}
          </>
        }

        { viewInfoSocio &&
          <InfoSocio estado={estado} fotoVisible={fotoVisible}/>
          // <div className="info-socio">
          //   <p>{estado}</p>
          //   {fotoVisible && <img src="/img/foto.jpg" alt="Foto socio" />}
          // </div>
        }
    </>
  )
}

export default Main