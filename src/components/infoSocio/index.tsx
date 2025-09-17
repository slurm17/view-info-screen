import { Container, Typography } from "@mui/material";

interface Socio {
  dni: string;
  nombre: string;
  nroSocio: string;
  mensaje: string;
}

interface Props {
    datos: Socio;
    fotoVisible: boolean;
}

const InfoSocio = ({datos}: Props) => {
  return (
    <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        fontSize: '2rem',
        backgroundColor: '#f0f0f0',
    }}>
        {/* {estado} */}
        <Typography 
        variant="h4" 
        component="h2" 
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem", margin: "1rem 0" }}>
          {datos.nombre}
      </Typography>
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem", margin: "1rem 0" }}>
          {datos.dni ? `DNI: ${datos.dni}` : ''}
      </Typography>
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem", margin: "1rem 0" }}>
          {datos.nroSocio ? `Socio nro: ${datos.nroSocio}` : ''}
      </Typography>
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem", margin: "1rem 0" }}>
          {datos.mensaje}
      </Typography>
    </Container>
  )
}

export default InfoSocio