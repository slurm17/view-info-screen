import { Box, Typography, type TypographyProps } from '@mui/material'
// import { Textfit } from 'react-textfit';

interface DatosSocioProps {
    nombre: string,
    nroSocio: string,
    dni: string
}

const DatosSocio = (props: DatosSocioProps) => {
  return (
        <Box sx={{
            display: 'flex',
            gap: 3,
            flexDirection: 'column',
            padding: 3,
            height: '100%',
        }}>
            <TypographyCustom>{props.nombre}</TypographyCustom>
            <TypographyCustom>{`DNI: ${props.dni}`}</TypographyCustom>
            <TypographyCustom>{'SOCIO NÚMERO ' + props.nroSocio}</TypographyCustom>
        </Box>
  )
}

const TypographyCustom = (props : TypographyProps ) => {
  return (
    <Typography 
      variant="body1"
      color="#fff"
      fontWeight="bold"
      bgcolor={'#000'}
    //   padding={1}
      sx={{
        display: 'flex',
        flex: 1,
        fontFamily: "'Michroma', sans-serif",
        fontSize: '2.4rem',
        alignItems: 'center',
        paddingLeft: '25px',
        // whiteSpace: 'nowrap',     /* evita saltos de línea */
        // overflow: 'hidden',        /* oculta lo que se pasa */
        // textOverflow: 'ellipsis'
      }}
      {...props}
    >
        {/* <Textfit
            mode="multi" 
            style={{ width: "100%", height: "100%", paddingLeft: "25px", paddingRight: "25px" }}
            forceSingleModeWidth={false}
        > */}
            {props.children}
        {/* </Textfit> */}
    </Typography>
  );
};

export default DatosSocio