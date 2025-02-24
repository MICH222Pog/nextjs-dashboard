import { Box, Button, Typography, Link as MuiLink } from "@mui/material";
import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import Image from "next/image";

import { Metadata } from 'next';
 
export const metadata: Metadata = {
    title: 'Welcome',
  };

export default function Page() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", p: 3, bgcolor: "grey.200" }}>
      
      <Box
        sx={{
          height: { xs: 72, md: 180 }, 
          display: "flex",
          alignItems: "center", 
          borderRadius: 2,
          bgcolor: "primary.main",
          p: { xs: 2, md: 3 }, 
        }}
      >
        <AcmeLogo />
      </Box>
      <Box sx={{ mt: 4, flexGrow: 1, display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            borderRadius: 2,
            bgcolor: "grey.100",
            p: { xs: 3, md: 5 },
            width: { md: "40%" },
          }}
        >
          <Typography variant="h5" color="text.primary">
            <strong>Welcome to PayUp.</strong> Settle Debts, Secure Trust.
          </Typography>
          <Button
            component={Link}
            href="/login"
            variant="contained"
            color="primary"
            sx={{
              alignSelf: "flex-start",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 3, 
              py: 1.5,
              fontSize: "1rem", 
              fontWeight: 500, 
              textTransform: "none", 
              borderRadius: 2, 
              transition: "0.3s",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Log in
            <ArrowRightIcon style={{ width: 20, height: 20 }} />
          </Button>

        </Box>
         {/* Right Image Section */}
         <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden", 
          }}
        >
          <Image
            src="/Heroimg2.png"
            width={1000}
            height={760}
            alt="Dashboard preview"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover", 
              borderRadius: 10, 
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
