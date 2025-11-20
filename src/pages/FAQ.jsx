import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import preguntasFaq from "./PreguntasFaq";

export default function FAQ() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#f3eee5", 
        py: 50,
      }}
    >
      {/* CONTENEDOR BLANCO */}
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          bgcolor: "white",
          p: { xs: 3, md: 8 },
          display: "grid",
          gridTemplateColumns: { md: "1fr 1fr", xs: "1fr" },
          gap: 4,
          borderRadius: "4px",
        }}
      >
        {/* COLUMNA IZQUIERDA */}
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>
            Frequent Ask Questions
          </Typography>

          <Typography sx={{ color: "grey.700", lineHeight: 1.7, maxWidth: "600px" }}>
            Pellentesque Cras Adipiscing Tempus Libero Vel Nullam Mauris Tellus.
            Aliquam Ultrices Tellus Consequat Amet, Lectus Aliquam Est In Neque.
          </Typography>
        </Box>

        {/* COLUMNA DERECHA – ACORDEONES */}
        <Box>
          {preguntasFaq.map((item, index) => (
            <Accordion
              key={index}
              elevation={0}
              sx={{
                borderBottom: "1px solid #e0e0e0",
                boxShadow: "none",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 500 }}>{item.pregunta}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography sx={{ color: "grey.700" }}>{item.respuesta}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

