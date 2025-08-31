import { Container } from "@mui/material";

interface Props {
    estado: string;
    fotoVisible: boolean;
}

const InfoSocio = ({estado}: Props) => {
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
        {estado}
    </Container>
  )
}

export default InfoSocio