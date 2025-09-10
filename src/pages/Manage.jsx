import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { 
    Avatar,
    Grid,
    Button,
    Card, 
    CardContent, 
    Collapse, 
    Typography, 
    TextField,
    Box, 
    Alert,
    Skeleton,
} from "@mui/material";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

const schema = yup.object ({
    avatar: yup
    .mixed()
    .required("Avatar is required")
    .test("fileSize", "File is too large (max 2 MB)", (value) => {
        if (!value) return false;
        if (typeof value === "string") return true;
        return value && value.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Only jpeg, png formats are allowed", (value) => {
        if (!value) return false;
        if (typeof value === "string") return true;
        return value && ["image/jpeg", "image/png"].includes(value.type)
    }),
    userName: yup
    .string()
    .min(3)
    .matches(/^[A-Za-z0-9]+$/, "Only alphabets or numbers are allowed")
    .required("Display Name is required"),
    profession: yup
    .string()
    .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
    .required("Profession is required"),
    fullName: yup.string()
    .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
    .required("Name is required"),
    email: yup
    .string()
    .email("Invalid format")
    .required("Email is required"),
    phone: yup
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .matches(/^[0-9]+$/, "Only numbers are allowed"),
    bio: yup
    .string()
    .test("max-words", "Bio must not exceed 150 words", (value) => {
      if (!value) return true; // allow empty if not required
      return value.trim().split(/\s+/).length <= 150;
    }),
    skills: yup
    .string()
    .matches(/^[A-za-z, ]+$/, "Only alphabets are allowed")
});

function Manage() {

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState : {errors},
    } = useForm ({
        resolver: yupResolver(schema),
    });

    const [preview, setPreview] = useState(null);
    const [saveAlert, setSaveAlert] = useState(false);
    const [cancelAlert, setCancelAlert] = useState(false);
    const [savedProfile , setSavedProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load existing profile
    useEffect(() => {
        fetch("https://68b5bd91e5dc090291b01528.mockapi.io/api/v1/user/1")
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setSavedProfile(data);
                    // Ensure text fields are not undefined
                    reset({
                        ...data,
                        userName: data.userName || "",
                        profession: data.profession || "",
                        fullName: data.fullName || "",
                        email: data.email || "",
                        phone: data.phone || "",
                        bio: data.bio || "",
                        skills: data.skills || "",
                        avatar: data.avatar || null
                    });
                    setPreview(data.avatar); // show avatar preview
                }
            })
            .finally(() => setIsLoading(false));
    }, [reset]);

    // Convert file to Base64
    const fileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    // Save profile
    const onSubmit = async(values) => {
        let avatarBase64 = values.avatar;
        if (values.avatar instanceof File) {
            avatarBase64 = await fileToBase64(values.avatar);
        }
        setSaveAlert(true);
        setTimeout(() => setSaveAlert(false), 3000);
        const payload = {
            ...values,
            avatar: avatarBase64
        };

        const res = await fetch("https://68b5bd91e5dc090291b01528.mockapi.io/api/v1/user/1", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        setSavedProfile(data);
        setPreview(data.avatar); // update preview after save
    };

    const handleCancel = () => {
        if(savedProfile) {
            reset(savedProfile);
            setPreview(savedProfile.avatar);
        }
        setCancelAlert(true);
        setTimeout(() => setCancelAlert(false), 3000);
    }

    // Handle avatar change
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setValue("avatar", file, { shouldValidate: true });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleButtonClick = () => document.getElementById("avatarInput").click();

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Header Card */}
            <Card sx={{ mt: 2, mx: 2, pt: 1, px: 1 }}>
                <CardContent>
                    <Typography variant="h5" sx={{ fontSize: { xs: "19px", sm: "20px" }, fontWeight: "bold" }}>
                        Manage Profile
                    </Typography>
                    <Typography variant="body1" sx={{ pt:1, fontSize: { xs: "14px", sm: "16px" } }}>
                        Update your details and customize your profile easily
                    </Typography>
                </CardContent>
            </Card>

            {/* Save Alert */}
            <Collapse in={saveAlert}>
                <Card sx={{ mt: 2, mx: 2, p: 1 }}>
                    <CardContent>
                        <Alert severity="success" onClose={() => setSaveAlert(false)}>
                            Changes saved successfully!
                        </Alert>
                    </CardContent>
                </Card>
            </Collapse>

            {/* Cancel Alert */}
            <Collapse in={cancelAlert}>
                <Card sx={{ mt: 2, mx: 2, p: 1 }}>
                    <CardContent>
                        <Alert severity="warning" onClose={() => setCancelAlert(false)}>
                            Changes have been discarded!
                        </Alert>
                    </CardContent>
                </Card>
            </Collapse>

            {/* Form Grid */}
            <Grid container spacing={1} sx={{ display: "flex" }}>  

                {/* Avatar & basic info */}
                <Grid item xs={12} sm={6}>
                    <Card sx={{ 
                        my: 2, 
                        mx: 2, 
                        p: 2,
                        width: { xs: "92vw", sm: "96vw", md: "100vw"  },
                        maxWidth: 450,
                        minHeight: { xs: 525, sm: 560 } }}>
                        <CardContent>
                            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                              {isLoading ? (
                                <Skeleton variant="circular" width= "200px" height= "200px"  />
                              ) : (
                                <Avatar 
                                    alt="Upload new avatar" 
                                    src={preview} 
                                    sx={{ height: { xs: "160px", sm: "200px" }, width: { xs: "160px", sm: "200px" } }} 
                                />
                              )}

                                <input
                                    type="file"
                                    id="avatarInput"
                                    {...register("avatar")}
                                    hidden
                                    onChange={handleAvatarChange}
                                />
                                {errors.avatar && <p style={{ color: "red" }}>{errors.avatar.message}</p>}
                                <Button 
                                onClick={handleButtonClick} 
                                disabled={isLoading}
                                sx={{ 
                                  mt: 3, 
                                  height: { xs:"40px", sm:"45px" }, 
                                  width:{ xs:"170px", sm:"200px" }, 
                                  color:"secondary.contrastText", 
                                  backgroundColor:"secondary.main", 
                                  gap:1, 
                                  "&:hover":{backgroundColor:"secondary.dark"}
                                  }}
                                >
                                  <AddAPhotoOutlinedIcon /> Upload Avatar
                                </Button>
                            </Box>

                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center" }, pt: 5, gap: 2 }}>

                              {isLoading ? (
                                <>
                                <Skeleton variant="rectangular" width="100%" height={56} />
                                <Skeleton variant="rectangular" width="100%" height={56} />
                                </>
                              ) : (
                                <>
                                <TextField
                                    variant="filled"
                                    label="User Name"
                                    fullWidth
                                    {...register("userName")}
                                    error={!!errors.userName}
                                    helperText={errors.userName?.message || " "}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    variant="filled"
                                    label="Profession"
                                    fullWidth
                                    {...register("profession")}
                                    error={!!errors.profession}
                                    helperText={errors.profession?.message || " "}
                                    InputLabelProps={{ shrink: true }}
                                />
                                </>
                                )}

                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Contact & About Me */}
                <Grid item xs={12} sm={6}>
                    <Card sx={{ 
                        my: { xs: 0, sm: 2 }, 
                        mx: { xs: 2, md: 2, lg: 0 }, 
                        p:2, 
                        width: { xs: "92vw", sm: "60vw", md: "100vw" },
                        maxWidth: 935,
                        minHeight: { xs: 300, sm: 530 } }}>
                        <CardContent>
                            <Typography 
                            variant="h5" 
                            sx={{ 
                              fontWeight:"bold", 
                              pb: 2, 
                              fontSize: { xs: "19px", sm: "20px" } 
                              }}
                            >
                              Contact Info
                            </Typography>
                            <Box sx={{ display:"flex", flexDirection:"column", gap: 2, alignItems:{ xs:"center" } }}>

                              {isLoading ? (
                                <>
                                <Skeleton variant="rectangular" width="100%" height={56} />
                                <Skeleton variant="rectangular" width="100%" height={56} />
                                <Skeleton variant="rectangular" width="100%" height={56} />
                                </>
                              ) : (
                                <> 
                                <TextField label="Full Name" variant="filled" fullWidth {...register("fullName")} InputLabelProps={{ shrink:true }} error={!!errors.fullName} helperText={errors.fullName?.message || " "} />
                                <TextField label="Email" variant="filled" fullWidth {...register("email")} InputLabelProps={{ shrink:true }} error={!!errors.email} helperText={errors.email?.message || " "} />
                                <TextField label="Phone" variant="filled" fullWidth {...register("phone")} InputLabelProps={{ shrink:true }} error={!!errors.phone} helperText={errors.phone?.message || " "} />
                                </>
                                )}

                            </Box>

                            <Typography 
                            variant="h5" 
                            sx={{ 
                              fontWeight: "bold", 
                              py:2, 
                              fontSize: { xs: "19px", sm: "20px" } 
                              }}
                            >
                              About Me
                            </Typography>
                            <Box sx={{ display:"flex", flexDirection:"column", gap:2, alignItems: { xs: "center" } }}>

                              {isLoading ? (
                                <>
                                <Skeleton variant="rectangular" width="100%" height={56} />
                                <Skeleton variant="rectangular" width="100%" height={56} />
                                </>
                              ) : (
                                <>
                                <TextField 
                                label="Bio" 
                                variant="filled" 
                                multiline 
                                rows={3} 
                                fullWidth 
                                {...register("bio")} 
                                InputLabelProps={{ shrink:true }} 
                                error={!!errors.bio} 
                                helperText={errors.bio?.message || " "} 
                                />
                                <TextField
                                label="Skills"
                                variant="filled"
                                fullWidth
                                {...register("skills")}
                                InputLabelProps={{ shrink:true }} 
                                error={!!errors.skills} 
                                helperText={errors.skills?.message || " "} />
                                </> 
                                )}

                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

            {/* Save / Cancel */}
            <Card sx={{ 
              mt: { xs:2, sm:0 }, 
              mb: { xs: 2, sm: 2 }, 
              mx: 2, 
              height: { xs:"145px", sm:"95px" } }}>
                <CardContent>
                    <Box sx={{ p: 1, display:"flex", justifyContent:"center", alignItems:"center", flexDirection:{xs:"column", sm:"row"}, gap:2 }}>
                        <Button type="submit" sx={{ height: { xs: "40px", sm:"45px"}, width:{ xs:"150px", sm:"150px"}, color:"secondary.contrastText", backgroundColor:"secondary.main", "&:hover":{backgroundColor:"secondary.dark"}}}>
                            Save Changes
                        </Button>
                        <Button onClick={handleCancel} sx={{ height: { xs: "40px", sm:"45px"}, width:{ xs:"150px", sm:"150px"}, color:"primary.contrastText", backgroundColor:"primary.main", "&:hover":{backgroundColor:"primary.dark"}}}>
                            Cancel
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </form>
        </>
    )
}

export default Manage;