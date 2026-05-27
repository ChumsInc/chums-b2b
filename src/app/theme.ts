import type {CSSProperties} from 'react'
import {createTheme} from '@mui/material/styles'
import {alpha} from "@mui/material";

declare module '@mui/material/styles' {
    interface TypographyVariants {
        variantButtonText: CSSProperties;
        variantButtonPrice: CSSProperties;
        bodyMono: CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        variantButtonText?: CSSProperties;
        variantButtonPrice?: CSSProperties;
        bodyMono?: CSSProperties;
    }

    interface Palette {
        chumsRed: Palette['primary'];
        chumsGrey: Palette['primary'];
    }

    interface PaletteOptions {
        chumsRed?: PaletteOptions['primary'];
        chumsGrey?: PaletteOptions['primary'];
    }
}

export const chumsRedBase = '#d0112b';
export const chumsRedMain = alpha(chumsRedBase, 0.7);

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        variantButtonText: true;
        variantButtonPrice: true;
        bodyMono: true;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        chumsRed: true;
        chumsGrey: true;
    }
}

let theme = createTheme({});

theme = createTheme(theme, {
    palette: {
        mode: 'light',
        primary: {
            light: '#42a5f5',
            main: '#1976d2',
            dark:'#1565c0'
        },
        secondary: {
            light: '#ba68c8',
            main: '#9c27b0',
            dark: '#7b1fa2',
        },
        chumsRed: theme.palette.augmentColor({
            color: {
                light: '#fe3439',
                main: '#d0112a',
                dark: '#c2001e',
            },
            name: 'chumsRed'
        }),
        chumsGrey: theme.palette.augmentColor({
            color: {
                light: '#78787b',
                main: '#454547',
                dark: 'rgb(0 0 0 / 75%)'
            },
            name: 'chumsGrey',
        }),
        error: {
            light: '#fe3439',
            main: '#d0112a',
            dark: '#c2001e',
        }
    },
    typography: {
        // fontFamily: [
        //     "Roboto Condensed",
        //     '-apple-system',
        //     'BlinkMacSystemFont',
        //     "Segoe UI",
        //     'Roboto',
        //     "Helvetica Neue",
        //     'Arial',
        //     'sans-serif',
        //     "Apple Color Emoji",
        //     "Segoe UI Emoji",
        //     "Segoe UI Symbol"
        // ].join(','),
        fontSize: 16,
        h1: {
            textTransform: 'uppercase',
            fontWeight: 300,
            fontSize: 40
        },
        h2: {
            textTransform: 'uppercase',
            fontWeight: 400,
            fontSize: 30,
        },
        h3: {
            textTransform: 'uppercase',
            fontWeight: 400,
            fontSize: 24
        },
        h4: {
            textTransform: 'uppercase',
            fontWeight: 600,
            fontSize: 18
        },
        variantButtonText: {
            fontWeight: 500,
            fontSize: 16,
        },
        variantButtonPrice: {
            fontWeight: 300,
            fontSize: 14,
        },
        bodyMono: {
            fontWeight: 500,
            fontFamily: ['Roboto Mono', 'Monaco', 'Consolas', 'monospace'].join(',')
        },
    }
});

theme = createTheme(theme, {
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    backgroundColor: '#FFFFFF',
                    backgroundSize: 'cover',
                    minHeight: '100%',
                    position: 'relative',
                },
                body: {
                    '#root': {
                        minHeight: '100dvh',
                        display: 'flex',
                        flexDirection: 'column',
                        main: {
                            flex: '1 0 auto',
                        },
                    },
                    '#app': {
                        boxSizing: 'border-box',
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        header: {
                            flexGrow: 0,
                            flexShrink: 0,
                        },
                        main: {
                            flexGrow: 1,
                        },
                        footer: {
                            flexGrow: 0,
                            flexShrink: 0,
                        },
                    }
                },
                h2: {
                    textTransform: theme.typography.h2.textTransform,
                    fontSize: theme.typography.h2.fontSize,
                    fontWeight: theme.typography.h2.fontWeight,
                    color: theme.typography.h2.color,
                },
                h3: {
                    textTransform: theme.typography.h3.textTransform,
                    fontSize: theme.typography.h3.fontSize,
                    fontWeight: theme.typography.h3.fontWeight,
                    color: theme.typography.h3.color,
                },
                ul: {
                   listStyle: 'none',
                    padding: 0,
                    margin: theme.spacing(0, 0, 3, 0)
                },
                li: {
                    padding: theme.spacing(0.333, 2),
                    color: theme.palette.text.primary,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                }
            },
        },
        MuiTableFooter: {
            styleOverrides: {
                root: {
                    th: {
                        fontSize: '1rem',
                        fontWeight: 700,
                    },
                    td: {
                        fontSize: '1rem',
                        fontWeight: 700,
                    }
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: theme.palette.chumsGrey.main,
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    opacity: 0.75,
                    color: theme.palette.chumsGrey.dark
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    a: {
                        color: theme.palette.common.black,
                    }
                }
            },
        },
        MuiMenuList: {
            styleOverrides: {
                root: {
                    a: {
                        color: theme.palette.common.black,
                    }
                }
            }
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: {

                }
            }
        },
    },
})

if (globalThis.window) {
    window.theme = theme;
}


export default theme;
