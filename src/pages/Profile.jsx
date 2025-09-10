import { useEffect, useState } from "react";
import { 
    Avatar,
    Box,
    Card, 
    CardContent, 
    Grid, 
    Stack, 
    Typography,
    Chip,
    Alert,
    CircularProgress
} from "@mui/material";
import ContactsIcon from '@mui/icons-material/Contacts';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

function Profile(){

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://68b5bd91e5dc090291b01528.mockapi.io/api/v1/user/1")
        .then((res) => res.json())
        .then((data) => {
            setProfile(data)
            setLoading(false);
        })
        .catch((err) => console.log("Error fetching:", err));
    }, []);

    if (loading) {
    return (
        <>
        <Alert severity= "info" align="center" sx={{ mt: 3, mx: 5, justifyContent: "center" }}>
        Loading profile…
      </Alert>
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "70vh",
        width: "100vw" 
        }}
       >
        <CircularProgress color="secondary" />
      </Box>
      </>
    );
  }

    return(
        <>
        <Box sx={{ mt: 5, mb: 3, display: "flex", justifyContent: "center"}}>
            <Stack alignItems="center" gap={2}>
                <Avatar 
                src={profile.avatar} 
                alt="Avatar not found" 
                sx={{ height: { xs: "180px", sm: "200px" }, width: { xs: "180px", sm: "200px" } }}/>
                
                <Stack>
                <Typography 
                align="center"
                variant="h3" 
                sx={{ 
                    fontSize: { xs: "35px", sm: "35px" }, 
                    fontWeight: "bold", 
                    color: "text.primary" }}
                >
                    {profile.userName}
                </Typography>

                <Typography 
                align="center" 
                sx={{ fontSize: { xs: "15px", sm: "18px"}, color:"text.secondary" }}
                >
                    {profile.profession}
                </Typography>
                </Stack>
            </Stack>
        </Box>

        <Grid container spacing = { { xs: 2, sm: 2 } } sx={{ mb: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>

        <Grid item xs={12} sm={6}>
        <Card sx={{  
            p: { xs: 1, sm: 3 }, 
            minHeight: { xs: "auto", sm: "380px" }, 
            width: { xs: "340px", sm: "700px"}, 
            borderRadius: "8px" }}
            >
            <CardContent>

                <Typography variant="h5" sx={{ display: "flex", justifyContent: "center", fontWeight: "bold", fontSize: { xs: "19px", sm: "20px" } }}>
                    Contact Info
                </Typography>

                <Stack spacing={1.5} sx={{ pt: 3 }}>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems:"center", gap: 1 }}>
                        <ContactsIcon sx={{ fontSize: { xs: "18px", sm: "20px" }, color: "secondary.main" }} /> 
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: { xs: "14px", sm: "16px" } }}>
                            Full Name
                        </Typography>
                    </Box>
                <Typography variant="body1" sx={{ textAlign: "right", color: "text.secondary", fontSize: { xs: "14px", sm: "16px" } }}> 
                    {profile.fullName}
                </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems:"center", gap: 1 }}>
                        <EmailIcon sx={{ fontSize: { xs: "18px", sm: "20px" }, color: "secondary.main" }} /> 
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: { xs: "14px", sm: "16px" } }} >
                            Email
                        </Typography>
                    </Box>
                <Typography variant="body1" sx={{ textAlign: "right", color: "text.secondary", fontSize: { xs: "14px", sm: "16px" } }}> 
                    {profile.email}
                </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems:"center", gap: 1 }}>
                        <PhoneIcon sx={{ fontSize: { xs: "18px", sm: "20px" }, color: "secondary.main" }}/> 
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: { xs: "14px", sm: "16px" } }} >
                            Phone
                        </Typography>
                    </Box>
                <Typography variant="body1" sx={{ textAlign: "left", color: "text.secondary", fontSize: { xs: "14px", sm: "16px" } }}> 
                    {profile.phone}
                </Typography>
                </Box>

                </Stack>

            </CardContent>
        </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
        <Card sx={{ 
            p: { xs: 1, sm: 3 }, 
            minHeight: { xs: "auto", sm: "380px" }, 
            width: { xs: "340px", sm: "700px" }, 
            borderRadius: "8px" }}
            >
            <CardContent>

                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }} >
                <Typography variant="h5" align="center" sx={{ fontWeight: "bold", fontSize: { xs: "19px", sm: "20px" } }}>
                    About Me
                </Typography>
                <Typography variant="body1" align="center" sx={{ pt:2, fontSize: { xs: "14px", sm: "16px" } }}>
                    {profile.bio}
                </Typography>
                </Box>

                <Typography variant="h6" sx={{ pt: 2, display: "flex", justifyContent: "center", fontWeight: "bold", fontSize: { xs: "19px", sm: "20px" } }}>
                    Skills
                </Typography>

                <Box display="flex" gap={1} flexWrap="wrap" sx={{ pt: 1, alignItems: "center", justifyContent: "center", mt: 1 }}>
                    {Array.isArray(profile.skills) ? profile.skills.map((skill, index) => (
                        <Chip key={index} label={skill} color="secondary" />
                    )) : profile.skills ?.split(",").map((skill, index) => (
                    <Chip key={index} label={skill.trim()} color="secondary" />
                    ))}
                </Box>

            </CardContent>
        </Card>
        </Grid>
        
        </Grid>
        
    </>
    )
}

export default Profile;
