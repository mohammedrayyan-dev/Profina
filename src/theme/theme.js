import { createTheme } from "@mui/material/styles"

  const theme = createTheme({
  palette: {
    primary: {
      main: "#84CC16", // Lime green
      dark: "#4D7C0F",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1E3A8A", // Deep navy
      dark: "#172554",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F9FAFB", // Page background
      paper: "#ffffff",   // Card background
    },
    text: {
      primary: "#111827", // Headings (near black)
      secondary: "#374151", // Body text (dark gray)
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
  },

    components: {
        MuiAppBar: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundImage: "linear-gradient(to right, #84CC16 0%, #1E3A8A 100%)",
                    boxShadow: "none",
                    minHeight: "65px",
                    [theme.breakpoints.down("sm")]: {
                        minHeight: "60px"
                    }
                })
            }
        },

        MuiButton: {
            styleOverrides: {
                root:{
                    fontWeight: "bold"
                }
            },
            variants: [
                {
                props: { variant: "navbarButtons" },
                style: ({ theme }) => ({
                    borderRadius: "999px",
                    minHeight: "40px",
                    minWidth: "80px",
                    paddingLeft: 2,
                    paddingRight: 2,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    transition: theme.transitions.create(
                        ["background-color", "box-shadow"],
                        {
                            duration: 300,
                            easing: theme.transitions.easing.easeInOut,
                        }
                    ),
                    "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                        boxShadow: theme.shadows[4],
                        },
                    "&.Mui-selected" : {
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.contrastText,
                        boxShadow: `0 0 1px ${theme.palette.primary.main}`,
                    }
                }) 
            },
            {
                 props: { variant: "homeButtons" },
                style: ({ theme }) => ({
                    borderRadius: "999px",
                    minHeight: "60px",
                    minWidth: "150px",
                    paddingLeft: 2,
                    paddingRight: 2,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    transition: theme.transitions.create(
                        ["background-color", "transform", "box-shadow"],
                        {
                            duration: 300,
                            easing: theme.transitions.easing.easeInOut,
                        }
                    ),
                    "&:hover": {
                        backgroundColor: theme.palette.secondary.main, 
                        color: theme.palette.primary.contrastText,
                        boxShadow: "0 0 1px black"  
                        },
                }) 
            }
        ]
        },

        MuiDrawer : {
            styleOverrides: {
                paper: {
                    backgroundColor: "#F5F5F5"
                }
            }
        },

        MuiListItemButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.contrastText,
                    borderRadius: "999px",
                    backgroundColor: theme.palette.primary.main,
                    maxHeight: "400px",
                    Width: "120px",
                    textAlign: "center",
                    "&:hover" : {
                        backgroundColor: theme.palette.primary.dark,
                        boxShadow: theme.shadows[4],
                    },
                    "&.Mui-selected" : {
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.contrastText,
                        boxShadow: `0 0 1px ${theme.palette.primary.main}`,
                    }
                })
            }
        },
    },
})



export default theme;