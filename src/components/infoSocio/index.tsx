import { Box, Grid, Typography } from "@mui/material";
import DatosSocio from "./DatosSocio";
import logoClub from '../../assets/escudo-club.png';
import { Textfit } from "react-textfit";

interface Socio {
  dni: string;
  nombre: string;
  nroSocio: string;
  mensaje: string;
  // foto: string;
}

interface Props {
    datos: Socio;
    foto: string | null;
}

const InfoSocio = ({datos, foto}: Props) => {
  const viewDatosSocio = datos.nombre && datos.nroSocio
  if (!viewDatosSocio) return (
    <Grid container sx={{
        height: '100%',
        width: '100%',
        backgroundColor: 'primary.main',
    }}>
      <Grid size={4} sx={{
          // border:'1px solid red',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2
        }}>
          <Box
            component={'img'}
            src={logoClub}
            alt="Foto socio"
            style={{width: '100%', objectFit: 'contain'}}
        />
      </Grid>
      <Grid size={8} sx={{
        // border:'1px solid red',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3
      }}>
        <Typography sx={{
          color: '#000',
          display: 'flex',
          fontFamily: "'Michroma', sans-serif",
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '4.5rem',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Textfit 
            mode="multi" 
            style={{ width: "100%", height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            forceSingleModeWidth={false}
          >
          {datos.mensaje}
        </Textfit>
        </Typography>
      </Grid>
    </Grid>
  )
  return (
    <Grid container sx={{
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        height: '100%',
        width: '100%',
        // textAlign: 'center',
        // fontSize: '2rem',
        backgroundColor: 'primary.main',
    }}>
    <Grid container sx={{height: '50%', width: '100%'}}>
      <Grid
        size={3}
        sx={{
          // border:'1px solid red',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 1,
        }}>
        <Box
          component={'img'}
          src={foto || logoClub}
          alt="Foto socio"
          style={{objectFit: 'contain', width: '100%', height: '100%'}}
        />
      </Grid>
      <Grid size={9} /*sx={{border:'1px solid red'}}*/>
        <DatosSocio {...datos} />
      </Grid>
    </Grid>
    <Grid size={12} sx={{/*border:'1px solid red',*/ height: '50%'}}>
      <Typography sx={{
        color: '#000',
        display: 'flex',
        fontFamily: "'Michroma', sans-serif",
        letterSpacing: '10px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '4.5rem',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
      }}>
        <Textfit 
          mode="multi" 
          style={{ width: "100%", height: "100%" }}
          forceSingleModeWidth={false}
        >

          {datos.mensaje}
        </Textfit>
      </Typography>
    </Grid>

        {/* <Typography
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
        </Typography> */}
    </Grid>
  )
}

export default InfoSocio