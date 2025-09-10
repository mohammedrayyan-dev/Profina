import {
    Typography,
    Box,
    Button,
    Card,
    Grid,
    CardContent,
} from "@mui/material";
import BadgeIcon from '@mui/icons-material/Badge';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Link } from "react-router-dom";

function Home() {

  return (
    <>
    <Box sx={{ 
      mt: { xs: 5, sm: 13 },
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center",
      alignItems: "center",
      
    }}
      >
        <Typography 
        variant= "h1"
        sx={{
          fontSize: { xs: "60px", sm: "86px" },
          fontWeight: "bold",
          color: "text.primary",
          textAlign: { xs: "center"},
        wordBreak: "break-word" }}
        >
         Welcome to{" "}
         <Box component="span" color= "primary.main">
          Profina
         </Box>
        </Typography>
        <Typography 
        variant="h3" 
        sx={{
          mt: { xs: 2, sm: 1 },
          color: "text.secondary", 
          fontSize: { xs: "35px", sm: "38px" }, 
          textAlign: { xs: "center"}, 
          wordBreak: "break-word" }} 
        >
          Manage your digital identity with ease.
        </Typography>
        <Button
        variant= "homeButtons"
        component={Link}
        to="/ProfilePage"
        sx={{
          mt: { xs: 3, sm: 5 },
          fontSize: { xs: "13px", sm: "16px", md: "18px" },  // text size
          padding: { xs: "6px 12px", sm: "8px 16px", md: "10px 20px" }, // inside spacing
          width: { xs: "auto", sm: "auto" },
        }}
        >
            View Profile
        </Button>
    </Box>
    
    <Grid container spacing = { { xs: 2, sm: 4 } } 
    sx={{
      mt: "40px",
      mb: { xs: 2 }, 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center" }} 
      >
        
      {/* View card */}
      <Grid item xs={12} sm={6}>
        <Card sx={{ 
          width: { xs: "320px", sm: "340px"}, 
          height: "250px", 
          borderRadius: "8px",
          transition: "all 0.3s ease-in-out", 
          "&:hover" : {
            transform: "translateY(-6px)",
            boxShadow: 6,
          } 
        }}
          >
          <CardContent>
            <Box sx={{ mb: 2, display: "flex", alignItems: "center",  justifyContent: "center", gap: 1}}>
              <BadgeIcon sx={{ fontSize: { xs: "18px", sm: "20px" }, color: "secondary.main"}} />
              <Typography variant="h6" sx={{ fontSize: { xs: "19px", sm: "18px" } }} >
                <Box component="span" color="primary.main">View</Box> Profile
              </Typography>
            </Box>
            <Typography variant="body1" align="center" sx={{ color: "text.secondary", fontSize: { xs: "14px", sm: "16px" } }}>
                Access your personal profile in a clean, modern layout designed for clarity. Quickly review your details, stay informed, and see everything you need in one simple view without distractions.
                </Typography>   
          </CardContent>
        </Card>
      </Grid>

      {/* Manage card */}
      <Grid item xs={12} sm={6}>
        <Card sx={{ 
          width: { xs: "320px", sm: "350px"}, 
          height: "250px", 
          borderRadius: "8px",
          transition: "all 0.3s ease-in-out",
          "&:hover" : {
            transform: "translateY(-6px)",
            boxShadow: 6,
          }
         }}
          >
          <CardContent >
            <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
              <ManageAccountsIcon sx={{ fontSize: { xs: "18px", sm: "20px" }, color: "secondary.main"}} />
              <Typography variant="h6" sx={{ fontSize: { xs: "19px", sm: "18px" } }} >
                <Box component="span" color="primary.main">Manage</Box> Details
              </Typography>
            </Box>
            <Typography variant="body1" align="center" sx={{ color: "text.secondary", fontSize: { xs: "14px", sm: "16px" } }}>
                Take full control of your information with an easy-to-use editor. Update your details anytime, keep everything accurate, and enjoy the confidence of managing your profile effortlessly.
                </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Personalize card */}
      <Grid item xs={12} sm={6}>
        <Card sx={{ 
          width: { xs: "320px", sm: "350px"}, 
          height: "250px", 
          borderRadius: "8px",
          transition: "all 0.3s ease-in-out",
          "&:hover" : {
            transform: "translateY(-6px)",
            boxShadow: 6,
          }
          }}>
          <CardContent >
            <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
              <AutoFixHighIcon sx={{ fontSize: { xs: "18px", sm: "20px" }, color: "secondary.main"}} />
              <Typography variant="h6" sx={{ fontSize: { xs: "19px", sm: "18px" } }} > 
                <Box component="span" color="primary.main">Personalize</Box> Your Space 
              </Typography>
            </Box>
            <Typography variant="body1" align="center" sx={{ color: "text.secondary", fontSize: { xs: "14px", sm: "16px" } }}>
                Make your profile truly yours by adding a photo, updating your bio, and showcasing your unique skills. Create a professional and personalized space that reflects who you are.
                </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </>
  )
}

export default Home;