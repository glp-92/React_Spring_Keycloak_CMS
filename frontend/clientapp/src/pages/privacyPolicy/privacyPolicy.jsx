import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Container maxWidth="md" sx={{ padding: 4 }}>
            <Typography variant="h1" gutterBottom textAlign={'center'}>
                Política de Privacidad
            </Typography>
            <Typography variant="subtitle1" gutterBottom textAlign={'center'} >
                [04 de agosto de 2024]
            </Typography>

            <Box mt={4}>
                <Typography variant="h2" gutterBottom>
                    1. Información que Recopilamos
                </Typography>
                <Typography variant="body1" paragraph>
                    No recopilamos información personal de nuestros visitantes a menos que nos la proporcionen voluntariamente. La única información que recopilamos automáticamente incluye:
                </Typography>
                <Typography variant="body1" component="ul">
                    <li>Datos de análisis básicos: Información sobre la ubicación general (país o región) desde la que acceden los usuarios a nuestro sitio, el número de visitas y el número de páginas vistas.</li>
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h2" gutterBottom>
                    2. Uso de la Información
                </Typography>
                <Typography variant="body1" paragraph>
                    La información recopilada se utiliza exclusivamente para:
                </Typography>
                <Typography variant="body1" component="ul">
                    <li>Analizar el tráfico y el comportamiento de los usuarios en el sitio para mejorar el contenido y la experiencia del usuario.</li>
                </Typography>
                <Typography variant="body1" paragraph>
                    No compartimos, vendemos ni alquilamos ninguna información a terceros.
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h2" gutterBottom>
                    3. Cookies
                </Typography>
                <Typography variant="body1" paragraph>
                    Nuestro sitio utiliza cookies mínimas para realizar un seguimiento del tráfico y de los patrones de uso. Estas cookies no contienen ninguna información personal identificable.
                </Typography>
                <Typography variant="body1" paragraph>
                    Puedes desactivar el uso de cookies modificando la configuración de tu navegador, aunque esto puede afectar a la funcionalidad del sitio.
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h2" gutterBottom>
                    4. Seguridad
                </Typography>
                <Typography variant="body1" paragraph>
                    Nos comprometemos a proteger la información recopilada de cualquier acceso no autorizado, alteración o destrucción. Sin embargo, ten en cuenta que ninguna transmisión por Internet es completamente segura.
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h2" gutterBottom>
                    5. Enlaces a Terceros
                </Typography>
                <Typography variant="body1" paragraph>
                    Nuestro sitio puede contener enlaces a otros sitios web. No nos hacemos responsables del contenido ni de las prácticas de privacidad de estos sitios de terceros. Te recomendamos leer las políticas de privacidad de cualquier sitio web externo que visites.
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h2" gutterBottom>
                    6. Cambios en la Política de Privacidad
                </Typography>
                <Typography variant="body1" paragraph>
                    Podemos actualizar esta Política de Privacidad de vez en cuando. Cualquier cambio será publicado en esta página con la fecha de actualización revisada. Te recomendamos revisar esta política periódicamente.
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h2" gutterBottom>
                    7. Contacto
                </Typography>
                <Typography variant="body1" paragraph>
                    Si tienes alguna pregunta sobre esta Política de Privacidad, puedes ponerte en contacto con nosotros a través de <Link href="mailto:tucorreo@ejemplo.com">tucorreo@ejemplo.com</Link>.
                </Typography>
            </Box>
        </Container>
    );
};

export default PrivacyPolicy;
